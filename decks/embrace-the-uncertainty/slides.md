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
layout: full
---

<script setup>
import sponsors from './organiser/sponsors.svg?url'
</script>

<div class="organiser">
  <img :src="sponsors" alt="Thanks to our sponsors: DDD Adelaide 2026 gold sponsors, SA sponsors, venue and major prize" style="left: 0; top: 0; width: 100%; height: 100%">
</div>

<style>
.slidev-layout > .organiser { position: absolute; inset: 0; z-index: 3; background: #f3ebe0; }
.organiser img { position: absolute; object-fit: contain; }
</style>

<!--
Organiser slide, supplied by DDD Adelaide. A quick thank you to the sponsors, the venue, and the major prize. DDD is volunteer-run and free to submit to; this is who pays for it.
-->

---
layout: full
---

<script setup>
import arrow from './organiser/feedback-arrow.svg?url'
import label from './organiser/feedback-label.svg?url'
import qr from './organiser/feedback-qr.png?url'
import ddd from './organiser/ddd-adelaide-2026.png?url'
</script>

<div class="organiser">
  <img :src="arrow" alt="" style="left: 3.95%; top: 22.89%; width: 9.61%; height: 30.69%">
  <img :src="label" alt="Feedback form here" style="left: 8.75%; top: 12.66%; width: 39.7%; height: 15.27%">
  <img :src="qr" alt="Feedback QR code for this talk" style="left: 13.56%; top: 27.93%; width: 30.19%; height: 53.68%">
  <img :src="ddd" alt="DDD Adelaide 2026" style="left: 50.39%; top: 18.94%; width: 37.65%; height: 66.93%">
</div>

<style>
.slidev-layout > .organiser { position: absolute; inset: 0; z-index: 3; background: #f3ebe0; }
.organiser img { position: absolute; object-fit: contain; }
</style>

<!--
Organiser slide, supplied by DDD Adelaide, with this talk's own feedback code. Leave it up for a moment: the organisers use the feedback to pick next year's programme, and I read every comment.
-->

---
kicker: The plan
clicks: 4
---

# Four parts, from qubits to your to-do list

<div class="split toc" style="--split: repeat(4, 1fr); gap: 1.2em; margin-top: 1em; align-items: stretch">
<div class="panel cyan" v-click="1">
  <span class="ket toc-ket">1</span>
  <h3>Part one</h3>
  <p class="panel-lead">Bits and qubits</p>
  <p>What a qubit is, why reading one changes it, and what that lets a computer do.</p>
</div>
<div class="panel" v-click="2">
  <span class="ket toc-ket">2</span>
  <h3>Part two</h3>
  <p class="panel-lead">Grover and Shor</p>
  <p>Two famous algorithms. One speeds up search; the other breaks today's encryption.</p>
</div>
<div class="panel magenta" v-click="3">
  <span class="ket toc-ket">3</span>
  <h3>Part three</h3>
  <p class="panel-lead">Q-Day</p>
  <p>When a quantum computer might break that encryption, and why data sent today is already at risk.</p>
</div>
<div class="panel amber" v-click="4">
  <span class="ket toc-ket">4</span>
  <h3>Part four</h3>
  <p class="panel-lead">What to do</p>
  <p>The quantum-safe replacements, what they cost you, and a 30, 90 and 365-day plan.</p>
</div>
</div>

<p class="takeaway" v-click="4" style="margin-top: 1.4em">Along the way: demos in Q#, on a simulator and on real quantum hardware.</p>

<style>
.toc .panel p:not(.panel-lead) { font-size: 0.86em; line-height: 1.45; }
.toc .toc-ket { display: flex; width: fit-content; font-family: var(--font-display) !important; font-size: 3.4rem; font-weight: 500; color: var(--violet); margin: 0.1em 0 0.3em; }
.toc .cyan .toc-ket { color: var(--cyan); }
.toc .magenta .toc-ket { color: var(--magenta); }
.toc .amber .toc-ket { color: var(--amber); }
</style>

<!--
Here's where we're going. Four parts, and each one sets up the next.

[click] Part one: bits and qubits. No maths, no cats. Just an arrow on a globe, and what happens when you read it. A few small demos to show it's real.

[click] Part two: Grover and Shor, the two algorithms everyone in security should be able to name. One gives a modest speed-up to search. The other breaks the public-key crypto the internet runs on.

[click] Part three: Q-Day. When could Shor actually run? Nobody knows, and that's the point. But some of your data is already at risk today.

[click] Part four: what to do about it. The replacements are already standards. The hard part is finding everything that still uses the old maths.

And the demos are real: Q# on a local simulator, and one run on actual quantum hardware.
-->

---
layout: section
numeral: 1
kicker: Part one
---

# Bits and qubits

## Both give you a 0 or a 1. They play by very different rules.

<!--
Before any algorithms or cryptography: what is a qubit, and how is it different from the bits you already work with every day? One picture carries the whole section: an arrow on a globe.
-->

---
kicker: Bits and qubits · classical
---

# A bit points one of two ways

Picture a bit as an arrow that can only point north (0) or south (1). Nothing in between.

<div class="plates" style="--plate: 230px">
  <div class="plate">
    <Globe bit :theta="0" />
    <p><b>Zero</b>Points north. Read it as often as you like: always 0.</p>
  </div>
  <div class="plate">
    <Globe bit :theta="180" />
    <p><b>One</b>Points south. Reading it doesn't change it.</p>
  </div>
</div>

<!--
Picture a bit as an arrow that can only point at the North Pole or the South Pole. North is 0, south is 1. There's no "a bit north". Every bit in every laptop in this room is one of these two pictures.
-->

---
kicker: Bits and qubits · quantum
---

<script setup>
import { ref } from 'vue'
const s = ref({ theta: 62, phi: 0 })
</script>

# A qubit can point anywhere

Same two poles, but the arrow can point in **any** direction. Pointing between them is **superposition**.

<div class="split" style="--split: 0.8fr 1.2fr">
<Globe :theta="62" wander :hop="2400" @move="s = $event" />
<QubitState v-bind="s" />
</div>

<!--
A qubit keeps the same two poles, but the arrow is free to point anywhere on the globe. Watch it glide: the line it traces sits on the surface of the globe, because the arrow's tip never leaves it. When the arrow swings round the back, it goes dashed and faint, like you're seeing it through glass.

The panel on the right is the same arrow, described with numbers. Two angles pin down any direction: the tilt down from north, and the turn round the equator. Its length is always exactly 1, and that's why the tip always sits on the surface. Physicists write the same arrow as a recipe: some amount of 0 plus some amount of 1. Square those two amounts and they always add up to 1. Hold that thought, because on the next slide those squared amounts become the probabilities of reading 0 or 1. The little e-to-the-i bit is the turn; it doesn't change the probabilities, but it matters when qubits interfere.

That's all "superposition" means here: pointing somewhere other than straight at a pole.
-->

---
kicker: Bits and qubits · reading a qubit
---

# The arrow is a recipe for probabilities

The arrow is a **vector** of two amounts. Square each to get the **probability** of reading 0 or 1.

<div class="plates compact-plates" style="--plate: 190px">
  <div class="plate">
    <Globe :theta="30" latitude />
    <Odds :theta="30" amps />
    <p><b>Mostly 0</b>Near north</p>
  </div>
  <div class="plate">
    <Globe :theta="90" latitude />
    <Odds :theta="90" amps />
    <p><b>Coin toss</b>On the equator</p>
  </div>
  <div class="plate">
    <Globe :theta="150" latitude />
    <Odds :theta="150" amps />
    <p><b>Mostly 1</b>Near south</p>
  </div>
</div>

<!--
Here's the catch: you can't read the direction. When you read a qubit you get a plain 0 or a plain 1, every time. Never "a bit of both".

So what is the arrow? It's a mathematical vector, the same one from the panel on the last slide. Physicists write it as an amount of 0 plus an amount of 1. Square each amount and you get the probability of reading that answer. Near the north pole it's 0.97 of 0 and 0.26 of 1: square them and that's 93% and 7%. On the equator both amounts are 0.71, which squares to a half each: a coin toss. And because the arrow's length is always 1, those squares always add up to 100%.

The turn round the equator doesn't change these numbers at all, which is why I've left it out here. It only matters when qubits interfere, which is coming up in Part two.

So the arrow isn't the answer. It's the recipe for the probabilities of each answer.
-->

---
kicker: Bits and qubits · measurement
---

# Reading it moves the arrow

Reading snaps the vector to the answer you got. You can't peek without changing it.

<div class="plates compact-plates" style="--plate: 190px">
  <div class="plate">
    <Globe :theta="60" />
    <Odds :theta="60" amps />
    <p><b>Before</b>75% chance of 0</p>
  </div>
  <div class="plate-step" v-click>
    <Readout value="0" />
  </div>
  <div class="plate" v-click>
    <Globe :theta="0" :was="60" />
    <Odds :theta="0" amps />
    <p><b>After</b>Every read now gives 0</p>
  </div>
</div>

<!--
And reading it isn't free. Before the read, the vector is 0.87 of 0 and 0.50 of 1: square them and that's a 75% chance of 0 and 25% of 1. [click] We read it and get a 0. [click] The arrow now points straight at the North Pole: the vector is 1 of 0 and none of 1. Wherever it was before is gone, and the 25% chance of a 1 has vanished with it. Read it again and you'll get 0 forever. You can't peek without changing it.
-->

---
kicker: Bits and qubits · shots
---

# So you run it hundreds of times

One read is just a 0 or a 1. So set up the same qubit 500 times, read it each time, and count: the split tells you where the arrow pointed.

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

At the scale of atoms, nature keeps probabilities, not definite values. Real qubits are made from those tiny things: an electron, a particle of light, a single atom, or a circuit chilled until it behaves like one.

<!--
So why does a qubit behave like this? Because of what it's made of. Zoom in from a one-dollar coin, to a grain of sand, to a cell, to an atom, to an electron. Somewhere around the atom the rules change. Down there, nature doesn't keep a definite value for everything. It keeps probabilities.

A qubit is one of those tiny things that we've learned to control: an electron's spin, a particle of light, a single trapped atom. Or the IBM and Google approach: a superconducting circuit big enough to see under a microscope, cooled colder than outer space until the whole thing behaves like one quantum object. The arrow on our globe is that object's state.
-->

---
kicker: Bits and qubits · uncertainty
---

# Uncertainty is built in

This is Heisenberg's uncertainty principle: any direction gives a sure answer to one question, and a coin toss for another.

<div class="plates" style="--plate: 180px">
  <div class="plate">
    <Globe :theta="0" />
    <Odds :theta="0" />
    <p><b>North or south?</b>Sure: it points north, so 0.</p>
  </div>
  <div class="plate">
    <Globe :theta="0" ask="ew" />
    <Odds :chance="0.5" :labels="['W', 'E']" />
    <p><b>West or east?</b>Same arrow, but now it's a coin toss.</p>
  </div>
  <div class="plate" v-click>
    <Globe :theta="90" :phi="28.65" />
    <Odds :theta="90" />
    <p><b>Point it east instead?</b>Now north or south is the coin toss.</p>
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
| Holds | 0 or 1 | A direction, which sets the probabilities |
| A read gives you | What's stored | 0 or 1, picked at random by the probabilities |
| After a read | Unchanged | Snapped to the answer it gave |
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
    <p><b>4 bits</b>Hold one of the 16 patterns at a time.</p>
  </div>
  <div class="plate" v-click="1">
    <Patterns mode="odds" />
    <p><b>4 qubits</b>Hold probabilities for all 16 at once. A read still shows just one.</p>
  </div>
  <div class="plate" v-click="2">
    <Patterns mode="focus" />
    <p><b>Then interference</b>Gates make wrong answers cancel out, so the right one is likely.</p>
  </div>
</div>

<div class="doubling" v-click="3">
  <span class="doubling-lead">Each qubit doubles the patterns. Memory to simulate them classically:</span>
  <div><b>30 qubits</b><span>16 GB · a laptop</span></div>
  <div><b>40 qubits</b><span>16 TB · a cluster</span></div>
  <div><b>60 qubits</b><span>16 EB · no computer has that</span></div>
  <div><b>300 qubits</b><span>more numbers than atoms in the universe</span></div>
</div>

<p class="takeaway" v-click="4"><b>Not a faster computer. A different one.</b> It only wins on problems where wrong answers can be made to cancel: simulating molecules, and factoring the numbers behind today's encryption.</p>

<!--
So why does an arrow instead of a switch make a radically different computer? Picture every pattern four bits can hold: sixteen of them, 0000 to 1111.

A classical register holds exactly one of those patterns. Your program works on it, moves to the next, one step at a time. Billions of steps a second, but one pattern per step.

[click] Four qubits don't hold a pattern. They hold probabilities for every pattern, all sixteen at once, and every gate you apply reshapes all of those probabilities in one go. Careful, though: this is not "tries every answer in parallel". A read still hands you one pattern, at random, according to those probabilities. The skill is arranging the gates so the pattern you want is the likely one.

[click] So where does the power come from, if a read gives one pattern? Interference. The probabilities have a hidden sign, like the arrow's direction. Arrange the gates so the paths to wrong answers cancel and the paths to the right answer reinforce, then read. That's what every quantum algorithm is: choreography of probabilities. You'll see the hidden sign in the next demo.

[click] And here's what scares classical computers. Every qubit you add doubles the patterns. To simulate qubits on a normal computer you have to store a number for every pattern: thirty qubits is sixteen gigabytes, about your laptop. Forty is sixteen terabytes, a cluster. Sixty is sixteen exabytes, more memory than any computer ever built. Three hundred qubits: more numbers than there are atoms in the observable universe. (16 bytes per pattern, one double-precision complex number; binary units.)

[click] Which is why it isn't a faster computer. It's a different one. For most work, spreadsheets, web servers, your laptop wins. But for a few problems with the right structure, simulating molecules and materials, and factoring the big numbers that today's public-key encryption relies on, it's not faster, it's a different league. That second one is why we're here.
-->

---
kicker: Bits and qubits · gates
---

# Gates turn the arrow

Classical code runs on logic gates: AND, OR, NOT. Quantum gates **turn the arrow** instead.

<div class="plates gate-moves" style="--plate: 240px">
  <div class="plate">
    <div class="gate-move"><Globe :theta="0" /><span class="gate">X</span><Globe :theta="180" /></div>
    <p><b>X: flip</b>North to south. A quantum NOT.</p>
  </div>
  <div class="plate" v-click="1">
    <div class="gate-move"><Globe :theta="0" /><span class="gate">H</span><Globe :theta="90" :phi="28.65" /></div>
    <p><b>H: tip over</b>North to the equator. A sure 0 becomes a coin toss.</p>
  </div>
  <div class="plate" v-click="2">
    <div class="gate-move"><Globe :theta="90" :phi="28.65" /><span class="gate gate--z">Z</span><Globe :theta="90" :phi="208.65" /></div>
    <p><b>Z: half a spin</b>East to west. The probabilities don't change, so a read can't tell.</p>
  </div>
  <div class="plate" v-click="3">
    <div class="gate-pair">
      <div class="gate-move"><span class="qbit qbit--one">1</span><span class="gate gate--ctrl"></span><span class="qbit qbit--one">1</span></div>
      <div class="gate-move"><span class="qbit">0</span><span class="gate gate--target"></span><span class="qbit qbit--one">1</span></div>
    </div>
    <p><b>CNOT: follow</b>Two qubits. Flip the second if the first is 1.</p>
  </div>
</div>

<p class="takeaway" v-click="4"><b>Gates turn the arrow without reading it, and can always be run backwards.</b> A quantum program is a list of gates, then one read at the end.</p>

<!--
A classical program, all the way down, is logic gates: AND, OR, NOT, shuffling bits. Quantum programs are built from gates too. The difference: a quantum gate doesn't set a bit, it turns the arrow. Four of them carry the whole talk.

X: flip. North to south, 0 to 1. It's the quantum NOT, and on a plain 0 or 1 it behaves exactly like one.

[click] H, the Hadamard gate: tip the arrow over. From the north pole down onto the equator, pointing east. A sure 0 becomes a perfect coin toss. Almost every quantum program starts with a row of these.

[click] Z: spin the arrow half a turn around the pole. East becomes west. Here's the catch: the north-or-south probabilities don't change at all, still 50/50, so if you read it now you can't tell Z ever happened. Remember that; it's the next demo.

[click] CNOT, controlled-NOT: the first two-qubit gate. If the first qubit is 1, flip the second; if it's 0, leave it. On plain 0s and 1s that's ordinary logic, XOR in fact. Feed it a first qubit that's a coin toss and the two qubits come out linked. That's entanglement: the demo after next.

[click] Two rules that make these unlike classical gates. A gate never reads the qubit, so it never collapses anything; only the read at the end does. And every gate can be run backwards. AND can't: if AND gives you 0, you don't know which inputs made it. Gates turn the arrow; they don't throw information away. And remember the last slide: each gate reshapes the probabilities of every pattern at once. A quantum program is just a sequence of these turns, timed so that interference does the work, then one read.
-->

---
kicker: Demo · gates
class: demo
---

# Demo: the sign you can't see

East and west both read as 50/50. One more H reveals which is which.

<div class="plate-groups" style="--plate: 190px">
  <div class="plate-group">
    <p class="plate-group-label">Read straight away: they look the same</p>
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
    <p class="plate-group-label">Add one more H, then read: they don't</p>
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

Gates are the moves you make on the arrow. H takes the north arrow and lays it on the equator, pointing east. Measure now: 50/50. Add a Z after the H and the arrow swings round to point west. Same height, so the same probabilities: still 50/50. Measure those two and you can't tell them apart.

But they are different. Remember the "west or east?" question from earlier? A second H is how you ask it. It turns east into north and west into south. So H H comes back 0 every single time, and H Z H comes back 1 every single time. The difference you couldn't measure decided everything.

In amplitude terms: H and H Z both have 0.707 on each answer, but H Z's |1> amplitude is negative. Measurement only sees the size, never the sign. The second H makes the two paths interfere: for H H the paths to 1 cancel, for H Z H the paths to 0 cancel. That cancelling is the engine of every quantum algorithm, Grover's included.

If someone asks "how do you know the arrow points west if you never looked?": we know because we did the maths, not because we looked. Looking would destroy it.
- Think of a recipe. If you follow it exactly, you know what's in the oven without opening the door. Gates are exact recipes: H always tips north to east, and Z always swings east to west. Nothing random happens until the read, so the arrow can be worked out on paper.
- The laptop running this demo is doing that paperwork. A simulator stores every number for every arrow in memory. That's how the Debug view can show the minus sign (or run `uv run demos/gates.py --dump-state` to print the stored numbers for each sequence), and it's why simulating more qubits needs so much memory, as on the earlier slide.
- On a real quantum computer, nobody gets to peek. To check the arrow, you run the same recipe thousands of times, ask "north or south?" on some runs and "east or west?" on others, and rebuild the arrow from the tallies. It's like working out the shape of an object from its shadows on different walls. This is called state tomography. It's slow, so it's used to test the machine, not to read answers.
- The bars on this slide are real shot counts, which is why they say 481 and 519 rather than exactly 500. The globes are the calculated arrow.

The script also runs plain X (always 1, the quantum NOT). In VS Code: Histogram on Superposition and PhaseFlip (identical), then Debug to show the minus sign, then Histogram on Interference and PhaseRevealed.
-->

---
kicker: Demo · entanglement
class: demo
---

# Demo: two qubits that always agree

<div class="split" style="--split: 0.8fr 1.2fr">
<div>

```rust
use (a, b) = (Qubit(), Qubit());
H(a);        // a: a coin toss
CNOT(a, b);  // b: follows a
return (MResetZ(a), MResetZ(b));
```

Each qubit alone is a coin toss, but together they **always match**: 00 or 11, never 01 or 10.

<p class="run-cmd">uv run demos/bell_pair.py</p>

</div>
<div class="chart-pair">
  <Outcomes :stretch="130" title="Entangled: always match" :counts="[487, 0, 0, 513]" />
  <Outcomes :stretch="130" title="Two separate coins" :counts="[248, 280, 246, 226]" />
</div>
</div>

<p class="source">A typical run: 1,000 shots of each on the local QDK simulator</p>

<!--
Demo: quantum-computing repo, demos/bell_pair.py (Q# in demos/src/BellPair.qs). Runs locally, no Azure, no network.

Two qubits. H turns the first into a coin toss. CNOT flips the second only if the first is a 1, so the second follows the first. Then read both, a thousand times.

Left: the entangled pair. Each qubit on its own is 50/50, but together they only ever come back 00 or 11. 01 and 10: zero, every run. Right: the control, two independent coin tosses. All four outcomes, roughly a quarter each.

That zero is the whole demo. Random individually, perfectly correlated together. The numbers here are from one run; live, they'll wobble, but the zeros won't.

Useful flags: --shots 5000, and --dump-state to print both stored states before measurement: the Bell pair has amplitude only on 00 and 11, while the control has 0.5 on all four.
-->

---
kicker: Demo · real hardware
class: demo
---

# Demo: the same pair on a real machine

<div class="split" style="--split: 0.8fr 1.2fr">
<div>

The same Bell pair, run on **IonQ's Forte-1**, a real quantum computer, and replayed here offline.

Perfect qubits never disagree. These did, **once in 100**. That's **noise**. Long programs need **error correction**: many physical qubits for each reliable one.

<p class="run-cmd">uv run demos/bell_hardware.py</p>

</div>
<div class="chart-pair">
  <Outcomes :stretch="130" title="Simulator" :counts="[487, 0, 0, 513]" />
  <Outcomes :stretch="130" title="IonQ Forte-1" :counts="[48, 1, 0, 51]" />
</div>
</div>

<p class="source">Simulator: 1,000 shots, local QDK. Hardware: 100 shots on IonQ Forte-1 via Open Quantum, November 2026</p>

<!--
Demo: quantum-computing repo, demos/bell_hardware.py. It replays the recorded hardware run beside a fresh local simulator run, so on stage it's offline: no sign-in, no queue. The Forte-1 run is the most recent recording, so the plain command replays it.

Same circuit as the last slide. Left: the simulator, perfect qubits. 01 and 10 never happen. Right: the same circuit on a real quantum computer, IonQ's Forte-1, 100 shots. Most shots still agree, 00 or 11. But one came back 01: the two qubits disagreed, which a perfect Bell pair never does.

What's in the box? Forte is a trapped-ion machine. Each qubit is a single atom, an ion, held in place by electric fields in a vacuum and steered with lasers. The arrow from earlier is a real physical thing in there.

Where does the noise come from? Stray fields, heat, and lasers that are a fraction off nudge the arrow. Each gate is very slightly wrong, and each read can be misjudged. None of that is a bug in the circuit. And it's not a fluke: I also sent the same circuit to an emulator of Quantinuum's H2, which copies that machine's measured noise. 5 disagreements in 500 shots. Also 1%. (The other two recordings in the repo, rigetti.sim.qvm and quantinuum.sim.h2-1sc, are a noiseless simulator and a syntax checker, so they show no noise at all.)

Why 1% matters. One percent sounds tiny, and these are among the most accurate machines there are. But this circuit is two gates. A useful algorithm, like breaking RSA, needs millions or billions of gate steps. At even a fraction of a percent per step, the answer drowns in errors long before the end. That's why error correction is needed, and why it spreads one reliable "logical" qubit over many physical ones: hundreds to thousands each. That gap between 2 gates and a billion is most of the distance to Q-Day.

If you want the emulator run on stage instead: uv run demos/bell_hardware.py --recording demos/recordings/*h2-1e*
-->

---
layout: section
numeral: 2
kicker: Part two
---

# Grover and Shor

## Two famous algorithms. One speeds up search; the other breaks today's encryption.

<!--
So far: what a qubit is, how gates steer it, and that real machines are noisy. Now, what is it actually good for? Two algorithms carry most of the headlines, and most of the security worry.

Grover searches. It finds a needle in a haystack faster, but only by a square root. Useful, not magic.

Shor factors. It finds the hidden structure inside RSA and elliptic-curve keys, and that's the one that breaks today's public-key cryptography once the hardware is big enough.

Keep both in mind: one is a modest speed-up we can absorb with longer keys, the other is a clean break we have to migrate away from.
-->

---
kicker: Grover's search · what it is
---

# Grover's search: boost the right key

An attacker knows one block of a message (**7**) and what it encrypts to (**3**). Classically, they try keys **one at a time** until one turns 7 into 3. Grover tries every key at once.

<div class="plates patterns-row" style="--plate: 180px; margin-top: 0.4em">
  <div class="plate">
    <Patterns mode="grover" :pick="9" :rounds="0" />
    <p><b>Start</b>16 keys, equal probabilities: a guess.</p>
  </div>
  <div class="plate" v-click="1">
    <Patterns mode="grover" :pick="9" :rounds="1" />
    <p><b>One round</b>Mark the key that encrypts 7 as 3, then boost it: 47%.</p>
  </div>
  <div class="plate" v-click="2">
    <Patterns mode="grover" :pick="9" :rounds="3" />
    <p><b>Three rounds</b>96%. Read out the key.</p>
  </div>
</div>

<div class="doubling" v-click="3" style="--steps: 4">
  <span class="doubling-lead">Work to find a key: trying keys (on average), or Grover rounds</span>
  <div><b>4 bits (demo)</b><span>8.5 tries · 3 rounds</span></div>
  <div><b>DES, 56 bits</b><span>2⁵⁵ tries · ~2²⁸ rounds</span></div>
  <div><b>AES-128</b><span>2¹²⁷ tries · ~2⁶⁴ rounds</span></div>
  <div><b>AES-256</b><span>2²⁵⁵ tries · ~2¹²⁸ rounds</span></div>
</div>

<p class="takeaway" v-click="4"><b>A square root, and no more.</b> Double the key: AES-256 against Grover is as hard as AES-128 today.</p>

<!--
Lov Grover, Bell Labs, 1996. Next to Shor's algorithm, which we'll get to, it's the most famous quantum algorithm. Here's the problem it solves, as an attack.

Alice encrypts a message with a secret key. Eve, the eavesdropper, knows one block of it, say a standard file header, and she's intercepted the encrypted version. That's called a known-plaintext attack. Any key can be tested: encrypt the known block with it and see if you get the intercepted one. But there's no shortcut to the right key. Classically Eve just tries keys, one after another. On average she gets there halfway through.

Our demo shrinks that to a 4-bit key: sixteen possible keys, the known block is 7, the encrypted block is 3, and the secret key is 9, 1001. The dashed square is the key we're after, but the computer doesn't know that.

Start: four qubits, all sixteen keys equally likely. Read now and it's a pure guess: one in sixteen.

[click] One Grover round is two steps. First, flag. The circuit runs the cipher on every key at once, checks whether the output is 3, and flips the sign of any key that matches. Then it un-runs the cipher to tidy up. Note the circuit never knows the key; it only knows how to check one. That's the Z trick from the gates demo: a sign you can't see. Second, boost: flip every key's probability around the average. The flagged one was below the average, so it bounces up high; everything else drops a little. After one round the right key is at 47%.

[click] Repeat. After three rounds it's 96%. Read the register and you almost certainly get the key. And if you don't, one ordinary encryption tells you, and you run it again. Three rounds instead of eight and a half tries on average.

[click] Now scale it up. Grover needs about the square root of the number of keys. DES, 56 bits: 2^55 tries classically, about 2^28 Grover rounds. AES-128: 2^127 tries, about 2^64 rounds. AES-256: 2^255 tries, still about 2^128 rounds. For reference, DES fell to classical brute force back in 1998.

[click] Why it matters. One: it's the ceiling. It's been proven no quantum computer can search for a key faster than this. Two: doubling the key undoes it. AES-256 against Grover costs the same as AES-128 against today's computers. Three: it's worse than it looks for the attacker. The rounds have to run one after another on error-corrected hardware, and splitting the work over M quantum computers only buys you the square root of M. Jaques and others costed one AES-128 key search, in Q#, at around 2^83 logical gates. Not happening soon. Even so, the NSA's CNSA 2.0 guidance asks for AES-256 for long-term secrets. Longer keys, problem solved. Contrast that with RSA, coming up, where there's no such easy fix.

One catch, and it's the demo: too many rounds and the key drains away again. Knowing when to stop is part of the algorithm.
-->

---
kicker: Demo · Grover's search
class: demo
---

# Demo: recover the key, and know when to stop

<div class="split" style="--split: 1.08fr 0.92fr">
<div>

```rust
ApplyToEach(H, key); // all 16 keys
for _ in 1..iterations {
  ReflectAboutKey(plaintext, ciphertext, key);
  ReflectAboutUniform(key);
}
return MeasureInteger(key);
```

Each round flags the key that turns 7 into 3, then boosts it. Grover finds the key 96% of the time after **3 rounds**. Keep going and it **falls to 2%**, worse than guessing.

<p class="run-cmd">uv run demos/grover.py</p>

</div>
<div>
  <GroverCurve :qubits="4" :measured="[0.043, 0.476, 0.911, 0.964, 0.612, 0.132, 0.021, 0.345, 0.826, 0.987]" />
</div>
</div>

<p class="source">Known block 7 → encrypted 3, secret key 9 of 16, 1,000 shots per point on the local QDK simulator</p>

<!--
Demo: quantum-computing repo, demos/grover.py (Q# in demos/src/Grover.qs).

The setup from the last slide. A toy cipher with a 4-bit key: two rounds of "mix in the key, then a substitution box", and the substitution box is borrowed from PRESENT, a real lightweight cipher. Eve knows block 7 encrypts to 3. Which of the sixteen keys did Alice use? It's 9, but the circuit doesn't know that.

Start in VS Code with BruteForce: the classical attack, trying keys in order. It finds key 9 on the tenth encryption. On average, trying keys at random, it's eight and a half.

Now the quantum version. Put the key register into all sixteen keys at once. Each round: ReflectAboutKey runs the cipher on every key at once, flips the sign wherever the output is 3, and then un-runs the cipher. It checks; it never knows the answer. Then ReflectAboutUniform boosts whatever was flagged. Interference doing the work: wrong keys cancel, the right one builds up.

If there's time, show the circuit on GroverAtOptimum and expand ReflectAboutKey down to ApplyEncrypt and ApplySBox. Fourteen qubits (four for the key, eight to do the encryption, two helpers) and about 2,900 gates, for a 4-bit key. That's why AES-sized Grover is so far off.

The script runs it with 0 rounds, 1 round, 2, and so on, a thousand times each. Watch the dots. Three rounds: about 96%. Theory says stop there. Keep going and it falls apart: six rounds, about 2%, worse than guessing. Then it climbs back. Histogram GroverAtOptimum against GroverOverIterated to show the same thing in two clicks.

Grover isn't a lookup, it's a rotation. Knowing when to stop is the algorithm. And a wrong answer is cheap: one ordinary encryption checks a candidate key, so you just run it again.

Two honest footnotes if asked. Noise: add even a 0.1% error rate to the simulator and the 96% drops to about 10%, barely better than guessing, so this needs error correction. And the known block matters: with block 3, two different keys both give the same output, so real attacks check against two or three known blocks. To show it isn't rigged, try a different secret: --key 6 --plaintext 2.
-->

---
kicker: Shor's algorithm · what it is
---

# Shor's algorithm: find the rhythm, break the lock

RSA's lock: multiplying two primes is easy, splitting the result back is **hard**. To split **15**, pick any number, say **7**, and keep multiplying it by itself on a 15-hour clock.

<div class="period-figure" style="max-width: 640px">
  <Period :multiplier="7" :modulus="15" />
  <p style="margin-top: 0.5em">Where 7, 7×7, 7×7×7… land on the clock. It repeats, and that <b>rhythm</b> gives away the factors.</p>
</div>

<div class="chain" v-click="1" style="margin-top: 0.9em">
  <span>Repeats every 4</span>
  <span>Half of 4: 7² = 49</span>
  <span>Its neighbours: 48, 50</span>
  <span class="chain-end">15 = 3 × 5</span>
</div>

<div class="doubling" v-click="2" style="--steps: 3; margin-top: 1.3em">
  <span class="doubling-lead">To split a 2,048-bit RSA key:</span>
  <div><b>Classically</b><span>about 2¹¹² steps · out of reach</span></div>
  <div><b>Today's machines</b><span>~1,000 noisy qubits · largest split so far: 21</span></div>
  <div><b>With Shor</b><span>under a week · ~1 million noisy qubits</span></div>
</div>

<p class="takeaway" v-click="3" style="margin-top: 1.1em"><b>A massive speed-up, not a square root.</b> Longer keys won't save RSA or elliptic curves: they need new maths.</p>

<!--
Peter Shor, Bell Labs, 1994. Two years before Grover, and it's the reason governments and banks care about quantum computers at all.

The lock. RSA, the public-key encryption behind a lot of the internet's certificates and signatures, is built on one lopsided fact. Multiplying two big primes together is easy: a laptop does it instantly. Going backwards, taking the product and finding the two primes, is brutally hard. Your public key is the product; the primes are the secret. Nobody has found a fast way to split a big number on a normal computer.

Shor's trick is to swap the hard question for a different one. Our stand-in for an RSA key is 15; we want to find 3 times 5 without being told.

Pick any number. It really doesn't matter which, as long as it doesn't already share a factor with 15; if it does, you've been lucky and you're done. We'll take 7. Now keep multiplying it by itself: 7, 49, 343, and so on. Those get big fast, so do it on a clock with 15 hours instead: every time you go past 15, wrap round, like 3 p.m. becoming 3 o'clock. That's all "remainder after dividing by 15" means. 49 hours on a 15-hour clock lands on 4. Look at the row: 1, 7, 4, 13, then 1, 7, 4, 13 again. It repeats. Any number you pick does this on any clock, and how often it repeats, the rhythm, secretly carries the factors of the clock size. Some picks give a rhythm that's no use; then you pick another number and go again.

[click] Here's the payoff, and it's school maths. The rhythm is 4. Take 7 to the power of half the rhythm: 7 squared, 49. Look either side of it: 48 and 50. Each of those shares a factor with 15: 48 shares 3, 50 shares 5. Out pop 3 and 5. Only the rhythm needs a quantum computer; everything after it is maths you could do with a pencil, using Euclid's algorithm from 300 BC.

So why is the rhythm hard? For 15 the pattern repeats after 4 steps and you can just look. For a 2,048-bit RSA number, the rhythm can be a number with hundreds of digits. You'd be listing remainders until the heat death of the universe.

What does the quantum computer do? The same tools as everything else today. Put the exponent in superposition: all of 0, 1, 2, 3 and on, at once. Compute the remainders for all of them in one pass. Reading now would just give one random remainder, useless. Instead, a final step called the quantum Fourier transform makes the paths interfere, like Grover's boost, so that only readings in step with the rhythm survive. A handful of reads, and the rhythm drops out. It's the same idea as tapping along to a song: you don't need to hear every beat to know the tempo.

[click] How close is it? Classically, the best known method needs around 2 to the 112 steps for RSA-2048. That's NIST's rating for it, and it's far out of reach. Today's biggest machines have around a thousand noisy physical qubits, give or take, and the biggest numbers Shor has actually been run on are 15 and 21, the same tiny scale as the demo coming up. That's both funny and reassuring. But the estimate keeps falling. In 2019 it was 20 million noisy qubits for eight hours (Gidney and Ekerå). In May 2025, Craig Gidney at Google brought it to under a million noisy qubits, in under a week. That assumes a 0.1% error per gate: ten times better than the 1% we saw on the real machine. Not today, but no longer science fiction.

[click] Why this one is different. Grover gave a square-root speed-up, so doubling the key length was enough. Shor's speed-up is exponential: making RSA keys bigger only buys a little time, because the quantum effort grows gently with the key size. The same idea also breaks elliptic-curve cryptography, the ECDH and ECDSA in most TLS handshakes and in Bitcoin, and needs even fewer qubits to do it. So the fix isn't longer keys; it's different maths that has no hidden rhythm to find. That's post-quantum cryptography, and it's where we're going next.

And the reason to care now rather than on Q-Day: harvest now, decrypt later. Anything encrypted with RSA or elliptic curves today can be recorded today and opened when the machine arrives.
-->

---
kicker: Demo · Shor's algorithm
class: demo
---

# Demo: factoring 15, the hard way

<div class="split" style="--split: 1.12fr 0.88fr">
<div>

```rust
// quantum: find the rhythm
let y = BigIntAsInt(EstimatePhase(7L, 15L, 9));
// classical: rhythm → factors
let r = PeriodCandidate(15, y, 9);
let (p, q) = FactorsFromPeriod(7, 15, r);
```

Only **one line** is quantum: it finds the rhythm. The rest is ordinary maths. About half the readings lead to **3&nbsp;×&nbsp;5**; the rest are duds, so you check and run again.

<p class="run-cmd">uv run demos/shor.py</p>

</div>
<div class="chart-solo chart-solo--wide">
  <Outcomes :stretch="90" :ceiling="0.3" title="Readings, out of 512" :counts="[119, 132, 126, 123]" :labels="['0', '128', '256', '384']" :captions="['no clue', '3 × 5', 'wrong', '3 × 5']" :tones="['muted', 'one', 'muted', 'one']" />
</div>
</div>

<p class="source">A typical run: 500 shots of period finding for 7 and 15, 9 phase bits, 16 qubits on the local QDK simulator</p>

<!--
Demo: quantum-computing repo, demos/shor.py (Q# in demos/src/Shor.qs). Runs locally in a few seconds.

The code on the left is the whole algorithm in three lines. One line is quantum: EstimatePhase finds the rhythm of 7 to the x, mod 15. The other two are ordinary maths, Python-grade stuff, done in Q# so the plot and the algorithm agree.

The quantum part runs 500 times. Out of 512 possible readings, only four ever come back: 0, 128, 256 and 384, about a quarter each. That's interference again: every reading that isn't in step with the rhythm cancels out, the same trick as Grover. 512 split into 4 equal steps is 128, and that 4 is the rhythm.

Reading each one, as a fraction of 512:
- 128 is a quarter, so the rhythm is 4. 7 squared is 49, 48 and 50 give 3 and 5. Works.
- 384 is three quarters. Same rhythm, 4. Works.
- 0 tells you nothing at all.
- 256 is a half, which suggests a rhythm of 2, and that's wrong: 7 squared mod 15 is 4, not 1. Dud.

So about half the runs factor 15 (51% in this one) and the rest get thrown away. Shor's algorithm is probabilistic by design: check the answer (multiplying is easy), and if it's wrong, run again. The script then runs the whole thing end to end with a random starting number each time, narrating every attempt, so live you may see a dud or two before it lands on 15 = 3 × 5.

Under the hood: 9 phase bits, but measured one at a time on a single reused control qubit, which is how real resource estimates count it. 16 qubits in the simulator for a 4-bit number.

Flags: --number 21 --a 2 (period 6, more ways to fail), --seed N for a repeatable run, --shots.

For the extension: Histogram on PeriodFindingSevenModFifteen, Run on FactorFifteen to watch the attempts in the Debug Console.

Next slide: what it would take to point the same Q# at a real key size.
-->

---
kicker: Shor's algorithm · resource estimation
clicks: 2
---

# Pricing a machine nobody has built yet

Shor can't run on real RSA yet. A **resource estimator** prices it, so we know it's safe today.

<div class="split qec" style="--split: 0.92fr 1.08fr">
<div>
  <LogicalQubit />
</div>
<dl class="qec-terms">
  <div><dt>Physical qubit</dt><dd>The real hardware: a trapped atom, or a tiny superconducting loop. A chip's advertised qubit count means these.</dd></div>
  <div><dt>Noisy</dt><dd>1 in 100 to 1 in 1,000 steps goes wrong, and the arrow drifts.</dd></div>
  <div><dt>Logical qubit</dt><dd>Many noisy ones checking each other: errors (<b class="m">●</b>) are caught (<b class="a">◆</b>) and fixed. That's <b>error correction</b>.</dd></div>
</dl>
</div>

<div class="chain" v-click="1" style="margin-top: 0.5em">
  <span>Q# program</span>
  <span>Count every step</span>
  <span>Pick the hardware</span>
  <span>Add error correction</span>
  <span class="chain-end">Qubits + run time</span>
</div>

<div class="doubling" v-click="2" style="--steps: 3; margin-top: 0.9em">
  <span class="doubling-lead">For RSA-2048, the error rate sets the price</span>
  <div><b>1 in 1,000 errors</b><span>2,738 noisy qubits per reliable one · 36M in all</span></div>
  <div><b>1 in 10,000 errors</b><span>722 per reliable one · 9M in all</span></div>
  <div><b>Better qubits, smaller machine</b><span>watch error rates, not just qubit counts</span></div>
</div>

<style>
.qec { align-items: center; margin-top: 0.2em; }
.qec .motif { max-width: 340px; margin: 0 auto; }
.qec-terms { margin: 0; display: grid; gap: 0.55em; }
.qec-terms > div { border-left: 2px solid var(--violet); padding-left: 0.8em; }
.qec-terms > div:nth-child(2) { border-left-color: var(--magenta); }
.qec-terms > div:nth-child(3) { border-left-color: var(--cyan); }
.qec-terms dt { font-family: var(--font-display); font-weight: 600; font-size: 1.02rem; color: var(--ink); }
.qec-terms dd { margin: 0.1em 0 0; font-size: 0.84rem; line-height: 1.4; color: var(--ink-soft); }
.qec-terms b { color: var(--ink); }
.qec-terms b.m { color: var(--magenta); }
.qec-terms b.a { color: var(--amber); }
</style>

<!--
We've factored 15. The obvious next question: what about a real RSA key, 2,048 bits? We can't run it, there's no machine big enough, and we can't simulate it either: simulating 2,048 qubits would need more memory than there are atoms in the universe. So we cost it instead. That's resource estimation.

First, three words that get thrown around in every quantum headline.

A physical qubit is one actual thing on the chip. In IonQ's machine, the one that ran our Bell pair, it's a single charged atom held in place by electric fields. In Google's and IBM's, it's a tiny loop of superconducting wire, cooled to colder than deep space. When a company says "our chip has 1,000 qubits", it means physical qubits: Google's Willow has 105, IBM's Condor 1,121. A few labs now also announce logical qubits, a dozen or two so far; that's the number to watch.

Noisy means they make mistakes. Every gate has a small chance of turning the arrow slightly the wrong way: around 1 in 100 on the machine we used earlier (one mixed result in a hundred shots), around 1 in 1,000 on the best ones today. And left alone, the arrow drifts: heat, stray light, vibrations nudge it. A program like Shor needs billions of steps. At 1 error in 1,000, you'd be wrong long before you got anywhere.

So we make a logical qubit: one reliable qubit made out of many noisy ones. The picture is the most popular scheme, the surface code. The black dots hold the data. The diamonds are check qubits: each one keeps asking its four neighbours "do you still agree with each other?", without reading the answer itself, because reading it would snap it. When a data qubit goes wrong (magenta), the checks either side of it fire (amber), and the pattern of fired checks points at the culprit so it can be fixed. It's like a spreadsheet's row and column totals: one wrong cell shows up in both, so you know where it is.

The patch here is 49 physical qubits for one logical one. Bigger patches catch more errors at once; the size is called the code distance.

[click] How the estimator works. You give it the Q# program, the same Shor code that just factored 15, pointed at 2,048 bits. It counts every logical step without running anything. Then you tell it what hardware to assume: how often gates fail, how fast they are. It works out how big each patch has to be so the whole run is likely to finish without an uncorrected error, and adds the extra machinery Shor needs. Out come two numbers: physical qubits, and run time.

[click] So is the overhead hopeless? No: it's a price, and the error rate sets it. For RSA-2048 on superconducting-style hardware with 1-in-1,000 errors, the patches need a code distance of 37: 2,738 noisy physical qubits for every reliable logical one, 36 million in all. Not 49, because Shor runs billions of steps and can't afford a single uncorrected error; a shorter program gets away with smaller patches. Make the qubits ten times better, 1 in 10,000, and the same estimate drops to 722 per logical qubit and about 9 million in all, and the run time halves. Ten times better hardware, four times smaller machine. Newer codes than the surface code (IBM's, for example) cut it roughly another ten times, at the cost of harder wiring.

There's a time cost too: every logical step waits for rounds of checks, so it's hundreds of times slower than a raw gate.

And error correction only works once the hardware is good enough. Around 1 in 100 is the break-even point: below it, bigger patches make things better; above it, they make things worse. Google showed the good side for real in late 2024 with Willow: each bigger patch halved the error rate. So when you read "our chip has N qubits", ask about the error rate. That's what decides how many of those N are worth anything.

Why bother with all this? Because this is how anyone can say "RSA is safe today" with a straight face: we know the size of machine it takes, and we know how far today's machines are from it. And it's how we'll see Q-Day coming: every new algorithm and every improvement in error rates moves the estimate, and you can rerun it. Let's run it.

Source: Microsoft Resource Estimator in the QDK, run on demos/src/ShorEstimate.qs (textbook circuit, 2048 bits) with the surface code. qubit_gate_ns_e3 (0.1% errors): code distance 37, 2,738 physical per logical qubit, 35.7M physical, 183 days. qubit_gate_ns_e4 (0.01% errors): code distance 19, 722 per logical, 9.3M physical, 94 days.
-->

---
kicker: Demo · Shor's algorithm at scale
class: demo
clicks: 1
---

# Demo: what would RSA-2048 take?

<div class="split" style="--split: 0.9fr 1.1fr">
<div>

```rust
// one step of Shor.qs, at 2048 bits
use work = Qubit[2048];
use control = Qubit();
Controlled ModularMultiplyByConstant(
    [control], (modulus, 11L, work));
// Shor needs 4,097 of these
```

Too big to run, but the **resource estimator** counts every gate. Error correction turns **6,148** qubits into **36&nbsp;million** physical ones.

<p class="run-cmd">uv run demos/shor_estimate.py</p>

</div>
<div>
  <ShorCost :upto="$clicks + 6" />
</div>
</div>

<p class="source">Microsoft Resource Estimator · textbook circuit · superconducting-style qubits, 0.1% errors</p>

<!--
Demo: quantum-computing repo, demos/shor_estimate.py (Q# in demos/src/ShorEstimate.qs, reusing Shor.qs). The numbers don't change between runs: no randomness, it's counting, not simulating. A few seconds once it's warmed up; the 2048-bit trace needs about 5 GB of RAM (--max-bits 1024 is lighter). The plot is in output/shor_estimate.png.

What it does: we can't simulate 2048 qubits, nobody can, but we don't need to run the circuit to cost it. Microsoft's resource estimator walks through the same Q# that factored 15 two slides ago, counts every gate, then asks: on a given kind of hardware, with a given error rate, how many physical qubits and how long? Shor at n bits is 2n + 1 of these controlled multiplications, all the same size, so the script traces one and multiplies by 4,097.

Read the chart a row at a time: every time the key doubles, the qubits roughly double and the time goes up about eight or nine times. Click for RSA-2048: about 36 million physical qubits running for about 183 days. 6,148 logical qubits doing the work, and error correction wraps every one of those in thousands of noisy physical ones. That's the 1% error rate from the hardware demo coming back to bite.

Today's biggest machines have a thousand or so physical qubits, none of them error-corrected. So: safe today, by a factor of tens of thousands.

But this is the textbook circuit: deliberately naive, written to be readable. The script also prints the optimised circuits:
- Gidney and Ekerå 2021: about 92 times fewer gates. On the same hardware, about 56 million qubits but about 2 days.
- Gidney 2025: under a million noisy qubits, under a week.
The hardware model matters as much: on trapped-ion-style timings (slower gates) the textbook circuit takes 165 years; on Microsoft's Majorana target with 10⁻⁶ errors, about 5 million qubits and 33 days.

That's the point to land: the estimate keeps falling, as much from better algorithms as from better hardware. That's Part three.

In VS Code: Estimate CodeLens on EstimateRsa2048Textbook and EstimateRsa2048GidneyEkera in ShorEstimate.qs shows the full breakdown, including the T-factories.
-->

---
layout: section
numeral: 3
kicker: Part three
---

# Q-Day

## The day a quantum computer can break today's encryption. Some call it the Q-Pocalypse.

<!--
Q-Day is the name for the day someone switches on a quantum computer big enough, and clean enough, to run Shor's algorithm against a real key. Not 15. A 2048-bit RSA key, or the 256-bit elliptic curve key in your browser, your SSH config or your bitcoin wallet.

The tabloid name is the Q-Pocalypse. This section is about what actually breaks that day, how close we are, when it might come, and why the honest answer to "when?" is "we don't know, and that's exactly why you start now".

Nobody's announced Q-Day yet. Hold on to that: the danger isn't the day itself, it's everything we've done before it.
-->

---
kicker: Q-Day · what breaks
---

# What Shor breaks, and what Grover only dents

<div class="split" style="--split: 1.15fr 0.85fr; align-items: stretch; margin-top: 0.9em">
<div class="panel magenta">
  <h3>Broken by Shor</h3>
  <p class="panel-lead">RSA · Diffie-Hellman · elliptic curves (ECDH, ECDSA, Ed25519)</p>
  <ul>
    <li>Every HTTPS handshake and certificate</li>
    <li>SSH keys, VPNs, Wi-Fi enterprise logins</li>
    <li>Code signing and software updates</li>
    <li>JWTs (RS256, ES256), passkeys</li>
    <li>Bitcoin and Ethereum wallets</li>
  </ul>
  <p>The fix is new maths, not bigger keys.</p>
</div>
<div class="panel cyan" v-click="1">
  <h3>Dented by Grover</h3>
  <p class="panel-lead">AES · SHA-2 · SHA-3 · HMAC</p>
  <ul>
    <li>Disk and database encryption</li>
    <li>The bulk of every HTTPS connection</li>
    <li>Hashes and password storage</li>
  </ul>
  <p>The fix is bigger keys: AES-256, SHA-384.</p>
</div>
</div>

<p class="takeaway" v-click="2" style="margin-top: 1.3em"><b>AES is safe, but its key is sent inside a handshake that Shor breaks.</b> Record a conversation today, break its handshake later, and you can read all of it.</p>

<!--
Two families of cryptography, two very different stories.

On the left, public-key cryptography: RSA, Diffie-Hellman, and elliptic curves. These are the ones built on a hidden rhythm, factoring or its elliptic-curve cousin, the discrete logarithm. That's exactly the structure Shor's algorithm finds. Once a big enough machine exists, these aren't weakened, they're broken: from a public key you can work out the private key.

Where do you meet them? Everywhere two parties who've never met need to agree on a secret or prove who they are. The HTTPS handshake and the certificate that proves it's really your bank. SSH keys. VPNs. The signature on every software update you install. JWTs signed with RS256 or ES256. Passkeys, which are elliptic-curve keys under the hood. And every Bitcoin and Ethereum wallet.

You can't fix this by making the keys longer. Shor scales gracefully with key size, so a bigger RSA key only buys a little time. The fix is new maths: algorithms with no hidden rhythm for Shor to find. That's post-quantum cryptography, and it's coming up.

[click] On the right, symmetric cryptography: AES, the SHA hashes, HMAC. No hidden rhythm here, so Shor doesn't apply. The best quantum attack is Grover's search, the square-root speed-up from earlier. In theory that halves the effective strength: AES-128 behaves more like a 64-bit key against a quantum attacker. In practice Grover runs step after step, it doesn't spread well across many machines, and nobody thinks AES-128 falls soon. But the fix is cheap, so take it: AES-256 and SHA-384. Australia's ISM already asks for AES-256 and SHA-384 or SHA-512 on new equipment by 2030 (ISM-1917).

[click] Here's why the left-hand side matters so much. Real systems use both. The public-key handshake agrees a fresh AES key, then AES encrypts the actual data. AES is fine, but the AES key was carried inside the handshake. Record the handshake today, break it with Shor later, pull out the AES key, and read the whole conversation. So "AES is quantum-safe" is true, and it doesn't save you if the handshake isn't.
-->

---
kicker: Q-Day · how close?
clicks: 2
---

# The machine needed keeps shrinking

How many qubits it would take to break today's keys, versus the biggest machines we have.

<div style="max-width: 820px; margin: 0.6em auto 0">
  <QubitBudget :upto="$clicks + 1" />
</div>

<p class="source" style="text-align: center">Gidney &amp; Ekerå (Quantum 5, 433) · Gidney 2025 (arXiv 2505.15917) · Babbush, Zalcman, Gidney et al. 2026 (PRX Quantum 7, 031001) · physical qubits at 0.1% error</p>

<!--
How big does a machine have to be? This is physical qubits, on a log scale: each gridline is ten times the last.

In 2019, Craig Gidney and Martin Ekerå at Google worked out that breaking a 2048-bit RSA key would take about 20 million noisy qubits, running for about 8 hours.

[click] In 2025, Gidney did it again: under a million qubits, in under a week. Same hardware assumptions, a twentieth of the machine, just by finding cleverer ways to do the arithmetic.

[click] And in 2026, a Google team including Gidney looked at the elliptic curve Bitcoin and Ethereum use, 256-bit. Elliptic curve keys are much smaller than RSA keys, so they need fewer qubits: no more than about 1,200 error-corrected qubits, which on today's style of superconducting hardware is under half a million physical ones, running in minutes. Minutes matters: when you spend bitcoin, your public key sits in public for the ten or so minutes before the block is mined. A machine that works in minutes could race you to it.

Down at the bottom, the dashed line: the biggest machines today have around a thousand to a few thousand qubits. IBM's Condor has 1,121; neutral-atom arrays have held a few thousand atoms. And these are the noisy kind, without error correction at scale. All the estimates above assume a 0.1% error rate and full error correction running underneath.

So we're a few hundred times short on count, and further than that on quality. That's real comfort. But look at the direction: the estimates fell twenty-fold in six years, mostly from better algorithms, not better hardware. The bar is dropping while the machines are climbing. Nobody knows where they meet.

Why so many physical qubits? Error correction. Each reliable, logical qubit is built from hundreds to thousands of noisy physical ones, constantly checked and corrected (Fowler et al. 2012 is the classic reference). That's the overhead from the hardware-reality slide.
-->

---
kicker: Q-Day · when?
clicks: 3
---

# Q-Day: nobody knows when. The deadlines are set anyway.

<div style="max-width: 800px; margin: 0.6em auto 0">
  <QdayTimeline :stage="$clicks" />
</div>

<p class="source" style="text-align: center">Global Risk Institute, Quantum Threat Timeline Report 2025 · ASD, Planning for post-quantum cryptography · NIST IR 8547</p>

<!--
So when is Q-Day? Here's the honest answer: nobody knows. Here's today, and fifteen years of runway.

[click] Every year the Global Risk Institute asks a panel of quantum experts how likely a code-breaking machine is, and when. The latest report, published in March 2026 with 26 experts: a 28 to 49 percent chance within ten years, and 51 to 70 percent within fifteen. It's a range because the experts' answers are themselves ranges. The ten-year number is the highest in the seven years they've run the survey. Read that as: roughly a coin flip in the mid 2030s, and getting more likely, not less. The dashed line is just a guide between the two published points.

[click] Australia isn't waiting for the answer. The Australian Signals Directorate's guidance: have a refined transition plan by the end of 2026, which is about now. Start the transition, critical systems first, by the end of 2028. And stop using RSA, Diffie-Hellman and elliptic curves entirely by the end of 2030. That's for government, and anyone who sells to it, which is a lot of this room.

[click] The US is on a similar clock. NIST's IR 8547, finalised in October 2026: quantum-vulnerable public-key algorithms are deprecated after 2030 and disallowed after 2035. Some US federal systems have even earlier deadlines.

Notice the deadlines sit well before the probabilities get high. That's deliberate. Migration is slow, years for a big organisation, so the regulators have worked backwards from the risk, not forwards from the prediction. Which is a very "embrace the uncertainty" way to run a project.
-->

---
layout: statement
kicker: Q-Day · the risk register
---

# Probability: unknown. Impact: catastrophic. Timeline: uncertain.

## You can't wait for certainty. Plan for the deadline, not the prediction.

<!--
If you've ever filled in a risk register, you know this row. Probability unknown. Impact catastrophic. Timeline uncertain.

Normally that row gets a shrug and a "monitor". The trouble with this one is that the clock doesn't start on Q-Day. For some of your data, it started years ago. Which brings us to the scariest four words in the section.
-->

---
kicker: Q-Day · harvest now, decrypt later
clicks: 2
---

# Harvest now, decrypt later

<div style="max-width: 770px; margin: 0.4em auto 0">
  <Mosca :exposed="$clicks >= 1" />
</div>

<p class="takeaway" v-click="2"><b>Years until you've migrated + years it must stay secret &gt; years until Q-Day?</b> Then that data is already exposed: it can be recorded now and read later.</p>

<!--
Here's the bit that makes Q-Day a today problem. Encrypted traffic is easy to record. Storage is cheap. So a patient adversary can copy encrypted data now, sit on it, and decrypt it when the machine arrives. Harvest now, decrypt later. It's the reason every security agency gives for starting the migration now.

This picture is Michele Mosca's rule of thumb. Each row is a kind of data. The violet part is how long you'll keep sending it with today's crypto: until you finish migrating, here the end of 2030, the ASD deadline. Everything sent in that window can be recorded. The cyan part is how long it has to stay secret after that. The pink band is Q-Day: somewhere in here. I've started the band in 2032, early but within what the experts call plausible.

[click] Now shade everything that still needs to be secret once Q-Day might have arrived.

A login session only needs to stay secret for hours: once you've migrated, it's done. Safe. A credit card number lasts a few years: just touches the band. Trade secrets, ten years: well into it. Cabinet papers stay closed for twenty years in Australia. Health records, your whole life. Those rows were exposed the moment they were sent.

[click] That's Mosca's inequality. How long until you've migrated, plus how long the data must stay secret: if that's longer than the time until Q-Day, you're already too late for that data. You can't un-record it. The only lever you control is the violet bar: migrate sooner, and everything you send from then on is safe.
-->

---
kicker: Q-Day · hype-o-meter
---

# The Q-Pocalypse, rated

<div class="hype">
  <div><span class="tag magenta">Real</span><b>Recorded secrets get read</b><span>Anything sent with RSA or elliptic curves today can be stored now and opened on Q-Day.</span></div>
  <div v-click="1"><span class="tag magenta">Real</span><b>Signatures get forged</b><span>Fake certificates, logins and software updates, on anything that hasn't migrated.</span></div>
  <div v-click="2"><span class="tag magenta">Real</span><b>A quarter of all bitcoin is up for grabs</b><span>25–30% sits in addresses whose public key is already on the blockchain.</span></div>
  <div v-click="3"><span class="tag cyan">Myth</span><b>AES is dead</b><span>Grover only dents it. AES-256 keeps a comfortable margin.</span></div>
  <div v-click="4"><span class="tag amber">Sci-fi</span><b>Quantum cracks Bitcoin tomorrow</b><span>Today's machines are hundreds of times too small, and far too noisy.</span></div>
  <div v-click="5"><span class="tag cyan">Myth</span><b>There's nothing we can do</b><span>Quantum-safe algorithms are already standardised, and already in your browser.</span></div>
</div>

<!--
Let's run the Q-Pocalypse headlines through the hype-o-meter.

Real: recorded secrets get read. That's harvest now, decrypt later. It's not a prediction about Q-Day, it's a description of what can be stored today.

[click] Real: signatures get forged. On Q-Day, anyone with the machine can work out a private key from a public one. Public keys are, by design, public: they're in every certificate and every signed update. So they can pretend to be your bank, or push a "software update" signed with your vendor's key, to anything that hasn't moved to quantum-safe signatures. Unlike harvesting, this needs the machine, so it only starts on Q-Day. But it needs everything migrated, firmware included, by then.

[click] Real, and a bit of fun: about a quarter of all bitcoin is exposed. Bitcoin addresses that have spent before, or older address types, have their public key sitting on the blockchain. Estimates in 2026 range from about 25 percent, ChainQuery, to 30 percent, Glassnode, of all bitcoin. On Q-Day those are a race. Bitcoin hasn't agreed how it would migrate.

[click] Myth: AES is dead. You've seen why. Grover dents it, AES-256 shrugs it off.

[click] Sci-fi: quantum cracks Bitcoin tomorrow. The best machines are a few hundred times too small, and nowhere near clean enough. Not tomorrow. Probably not this decade, but we don't get to be sure.

[click] And myth: there's nothing we can do. There is. NIST published quantum-safe replacements in 2024: ML-KEM for agreeing keys, ML-DSA and SLH-DSA for signatures. Chrome, Edge, Firefox and Safari already use a hybrid ML-KEM key exchange with many sites; if you came here on the conference Wi-Fi, some of your traffic today was already quantum-safe. The hard part isn't the maths any more. It's finding everything in your estate that uses the old maths, and swapping it out before the deadlines. That's where we're going next.
-->

---
layout: section
numeral: 4
kicker: Part four
---

# What to do

## The new maths is ready. The hard part is finding everything that still uses the old maths.

<!--
Enough doom. This part is the to-do list.

The good news first: the cryptographers have done their bit. Quantum-safe replacements are standardised, they're in the libraries you already use, and some of your traffic is already using them. The hard part is ours: finding every place the old maths hides, and swapping it out before the deadlines on the timeline slide.

Five things: the new algorithms, the catch, the switch that's already on, how to write code that can change, and how to find what you've got. Then a 30, 90, 365-day plan you can take back to work on Monday.
-->

---
kicker: What to do · the new maths
clicks: 1
---

# The replacements are already standards

<div class="split" style="--split: 0.82fr 1.18fr; margin-top: 0.7em">
<div>
  <NoisyLattice :solved="$clicks >= 1" />
  <p class="takeaway" style="margin-top: 0.5em; font-size: 0.75rem">The secret is the grid point nearest the star. Easy to spot in 2 dimensions; hopeless in 768, even for a quantum computer.</p>
</div>
<div class="hype" style="--hype-tag: 6.2em">
  <div><span class="tag cyan">FIPS 203</span><b>ML-KEM: agree a key</b><span>Replaces ECDH and RSA key exchange. Built on lattices. Already in your browser.</span></div>
  <div><span class="tag">FIPS 204</span><b>ML-DSA: sign</b><span>Replaces RSA and ECDSA signatures. Built on lattices. The default choice.</span></div>
  <div><span class="tag amber">FIPS 205</span><b>SLH-DSA: sign, conservatively</b><span>Built only on hash functions. Big and slow, but it doesn't bet on lattices.</span></div>
</div>
</div>

<p class="source">NIST FIPS 203, 204 and 205, August 2024 · ASD prefers ML-KEM-1024 and ML-DSA-87</p>

<!--
In August 2024, after an eight-year public competition, NIST published three quantum-safe standards. They're called post-quantum cryptography, which is a slightly confusing name: it's ordinary maths running on ordinary computers, designed so that a quantum computer doesn't help.

Remember why Shor works: RSA and elliptic curves hide a rhythm, and a quantum computer is brilliant at finding rhythms. So the replacements are built on problems with no rhythm to find.

Most of them use lattices. Picture a grid of points, slanted, going on forever. Take one grid point, nudge it by a little random noise, and publish where it landed. That's the star, the public key. The secret is which grid point you started from.

[click] In two dimensions it's easy: you can see it by eye. That one. But ML-KEM-768 does this in 768 dimensions. There the nearest grid point is hopelessly hard to find, for ordinary computers and, as far as anyone knows, for quantum ones too. The noise smears out any rhythm, so there's nothing for Shor to grab hold of. (Strictly, ML-KEM is "learning with errors": solving equations that each have a little noise added. Same picture.)

The three standards:

ML-KEM, FIPS 203, is for agreeing a key: the handshake job ECDH and RSA key exchange do today. It's the one your browser already uses.

ML-DSA, FIPS 204, is for signatures: certificates, code signing, tokens. Also lattices. This is the default replacement for RSA and ECDSA signatures.

SLH-DSA, FIPS 205, is also for signatures, but built only on hash functions, the same family as SHA-256. We've trusted hashes for decades, so it's the conservative choice: if someone finds a clever attack on lattices, SLH-DSA doesn't care. The price is big, slow signatures. Think firmware and root certificates: signed rarely, trusted for a long time.

There are more on the way. FN-DSA, a smaller lattice signature (Falcon), is being standardised as FIPS 206 but isn't final yet. And in March 2025 NIST picked HQC, built on error-correcting codes rather than lattices, as a backup for ML-KEM; its draft standard is still pending.

For Australian government work, ASD's ISM approves ML-KEM-768 or 1024 and ML-DSA-65 or 87, and prefers the bigger 1024 and 87. SLH-DSA is approved too.
-->

---
kicker: What to do · the catch
clicks: 2
---

# The catch: everything gets bigger

<div style="max-width: 700px; margin: 0.3em auto 0">
  <KeySizes :stage="$clicks" />
</div>

<p class="takeaway" v-click="2"><b>The new keys and signatures are 40 to 120 times bigger.</b> A browser's opening TLS message no longer fits in one network packet, and an ML-DSA-signed JWT is too big for a cookie.</p>

<p class="source">FIPS 203, 204 and 205 · bytes one side sends: a public key, or a signature</p>

<!--
There's a catch, and it's the one that will actually bite developers. The new keys and signatures are much bigger.

Here's what goes over the wire today. To agree a key, X25519 sends 32 bytes. To sign, Ed25519 is 64 bytes, RSA-2048 is 256. Tiny. We've spent twenty years designing protocols, packets, headers and databases around tiny.

[click] Now the replacements. ML-KEM-768 sends a 1,184-byte public key: 37 times bigger. An ML-DSA-65 signature is 3,309 bytes: 52 times Ed25519. And SLH-DSA, the conservative one, is 7,856 bytes per signature, 123 times.

[click] Why does that matter? This dashed line is roughly one network packet, about 1,500 bytes. Your browser's first message in a TLS handshake used to fit in one packet. With ML-KEM in it, it doesn't. When Chrome turned it on, some old firewalls and middleboxes that assumed a hello fits in one packet simply broke. Google and Cloudflare spent a year finding and fixing them.

And it's not just network gear. Take a JWT. An ML-DSA-65 signature is 3,309 bytes, which base64-encodes to 4,412 characters. Add the header and claims and the token is well over 4 KB. Browsers cap a cookie at 4,096 bytes. So if your session token lives in a cookie, the post-quantum version won't fit. ML-DSA in JWTs is now standardised, RFC 9964, so this is a real design question, not a hypothetical.

Same story for database columns sized for a 256-byte signature, HTTP header limits on proxies, smart cards and HSMs with small buffers, QR codes, and IoT radios. Bigger keys are the migration's real cost. Find the places that assume small, early.
-->

---
kicker: What to do · hybrid
class: demo
clicks: 1
---

# Hybrid: belt and braces, already switched on

<div style="max-width: 780px; margin: 0.5em auto 0">
  <HybridKex :broken="$clicks >= 1" />
</div>

```bash
$ openssl s_client -connect dddadelaide.com:443 </dev/null | grep -E "group|signature type"
Peer signature type: ecdsa_secp256r1_sha256
Negotiated TLS1.3 group: X25519MLKEM768
```

<p class="takeaway" style="margin-top: 0.6em"><b>This conference's website already uses a hybrid, quantum-safe key exchange.</b> Its certificate is still elliptic-curve: there are no post-quantum certificates on the web yet.</p>

<!--
ML-KEM is new. X25519 has been battered by attackers for over a decade. So how do you adopt the new thing without betting everything on it? You run both.

A hybrid key exchange does the old exchange and the new exchange side by side, in the same handshake, and mixes both secrets into one session key. To read the traffic, an attacker has to break both.

[click] Q-Day arrives and X25519 falls. The session key is still safe, because ML-KEM still holds. And if someone finds a flaw in ML-KEM next year, X25519 still holds today. Belt and braces.

This isn't a plan, it's shipping. Chrome and Edge since version 131, Firefox since 132, Apple's operating systems since version 26. Go's TLS library does it by default, so does OpenSSL 3.5, and OpenSSH 10 made a hybrid ML-KEM exchange its default in April 2025. Cloudflare says about 70 percent of human traffic it sees is now post-quantum.

Here's the proof. This is OpenSSL 3.5 talking to the DDD Adelaide website. Negotiated group: X25519MLKEM768. That's the hybrid: X25519 plus ML-KEM-768. If you booked your ticket in a modern browser, that handshake was already safe from harvest now, decrypt later. (On a Mac the built-in openssl is LibreSSL; use Homebrew's openssl@3.)

But look at the line above: the signature on the certificate is still ECDSA, elliptic curve. There are no post-quantum certificates on the public web yet. Chrome's plan is a new, more compact kind of certificate, Merkle Tree Certificates, rather than stuffing ML-DSA into today's certificates, partly because of the size problem we just saw. Cloudflare is aiming to issue them from early 2027. That's fine for now: a forged certificate only matters once Q-Day has arrived, but recorded key exchanges matter today. So the industry fixed key agreement first.

One Australian wrinkle. ASD's ISM says hybrid schemes are "not recommended; however, not prohibited". ASD would rather government systems go straight to ML-KEM-1024 on its own by 2030. For the public internet, hybrid is what everyone ships. Know which rulebook your system answers to.
-->

---
kicker: What to do · crypto-agility
class: demo
---

# Crypto-agility: make the algorithm a setting

<div class="split" style="--split: 1fr 1fr; align-items: center; margin-top: 0.7em">
<div class="hype">
  <div><span class="tag cyan">One</span><b>Name it once</b><span>The algorithm lives in config or one shared library, not copied into 40 services.</span></div>
  <div><span class="tag">Two</span><b>Label every output</b><span>Tokens, ciphertexts and signatures say what made them, so old and new can live side by side.</span></div>
  <div><span class="tag magenta">Three</span><b>Leave room</b><span>Keys and signatures grow 40 to 120 times. Check columns, headers, cookies and HSMs.</span></div>
</div>
<div>

```ts
// Brittle: welded in, in every service
crypto.sign('sha256', data, rsaKey)

// Agile: one policy, labelled output
const signer = keyring.signer('docs')
// ES256 today. ML-DSA-65 tomorrow.
return {
  alg: signer.alg,
  kid: signer.kid,
  sig: signer.sign(data),
}
```

</div>
</div>

<!--
This is the most important slide for developers in the room, because it's the bit you control in your own code.

The last migration like this, SHA-1 to SHA-256, took the industry more than a decade. Most of that time wasn't spent on maths. It was spent finding hard-coded algorithms and changing them one by one. Crypto-agility means building things so that next time, changing the algorithm is a config change and a deploy, not a rewrite.

Three habits.

Name it once. The top snippet is in thousands of codebases: RSA and SHA-256 welded into the call. Copy it into 40 services and you have 40 migrations. Put the choice behind one policy, one shared library or one key service, and you have one.

Label every output. The bottom snippet is a made-up wrapper, keyring, but the pattern is real: every signature carries which algorithm and which key made it. JWTs already work this way with the alg and kid headers, and RFC 9964 has added ML-DSA-44, 65 and 87 as alg values. Labelled outputs let you verify old signatures while issuing new ones, which is what a migration actually looks like for a few years: both at once.

Leave room. From the last slide: keys and signatures grow forty to over a hundred times. Fixed-width database columns, header size limits, cookie storage, embedded devices, HSM key slots. Size things for the new world now, even before you switch.

And the libraries are ready. ML-KEM is in Go's standard library since 1.24, Java since 24, .NET 10 (ML-DSA is still marked experimental there), OpenSSL 3.5, and Node's WebCrypto. You don't need to implement anything. You need to be able to choose.
-->

---
kicker: What to do · inventory
class: demo
---

# Step one: find all your crypto

<div class="split" style="--split: 0.76fr 1.24fr; align-items: center">
<div class="panel magenta">
  <h3>Where it hides</h3>
  <ul>
    <li>Your code and every library it pulls in</li>
    <li>Certificates: TLS, code signing, SAML, JWT</li>
    <li>Protocols: TLS, SSH, VPNs, Wi-Fi</li>
    <li>Hardware: HSMs, smart cards, IoT</li>
    <li>Data that must stay secret for years</li>
    <li>Vendors and SaaS you can't see inside</li>
  </ul>
  <p>Record it in a CBOM: a bill of materials for your cryptography, like an SBOM.</p>
</div>
<div>

```json
{
  "type": "cryptographic-asset",
  "name": "RSA-2048",
  "cryptoProperties": {
    "assetType": "algorithm",
    "algorithmProperties": {
      "primitive": "signature",
      "nistQuantumSecurityLevel": 0 } },
  "evidence": { "occurrences": [
    { "location": "src/auth/jwt.ts", "line": 42 } ] }
}
```

</div>
</div>

<p class="source">CycloneDX 1.6 CBOM · scanners: CBOMkit (PQCA, Linux Foundation)</p>

<!--
You can't migrate what you can't find, and almost nobody knows where all their cryptography is. So step one is an inventory.

It hides in more places than you'd think. Your own code is the easy part. Then every library it pulls in. Every certificate and key: TLS, code signing, SAML for single sign-on, the keys that sign your JWTs. Protocol settings in load balancers, SSH configs and VPNs. Hardware: HSMs, smart cards, firmware that can't easily be updated, IoT devices that'll be in the field for fifteen years. Data at rest with a long shelf life, the rows on the Mosca slide. And your vendors and SaaS providers, where you can't see inside and have to ask.

Write it down in a standard format. You know the SBOM, the software bill of materials. CycloneDX 1.6 added a cryptographic bill of materials, a CBOM. This is one entry: an RSA-2048 signature algorithm, found at line 42 of our token code. And look at this field: NIST quantum security level, zero. The format itself flags it as quantum-vulnerable.

You don't have to write these by hand. CBOMkit, which IBM Research donated to the Post-Quantum Cryptography Alliance at the Linux Foundation, scans source code and container images and produces CBOMs. Commercial tools do too, and your network team can scan what your endpoints actually negotiate, like the openssl line from before.

Then rank it with Mosca: long-lived secrets and long-lived devices first. That ranked list is your migration plan, and in Australia it's what ASD expects in a transition plan, and what APRA has signalled it will look for at regulated financial institutions.
-->

---
kicker: What to do · the roadmap
clicks: 3
---

# 30 days, 90 days, a year

<div class="split" style="--split: 1fr 1fr 1fr; gap: 1.2em; align-items: stretch; margin-top: 0.8em">
<div class="panel cyan">
  <h3>30 days</h3>
  <p class="panel-lead">Own it</p>
  <ul>
    <li>Name an owner, and read ASD's PQC guidance</li>
    <li>Check what your sites and SSH negotiate</li>
    <li>Turn on hybrid where it's a switch: CDN, load balancer, OpenSSH 10</li>
    <li>Ask your key vendors for their PQC roadmap</li>
  </ul>
</div>
<div class="panel" v-click="1">
  <h3>90 days</h3>
  <p class="panel-lead">Find it</p>
  <ul>
    <li>Scan code, certificates and config into a CBOM</li>
    <li>Rank it: data that must stay secret longest goes first</li>
    <li>No new designs on RSA or elliptic curves without a plan to replace them</li>
    <li>AES-256 and SHA-384 for anything new</li>
  </ul>
</div>
<div class="panel magenta" v-click="2">
  <h3>365 days</h3>
  <p class="panel-lead">Start moving</p>
  <ul>
    <li>Hybrid key exchange on every TLS endpoint you run</li>
    <li>Pilot ML-DSA where you own both ends: internal PKI, code signing, service tokens</li>
    <li>Test the bigger sizes: headers, cookies, HSMs</li>
    <li>Require post-quantum support in contracts and purchases</li>
  </ul>
</div>
</div>

<p class="takeaway" v-click="3"><b>Q-Day is uncertain. Your deadline isn't.</b> ASD: plan by the end of 2026, start by 2028, finished by 2030.</p>

<!--
So here's the plan to take back to work.

The first 30 days: own it. Somebody's name goes against this risk. Read ASD's "Planning for post-quantum cryptography"; it's short. Run that openssl line against your own websites, and check your SSH clients and servers; a KexAlgorithms line pinned years ago can quietly opt you out of OpenSSH 10's quantum-safe default. Turn on hybrid key exchange wherever it's just a switch: most CDNs and cloud load balancers have it, many already on by default. And email your important vendors asking for their PQC roadmap. Their answers are data.

[click] 90 days: find it. Build the inventory from the last slide, starting with your crown jewels. Rank it with Mosca: what has to stay secret longest, and what's hardest to change, like hardware and firmware. Stop the bleeding: no new designs built on RSA or elliptic curves without a plan to swap them out. And for anything new, use AES-256 and SHA-384; it's cheap, and it's what ASD asks for by 2030.

[click] A year: start moving. Quantum-safe key exchange everywhere you terminate TLS, which deals with harvest now, decrypt later for your traffic. Pilot ML-DSA signatures where you control both ends: an internal certificate authority, code signing, service-to-service tokens. That's where you'll find the size problems while they're cheap. And put post-quantum requirements into contracts and procurement, so the next thing you buy isn't another migration.

[click] Q-Day is uncertain, and it'll stay uncertain. Your deadline isn't. If you work with Australian government, ASD wants a transition plan by the end of this year, the work started by the end of 2028, and the old algorithms gone by the end of 2030. That's four years. SHA-1 took more than ten. Start now.
-->

---
kicker: Summary
clicks: 4
---

# What to take back to work

<div class="split summary" style="--split: 1fr 1fr; gap: 0.8em 1.4em; margin-top: 0.2em">
<div class="panel cyan">
  <h3>Bits and qubits</h3>
  <p class="panel-lead">A qubit is an arrow, not a coin</p>
  <p>It turns into a 0 or a 1 when you read it, so you run it hundreds of times and read the probabilities.</p>
</div>
<div class="panel" v-click="1">
  <h3>Grover and Shor</h3>
  <p class="panel-lead">Wrong answers cancel out</p>
  <p>Grover only dents AES: use 256-bit keys. Shor breaks RSA and elliptic curves outright.</p>
</div>
<div class="panel magenta" v-click="2">
  <h3>Q-Day</h3>
  <p class="panel-lead">Nobody knows when</p>
  <p>The estimates keep falling, and anything recorded today can be read on the day.</p>
</div>
<div class="panel amber" v-click="3">
  <h3>What to do</h3>
  <p class="panel-lead">The new maths is ready</p>
  <p>Find your crypto, make the algorithm a setting, and switch on hybrid now.</p>
</div>
</div>

<p class="takeaway" v-click="4"><b>Embrace the uncertainty:</b> in the physics, in the timeline, and in your plan.</p>

<style>
.summary .panel p:not(.panel-lead) { font-size: 0.92em; line-height: 1.45; }
</style>

<!--
Four things to take back to work.

Bits and qubits. A qubit isn't 0 and 1 at once. It's an arrow that turns into a 0 or a 1 the moment you read it. That's why every demo ran hundreds of shots: one reading tells you almost nothing, and the answer is in the probabilities.

[click] Grover and Shor. Quantum algorithms work by interference: arranging the maths so wrong answers cancel and right ones add up. Grover does that for any search, but only gives a square-root speedup, so AES survives with 256-bit keys. Shor finds hidden rhythms, and RSA and elliptic curves are built on exactly that kind of rhythm. No key length saves them.

[click] Q-Day. Nobody knows when a machine big enough will exist. Today's machines are tens of thousands of times too small, but every few years someone cuts the estimate. And harvest now, decrypt later means the clock started for long-lived secrets years ago.

[click] What to do. The replacements are already standards, and the key exchange half is already switched on in your browser. Your job is the inventory, making the algorithm a setting rather than a constant, and the 30, 90, 365-day plan.

[click] Which brings us back to the title. Embrace the uncertainty, three times over. In the physics: a qubit's answer is genuinely random until you read it. In the timeline: nobody can tell you when Q-Day is, so stop waiting for someone to. And in your plan: plan for the deadline, not the prediction.

Then over to questions.
-->

---
layout: end
kicker: Questions?
---

# Thank you

James Bannan

<div class="contact-list">
  <ContactLink icon="linkedin" text="linkedin.com/in/jamesbannan" />
  <ContactLink icon="mastodon" text="jamesbannan@aus.social" />
  <ContactLink icon="github" text="github.com/jamesbannan/presentations" />
  <ContactLink icon="unimelb" text="unimelb.edu.au/alumni/engage/ask-alumni" />
</div>
