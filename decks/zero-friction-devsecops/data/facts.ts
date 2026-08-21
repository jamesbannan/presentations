// Presentation facts for this talk.
//
// Source of truth is `.presentation/facts.yaml` in jamesbannan/devsecops-code-signing,
// pulled into .content/facts/devsecops.json by scripts/sync-content.mjs. When that file
// is present it wins, so editing a demo in the code repo updates these slides.
//
// The vendored copy below is the fallback: it keeps the deck building offline, in a
// fresh clone, and before the content repo has published its facts file.

import fallback from './facts.fallback.json'

export interface Step {
  title: string
  body?: string
  meta?: string
  good?: boolean
}

export interface Demo {
  tag: string
  title: string
  theme: string
  intro: string
  steps: Step[]
  watch: string[]
}

export interface ArchCard {
  role?: string
  tag?: string
  title?: string
  sub?: string
  meta?: string
  arrow?: string
  side?: string
}

export interface Facts {
  architecture: ArchCard[]
  demos: Record<string, Demo>
}

const synced = import.meta.glob('../.content/facts/devsecops.json', {
  eager: true,
  import: 'default',
})

const facts = (Object.values(synced)[0] ?? fallback) as unknown as Facts

export const isSynced = Object.keys(synced).length > 0

export default facts
