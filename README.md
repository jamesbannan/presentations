# presentations

Slidev monorepo for James Bannan's conference talks. One shared theme, one
workspace per deck, and a content pipeline that pulls facts and code out of the
repositories a talk is actually about.

```
themes/slidev-theme-arcade   shared design system — layouts, components, CSS, assets
decks/<slug>/                one talk: slides.md, content.yaml, data/, setup/
scripts/                     deck dispatcher + cross-repo content sync
archive/                     pre-Slidev decks (ARM template demos, 2015–2017)
```

## Quick start

```bash
npm install
npm run list                          # show available decks
npm run dev -- zero-friction-devsecops
```

| Command | What it does |
| --- | --- |
| `npm run dev -- <deck>` | Dev server with hot reload |
| `npm run build -- <deck>` | Static site → `dist/<deck>/` (base `/<deck>/`) |
| `npm run build:all` | Build every deck into `dist/` |
| `npm run export -- <deck>` | PDF → `dist/<deck>.pdf` |
| `npm run export-pptx -- <deck>` | PPTX → `dist/<deck>.pptx` |
| `npm run sync -- <deck>` | Refresh synced content only |

Every task runs the content sync first, so a deck is never built against stale
facts.

## Why a monorepo

Themes and decks version together. A layout change is testable against every
deck in one `npm run build:all`, and workspace linking means the theme is
consumed by name (`slidev-theme-arcade`) without ever publishing to npm.

## Cross-repo content

A talk's facts belong to the repo the talk is about — otherwise the deck drifts
the moment the demos change. Each deck declares its sources in
`decks/<slug>/content.yaml`:

```yaml
sources:
  - repo: jamesbannan/devsecops-code-signing
    ref: main                        # pin to a tag or SHA before presenting
    dest: devsecops
    facts: .presentation/facts.yaml  # structured facts → .content/facts/devsecops.json
    paths:                           # sparse checkout — keep tight
      - .presentation
      - demos
      - docs/architecture.md
```

`scripts/sync-content.mjs` does a shallow, blob-filtered, sparse `git fetch`
into the gitignored `.content/`, and converts the `facts` YAML into JSON the
deck imports. A `.sync-ref` stamp skips the network when the checkout already
matches the pinned ref, so repeat dev-server starts and offline builds are fast.
Set `FORCE_SYNC=1` to bypass it, and `GH_TOKEN` to reach private content repos.

Two channels are available to slides:

- **Facts** — structured YAML the content repo publishes as a contract. Provided
  to every slide and to theme components (see below).
- **Code** — real files, transcluded with Slidev's
  `<<< @/.content/devsecops/demos/demo3-sigstore/run.sh#region` syntax, so code
  on a slide cannot drift from code in the repo.

### Working against a local checkout

```bash
CONTENT_LOCAL=~/git/devsecops-code-signing npm run dev -- zero-friction-devsecops
```

`.content/<dest>` becomes a symlink to your working tree, so edits to the
content repo show up in the deck immediately. For multi-source decks, map them
individually: `CONTENT_LOCAL=devsecops=~/git/foo,other=~/git/bar`.

### Facts, and why decks still build offline

`decks/<slug>/data/facts.ts` prefers the synced facts and falls back to a
vendored `facts.fallback.json`. That is deliberate: a fresh clone, a CI job with
no network, or a content repo that has not published its facts yet all still
produce a working deck. Refresh the fallback after the upstream contract
changes:

```bash
npm run sync -- <deck>
cp decks/<deck>/.content/facts/<dest>.json decks/<deck>/data/facts.fallback.json
```

Facts are provided app-wide in `decks/<slug>/setup/main.ts`. Slidev compiles
each slide into its own component, so a `<script setup>` block in `slides.md` is
only in scope for the slide it appears in — provide/inject is what makes the
data reachable from every slide and from theme components.

## Adding a deck

1. `mkdir -p decks/<slug>/{data,setup}` and add a `package.json` depending on
   `"slidev-theme-arcade": "*"`.
2. Write `slides.md` with `theme: slidev-theme-arcade`.
3. Add `content.yaml` if the talk draws on another repository.
4. `npm install` to link the workspace, then `npm run dev -- <slug>`.

## Publishing

`.github/workflows/build.yml` builds every deck to GitHub Pages on push to
`main`. `.github/workflows/export.yml` attaches PDF and PPTX exports to a
release when a `<slug>-vN` tag is pushed.
