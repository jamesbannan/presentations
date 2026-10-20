# slidev-theme-quanta

A light Slidev theme that looks like a quantum lab notebook: graph paper, Bloch
spheres, circuit diagrams, heavy-hex qubit lattices, wave packets and
interference fringes. Accents run cyan → violet → magenta (the
`--superposition` gradient), with amber held back for warnings.

Built for *Embrace the Uncertainty: A Beginner's Guide to Quantum Computing*
(DDD Adelaide 2026).

## Tokens

`styles/tokens.css`: `--paper`, `--paper-deep`, `--grid`, `--ink`, `--ink-soft`,
`--cyan`, `--violet`, `--magenta`, `--amber`, `--superposition`, plus
`--font-display` (Space Grotesk), `--font-body` (IBM Plex Sans) and
`--font-mono` (IBM Plex Mono). All fonts are bundled through `@fontsource`, so
the deck works offline.

## Layouts

| Layout | Props | Notes |
| --- | --- | --- |
| `cover` | `kicker`, `motif` (`bloch`\|`none`), `theta`, `phi` | Title left, Bloch sphere right (state set by `theta`/`phi` in degrees), circuit along the foot |
| `section` | `numeral`, `kicker` | Part number as a big ket in a register card, with its binary; lattice behind, interference wave under the heading |
| `default` | `kicker`, `motif` (`lattice`\|`none`) | Circuit mark top-left, lattice corner top-right, folio bottom-right |
| `statement` | `kicker` | Large centred line over a wave packet |
| `quote` | `cite` | Quote held between a bra and a ket |
| `figure` | `src`, `caption`, `kicker`, `fit` | Image in a frame with registration marks, or a double-slit fringe placeholder when `src` is unset |
| `entangled` | `kicker`, `class` | Header in the default slot; `::left::` / `::right::` either side of a twisted-pair hinge. `class: spread` spreads the lists down the full height; add `large` for short lists. Wrap a panel in `<div v-click>` to reveal it on click |
| `end` | `kicker` | Faint orbital behind centred contact details |

## Components

| Component | Props |
| --- | --- |
| `<BlochSphere>` | `theta`, `phi`, `shots` (measurement dots), `hud`, `animate`, `seed` |
| `<CircuitRule>` | `wires`, `columns`, `seed`, `height`, `labels`, `measure` |
| `<Lattice>` | `rows`, `cols`, `seed`, `lit` (share of glowing qubits), `fade` |
| `<Wave>` | `mode` (`packet`\|`interference`), `width`, `cycles`, `height` |
| `<Orbital>` | `cloud`, `seed` |
| `<Entanglement>` | `twists` |
| `<Ket>` | `bra`. `<Ket>ψ</Ket>` renders `|ψ⟩` |
| `<Globe>` | `theta` (0 = north = 0, 180 = south = 1), `phi`, `bit` (classical style), `ghosts` (faint arrows elsewhere), `latitude`, `was` (old angle, drawn with a snap arc), `ask` (`ns`\|`ew`: which question a read asks; due east is `theta` 90, `phi` 28.65), `wander` (hop to a random direction every `hop` ms, default 1200, leaving the last `trail` positions fading, default 5; holds still under reduced motion), `seed` |
| `<Odds>` | `theta`, `counts` (`[zeros, ones]`) or `chance`, plus `labels` (default `['0', '1']`) and `out-of` (total slots, so a tally still filling up grows in from both ends). A split bar of the chance of each answer |
| `<Outcomes>` | `counts`, `labels` (default two-qubit bit strings), `title`, `ceiling` (share at the top of the chart, default 0.6), `captions` (a second, smaller line under each label, e.g. `'0+1=01'`), `pending` (placeholder text: dashed slots, `?` shares and an amber stamp, for data not yet recorded). A histogram of measured outcomes; empty outcomes keep a dashed slot |
| `<GroverCurve>` | `qubits`, `measured` (success rate at 0, 1, 2… rounds), `rounds` (theory only). Theory curve, measured dots, guessing line, and where to stop |
| `<ScaleZoom>` | `stops` (`kind`: `dollar` (an Australian $1)\|`coin`\|`grain`\|`cell`\|`atom`\|`electron`), `quantum-from`, `seed`. A powers-of-ten zoom with the everyday/quantum boundary marked |
| `<Shots>` | `theta`, `reads`, `per-row`, `sorted`, `seed`, `play` (start grey and colour each read in turn as the slide opens; exports, the overview and reduced motion show the finished chart), `seconds` (default 3). A dot per simulated read, tallied with `<Odds>` underneath |
| `<Patterns>` | `qubits` (default 4), `mode` (`bits`: one pattern held, in ink \| `odds`: a share of the odds on every pattern \| `focus`: odds piled onto one, after interference), `pick` (the pattern held or found, as an index; default 11 = `1011`), `seed`. Every pattern a register can hold, as a grid |
| `<Readout>` | `value` (`'0'`\|`'1'`), `label`. A measurement gate and the result it reads |

Also `<Folio>` (slide number as a ket, qubit dots and binary), `<ContactLink>`
and `<BrandIcon>`.

Every motif is seeded, so the same slide draws the same picture in the dev
server, the build and the PDF. The only animation is a slow precession on the
Bloch sphere, and it stops under `prefers-reduced-motion`.

## Classes

- `.ket` / `.bra` on an inline element draws `|…⟩` / `⟨…|` with CSS. None of
  the bundled fonts have ⟨ or ⟩, so don't type them.
- `.qgrad` sets text in the superposition gradient.
- `.tag` is a small mono status pill. Add `cyan`, `magenta` or `amber` for the
  other accents, for example a hype-o-meter's *real*, *emerging* and *sci-fi*.
- `.panel` is a card for a callout.
- `ol.timeline` sets a numbered list as a horizontal sequence on a wire: `<b>`
  for each step, an optional `<span>` for its gloss.
- `.placeholder` on a paragraph marks content that's still to be written. It
  renders as a dashed `[ TODO ]` box.
- `.source` on a paragraph is a small citation line, in mono with a `↳` prefix.
- `.plates` is a row of captioned figures. Each `.plate` holds a graphic with
  a `<p>` under it; `<b>` in the caption is the heading. Set `--plate` to
  change the width. `.plate-step` is a narrow column between plates, for an
  arrow or a `<Readout>`.
- `.plate-groups` sets `.plate-group`s side by side, each a `.plate-group-label`
  heading over its own `.plates`, at a smaller plate size.
- `.gate-seq` is a row of `.gate` chips on a wire, drawn above a plate's figure
  to show the circuit it ran. Add `gate--z` for a phase gate.
- `.split` is a two-column grid with a figure on one side and text on the
  other. Set `--split` to change the ratio.
- `.mini-globe` sizes a `<Globe>` to sit in a table header.
- `.zoom-figure` spaces a `<ScaleZoom>` from the text around it.
- `.run-cmd` is a shell command to run a demo, with a `$` prompt. Add
  `run-cmd--centre` to centre it.
- `.chart-pair` sets two charts side by side at the same width.
- `.patterns-row` sets a row of `.plates` holding `<Patterns>` grids, sized to sit
  above a `.doubling` strip.
- `.doubling` is a row of steps on a wire: a `.doubling-lead` span, then a
  `<div>` per step with `<b>` and a `<span>` gloss. The last step's node is
  magenta. Set `--steps` if there aren't four.
- `.takeaway` is a centred closing line under a figure; its `<b>` lead is violet.
- `.chart-solo` caps a single chart's width, for one beside text in a `.split`.

## Writing SVG components for Slidev

Slidev runs UnoCSS with attributify mode, and it scans component source.

- Class names like `outline` or `ring` match utilities and pick up their styles.
  Prefix internal classes with the component name (`bloch-rim`,
  `orbital-ring`).
- Literal presentation attributes are read as utilities too. `font-size="6"`
  becomes `font-size: 1.5rem`. Set font sizes and opacity in CSS, not as SVG
  attributes.
