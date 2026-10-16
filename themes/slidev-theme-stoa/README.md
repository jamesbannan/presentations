# slidev-theme-stoa

A light, abstract Slidev theme that sets Greek and Roman architecture beside
modern computing: marble, terracotta and ochre that resolve into aegean
pixels, traces and binary. The idea is continuity. The forms we used to carry
stories (temple, arch, frieze, inscription) are the ancestors of the ones
we use now.

Built for *We've Been Here Before (Sort Of)* (TEDxUniMelb 2026).

## Tokens

`styles/tokens.css`: `--marble`, `--marble-deep`, `--vein`, `--ink`,
`--ink-soft`, `--terracotta`, `--ochre`, `--aegean`, plus `--font-display`
(Cinzel), `--font-body` (EB Garamond) and `--font-mono` (IBM Plex Mono). All
fonts are bundled through `@fontsource`, so the deck works offline.

## Layouts

| Layout | Props | Notes |
| --- | --- | --- |
| `cover` | `kicker`, `motif` (`temple`\|`none`) | Title left, dissolving temple right, meander-to-circuit footer |
| `section` | `numeral`, `kicker` | Arch with Roman numeral + binary in the opening |
| `default` | `kicker` | Meander mark top-left, folio bottom-right |
| `statement` | `kicker` | Large centred line with a meander ornament |
| `quote` | `cite` | Quote set on a tabula ansata |
| `figure` | `src`, `caption`, `kicker`, `fit` | Image plate, or a hatched placeholder when `src` is unset |
| `diptych` | `kicker`, `class` | Header in the default slot; `::left::` / `::right::` either side of a column. `class: spread` spreads the lists down the full height; add `large` for short lists |
| `end` | `kicker` | Faint arch behind centred contact details |

## Components

`<Meander>` (Greek key that runs out into PCB traces), `<Temple>` (network
pediment, binary frieze, columns dissolving into pixels), `<Arch>`, `<Column>`,
`<Tabula>`, `<Folio>` (slide number as Roman numeral and binary),
`<ContactLink>` and `<BrandIcon>`.

Add `class="placeholder"` to a paragraph to mark content that's still to be
written. It renders as a dashed `[ TODO ]` box.

Add `class="source"` to a paragraph for a small citation line. It renders in mono
with a `↳` prefix.
