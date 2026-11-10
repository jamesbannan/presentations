<!--
  What Shor's algorithm would cost as the key grows: physical qubits and
  run time for each key size, side by side, on log scales (each gridline is
  ten or so times the last). The last row, RSA-2048, is highlighted.

    <ShorCost />                   the resource estimator's numbers, all shown
    <ShorCost :upto="$clicks + 6" /> hold RSA-2048 back for a click

  Props:
    sizes — [{ bits, qubits, seconds, count, time }], smallest first;
            `count` and `time` are the labels for `qubits` and `seconds`.
            Defaults to demos/shor_estimate.py's textbook circuit on
            superconducting-style qubits with 0.1% errors
    upto  — how many rows to show (default all)
-->
<script setup lang="ts">
import { computed } from 'vue'

type Size = { bits: number; qubits: number; seconds: number; count: string; time: string }

const props = defineProps({
  sizes: {
    type: Array as () => Size[],
    default: () => [
      { bits: 32, qubits: 835940, seconds: 35, count: '836k', time: '35 secs' },
      { bits: 64, qubits: 1107690, seconds: 329, count: '1.1M', time: '5 mins' },
      { bits: 128, qubits: 1780954, seconds: 2824, count: '1.8M', time: '47 mins' },
      { bits: 256, qubits: 3723008, seconds: 24199, count: '3.7M', time: '7 hours' },
      { bits: 512, qubits: 7126464, seconds: 206660, count: '7.1M', time: '2 days' },
      { bits: 1024, qubits: 14734620, seconds: 1758719, count: '15M', time: '20 days' },
      { bits: 2048, qubits: 35675782, seconds: 15769712, count: '36M', time: '183 days' },
    ],
  },
  upto: { type: Number, default: 99 },
})

const W = 640
const LABEL = 92
const Q = { x0: 106, x1: 352, lo: 5, hi: 8 }
const T = { x0: 392, x1: 636, lo: 1, hi: 8 }
const TOP = 64
const ROW = 50
const BAR = 28
const f = (n: number) => Math.round(n * 100) / 100
const at = (c: typeof Q, v: number) => f(c.x0 + ((Math.log10(v) - c.lo) / (c.hi - c.lo)) * (c.x1 - c.x0))

const Q_TICKS = [[1e5, '100k'], [1e6, '1M'], [1e7, '10M'], [1e8, '100M']] as const
const T_TICKS = [[60, '1 min'], [86400, '1 day'], [31557600, '1 yr']] as const

const model = computed(() => {
  const last = props.sizes.length - 1
  const rows = props.sizes.map((s, i) => {
    const qEnd = at(Q, s.qubits)
    const tEnd = at(T, s.seconds)
    return {
      ...s,
      y: TOP + i * ROW,
      qEnd,
      tEnd,
      qInside: qEnd > Q.x1 - 50,
      tInside: tEnd > T.x1 - 100,
      top: i === last,
      shown: i < props.upto,
    }
  })
  return { rows, bottom: TOP + rows.length * ROW, height: TOP + rows.length * ROW + 8 }
})
</script>

<template>
  <svg class="motif shor-cost" :viewBox="`0 0 ${W} ${model.height}`" role="img"
    aria-label="Physical qubits and run time for Shor's algorithm at each key size, on log scales">
    <text :x="Q.x0" y="18" class="sc-head">Physical qubits</text>
    <text :x="T.x0" y="18" class="sc-head">Time to run</text>
    <g v-for="[v, label] in Q_TICKS" :key="label" class="sc-tick">
      <line :x1="at(Q, v)" :x2="at(Q, v)" :y1="TOP - 12" :y2="model.bottom" />
      <text :x="at(Q, v)" :y="TOP - 20" text-anchor="middle">{{ label }}</text>
    </g>
    <g v-for="[v, label] in T_TICKS" :key="label" class="sc-tick">
      <line :x1="at(T, v)" :x2="at(T, v)" :y1="TOP - 12" :y2="model.bottom" />
      <text :x="at(T, v)" :y="TOP - 20" text-anchor="middle">{{ label }}</text>
    </g>
    <g v-for="r in model.rows" :key="r.bits" :class="['sc-row', { 'sc-row--top': r.top, 'sc-row--hidden': !r.shown }]">
      <text :x="LABEL" :y="r.y + 20" text-anchor="end" class="sc-label">{{ r.top ? `RSA-${r.bits}` : `${r.bits}-bit` }}</text>
      <rect :x="Q.x0" :y="r.y" :width="r.qEnd - Q.x0" :height="BAR" rx="4" class="sc-bar" />
      <text :x="r.qInside ? r.qEnd - 10 : r.qEnd + 8" :y="r.y + 19.5" :text-anchor="r.qInside ? 'end' : 'start'" class="sc-count">{{ r.count }}</text>
      <rect :x="T.x0" :y="r.y" :width="r.tEnd - T.x0" :height="BAR" rx="4" class="sc-bar" />
      <text :x="r.tInside ? r.tEnd - 10 : r.tEnd + 8" :y="r.y + 19.5" :text-anchor="r.tInside ? 'end' : 'start'" class="sc-count">{{ r.time }}</text>
    </g>
  </svg>
</template>

<style scoped>
.shor-cost {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.sc-head {
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  fill: var(--violet);
}

.sc-tick line {
  stroke: var(--grid);
  stroke-width: 1;
}

.sc-tick text {
  font-family: var(--font-mono);
  font-size: 14px;
  fill: var(--ink-soft);
}

.sc-row {
  transition: opacity 0.4s ease;
}

.sc-row--hidden {
  opacity: 0;
}

.sc-label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 19px;
  fill: var(--ink-soft);
}

.sc-bar {
  fill: color-mix(in srgb, var(--violet) 12%, white);
  stroke: var(--violet);
  stroke-width: 1.4;
}

.sc-count {
  font-family: var(--font-mono);
  font-size: 16px;
  fill: var(--violet);
}

.sc-row--top .sc-label {
  fill: var(--ink);
  font-size: 19px;
}

.sc-row--top .sc-bar {
  fill: color-mix(in srgb, var(--magenta) 16%, white);
  stroke: var(--magenta);
  stroke-width: 1.8;
}

.sc-row--top .sc-count {
  fill: var(--magenta);
  font-weight: 600;
}
</style>
