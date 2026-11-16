<!--
  Error correction in one picture: a small surface-code patch of noisy
  physical qubits, wrapped up as one reliable logical qubit.

  Data qubits (dots) sit on a square grid; check qubits (diamonds) sit in
  the tinted squares between them and watch their corners. Two kinds of
  check, tinted cyan and violet, catch the two kinds of error. An error
  (magenta) trips the neighbouring checks of the other kind (amber), and
  that pattern is what tells the computer which qubit to fix.

    <LogicalQubit />                         distance 5: 49 physical qubits
    <LogicalQubit :errors="[]" />            a quiet patch

  Props:
    distance — odd code distance d; the patch has 2d² − 1 physical qubits
    errors   — [{ at: [row, col], kind: 'x' | 'z' }] on data qubits
-->
<script setup lang="ts">
import { computed } from 'vue'

type Err = { at: [number, number]; kind: 'x' | 'z' }

const props = defineProps({
  distance: { type: Number, default: 5 },
  errors: {
    type: Array as () => Err[],
    default: () => [
      { at: [1, 2], kind: 'z' },
      { at: [3, 0], kind: 'x' },
    ],
  },
})

const PATCH = 200
const OX = 34
const OY = 34
const f = (n: number) => Math.round(n * 100) / 100

const model = computed(() => {
  const d = props.distance
  const s = PATCH / (d - 1)
  const r = s / 2
  const px = (j: number) => f(OX + j * s)
  const py = (i: number) => f(OY + i * s)
  const errAt = new Map(props.errors.map(e => [`${e.at[0]},${e.at[1]}`, e.kind]))

  type Face = { kind: 'x' | 'z'; path: string; cx: number; cy: number; corners: [number, number][] }
  const faces: Face[] = []

  for (let i = 0; i < d - 1; i++) {
    for (let j = 0; j < d - 1; j++) {
      faces.push({
        kind: (i + j) % 2 ? 'x' : 'z',
        path: `M${px(j)} ${py(i)} H${px(j + 1)} V${py(i + 1)} H${px(j)} Z`,
        cx: f(px(j) + r), cy: f(py(i) + r),
        corners: [[i, j], [i, j + 1], [i + 1, j], [i + 1, j + 1]],
      })
    }
  }
  // Half-checks on the edges: x along top and bottom, z down the sides.
  for (let j = 0; j < d - 1; j++) {
    if (j % 2 === 0) faces.push({
      kind: 'x', path: `M${px(j)} ${py(0)} A${r} ${r} 0 0 1 ${px(j + 1)} ${py(0)} Z`,
      cx: f(px(j) + r), cy: f(py(0) - r / 2), corners: [[0, j], [0, j + 1]],
    })
    else faces.push({
      kind: 'x', path: `M${px(j)} ${py(d - 1)} A${r} ${r} 0 0 0 ${px(j + 1)} ${py(d - 1)} Z`,
      cx: f(px(j) + r), cy: f(py(d - 1) + r / 2), corners: [[d - 1, j], [d - 1, j + 1]],
    })
  }
  for (let i = 0; i < d - 1; i++) {
    if (i % 2 === 1) faces.push({
      kind: 'z', path: `M${px(0)} ${py(i)} A${r} ${r} 0 0 0 ${px(0)} ${py(i + 1)} Z`,
      cx: f(px(0) - r / 2), cy: f(py(i) + r), corners: [[i, 0], [i + 1, 0]],
    })
    else faces.push({
      kind: 'z', path: `M${px(d - 1)} ${py(i)} A${r} ${r} 0 0 1 ${px(d - 1)} ${py(i + 1)} Z`,
      cx: f(px(d - 1) + r / 2), cy: f(py(i) + r), corners: [[i, d - 1], [i + 1, d - 1]],
    })
  }

  // A check fires when an odd number of its corners carry the error it catches:
  // x checks catch z errors, z checks catch x errors.
  const checks = faces.map(face => {
    const caught = face.kind === 'x' ? 'z' : 'x'
    const hits = face.corners.filter(([i, j]) => errAt.get(`${i},${j}`) === caught).length
    return { ...face, fired: hits % 2 === 1 }
  })

  const data = []
  for (let i = 0; i < d; i++) {
    for (let j = 0; j < d; j++) data.push({ x: px(j), y: py(i), error: errAt.has(`${i},${j}`) })
  }

  return { checks, data, total: d * d + faces.length, mid: OX + PATCH / 2, bottom: OY + PATCH + r }
})

const SX = 470
const SY = OY + PATCH / 2
const SR = 62
</script>

<template>
  <svg class="motif logical-qubit" viewBox="0 0 560 320" role="img"
    :aria-label="`${model.total} noisy physical qubits in an error-correcting patch, acting together as one reliable logical qubit`">
    <defs>
      <radialGradient id="lq-sphere" cx="38%" cy="32%" r="75%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="70%" stop-color="#ece8fb" />
        <stop offset="100%" stop-color="#d9d1f6" />
      </radialGradient>
      <marker id="lq-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" class="lq-head" />
      </marker>
    </defs>

    <path v-for="(c, i) in model.checks" :key="`f${i}`" :d="c.path" :class="['lq-face', `lq-face--${c.kind}`]" />
    <g v-for="(c, i) in model.checks" :key="`c${i}`" :transform="`translate(${c.cx} ${c.cy}) rotate(45)`">
      <rect x="-5" y="-5" width="10" height="10" :class="['lq-check', { 'lq-check--fired': c.fired }]" />
    </g>
    <g v-for="(q, i) in model.data" :key="`d${i}`">
      <circle v-if="q.error" :cx="q.x" :cy="q.y" r="14" class="lq-halo" />
      <circle :cx="q.x" :cy="q.y" r="7" :class="['lq-data', { 'lq-data--error': q.error }]" />
    </g>

    <text :x="model.mid" :y="model.bottom + 30" text-anchor="middle" class="lq-label">{{ model.total }} noisy physical qubits</text>
    <text :x="model.mid" :y="model.bottom + 52" text-anchor="middle" class="lq-sub">checking each other, all the time</text>

    <line x1="290" :x2="SX - SR - 18" :y1="SY" :y2="SY" class="lq-arrow" marker-end="url(#lq-head)" />
    <text :x="(290 + SX - SR - 18) / 2" :y="SY - 12" text-anchor="middle" class="lq-arrow-label">act as</text>

    <circle :cx="SX" :cy="SY" :r="SR" fill="url(#lq-sphere)" class="lq-sphere" />
    <ellipse :cx="SX" :cy="SY" :rx="SR" :ry="SR * 0.28" class="lq-equator" />
    <line :x1="SX" :y1="SY" :x2="SX + 30" :y2="SY - 40" class="lq-vector" />
    <circle :cx="SX + 30" :cy="SY - 40" r="5" class="lq-tip" />
    <circle :cx="SX" :cy="SY" r="2.5" class="lq-centre" />

    <text :x="SX" :y="model.bottom + 30" text-anchor="middle" class="lq-label">1 logical qubit</text>
    <text :x="SX" :y="model.bottom + 52" text-anchor="middle" class="lq-sub">reliable</text>
  </svg>
</template>

<style scoped>
.logical-qubit {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.lq-face {
  stroke: var(--grid);
  stroke-width: 1;
}

.lq-face--x { fill: rgba(5, 144, 192, 0.12); }
.lq-face--z { fill: rgba(98, 70, 234, 0.12); }

.lq-check {
  fill: var(--paper);
  stroke: var(--ink-soft);
  stroke-width: 1.4;
}

.lq-check--fired {
  fill: var(--amber);
  stroke: var(--amber);
}

.lq-data {
  fill: var(--ink);
}

.lq-data--error {
  fill: var(--magenta);
}

.lq-halo {
  fill: none;
  stroke: var(--magenta);
  stroke-width: 2;
  opacity: 0.55;
  transform-box: fill-box;
  transform-origin: center;
  animation: lq-pulse 2.4s ease-in-out infinite;
}

@keyframes lq-pulse {
  0%, 100% { transform: scale(0.85); opacity: 0.25; }
  50% { transform: scale(1.1); opacity: 0.7; }
}

@media (prefers-reduced-motion: reduce) {
  .lq-halo { animation: none; }
}

.lq-label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 19px;
  fill: var(--ink);
}

.lq-sub {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
  fill: var(--ink-soft);
}

.lq-arrow {
  stroke: var(--violet);
  stroke-width: 2;
}

.lq-head {
  fill: var(--violet);
}

.lq-arrow-label {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  fill: var(--violet);
}

.lq-sphere {
  stroke: var(--violet);
  stroke-width: 1.5;
}

.lq-equator {
  fill: none;
  stroke: var(--cyan);
  stroke-width: 1.2;
  opacity: 0.7;
}

.lq-vector {
  stroke: var(--violet);
  stroke-width: 3;
  stroke-linecap: round;
}

.lq-tip {
  fill: var(--magenta);
}

.lq-centre {
  fill: var(--ink);
}
</style>
