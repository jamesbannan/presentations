#!/usr/bin/env node
// Fetches presentation content from other repositories into a deck's gitignored
// .content/ directory, so slides can transclude live code and structured facts
// without those repositories having to host the deck itself.
//
// Driven by decks/<slug>/content.yaml:
//
//   sources:
//     - repo: jamesbannan/devsecops-code-signing
//       ref: main                          # tag, branch or SHA — pin for reproducible builds
//       dest: devsecops                    # -> decks/<slug>/.content/devsecops
//       paths: [.presentation, demos, docs/architecture.md]
//       facts: .presentation/facts.yaml    # optional; emitted as facts.json for import
//
// The facts file is converted to JSON so slides can
// `import facts from '../.content/<dest>/facts.json'` with no extra Vite plugin.

import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const deck = process.argv[2]

if (!deck) {
  console.error('Usage: node scripts/sync-content.mjs <deck-slug>')
  process.exit(1)
}

const deckDir = resolve(root, 'decks', deck)
const manifestPath = resolve(deckDir, 'content.yaml')

if (!existsSync(manifestPath)) process.exit(0)

const manifest = parse(readFileSync(manifestPath, 'utf8')) ?? {}
const sources = manifest.sources ?? []

if (!sources.length) process.exit(0)

const git = (args, cwd) => {
  const result = spawnSync('git', args, { stdio: ['ignore', 'ignore', 'inherit'], cwd })
  if (result.status !== 0) {
    console.error(`git ${args.join(' ')} failed in ${cwd}`)
    process.exit(result.status ?? 1)
  }
}

const gitOut = (args, cwd) =>
  spawnSync('git', args, { cwd, encoding: 'utf8' }).stdout?.trim() ?? ''

// CONTENT_LOCAL points the sync at a working checkout instead of the network, so a
// deck can be written against in-progress content. Accepts either a bare path (applies
// to every source) or a comma-separated `dest=path` map for multi-source decks.
const localOverrides = (() => {
  const raw = process.env.CONTENT_LOCAL?.trim()
  if (!raw) return null
  const entries = raw.split(',').map(s => s.trim()).filter(Boolean)
  const map = new Map()
  let fallback = null
  for (const entry of entries) {
    const eq = entry.indexOf('=')
    if (eq === -1) fallback = entry
    else map.set(entry.slice(0, eq).trim(), entry.slice(eq + 1).trim())
  }
  return { map, fallback }
})()

const cloneUrl = source => {
  if (source.url) return source.url
  const host = source.host ?? 'github.com'
  // GH_TOKEN lets private content repos work in CI without changing the manifest.
  return process.env.GH_TOKEN
    ? `https://x-access-token:${process.env.GH_TOKEN}@${host}/${source.repo}.git`
    : `https://${host}/${source.repo}.git`
}

for (const source of sources) {
  const dest = resolve(deckDir, '.content', source.dest ?? source.repo.split('/').pop())
  const ref = source.ref ?? 'main'
  const stamp = resolve(dest, '.sync-ref')

  // A `local:` path (or CONTENT_LOCAL=<dir>) short-circuits the fetch so slides can be
  // written against an in-progress checkout of the content repo.
  const key = source.dest ?? source.repo
  const override = localOverrides
    ? localOverrides.map.get(key) ?? localOverrides.map.get(source.repo) ?? localOverrides.fallback
    : null
  const localRoot = override
    ? resolve(process.cwd(), override)
    : source.local && resolve(deckDir, source.local)

  if (localRoot && !existsSync(localRoot)) {
    console.error(`local content path does not exist: ${localRoot}`)
    process.exit(1)
  }

  if (localRoot) {
    rmSync(dest, { recursive: true, force: true })
    mkdirSync(dirname(dest), { recursive: true })
    symlinkSync(localRoot, dest, 'dir')
    console.log(`⇢ ${source.repo} ← local ${localRoot}`)
  } else if (existsSync(stamp) && readFileSync(stamp, 'utf8').trim() === ref && !process.env.FORCE_SYNC) {
    // Skip the network when the checkout already matches the pinned ref, which keeps
    // offline builds and repeat dev-server starts fast.
    console.log(`· ${source.repo}@${ref} up to date (${gitOut(['rev-parse', 'HEAD'], dest).slice(0, 7)})`)
  } else {
    rmSync(dest, { recursive: true, force: true })
    mkdirSync(dest, { recursive: true })

    console.log(`↓ ${source.repo}@${ref} → ${dest.replace(`${root}/`, '')}`)
    git(['init', '--quiet'], dest)
    git(['remote', 'add', 'origin', cloneUrl(source)], dest)

    if (source.paths?.length) {
      git(['sparse-checkout', 'init', '--no-cone'], dest)
      git(['sparse-checkout', 'set', ...source.paths], dest)
    }

    git(['fetch', '--depth', '1', '--filter=blob:none', 'origin', ref], dest)
    git(['checkout', '--quiet', 'FETCH_HEAD'], dest)
    writeFileSync(stamp, `${ref}\n`)
  }

  // Structured facts: YAML in the content repo, JSON for the deck to import.
  // Written outside the source tree so a `local:` symlink is never polluted.
  for (const factsPath of [source.facts].flat().filter(Boolean)) {
    const from = resolve(dest, factsPath)
    if (!existsSync(from)) {
      console.warn(`  ! facts file not found: ${factsPath} (deck will use its vendored fallback)`)
      continue
    }
    const factsDir = resolve(deckDir, '.content', 'facts')
    mkdirSync(factsDir, { recursive: true })
    const out = resolve(factsDir, `${source.dest ?? 'facts'}.json`)
    writeFileSync(out, `${JSON.stringify(parse(readFileSync(from, 'utf8')), null, 2)}\n`)
    console.log(`  → ${factsPath} → ${out.replace(`${deckDir}/`, '')}`)
  }
}
