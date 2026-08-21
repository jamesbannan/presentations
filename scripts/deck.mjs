#!/usr/bin/env node
// Dispatcher for per-deck Slidev commands.
//
//   npm run dev    -- zero-friction-devsecops
//   npm run build  -- zero-friction-devsecops
//   npm run build  -- --all
//   npm run export -- zero-friction-devsecops
//
// Keeps every deck on identical commands so a new talk needs no bespoke scripts.

import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const decksDir = resolve(root, 'decks')

const listDecks = () =>
  existsSync(decksDir)
    ? readdirSync(decksDir, { withFileTypes: true })
        .filter(entry => entry.isDirectory() && existsSync(resolve(decksDir, entry.name, 'slides.md')))
        .map(entry => entry.name)
    : []

const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: 'inherit', cwd: root })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

const slidev = (...args) => run('npx', ['--no-install', 'slidev', ...args])

// slidev export writes straight to --output and will not create the directory
// on the way, so a clean checkout fails before rendering anything.
const outFile = name => {
  const path = resolve(root, 'dist', name)
  mkdirSync(dirname(path), { recursive: true })
  return path
}

// Decks are served at <site root>/<deck>/. On GitHub Pages the site root is the
// repository name, not /, so CI passes SITE_BASE and the asset URLs have to
// carry that prefix or every request 404s.
const basePath = deck => `/${[process.env.SITE_BASE, deck].join('/')}/`
  .replace(/\/+/g, '/')

const [task, ...rest] = process.argv.slice(2)
const all = rest.includes('--all')
const positional = rest.filter(arg => !arg.startsWith('--'))
const explicit = rest.find(arg => arg.startsWith('--deck='))?.split('=')[1] ?? positional[0]

const available = listDecks()

if (!task || task === 'list') {
  console.log(available.length ? available.join('\n') : 'No decks found under decks/')
  process.exit(0)
}

const targets = all ? available : [explicit ?? available[0]].filter(Boolean)

if (!targets.length) {
  console.error('No deck specified and none found. Usage: npm run <task> -- <deck-slug>')
  process.exit(1)
}

for (const deck of targets) {
  if (!available.includes(deck)) {
    console.error(`Unknown deck "${deck}". Available: ${available.join(', ') || '(none)'}`)
    process.exit(1)
  }

  const entry = `decks/${deck}/slides.md`
  run('node', [resolve(root, 'scripts/sync-content.mjs'), deck])

  switch (task) {
    case 'dev':
      slidev(entry, '--open')
      break
    case 'build':
      slidev('build', entry, '--base', basePath(deck), '--out', resolve(root, 'dist', deck))
      break
    case 'export':
      // --per-slide is not an optimisation: the default /print route stacks
      // every slide onto one page, collapsing flex children to zero height,
      // which renders the arch and demo canvases blank. --wait lets the CRT
      // and reveal animations settle before each capture.
      slidev('export', entry, '--format', 'pdf', '--per-slide', '--wait', '1500',
        '--output', outFile(`${deck}.pdf`))
      break
    case 'export-pptx':
      slidev('export', entry, '--format', 'pptx', '--per-slide', '--wait', '1500',
        '--output', outFile(`${deck}.pptx`))
      break
    default:
      console.error(`Unknown task "${task}". Expected one of: dev, build, export, export-pptx, list`)
      process.exit(1)
  }
}
