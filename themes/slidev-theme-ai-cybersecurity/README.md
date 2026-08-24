# slidev-theme-ai-cybersecurity

AI & cybersecurity theme for Slidev, inspired by Mirror's Edge: bright,
reflective white surfaces carrying most of the visual weight, with deep navy
gradients and a sharp cyan accent reserved for title, section-opening and
closing slides. Shared across the decks in this repo via npm workspaces — it is
never published, decks depend on `"slidev-theme-ai-cybersecurity": "*"`.

```yaml
---
theme: slidev-theme-ai-cybersecurity
---
```

## Layouts

| Layout | Purpose | Frontmatter |
| --- | --- | --- |
| `cover` | Opening slide, dark gradient | `kicker`, `title`, `subtitle`, `footer` |
| `agenda` | Numbered agenda, facet panel right | `kicker`, `title`, `items` |
| `section` | Section divider, white-to-sky gradient | `kicker`, `title`, `subtitle` |
| `default` | Content slide on white; body is slide markdown | `kicker`, `title`, `source`, `bare` |
| `two-col` | Two light comparison cards | `kicker`, `title`, `leftTitle`, `rightTitle` + `::left::`/`::right::` slots |
| `stat` | Dark full-bleed stat callout | `kicker`, `title`, `stat`, `caption`, `source` |
| `quote` | Dark full-bleed pull quote | `kicker`, `quote` |
| `end` | Closing slide, dark gradient | `title`, `subtitle` |

`agenda` takes `items` as a list of strings. `default` renders whatever the
slide body contains — use the `IconRows` component for the numbered-row
treatment, or `bare: true` to drop the padded body wrapper entirely.

`default` and `stat` both accept an optional `source`, rendered as an italic
citation line at the foot of the slide. Newlines are preserved, so a citation
and its URL can sit on separate lines using a YAML block scalar:

```yaml
source: |
  Author, “Title”, Publication, 2026.
  example.org/path/to/page
```

On `default` the body region shrinks automatically when a `source` is present,
so rows can never collide with it. Long URLs wrap rather than overflow.

## Components

| Component | Purpose |
| --- | --- |
| `SlideBg` | Full-bleed background SVG for a named art key |
| `FacetPanel` | Translucent facet artwork, left or right, with opacity control |
| `Motif` | The 45°-rotated diamond accent, in `sm`/`md`/`lg` |
| `PageNumber` | Zero-padded page number, bottom right |
| `AgendaList` | Numbered rows with hairline dividers between them |
| `IconRows` | Circular numbered badge plus title and description |
| `CompareCard` | Light card with a kicker and diamond-bulleted list |
| `CornerArt` | Shard clusters in the top-right and bottom-left corners of white slides |
| `ContactLink` | One contact row on the closing slide — brand glyph plus text |
| `BrandIcon` | Brand glyph; `github`/`linkedin`/`mastodon` are built in, or name any SVG in `assets/` |

## Canvas size

The theme sets `canvasWidth: 1280` in its `slidev.defaults`. All layout
geometry is written as `calc(N * var(--in))` where `--in` is `96px`, so the
inch coordinates in `assets/tokens/layout-tokens.json` map 1:1 onto the slide.
At Slidev's default 980px canvas every position would be wrong.

Theme defaults are only applied when a deck references the theme **by package
name**. Using a relative path (`theme: ../`) silently skips them and leaves the
canvas at 980px, so test decks should use the package name too.

## Structure

| Path | Contents |
| --- | --- |
| `layouts/` | The eight slide layouts |
| `components/` | Shared building blocks |
| `composables/` | `useSlideHeader`, `useThemeArt`, `inlineMarkdown` |
| `styles/theme.css` | Shipped design tokens as CSS custom properties plus gradient, typography, motif and card utility classes |
| `styles/base.css` | Canvas unit, font stacks, element defaults, shared header |
| `styles/layouts.css` | Per-layout geometry, straight from `layout-tokens.json` |
| `styles/components.css` | Component styling |
| `styles/index.ts` | Style entry point auto-imported by Slidev |
| `assets/svg/` | Background art — `bg-title`, `bg-dark`, `bg-divider`, `panel-facets`, `corner-facets` |
| `assets/tokens/` | Source-of-truth JSON: `design-tokens`, `layout-tokens`, `background-geometry` |
| `example.md` | Reference deck exercising all eight layouts |

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| `--color-navy-deep` | `#060E21` | Darkest background / title gradient top |
| `--color-navy` | `#0B1E3D` | Dark card fill / quote & closing background |
| `--color-blue-mid` | `#1852B0` | Secondary accent, kicker on light backgrounds |
| `--color-blue` | `#2E6FF2` | Primary accent, motif fill |
| `--color-sky` | `#C4E2FF` | Light gradient base / subtitle text on dark |
| `--color-ice` | `#EAF4FF` | Light card fill / divider gradient mid |
| `--color-cyan` | `#00D4FF` | Sharp accent — kickers on dark, stat numbers |
| `--color-ink` | `#27354C` | Body text on white/light backgrounds |
| `--color-muted` | `#5B6B85` | Secondary/caption text on light backgrounds |
| `--color-card-border` | `#DCE6F5` | Hairline border for light cards |

**Card rule:** on a white or light slide, cards always use `.card-light`
(or `.card-light--alt` for a differentiated tint in a row). `.card-dark-fullbleed`
is reserved for slides that *are* the card — stat callouts, quote, closing.

## Utility classes

`.bg-title`, `.bg-dark`, `.bg-divider` — gradients mirroring the SVGs exactly.
`.motif-diamond` — the repeating rotated-diamond accent.
`.text-hero`, `.text-section-title`, `.text-slide-title`, `.text-kicker`,
`.text-body`, `.text-caption`, `.text-stat` — the typography scale.
