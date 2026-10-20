---
theme: slidev-theme-quanta
title: "Embrace the Uncertainty"
titleTemplate: "%s"
author: "James Bannan"
keywords: ddd adelaide, quantum computing, post-quantum cryptography, pqc, qubits
info: |
  DDD Adelaide 2026: "Embrace the Uncertainty: A Beginner's Guide to Quantum Computing".
  2:35 pm – 3:20 pm, Flentje Theatre.
  James Bannan, Principal Consultant @ Microsoft.
mdc: true
layout: cover
kicker: DDD Adelaide · 2026
---

# Embrace the <span class="qgrad">Uncertainty</span>

## A beginner's guide to quantum computing

James Bannan · Principal Consultant, Microsoft

---
layout: section
numeral: 1
kicker: Part one
---

# Bits and qubits

## Same two answers. Very different rules.

<!--
Before any algorithms or cryptography: what is a qubit, and how is it different from the bits you already work with every day? One picture carries the whole section: an arrow on a globe.
-->

---
kicker: Bits and qubits · classical
---

# A bit points one of two ways

<div class="plates" style="--plate: 230px">
  <div class="plate">
    <Globe bit :theta="0" />
    <p><b>Zero</b>North. Read it as often as you like.</p>
  </div>
  <div class="plate">
    <Globe bit :theta="180" />
    <p><b>One</b>South. It stays where you left it.</p>
  </div>
</div>

<!--
Picture a bit as an arrow that can only point at the North Pole or the South Pole. North is 0, south is 1. There's no "a bit north". Every bit in every laptop in this room is one of these two pictures.
-->

---
kicker: Bits and qubits · quantum
---

# A qubit can point anywhere

<div class="split">
<Globe :theta="62" wander />
<div>

- Same globe, same two poles
- The arrow can point in **any** direction
- That direction *is* the qubit

</div>
</div>

<!--
A qubit keeps the same two poles, but the arrow is free to point anywhere on the globe. Watch it hop: every one of those directions, and the fading ones it just left, is a valid qubit. The direction the arrow points is the state. That's all "superposition" means here: pointing somewhere other than straight at a pole.
-->

---
kicker: Bits and qubits · reading a qubit
---

# How far north sets the odds

<div class="plates" style="--plate: 200px">
  <div class="plate">
    <Globe :theta="30" latitude />
    <Odds :theta="30" />
    <p><b>Mostly 0</b>Near the north pole</p>
  </div>
  <div class="plate">
    <Globe :theta="90" latitude />
    <Odds :theta="90" />
    <p><b>Coin toss</b>On the equator</p>
  </div>
  <div class="plate">
    <Globe :theta="150" latitude />
    <Odds :theta="150" />
    <p><b>Mostly 1</b>Near the south pole</p>
  </div>
</div>

<!--
Here's the catch: you can't read the direction. When you read a qubit you get a plain 0 or a plain 1, every time. Never "a bit of both". What the direction controls is the odds. The closer to north, the more likely a 0. On the equator it's a coin toss.
-->

---
kicker: Bits and qubits · measurement
---

# Reading it moves the arrow

<div class="plates" style="--plate: 220px">
  <div class="plate">
    <Globe :theta="60" />
    <p><b>Before</b>Somewhere north of the equator</p>
  </div>
  <div class="plate-step" v-click>
    <Readout value="0" />
  </div>
  <div class="plate" v-click>
    <Globe :theta="0" :was="60" />
    <p><b>After</b>Snapped to 0. Read again: 0, every time.</p>
  </div>
</div>

<!--
And reading it isn't free. [click] We read it and get a 0. [click] The arrow is now pointing straight at the North Pole. Wherever it was before is gone. Read it again and you'll get 0 forever. You can't peek without changing it.
-->

---
kicker: Bits and qubits · shots
---

# So you run it hundreds of times

Set up the same qubit 500 times. Read it each time. Count.

<Shots :theta="55" :reads="500" :per-row="50" :seed="18" play />

<!--
One read tells you almost nothing. Watch the reads come in one at a time: the first handful could say anything, but the split settles down fast. So quantum programs are run hundreds or thousands of times, and the answer is a tally like this one. Cyan is 0, magenta is 1. Roughly four in five came back 0, which tells us the arrow was well north of the equator. It's the same arrow as the one on the title slide. Keep this picture in mind: every demo today ends in a chart like this.
-->

---
kicker: Bits and qubits · why
---

# Why? Qubits are built from tiny things

<div class="zoom-figure">
  <ScaleZoom />
</div>

Real qubits are an electron, a particle of light, a single atom, or a circuit chilled until it acts like one.

<!--
So why does a qubit behave like this? Because of what it's made of. Zoom in from a one-dollar coin, to a grain of sand, to a cell, to an atom, to an electron. Somewhere around the atom the rules change. Down there, nature doesn't keep a definite value for everything. It keeps odds.

A qubit is one of those tiny things that we've learned to control: an electron's spin, a particle of light, a single trapped atom. Or the IBM and Google approach: a superconducting circuit big enough to see under a microscope, cooled colder than outer space until the whole thing behaves like one quantum object. The arrow on our globe is that object's state.
-->

---
kicker: Bits and qubits · uncertainty
---

# Uncertainty is built in

Every direction is a sure answer to one question, and a coin toss for another.

<div class="plates" style="--plate: 180px">
  <div class="plate">
    <Globe :theta="0" />
    <Odds :theta="0" />
    <p><b>North or south?</b>Sure: north, so 0.</p>
  </div>
  <div class="plate">
    <Globe :theta="0" ask="ew" />
    <Odds :chance="0.5" :labels="['W', 'E']" />
    <p><b>West or east?</b>Same arrow. Coin toss.</p>
  </div>
  <div class="plate" v-click>
    <Globe :theta="90" :phi="28.65" />
    <Odds :theta="90" />
    <p><b>Point it east?</b>North or south: coin toss.</p>
  </div>
</div>

<!--
This is Heisenberg's uncertainty principle, in arrow form. Point the arrow straight north and "north or south?" has a sure answer: 0. Ask the same arrow "west or east?" and it's a coin toss.

[click] Fine, point it east instead. Now west-or-east is sure, and north-or-south is the coin toss. No direction makes every question certain.

And it's not that our instruments are clumsy, or that the answer is hidden somewhere. The experiments behind the 2022 Nobel Prize in Physics showed the answer can't be secretly written down in advance. It's made when you ask. That's the uncertainty in the title. Quantum computers don't fight it. They're built on it.
-->

---
kicker: Bits and qubits · side by side
---

# Bit vs qubit

| | <div class="mini-globe"><Globe bit :theta="0" /></div> Bit | <div class="mini-globe"><Globe :theta="62" /></div> Qubit |
| --- | --- | --- |
| Holds | 0 or 1 | A direction |
| A read gives you | What's stored | 0 or 1, at the odds |
| After a read | Unchanged | Snapped to the answer |
| To learn what it holds | Read it once | Set it up and read it many times |

<!--
The whole section on one slide.
-->

---
layout: statement
kicker: The one-liner
---

# A qubit isn't 0 and 1 at once.

## It's an arrow that turns into a 0 or a 1 the moment you read it.

<!--
If you take one sentence out of this section, take this one.
-->

---
kicker: Bits and qubits · so what?
---

# Why that makes a different kind of computer

<div class="plates patterns-row" style="--plate: 240px">
  <div class="plate">
    <Patterns mode="bits" />
    <p><b>4 bits</b>One pattern at a time.</p>
  </div>
  <div class="plate" v-click="1">
    <Patterns mode="odds" />
    <p><b>4 qubits</b>Odds on all 16. A read shows one.</p>
  </div>
  <div class="plate" v-click="3">
    <Patterns mode="focus" />
    <p><b>Then interference</b>Wrong answers cancel out.</p>
  </div>
</div>

<div class="doubling" v-click="2">
  <span class="doubling-lead">Each qubit doubles the patterns. Memory to simulate them classically:</span>
  <div><b>30 qubits</b><span>16 GB · a laptop</span></div>
  <div><b>40 qubits</b><span>16 TB · a cluster</span></div>
  <div><b>60 qubits</b><span>16 EB · no computer has that</span></div>
  <div><b>300 qubits</b><span>more numbers than atoms in the universe</span></div>
</div>

<p class="takeaway" v-click="4"><b>Not a faster computer. A different one.</b> It only wins where interference can steer to the answer: simulating molecules, and factoring the numbers behind today's encryption.</p>

<!--
So why does an arrow instead of a switch make a radically different computer? Picture every pattern four bits can hold: sixteen of them, 0000 to 1111.

A classical register holds exactly one of those patterns. Your program works on it, moves to the next, one step at a time. Billions of steps a second, but one pattern per step.

[click] Four qubits don't hold a pattern. They hold odds on every pattern, all sixteen at once, and every gate you apply reshapes all of those odds in one go. Careful, though: this is not "tries every answer in parallel". A read still hands you one pattern, at random, at those odds. That's the half adder demo coming up.

[click] And here's what scares classical computers. Every qubit you add doubles the patterns. To simulate qubits on a normal computer you have to store a number for every pattern: thirty qubits is sixteen gigabytes, about your laptop. Forty is sixteen terabytes, a cluster. Sixty is sixteen exabytes, more memory than any computer ever built. Three hundred qubits: more numbers than there are atoms in the observable universe. (16 bytes per pattern, one double-precision complex number; binary units.)

[click] So where does the power come from, if a read gives one pattern? Interference. The odds have a hidden sign, like the arrow's direction. Arrange the gates so the paths to wrong answers cancel and the paths to the right answer reinforce, then read. That's what every quantum algorithm is: choreography of odds. You'll see the hidden sign in the next demo.

[click] Which is why it isn't a faster computer. It's a different one. For most work, spreadsheets, web servers, your laptop wins. But for a few problems with the right structure, simulating molecules and materials, and factoring the big numbers that today's public-key encryption relies on, it's not faster, it's a different league. That second one is why we're here.
-->

---
kicker: Demo · gates
---

# Demo: the sign you can't see

<div class="plate-groups" style="--plate: 200px">
  <div class="plate-group">
    <p class="plate-group-label">Measure straight away</p>
    <div class="plates">
      <div class="plate">
        <p class="gate-seq"><span class="gate">H</span></p>
        <Globe :theta="90" :phi="28.65" />
        <Odds :counts="[481, 519]" />
        <p><b>Points east</b></p>
      </div>
      <div class="plate">
        <p class="gate-seq"><span class="gate">H</span><span class="gate gate--z">Z</span></p>
        <Globe :theta="90" :phi="208.65" />
        <Odds :counts="[539, 461]" />
        <p><b>Points west</b></p>
      </div>
    </div>
  </div>
  <div class="plate-group">
    <p class="plate-group-label">Add one more H first</p>
    <div class="plates">
      <div class="plate">
        <p class="gate-seq"><span class="gate">H</span><span class="gate">H</span></p>
        <Globe :theta="0" />
        <Odds :counts="[1000, 0]" />
        <p><b>Always 0</b></p>
      </div>
      <div class="plate">
        <p class="gate-seq"><span class="gate">H</span><span class="gate gate--z">Z</span><span class="gate">H</span></p>
        <Globe :theta="180" />
        <Odds :counts="[0, 1000]" />
        <p><b>Always 1</b></p>
      </div>
    </div>
  </div>
</div>

<p class="run-cmd run-cmd--centre">uv run demos/gates.py</p>

<p class="source">A typical run: 1,000 shots of each on the local QDK simulator</p>

<!--
Demo: quantum-computing repo, demos/gates.py (Q# in demos/src/Gates.qs). Runs locally, no Azure, no network.

Gates are the moves you make on the arrow. H takes the north arrow and lays it on the equator, pointing east. Measure now: 50/50. Add a Z after the H and the arrow swings round to point west. Same height, so the same odds: still 50/50. Measure those two and you can't tell them apart.

But they are different. Remember the "west or east?" question from earlier? A second H is how you ask it. It turns east into north and west into south. So H H comes back 0 every single time, and H Z H comes back 1 every single time. The difference you couldn't measure decided everything.

In amplitude terms: H and H Z both have 0.707 on each answer, but H Z's |1> amplitude is negative. Measurement only sees the size, never the sign. The second H makes the two paths interfere: for H H the paths to 1 cancel, for H Z H the paths to 0 cancel. That cancelling is the engine of every quantum algorithm, Grover's included.

The script also runs plain X (always 1, the quantum NOT). In VS Code: Histogram on Superposition and PhaseFlip (identical), then Debug to show the minus sign, then Histogram on Interference and PhaseRevealed.
-->

---
kicker: Demo · entanglement
---

# Demo: two qubits that always agree

<div class="split" style="--split: 0.78fr 1.22fr">
<div>

```rust
use (a, b) = (Qubit(), Qubit());
H(a);        // a: a coin toss
CNOT(a, b);  // b: follows a
return (MResetZ(a), MResetZ(b));
```

<p class="run-cmd">uv run demos/bell_pair.py</p>

</div>
<div class="chart-pair">
  <Outcomes title="Entangled" :counts="[487, 0, 0, 513]" />
  <Outcomes title="Not entangled" :counts="[248, 280, 246, 226]" />
</div>
</div>

<p class="source">A typical run: 1,000 shots of each on the local QDK simulator</p>

<!--
Demo: quantum-computing repo, demos/bell_pair.py (Q# in demos/src/BellPair.qs). Runs locally, no Azure, no network.

Two qubits. H turns the first into a coin toss. CNOT flips the second only if the first is a 1, so the second follows the first. Then read both, a thousand times.

Left: the entangled pair. Each qubit on its own is 50/50, but together they only ever come back 00 or 11. 01 and 10: zero, every run. Right: the control, two independent coin tosses. All four outcomes, roughly a quarter each.

That zero is the whole demo. Random individually, perfectly correlated together. The numbers here are from one run; live, they'll wobble, but the zeros won't.

Useful flags: --shots 5000, --dump-state to show the state before measurement.
-->

---
kicker: Demo · real hardware
---

# Demo: the same pair on a real machine

<div class="split" style="--split: 0.78fr 1.22fr">
<div>

Same Bell pair, sent to **Azure Quantum** ahead of time and replayed here, offline.

On the simulator, 01 and 10 never happen. On hardware, a few do. **That gap is noise.**

<p class="run-cmd">uv run demos/bell_hardware.py</p>

</div>
<div class="chart-pair">
  <Outcomes title="Simulator" :counts="[487, 0, 0, 513]" />
  <Outcomes title="Hardware" pending="Record a run, then fill in" />
</div>
</div>

<p class="source">Simulator: a typical run, 1,000 shots on the local QDK. Hardware: placeholder until a run is recorded</p>

<!--
TODO before the talk: record a hardware run, then replace the Hardware chart's pending prop with :counts="[n00, n01, n10, n11]" and update the source line with the target, shots and date.

  uv run --group hardware demos/bell_hardware.py record --target ionq.simulator --noise-model aria-1   (free, noisy simulator)
  uv run --group hardware demos/bell_hardware.py record --target <target-id> --shots 500              (real QPU)

The recording lands in demos/recordings/ in the quantum-computing repo; `uv run demos/bell_hardware.py` replays the latest one beside a fresh simulator run and prints the counts.

Demo: quantum-computing repo, demos/bell_hardware.py. On stage it's offline: no Azure sign-in, no queue.

Same circuit as the last slide. Left: the simulator, perfect, 01 and 10 never happen. Right: a real machine. Most shots still agree, but some come back 01 or 10. Those aren't a bug in the circuit; they're noise: qubits drifting, gates a fraction off, reads misjudged. That gap between the ideal and the real is why error correction needs so many physical qubits per useful one.
-->

---
kicker: Demo · half adder
---

# Demo: one pass adds every pair, one read shows one

<div class="split" style="--split: 0.9fr 1.1fr">
<div>

```rust
H(a); H(b);          // every input pair at once
CCNOT(a, b, carry);  // carry = a AND b
CNOT(a, sum);        // sum = a XOR b
CNOT(b, sum);
MResetEachZ([a, b, sum, carry])
```

<p class="run-cmd">uv run demos/adder.py</p>

</div>
<Outcomes
  class="chart-solo"
  title="a b sum carry"
  :counts="[269, 260, 246, 225]"
  :labels="['0000', '0110', '1010', '1101']"
  :captions="['0+0=00', '0+1=01', '1+0=01', '1+1=10']"
  :ceiling="0.4"
/>
</div>

<p class="source">A typical run: 1,000 shots on the local QDK simulator. Wrong sums: 0</p>

<!--
Demo: quantum-computing repo, demos/adder.py (Q# in demos/src/Adder.qs). Runs locally, no Azure, no network.

Classical logic is a special case of a quantum circuit. CNOT is XOR, CCNOT is AND, so a half adder is three gates. Feed it ordinary bits and you get the ordinary truth table; the script prints that first.

Now the twist: H on both inputs first. One pass through the adder and the state holds all four additions at once, each with amplitude 0.5. This is the "quantum computers try every answer in parallel" headline, and it's true as far as it goes.

Then you measure. Four bars, about a quarter each, and never a wrong sum. But each run hands you one row of the truth table, at random. To see all four you'd run it four-plus times, which is no faster than a classical adder. Parallelism on its own isn't a speed-up. You need interference to make the answer you want the likely one, which is exactly what Grover does next.

In VS Code: Circuit on HalfAdder, Debug on AddEverything stepped to MResetEachZ to show the four basis states, then Histogram on AddEverything.
-->

---
kicker: Demo · Grover's search
---

# Demo: Grover's search has to know when to stop

<div class="split" style="--split: 0.72fr 1.28fr">
<div>

```rust
ApplyToEach(H, register); // all 16
for _ in 1..iterations {
    ReflectAboutMarked(marked, register);
    ReflectAboutUniform(register);
}
return MeasureInteger(register);
```

<p class="run-cmd">uv run demos/grover.py</p>

</div>
<div>
  <GroverCurve :qubits="4" :measured="[0.064, 0.503, 0.889, 0.957, 0.561, 0.108, 0.012, 0.375, 0.834, 0.994]" />
</div>
</div>

<p class="source">A typical run: 16 candidates, looking for 9, 1,000 shots per point on the local QDK simulator</p>

<!--
Demo: quantum-computing repo, demos/grover.py (Q# in demos/src/Grover.qs).

Four qubits, so 16 candidates, and we're looking for number 9. Start with all 16 equally likely. Each round does two things: flag the answer, then boost whatever was flagged. Interference doing the work: wrong answers cancel, the right one builds up.

The script runs it with 0 rounds, 1 round, 2, and so on, a thousand times each. Watch the dots. Three rounds: about 96%. Theory says stop there. Keep going and it falls apart: six rounds, about 1%, worse than guessing. Then it climbs back.

Grover isn't a lookup, it's a rotation. Knowing when to stop is the algorithm. And on 16 items it needs about 3 rounds, versus up to 16 checks classically: a square-root speedup, not magic. That's why it doesn't kill AES.

For the extension: GroverAtOptimum and GroverOverIterated have Run/Histogram CodeLenses in VS Code.
-->

---
layout: section
numeral: 1
kicker: Layout · section
---

# Section heading

## A short line that frames the part

---
kicker: Layout · default
---

# Content slide

- A first-level point, with a qubit for a bullet
- Inline notation without special glyphs: <Ket>0</Ket>, <Ket>1</Ket>, <Ket>+</Ket> and <Ket>ψ</Ket>
  - A second-level point
- **Strong** text, `inline code`, and a <span class="qgrad">gradient run</span>
- Status tags: <span class="tag cyan">Real</span> <span class="tag">Emerging</span> <span class="tag magenta">Sci-fi</span>

<p class="placeholder">Specimen slide: replace with talk content</p>

---
kicker: Layout · default · timeline
---

# A sequence, drawn as a circuit

<ol class="timeline">
  <li><b>Step one</b><span>A short gloss on the first step</span></li>
  <li><b>Step two</b><span>A short gloss on the second step</span></li>
  <li><b>Step three</b><span>A short gloss on the third step</span></li>
</ol>

<div class="panel" style="margin-top: 1.6em">

A `.panel` for a callout, like a reading off an instrument.

</div>

<p class="source">A citation line under a claim</p>

---
kicker: Layout · default · code
motif: none
---

# Code and tables

```python
def measure(state):
    """Specimen code block."""
    return sample(state)
```

| Column | Column | Column |
| --- | --- | --- |
| Cell | Cell | Cell |
| Cell | Cell | Cell |

---
layout: entangled
class: spread
kicker: Layout · entangled
---

# Two panels, correlated

::left::

### Left panel

- First point
- Second point
- Third point

::right::

### Right panel

- First point
- Second point
- Third point

---
layout: statement
kicker: Layout · statement
---

# One line, centred, and nothing else.

A supporting line underneath.

---
layout: quote
cite: "Attribution, Source, Year"
---

A quoted passage, held between a bra and a ket, set large enough to read from the back of the room.

---
layout: figure
kicker: Layout · figure
caption: A caption for the image
---

# Figure slide

---
layout: end
kicker: Questions?
---

# Thank you

James Bannan

<div class="contact-list">
  <ContactLink icon="linkedin" text="linkedin.com/in/jamesbannan" />
  <ContactLink icon="mastodon" text="jamesbannan@aus.social" />
  <ContactLink icon="github" text="github.com/jamesbannan" />
</div>
