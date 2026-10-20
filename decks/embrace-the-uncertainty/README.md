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

The cover, Part one, the two demo slides and the closing slide are written.
The slides after the demos are layout specimens, one per layout, kept so the theme can be
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
| 12 | Demo: two qubits that always agree | `bell_pair.py`: entangled vs control histograms |
| 13 | Demo: Grover's search has to know when to stop | `grover.py`: success rate by number of rounds |

Every image in Part one is drawn by a seeded theme component (`Globe`,
`Odds`, `Shots`, `Readout`, `ScaleZoom`), so there are no image files to maintain. The
odds come from the arrow's angle, so a figure stays correct if you change its
`theta`.

## Demos

The demos live in the `quantum-computing` repo and run locally on the QDK
simulator (`uv run demos/bell_pair.py`, `uv run demos/grover.py`). Each demo
slide shows the Q# at the heart of it, the command, and the result of a
typical run drawn by `Outcomes` / `GroverCurve`, so the slide doubles as a
backup if the live run fails. The demos aren't seeded, so live numbers will
differ slightly from the slide. To refresh the slide, rerun the demo and copy
its printed table into the component props.

The demo slides sit after Part one for now. Move them into the entanglement
and Grover sections once those are written.
