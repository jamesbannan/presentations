# Embrace the Uncertainty: A Beginner's Guide to Quantum Computing

Talk (45 min) for **DDD Adelaide 2026**, 2:35–3:20 pm, Flentje Theatre.
[Agenda entry](https://dddadelaide.com/agenda/2026/talk/1305524).
Theme: [`slidev-theme-quanta`](../../themes/slidev-theme-quanta).

```bash
npm run dev -- embrace-the-uncertainty
npm run build -- embrace-the-uncertainty
npm run check -- embrace-the-uncertainty
npm run export -- embrace-the-uncertainty
```

## Status

The cover, Part one and the closing slide are written. The slides after
Part one are layout specimens, one per layout, kept so the theme can be
built and render-checked until the rest of the talk is written.

| # | Slide | Notes |
| --- | --- | --- |
| 1 | Cover | |
| 2 | Part one: Bits and qubits | Section |
| 3 | A bit points one of two ways | Arrow on a globe, north or south only |
| 4 | A qubit can point anywhere | Same globe, any direction |
| 5 | How far north sets the odds | Three latitudes and their odds |
| 6 | Reading it moves the arrow | Two clicks: the read, then the snapped arrow |
| 7 | So you run it hundreds of times | 500 simulated reads of the cover's arrow |
| 8 | Why? Qubits are built from tiny things | Zoom from a coin to an electron; where the rules change |
| 9 | Uncertainty is built in | Heisenberg as two questions on one globe; one click |
| 10 | Bit vs qubit | Summary table |
| 11 | The one-liner | Statement |

Every image in Part one is drawn by a seeded theme component (`Globe`,
`Odds`, `Shots`, `Readout`, `ScaleZoom`), so there are no image files to maintain. The
odds come from the arrow's angle, so a figure stays correct if you change its
`theta`.
