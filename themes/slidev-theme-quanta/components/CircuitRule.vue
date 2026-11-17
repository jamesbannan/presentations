<!--
  A quantum circuit used as a rule: qubit wires starting in |0⟩, a column
  of Hadamards, a CNOT to entangle the first pair, a few generated gates,
  then measurement and classical bits running off the end.

    <CircuitRule />                          two wires, eight columns
    <CircuitRule :wires="3" :columns="14" height="44px" />
    <CircuitRule :labels="false" :measure="false" />

  Props:
    wires    — 1 to 4
    columns  — gate columns between the H column and the meters
    seed     — the same seed always draws the same circuit
    height   — CSS height; width follows
    labels   — |0⟩ at the start of each wire
    measure  — meters and classical bits at the end

  Wires run cyan → violet → magenta: prepared, evolved, measured.
-->
<script setup lang="ts">
import { computed, useId } from 'vue'
import { ketPath, rng, safeId } from '../composables/motif'

const props = defineProps({
  wires: { type: Number, default: 2 },
  columns: { type: Number, default: 8 },
  seed: { type: Number, default: 3 },
  height: { type: String, default: '26px' },
  labels: { type: Boolean, default: true },
  measure: { type: Boolean, default: true },
})

const gid = safeId('circuit', useId() ?? 'x')

const C = 24 // column pitch
const G = 18 // wire gap
const S = 13 // gate size
const f = (n: number) => Math.round(n * 100) / 100

const n = computed(() => Math.max(1, Math.min(4, Math.round(props.wires))))
const L = computed(() => (props.labels ? 26 : 6))
const meterX = computed(() => L.value + (props.columns + 1) * C)
const W = computed(() => meterX.value + (props.measure ? 42 : 0))
const H = computed(() => (n.value - 1) * G)
const wy = (i: number) => i * G

type Single = { kind: 'gate', x: number, wire: number, label: string, tone: string }
type Cx = { kind: 'cx', x: number, control: number, target: number }
type Op = Single | Cx

const SINGLES = [
  { label: 'H', tone: 'violet' },
  { label: 'X', tone: 'cyan' },
  { label: 'Z', tone: 'cyan' },
  { label: 'S', tone: 'violet' },
  { label: 'T', tone: 'violet' },
  { label: 'Rz', tone: 'magenta' },
  { label: 'Ry', tone: 'magenta' },
]

const ops = computed<Op[]>(() => {
  const r = rng(props.seed)
  const out: Op[] = []
  const colX = (c: number) => L.value + C * 0.5 + c * C

  // Column 0: Hadamard on every wire — everything into superposition.
  for (let w = 0; w < n.value; w++)
    out.push({ kind: 'gate', x: colX(0), wire: w, label: 'H', tone: 'violet' })

  for (let c = 1; c <= props.columns; c++) {
    const x = colX(c)
    const used = new Set<number>()
    // Column 1 makes a Bell pair; later columns entangle now and then.
    if (n.value > 1 && (c === 1 || r() < 0.38)) {
      const control = c === 1 ? 0 : Math.floor(r() * n.value)
      let target = Math.floor(r() * (n.value - 1))
      if (target >= control) target++
      if (c === 1) target = 1
      out.push({ kind: 'cx', x, control, target })
      const lo = Math.min(control, target)
      const hi = Math.max(control, target)
      for (let w = lo; w <= hi; w++) used.add(w)
    }
    for (let w = 0; w < n.value; w++) {
      if (used.has(w) || r() < 0.45) continue
      const g = SINGLES[Math.floor(r() * SINGLES.length)]
      out.push({ kind: 'gate', x, wire: w, ...g })
    }
  }
  return out
})

const wirePath = computed(() => {
  const end = props.measure ? meterX.value - S / 2 : W.value
  return Array.from({ length: n.value }, (_, i) => `M${L.value - 4} ${wy(i)} H${end}`).join(' ')
})

const classical = computed(() =>
  Array.from({ length: n.value }, (_, i) =>
    `M${meterX.value + S / 2} ${wy(i) - 1.3} H${W.value - 10} M${meterX.value + S / 2} ${wy(i) + 1.3} H${W.value - 10}`,
  ).join(' '),
)

const bits = computed(() => {
  const r = rng(props.seed + 101)
  return Array.from({ length: n.value }, () => (r() < 0.5 ? '0' : '1'))
})

const kets = computed(() =>
  Array.from({ length: n.value }, (_, i) => ketPath(2, wy(i) + 3.6, 10, 1)),
)

const meter = (y: number) => {
  const x = meterX.value
  const h = S / 2
  return {
    box: { x: x - h, y: y - h },
    arc: `M${f(x - 4.2)} ${f(y + 2.6)} A4.6 4.6 0 0 1 ${f(x + 4.2)} ${f(y + 2.6)}`,
    needle: `M${f(x)} ${f(y + 2.6)} L${f(x + 3.4)} ${f(y - 3.4)}`,
  }
}
</script>

<template>
  <svg
    class="motif circuit"
    :viewBox="`-2 ${-S / 2 - 3} ${W + 4} ${H + S + 6}`"
    :style="{ height }"
    preserveAspectRatio="xMinYMid meet"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="gid" gradientUnits="userSpaceOnUse" x1="0" y1="0" :x2="W" y2="0">
        <stop offset="0" style="stop-color: var(--cyan)" />
        <stop offset="0.55" style="stop-color: var(--violet)" />
        <stop offset="1" style="stop-color: var(--magenta)" />
      </linearGradient>
    </defs>

    <g v-if="labels" class="wire-ket">
      <g v-for="(k, i) in kets" :key="`k${i}`">
        <text :x="k.textX" :y="wy(i) + 3.6">0</text>
        <path :d="k.d" />
      </g>
    </g>

    <path :d="wirePath" fill="none" :stroke="`url(#${gid})`" stroke-width="1" />

    <g v-for="(op, i) in ops" :key="i">
      <g v-if="op.kind === 'cx'" class="cx">
        <path :d="`M${op.x} ${wy(op.control)} V${wy(op.target) + (op.target > op.control ? 5 : -5)}`" />
        <circle :cx="op.x" :cy="wy(op.control)" r="2.6" class="cx-dot" />
        <circle :cx="op.x" :cy="wy(op.target)" r="5" class="cx-target" />
        <path :d="`M${op.x - 5} ${wy(op.target)} H${op.x + 5} M${op.x} ${wy(op.target) - 5} V${wy(op.target) + 5}`" />
      </g>
      <g v-else class="gate" :class="`gate--${op.tone}`">
        <rect :x="op.x - S / 2" :y="wy(op.wire) - S / 2" :width="S" :height="S" rx="1.5" />
        <text :x="op.x" :y="wy(op.wire) + 2.6" text-anchor="middle" :class="{ 'gate-label--long': op.label.length > 1 }">{{ op.label }}</text>
      </g>
    </g>

    <g v-if="measure" class="measure">
      <path :d="classical" class="classical" />
      <g v-for="i in n" :key="`m${i}`">
        <rect :x="meter(wy(i - 1)).box.x" :y="meter(wy(i - 1)).box.y" :width="S" :height="S" rx="1.5" />
        <path :d="meter(wy(i - 1)).arc" />
        <path :d="meter(wy(i - 1)).needle" />
        <text :x="W - 4" :y="wy(i - 1) + 3" text-anchor="middle" class="bit">{{ bits[i - 1] }}</text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.circuit {
  display: block;
  width: auto;
  overflow: visible;
}

.wire-ket text,
.gate text,
.bit {
  font-family: var(--font-mono);
  font-weight: 500;
}

.wire-ket text {
  font-size: 10px;
  fill: var(--ink-soft);
}

.wire-ket path {
  fill: none;
  stroke: var(--ink-soft);
  stroke-width: 0.9;
}

/* Sizes live here, not in attributes: Slidev's UnoCSS attributify mode reads
   `font-size="6"` on an element as a utility and sets it to 1.5rem. */
.gate text {
  font-size: 7.5px;
}

.gate text.gate-label--long {
  font-size: 6px;
}

.gate rect {
  fill: var(--paper);
  stroke-width: 1;
}

.gate--violet rect { stroke: var(--violet); }
.gate--violet text { fill: var(--violet); }
.gate--cyan rect { stroke: var(--cyan); }
.gate--cyan text { fill: var(--cyan); }
.gate--magenta rect { stroke: var(--magenta); }
.gate--magenta text { fill: var(--magenta); }

.cx path,
.cx-target {
  fill: none;
  stroke: var(--violet);
  stroke-width: 1;
}

.cx-target {
  fill: var(--paper);
}

.cx-dot {
  fill: var(--violet);
}

.measure rect {
  fill: var(--paper);
  stroke: var(--magenta);
  stroke-width: 1;
}

.measure path {
  fill: none;
  stroke: var(--magenta);
  stroke-width: 0.9;
}

.measure .classical {
  stroke-width: 0.7;
  opacity: 0.8;
}

.bit {
  font-size: 9px;
  fill: var(--magenta);
}
</style>
