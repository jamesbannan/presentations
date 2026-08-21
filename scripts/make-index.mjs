#!/usr/bin/env node
// Writes dist/index.html — a plain listing of the built decks, so the Pages root
// isn't a 404. Each deck is built to dist/<slug>/ with base /<slug>/.

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

if (!existsSync(dist)) {
  console.error('nothing built: dist/ does not exist')
  process.exit(1)
}

const escape = s =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const titleOf = slug => {
  const slides = resolve(root, 'decks', slug, 'slides.md')
  if (!existsSync(slides)) return slug
  // The headmatter title is the talk's real name; fall back to the slug.
  const match = readFileSync(slides, 'utf8').match(/^title:\s*(.+)$/m)
  return match ? match[1].trim().replace(/^["']|["']$/g, '') : slug
}

const decks = readdirSync(dist, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && existsSync(resolve(dist, entry.name, 'index.html')))
  .map(entry => entry.name)
  .sort()

const items = decks
  .map(slug => `      <li><a href="./${slug}/">${escape(titleOf(slug))}</a></li>`)
  .join('\n')

writeFileSync(
  resolve(dist, 'index.html'),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Presentations</title>
    <style>
      body { background: #12082a; color: #e8e6f0; font-family: ui-monospace, "Courier New", monospace; margin: 0; display: grid; place-items: center; min-height: 100vh; }
      main { padding: 2rem; }
      h1 { color: #00f5ff; letter-spacing: 0.1em; font-size: 1.5rem; }
      ul { list-style: none; padding: 0; line-height: 2.2; }
      a { color: #ff2fd0; text-decoration: none; }
      a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <main>
      <h1>PRESENTATIONS</h1>
      <ul>
${items || '      <li>No decks built.</li>'}
      </ul>
    </main>
  </body>
</html>
`,
)

console.log(`dist/index.html → ${decks.length} deck(s)`)
