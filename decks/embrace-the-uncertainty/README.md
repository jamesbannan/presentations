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

The cover, two organiser slides, Part one, the demo slides, Part two (Grover and Shor), Part three (Q-Day), Part four (what to do), the summary and the closing slide are written.

| # | Slide | Notes |
| --- | --- | --- |
| 1 | Cover | |
| 2 | Thanks to our sponsors | Organiser slide, from DDD Adelaide's `Speaker_slides_2026.pptx` |
| 3 | Feedback form here | Organiser slide, rebuilt from the same deck with this talk's own feedback QR code |
| 4 | Part one: Bits and qubits | Section |
| 5 | A bit points one of two ways | Arrow on a globe, north or south only |
| 6 | A qubit can point anywhere | Same globe, any direction |
| 7 | How far north sets the odds | Three latitudes and their odds |
| 8 | Reading it moves the arrow | Two clicks: the read, then the snapped arrow |
| 9 | So you run it hundreds of times | 500 simulated reads of the cover's arrow, coloured in one at a time as the slide opens |
| 10 | Why? Qubits are built from tiny things | Zoom from an Australian $1 coin to an electron; where the rules change |
| 11 | Uncertainty is built in | Heisenberg as two questions on one globe; one click |
| 12 | Bit vs qubit | Summary table |
| 13 | The one-liner | Statement |
| 14 | Why that makes a different kind of computer | 16-pattern grids: 4 bits hold one, 4 qubits spread odds over all, interference focuses them; memory to simulate 30–300 qubits; four clicks |
| 15 | Gates turn the arrow | X, H and Z as before → after turns of the arrow, then CNOT on two qubits; four clicks |
| 16 | Demo: the sign you can't see | `gates.py`: H vs HZ read the same 50/50; one more H tells them apart |
| 17 | Demo: two qubits that always agree | `bell_pair.py`: entangled vs control histograms |
| 18 | Demo: the same pair on a real machine | `bell_hardware.py`: local simulator vs a Bell pair run on IonQ Forte-1 hardware via Open Quantum (100 shots, 1 mixed) |
| 19 | Demo: one pass adds every pair, one read shows one | `adder.py`: a half adder on all four inputs at once |
| 20 | Part two: Grover and Shor | Section |
| 21 | Grover's search: boost the right answer | What Grover is: 16-pattern grids at 0, 1 and 3 rounds (6%, 47%, 96%), checks vs rounds for 16 to a trillion items, why it matters for AES; four clicks |
| 22 | Demo: Grover's search has to know when to stop | `grover.py`: success rate by number of rounds |
| 23 | Shor's algorithm: find the rhythm, break the lock | What Shor is: 7ˣ mod 15 repeating every 4, rhythm → 3 × 5, RSA-2048 classically vs today vs with Shor, why longer keys don't help; three clicks |
| 24 | Demo: factoring 15, the hard way | `shor.py`: four readings out of 512, half give 3 × 5 |
| 25 | Demo: what would RSA-2048 take? | `shor_estimate.py`: `ShorCost`, physical qubits and run time from 32-bit keys to RSA-2048 (36M qubits, 183 days) on the resource estimator; optimised circuits in the notes; one click |
| 26 | Part three: Q-Day | Section |
| 27 | What Shor breaks, and what Grover only dents | RSA, DH and elliptic curves (and where you meet them) vs AES and SHA; the handshake carries the key; two clicks |
| 28 | The bar keeps dropping | `QubitBudget`: physical qubits to break RSA-2048 (2019, 2025) and 256-bit ECC (2026) vs today's ~1,000s; two clicks |
| 29 | Q-Day: nobody knows when. The deadlines are set anyway. | `QdayTimeline`: GRI 2025 expert odds, ASD (2026/2028/2030) and NIST IR 8547 (2030/2035) deadlines; three clicks |
| 30 | Probability: unknown. Impact: catastrophic. Timeline: uncertain. | Statement: the risk-register gag |
| 31 | Harvest now, decrypt later | `Mosca`: migration time plus shelf life against a fuzzy Q-Day; two clicks |
| 32 | The Q-Pocalypse, rated | Hype-o-meter: three real, two myths, one sci-fi; sets up post-quantum crypto; five clicks |
| 33 | Part four: What to do | Section |
| 34 | The replacements are already standards | `NoisyLattice`: the lattice problem; ML-KEM, ML-DSA and SLH-DSA (FIPS 203–205); one click |
| 35 | The catch: everything gets bigger | `KeySizes`: classical vs post-quantum bytes against one network packet; two clicks |
| 36 | Hybrid: belt and braces, already switched on | `HybridKex` plus a live `openssl s_client` check that this conference's site negotiates `X25519MLKEM768`; one click |
| 37 | Crypto-agility: make the algorithm a setting | Three rules beside brittle vs agile signing code |
| 38 | Step one: find all your crypto | Where crypto hides, and a CycloneDX 1.6 CBOM entry |
| 39 | 30 days, 90 days, a year | Roadmap: own it, find it, start moving, against the ASD 2026/2028/2030 dates; three clicks |
| 40 | What to take back to work | Summary: one panel per part, then "embrace the uncertainty" three ways; four clicks |
| 41 | Thank you | Contact details, questions |

Every image in Part one is drawn by a seeded theme component (`Globe`,
`Odds`, `Shots`, `Readout`, `ScaleZoom`, `Patterns`), Part three's charts by `QubitBudget`, `QdayTimeline` and `Mosca`, and Part four's
by `NoisyLattice`, `KeySizes` and `HybridKex`, so there are no image files to maintain. The
odds come from the arrow's angle, so a figure stays correct if you change its
`theta`.

The only image files are the organiser's, in `organiser/`. Slide 2 is their
sponsor graphic full-bleed. Slide 3 places their arrow, label and DDD logo at
the positions they had in the organiser's PowerPoint, with this talk's feedback
code (`feedback-qr.png`) where the generic code was. Both slides import their
images in a `<script setup>` block, so Vite bundles them under the build base.

## Demos

The demos live in the `quantum-computing` repo and run locally on the QDK
simulator (`gates.py`, `bell_pair.py`, `bell_hardware.py`, `adder.py`, `grover.py`, `shor.py`, `shor_estimate.py`, in that order;
run each with `uv run demos/<name>.py`). Each demo
slide shows the Q# at the heart of it, the command, and the result of a
typical run drawn by `Globe`/`Odds`, `Outcomes`, `GroverCurve` or `ShorCost`, so the slide doubles as a
backup if the live run fails. The demos aren't seeded, so live numbers will
differ slightly from the slide. To refresh the slide, rerun the demo and copy
its printed table into the component props.

`bell_hardware.py` replays a run recorded ahead of time (Azure Quantum or Open
Quantum), so it's offline on stage too. The slide shows the IonQ Forte-1 hardware run, the
most recent recording, so the plain command replays it. The notes cover the
`quantinuum.sim.h2-1e` emulator run as a backup.

Slide 36's check isn't in the demos repo: it's a one-line `openssl s_client`
against `dddadelaide.com`. Use Homebrew's OpenSSL 3.5 or later; macOS's
`/usr/bin/openssl` is LibreSSL and won't offer the hybrid. The output is on the
slide as a backup.

`<Outcomes pending>` is still available for a chart awaiting data.

The demo slides sit after Part one for now. Move them into the gates, entanglement
and algorithms sections once those are written.
