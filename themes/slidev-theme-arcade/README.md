# slidev-theme-arcade

Neon-arcade theme for Slidev: CRT scanlines, pixel corners, monospace type and
colour-coded panels. Shared across every deck in this repo via npm workspaces —
it is never published, decks depend on `"slidev-theme-arcade": "*"`.

```yaml
---
theme: slidev-theme-arcade
---
```

## Layouts

| Layout | Frontmatter | Notes |
| --- | --- | --- |
| `cover` | `title`, `headline`, `subtitle`, `speaker`, `contact`, `event`, `venue`, `eventDate`, `coin` | `headline` overrides the banner text; `\n` becomes a line break |
| `default` | `tag`, `title`, `bare` | `bare: true` drops the padded body wrapper for full-bleed canvases |
| `section` | `level`, `title`, `prompt` | Chapter break |
| `two-col` | `tag`, `title`, `leftTitle`, `rightTitle`, `leftAccent`, `rightAccent` | Content goes in `::left::` / `::right::` |
| `end` | — | Closing slide; put `<ContactLink>` rows in the default slot |

Slidev consumes `title` as slide metadata and never forwards it to the layout as
a prop, so layouts read it back off `$frontmatter` via `composables/useSlideHeader.ts`.
Deck authors just write `title:` and get both the overview/TOC entry and the
rendered heading.

## Components

| Component | Purpose |
| --- | --- |
| `<DemoSteps>` | Numbered walkthrough with arrows and a "watch for" strip |
| `<ArchGrid>` | Architecture map of colour-coded cards and flow arrows |
| `<StageList>` | Agenda / numbered stage list |
| `<AttackCards>` | Incident grid with headline and punchline |
| `<VsTable>` | Three-column A-vs-B comparison |
| `<EventFooter>` | Magenta event bar on the cover |
| `<BrandIcon>` | Brand glyph — `github`, `linkedin`, `mastodon`, or any SVG in `assets/` |
| `<ContactLink>` | One icon + accent-coloured line on the closing slide |

### Data-driven components

`<DemoSteps>` and `<ArchGrid>` resolve their own data from the facts a deck
provides, so slides stay declarative:

```md
<ArchGrid label="▶ KUBERNETES CLUSTER" />   <!-- facts.architecture -->
<DemoSteps demo="sigstore" />               <!-- facts.demos.sigstore -->
```

Any prop passed explicitly wins, and both work with plain arrays
(`:cards`, `:steps`) when there are no facts at all. The theme never imports
deck data — it injects `arcade:facts`, which the deck provides in its
`setup/main.ts`.

String fields in facts accept inline markdown — `` `code` ``, `**bold**` and
`*italic*` — rendered by `composables/inlineMarkdown.ts`.

## Styles

`styles/` is imported in cascade order and split by concern:

| File | Contents |
| --- | --- |
| `tokens.css` | Colour, font, glow and background custom properties |
| `base.css` | Slide shell, scanlines, borders, typography |
| `layouts.css` | Per-layout rules (cover, default, section, two-col, end) |
| `components.css` | Stage list, panels, pills, contact rows |
| `patterns.css` | The big canvases: arch, demo, vs, problem |
| `overrides.css` | Animations and Slidev built-in overrides |

Start in `tokens.css` for a palette change; everything else derives from it.

## Utility classes

Beyond the components, `styles/` provides classes for hand-written slide content.

Colour, for spans and headings: `.neon-cyan`, `.neon-magenta`, `.neon-green`,
`.arcade-yellow`, `.neon-orange`, `.text-dim`.

A terminal block, for scripted command output — safer on stage than a live shell:

```html
<div class="terminal">
  <div class="terminal-titlebar">● ● ●&nbsp;&nbsp; bash — signing</div>
  <div class="terminal-body">
    <span class="t-prompt">$</span> <span class="t-cmd">cosign verify …</span><br>
    <span class="t-out">normal output</span><br>
    <span class="t-ok">verified</span><br>
  </div>
</div>
```

Line classes are `.t-prompt` `.t-cmd` `.t-out` `.t-ok` `.t-warn` `.t-err`
`.t-cyan`, plus `.t-blank` as a spacer.

Also `.retro-list` (arrow-marked `<ul>`), `.retro-callout` (note box, pair with
`.callout-icon`), `.stat-grid` / `.stat-card` (`.stat-value` `.stat-label`
`.stat-desc`) and `.stage-badge` when `<StageList>` is too rigid.

## Exporting

Exports pass `--per-slide`. The default `/print` route stacks every slide onto
one long page, which collapses flex children to zero height — the architecture
and demo canvases come out blank. Do not remove the flag to speed up an export.

## Assets

SVGs in `assets/` are bundled by Vite and addressable by filename:
`assets/unimelb.svg` → `<BrandIcon name="unimelb" />`. Slidev's theme `public/`
directory is not emitted reliably under rolldown-vite, so bundled imports are
used instead — they are also content-hashed and base-path safe.
