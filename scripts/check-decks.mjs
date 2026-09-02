#!/usr/bin/env node
// Renders every slide of a built deck in a real browser and fails on the
// problems that a build cannot see.
//
//   npm run check -- ideation-to-presentation
//   npm run check:all
//
// A Slidev build succeeding proves the Markdown parsed and the bundle compiled.
// It proves nothing about whether the deck is legible, or even visible. Every
// bug this catches shipped green:
//
//   - styles hung off a class the slide root never renders, so nothing painted
//   - a root-absolute asset path that 404s under the /<repo>/ Pages base
//   - a caption clipped inside its own panel, invisible below the fold
//   - a webfont silently falling back to a system face
//
// Screenshots go to .checks/<deck>/ so the run can be reviewed — by a human, or
// by an agent that wants to look at what it just built.

import { createServer } from 'node:http'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync, readdirSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-chromium'
import { load } from '@slidev/parser/fs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PORT = Number(process.env.CHECK_PORT ?? 4399)

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.webp': 'image/webp', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.otf': 'font/otf', '.ico': 'image/x-icon',
}

// The base path is baked into the built HTML, so read it back out rather than
// recomputing it. Deriving it independently is how the check ends up testing
// URLs the artefact will never be served from — which is exactly the bug it
// exists to catch, and it happened: CI builds with SITE_BASE=/presentations,
// so a checker that assumed /<deck>/ 404'd on every asset.
const builtBase = async (dist, deck) => {
  const html = await readFile(join(dist, 'index.html'), 'utf8')
  const match = html.match(/(?:href|src)="(\/(?:[^"]*?\/)?)assets\//)
  return match?.[1] ?? `/${[process.env.SITE_BASE, deck].join('/')}/`.replace(/\/+/g, '/')
}

const listDecks = () => {
  const dir = resolve(root, 'decks')
  return existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true })
        .filter(e => e.isDirectory() && existsSync(resolve(dir, e.name, 'slides.md')))
        .map(e => e.name)
    : []
}

// Serves the built deck at exactly the path it was built for, falling back to
// index.html so client-side routes resolve. Anything outside the base is a 404,
// which is precisely the failure mode we want surfaced.
function serve(dist, base) {
  return createServer(async (req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0])
    if (!url.startsWith(base)) {
      res.writeHead(404).end()
      return
    }
    const rel = url.slice(base.length) || 'index.html'
    try {
      const body = await readFile(join(dist, rel))
      res.writeHead(200, { 'content-type': MIME[extname(rel)] ?? 'application/octet-stream' })
      res.end(body)
    } catch {
      // No extension means a client-side route; anything else is a real miss.
      if (extname(rel)) {
        res.writeHead(404).end()
        return
      }
      res.writeHead(200, { 'content-type': 'text/html' })
      res.end(await readFile(join(dist, 'index.html')))
    }
  })
}

// Runs in the page. Decorative content is aria-hidden, and anything a screen
// reader is told to ignore is not something we should measure either.
// Runs in the page before `inspect`. `document.fonts.ready` only resolves the
// loads pending at that moment, and a remote stylesheet (Google Fonts, in one
// of these themes) can register faces after it settles. Asking explicitly for
// every family in use avoids reporting a font as missing when it was merely
// still in flight — and means the measurements below are taken against the
// type that will actually be on screen.
async function settleFonts() {
  const generic = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-monospace', 'ui-sans-serif', 'ui-serif']
  const families = new Set()

  for (const el of document.querySelectorAll('*')) {
    if (!el.textContent?.trim()) continue
    const first = getComputedStyle(el).fontFamily.split(',')[0].trim().replace(/^['"]|['"]$/g, '')
    if (first && !generic.includes(first)) families.add(first)
  }

  await Promise.all([...families].map(f => document.fonts.load(`16px "${f}"`).catch(() => {})))
  await document.fonts.ready
}

// Slidev keeps the neighbouring slides mounted for transitions, so the first
// `.slidev-layout` in the DOM is usually the *previous* slide.
function inspect(no) {
  const layout = document.querySelector(`[data-slidev-no="${no}"] .slidev-layout`)
  if (!layout) return { fatal: `no .slidev-layout rendered for slide ${no}` }

  const decorative = el => el.closest('[aria-hidden="true"]') || el.namespaceURI === 'http://www.w3.org/2000/svg'
  const describe = el => `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? `.${el.className.trim().split(/\s+/).join('.')}` : ''}`.slice(0, 80)

  const bounds = layout.getBoundingClientRect()
  const overflowing = []
  const clipped = []
  const families = new Set()

  for (const el of layout.querySelectorAll('*')) {
    if (decorative(el)) continue
    const box = el.getBoundingClientRect()
    if (!box.width && !box.height) continue

    if (box.right > bounds.right + 2 || box.bottom > bounds.bottom + 2
      || box.left < bounds.left - 2 || box.top < bounds.top - 2)
      overflowing.push(describe(el))

    const style = getComputedStyle(el)

    // A panel that scrolls is a panel with content nobody will ever see: there
    // is no scrollbar to drag in a presentation.
    if (/hidden|clip|auto|scroll/.test(style.overflowY + style.overflowX)) {
      if (el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2)
        clipped.push(`${describe(el)} (${el.scrollHeight}x${el.scrollWidth} in ${el.clientHeight}x${el.clientWidth})`)
    }

    if (el.textContent?.trim()) {
      const first = style.fontFamily.split(',')[0].trim().replace(/^['"]|['"]$/g, '')
      if (first && !['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-monospace', 'ui-sans-serif', 'ui-serif'].includes(first))
        families.add(first)
    }
  }

  // A missing webfont doesn't error, it just quietly reflows into something
  // else — usually only noticeable once it's on a projector.
  const missingFonts = [...families].filter(f => !document.fonts.check(`16px "${f}"`))

  return {
    title: layout.querySelector('h1')?.textContent?.trim() ?? null,
    overflowing: [...new Set(overflowing)],
    clipped: [...new Set(clipped)],
    missingFonts,
  }
}

async function checkDeck(deck) {
  const dist = resolve(root, 'dist', deck)
  if (!existsSync(join(dist, 'index.html')))
    throw new Error(`No build at dist/${deck} — run \`npm run build -- ${deck}\` first.`)

  const { slides } = await load({ userRoot: root }, resolve(root, 'decks', deck, 'slides.md'))
  const base = await builtBase(dist, deck)
  const shots = resolve(root, '.checks', deck)
  await rm(shots, { recursive: true, force: true })
  await mkdir(shots, { recursive: true })

  const server = serve(dist, base)
  await new Promise(done => server.listen(PORT, done))

  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } })

  const failures = []
  const errors = []
  const requests = []

  page.on('pageerror', error => {
    // Slidev asks for a wake lock on every slide; headless Chromium always
    // refuses, and it has no bearing on what renders.
    if (!String(error).includes('Wake Lock')) errors.push(String(error))
  })
  page.on('requestfailed', request => requests.push(`failed ${request.url()}`))
  page.on('response', response => {
    if (response.status() >= 400) requests.push(`${response.status()} ${response.url()}`)
  })

  try {
    for (let n = 1; n <= slides.length; n++) {
      errors.length = 0
      requests.length = 0

      await page.goto(`http://localhost:${PORT}${base}${n}`, { waitUntil: 'networkidle' })
      await page.evaluate(settleFonts)
      await page.waitForTimeout(400)

      const result = await page.evaluate(inspect, n)
      await page.screenshot({ path: join(shots, `${String(n).padStart(2, '0')}.png`) })

      const problems = []
      if (result.fatal) problems.push(result.fatal)
      for (const el of result.overflowing ?? []) problems.push(`overflows the slide: ${el}`)
      for (const el of result.clipped ?? []) problems.push(`clipped inside its container: ${el}`)
      for (const f of result.missingFonts ?? []) problems.push(`font not loaded: ${f}`)
      for (const e of errors) problems.push(`console: ${e}`)
      for (const r of [...new Set(requests)]) problems.push(`request: ${r}`)

      const label = result.title ? `“${result.title}”` : '(no heading)'
      if (problems.length) {
        failures.push({ slide: n, title: result.title, problems })
        console.log(`  ✗ ${String(n).padStart(2, '0')} ${label}`)
        for (const p of problems) console.log(`       ${p}`)
      } else {
        console.log(`  ✓ ${String(n).padStart(2, '0')} ${label}`)
      }
    }
  } finally {
    await browser.close()
    await new Promise(done => server.close(done))
  }

  await writeFile(join(shots, 'report.json'), `${JSON.stringify({ deck, slides: slides.length, failures }, null, 2)}\n`)
  return failures
}

const args = process.argv.slice(2)
const available = listDecks()
const targets = args.includes('--all') || !args.filter(a => !a.startsWith('--')).length
  ? available
  : args.filter(a => !a.startsWith('--'))

if (!targets.length) {
  console.error('No decks found under decks/')
  process.exit(1)
}

let failed = 0
for (const deck of targets) {
  if (!available.includes(deck)) {
    console.error(`Unknown deck "${deck}". Available: ${available.join(', ')}`)
    process.exit(1)
  }
  console.log(`\n${deck}`)
  failed += (await checkDeck(deck)).length
}

console.log(failed
  ? `\n${failed} slide${failed === 1 ? '' : 's'} with problems. Screenshots in .checks/`
  : `\nAll slides render clean. Screenshots in .checks/`)

process.exit(failed ? 1 : 0)
