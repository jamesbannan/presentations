<!--
  Grover's search, swept over the number of rounds: the chance of reading
  the right answer climbs, peaks, then falls away as the search rotates
  past it. The faint curve is the theory, the dots are measured rates, the
  dotted line is blind guessing, and the dashed line is where to stop.

    <GroverCurve :qubits="4" :measured="[0.064, 0.503, 0.889, 0.957, 0.561]" />
    <GroverCurve :qubits="3" :rounds="8" />     theory only

  Props:
    qubits    — register size; the search space is 2^qubits
    measured  — success rate at 0, 1, 2… rounds, from a real run
    rounds    — how many rounds to draw when there's no measured data
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  qubits: { type: Number, default: 4 },
  measured: { type: Array as () => number[], default: () => [] },
  rounds: { type: Number, default: 9 },
})

const W = 560
const H = 300
const L = 52
const RT = 548
const T = 20
const B = 244
const f = (n: number) => Math.round(n * 100) / 100

const model = computed(() => {
  const N = 2 ** props.qubits
  const theta = Math.asin(1 / Math.sqrt(N))
  const K = props.measured.length ? props.measured.length - 1 : props.rounds
  const span = K + 0.5
  const x = (k: number) => L + (k / span) * (RT - L)
  const y = (p: number) => B - p * (B - T)
  const success = (k: number) => Math.sin((2 * k + 1) * theta) ** 2

  const theory = Array.from({ length: 121 }, (_, i) => {
    const k = (i / 120) * span
    return `${i ? 'L' : 'M'}${f(x(k))} ${f(y(success(k)))}`
  }).join(' ')

  const pts = props.measured.map((p, k) => ({ x: f(x(k)), y: f(y(p)), p }))
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ')

  const optimal = Math.floor((Math.PI / 4) * Math.sqrt(N))
  const atOptimal = props.measured[optimal] ?? success(optimal)
  let trough = null as null | { k: number, p: number }
  for (let k = optimal + 1; k <= K; k++) {
    const p = props.measured[k] ?? success(k)
    if (!trough || p < trough.p) trough = { k, p }
    if (p > (props.measured[k - 1] ?? success(k - 1))) break
  }

  return {
    N, K, x, y, theory, pts, line,
    guess: y(1 / N),
    optimal: { k: optimal, x: f(x(optimal)), p: atOptimal, y: f(y(atOptimal)) },
    trough: trough && { ...trough, x: f(x(trough.k)), y: f(y(trough.p)) },
    ticks: Array.from({ length: K + 1 }, (_, k) => ({ k, x: f(x(k)) })),
  }
})

const pct = (p: number) => `${Math.round(p * 100)}%`
</script>

<template>
  <svg class="motif grover" :viewBox="`0 0 ${W} ${H}`" role="img" aria-label="Grover success rate by number of rounds">
    <g class="gc-grid">
      <path v-for="p in [0.5, 1]" :key="p" :d="`M${L} ${model.y(p)} L${RT} ${model.y(p)}`" />
    </g>
    <path :d="`M${L} ${B} L${RT} ${B}`" class="gc-axis" />

    <g class="gc-yticks">
      <text v-for="p in [0, 0.5, 1]" :key="p" :x="L - 10" :y="model.y(p)" text-anchor="end" dominant-baseline="central">{{ pct(p) }}</text>
    </g>
    <g class="gc-xticks">
      <text v-for="t in model.ticks" :key="t.k" :x="t.x" :y="B + 20" text-anchor="middle">{{ t.k }}</text>
    </g>
    <text :x="(L + RT) / 2" :y="H - 4" text-anchor="middle" class="gc-axis-title">rounds of search</text>

    <path :d="`M${L} ${model.guess} L${RT} ${model.guess}`" class="gc-guess" />
    <text :x="RT" :y="model.guess - 7" text-anchor="end" class="gc-guess-label">guessing: 1 in {{ model.N }}</text>

    <path :d="model.theory" class="gc-theory" />

    <path :d="`M${model.optimal.x} ${T - 6} L${model.optimal.x} ${B}`" class="gc-stop" />
    <text :x="model.optimal.x + 34" :y="T + 8" class="gc-note gc-note--stop">Stop here</text>
    <text :x="model.optimal.x + 34" :y="T + 26" class="gc-note-sub">{{ model.optimal.k }} rounds · {{ pct(model.optimal.p) }}</text>

    <g v-if="model.trough" class="gc-trough">
      <path :d="`M${model.trough.x} ${model.y(0.74) + 28} L${model.trough.x} ${model.trough.y - 10}`" />
      <text :x="model.trough.x" :y="model.y(0.74)" text-anchor="middle" class="gc-note gc-note--over">Keep going</text>
      <text :x="model.trough.x" :y="model.y(0.74) + 18" text-anchor="middle" class="gc-note-sub">{{ model.trough.k }} rounds · {{ pct(model.trough.p) }}</text>
    </g>

    <path v-if="model.pts.length" :d="model.line" class="gc-line" />
    <circle
      v-for="(p, i) in model.pts"
      :key="i"
      :cx="p.x"
      :cy="p.y"
      r="5"
      class="gc-dot"
      :class="{ 'gc-dot--best': i === model.optimal.k, 'gc-dot--worst': model.trough && i === model.trough.k }"
    />
  </svg>
</template>

<style scoped>
.grover {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.gc-grid path {
  stroke: var(--grid);
  stroke-width: 1;
}

.gc-axis {
  stroke: var(--ink-soft);
  stroke-width: 1;
  opacity: 0.6;
}

.gc-yticks text,
.gc-xticks text {
  font-family: var(--font-mono);
  font-size: 12px;
  fill: var(--ink-soft);
}

.gc-axis-title {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  fill: var(--ink-soft);
}

.gc-guess {
  stroke: var(--magenta);
  stroke-width: 1.2;
  stroke-dasharray: 2 4;
}

.gc-guess-label {
  font-family: var(--font-mono);
  font-size: 11px;
  fill: var(--magenta);
}

.gc-theory {
  fill: none;
  stroke: var(--violet);
  stroke-width: 6;
  stroke-linecap: round;
  opacity: 0.14;
}

.gc-stop {
  stroke: var(--cyan);
  stroke-width: 1.4;
  stroke-dasharray: 5 4;
}

.gc-trough path {
  stroke: var(--magenta);
  stroke-width: 1.2;
}

.gc-note {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
}

.gc-note--stop { fill: var(--cyan); }
.gc-note--over { fill: var(--magenta); }

.gc-note-sub {
  font-family: var(--font-mono);
  font-size: 11px;
  fill: var(--ink-soft);
}

.gc-line {
  fill: none;
  stroke: var(--violet);
  stroke-width: 2;
  stroke-linejoin: round;
}

.gc-dot {
  fill: var(--paper);
  stroke: var(--violet);
  stroke-width: 2;
}

.gc-dot--best {
  fill: var(--cyan);
  stroke: #fff;
}

.gc-dot--worst {
  fill: var(--magenta);
  stroke: #fff;
}
</style>
