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

The cover, Part one, the five demo slides and the closing slide are written.
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
| 7 | So you run it hundreds of times | 500 simulated reads of the cover's arrow, coloured in one at a time as the slide opens |
| 8 | Why? Qubits are built from tiny things | Zoom from an Australian $1 coin to an electron; where the rules change |
| 9 | Uncertainty is built in | Heisenberg as two questions on one globe; one click |
| 10 | Bit vs qubit | Summary table |
| 11 | The one-liner | Statement |
| 12 | Why that makes a different kind of computer | 16-pattern grids: 4 bits hold one, 4 qubits spread odds over all, interference focuses them; memory to simulate 30–300 qubits; four clicks |
| 13 | Gates turn the arrow | X, H and Z as before → after turns of the arrow, then CNOT on two qubits; four clicks |
| 14 | Demo: the sign you can't see | `gates.py`: H vs HZ read the same 50/50; one more H tells them apart |
| 15 | Demo: two qubits that always agree | `bell_pair.py`: entangled vs control histograms |
| 16 | Demo: the same pair on a real machine | `bell_hardware.py`: simulator vs hardware. **Hardware chart is a placeholder** until a run is recorded |
| 17 | Demo: one pass adds every pair, one read shows one | `adder.py`: a half adder on all four inputs at once |
| 18 | Demo: Grover's search has to know when to stop | `grover.py`: success rate by number of rounds |

Every image in Part one is drawn by a seeded theme component (`Globe`,
`Odds`, `Shots`, `Readout`, `ScaleZoom`, `Patterns`), so there are no image files to maintain. The
odds come from the arrow's angle, so a figure stays correct if you change its
`theta`.

## Demos

The demos live in the `quantum-computing` repo and run locally on the QDK
simulator (`gates.py`, `bell_pair.py`, `bell_hardware.py`, `adder.py`, `grover.py`, in that order;
run each with `uv run demos/<name>.py`). Each demo
slide shows the Q# at the heart of it, the command, and the result of a
typical run drawn by `Globe`/`Odds`, `Outcomes` or `GroverCurve`, so the slide doubles as a
backup if the live run fails. The demos aren't seeded, so live numbers will
differ slightly from the slide. To refresh the slide, rerun the demo and copy
its printed table into the component props.

`bell_hardware.py` replays a run recorded on Azure Quantum ahead of time, so
it's offline on stage too. No run has been recorded yet, so its Hardware chart
uses `<Outcomes pending>`. To fill it in, record a run (the slide's notes have
the commands), then swap `pending` for the recorded `:counts` and update the
source line with the target, shots and date.

The demo slides sit after Part one for now. Move them into the gates, entanglement
and algorithms sections once those are written.
