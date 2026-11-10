<!--
  How many physical qubits it would take to break public-key encryption,
  by published estimate, against the biggest machines today. A log scale:
  each gridline is ten times the last. A dashed line carries today's
  machines up through every estimate, and once the last estimate shows,
  an arrow marks the gap still to close.

    <QubitBudget />                   the published estimates, all shown
    <QubitBudget :upto="$clicks" />   reveal one estimate per click

  Props:
    estimates — [{ target, who, qubits, count, time }], oldest first;
                `count` is the label for `qubits`, `time` the run time
    today     — { qubits, count, note }: the biggest machines now
    upto      — how many estimates to show (default all)
-->
<script setup lang="ts">
import { computed } from 'vue'

type Estimate = { target: string; who: string; qubits: number; count: string; time: string }

const props = defineProps({
  estimates: {
    type: Array as () => Estimate[],
    default: () => [
      { target: 'RSA-2048', who: 'Gidney & Ekerå 2019', qubits: 2e7, count: '20 million', time: '8 hours' },
      { target: 'RSA-2048', who: 'Gidney 2025', qubits: 1e6, count: 'under 1 million', time: 'under a week' },
      { target: 'Elliptic curve 256', who: 'Google 2026', qubits: 5e5, count: 'under 500,000', time: 'minutes' },
    ],
  },
  today: {
    type: Object as () => { qubits: number; count: string; note: string },
    default: () => ({ qubits: 1500, count: '~1,000s', note: 'noisy, no error correction' }),
  },
  upto: { type: Number, default: 99 },
})

const W = 900
const LEFT = 250
const RIGHT = 860
const TOP = 46
const ROW = 64
const BAR = 24
const LO = 2
const HI = 8
const f = (n: number) => Math.round(n * 100) / 100
const x = (q: number) => f(LEFT + ((Math.log10(q) - LO) / (HI - LO)) * (RIGHT - LEFT))

const TICKS = [
  [1e2, '100'], [1e3, '1k'], [1e4, '10k'], [1e5, '100k'], [1e6, '1M'], [1e7, '10M'], [1e8, '100M'],
] as const

const model = computed(() => {
  const rows = props.estimates.map((e, i) => ({
    ...e,
    y: TOP + i * ROW,
    end: x(e.qubits),
    inside: x(e.qubits) > RIGHT - 230,
    shown: i < props.upto,
  }))
  const todayY = TOP + rows.length * ROW + 10
  const todayX = x(props.today.qubits)
  const smallest = props.estimates.reduce((m, e) => Math.min(m, e.qubits), Infinity)
  const ratio = smallest / props.today.qubits
  const mag = 10 ** Math.floor(Math.log10(ratio))
  const gap = {
    show: rows.length > 0 && props.upto >= rows.length,
    x0: todayX,
    x1: x(smallest),
    y: todayY - 22,
    label: `~${Math.round(ratio / mag) * mag}× to go`,
  }
  return { rows, todayY, todayX, gap, height: todayY + BAR + 30 }
})
</script>

<template>
  <svg class="motif qubit-budget" :viewBox="`0 0 ${W} ${model.height}`" role="img"
    aria-label="Physical qubits needed to break public-key encryption, by published estimate, against the biggest machines today, on a log scale">
    <defs>
      <marker id="qb-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" class="qb-head" />
      </marker>
    </defs>
    <g v-for="[q, label] in TICKS" :key="label" class="qb-tick">
      <line :x1="x(q)" :x2="x(q)" :y1="TOP - 14" :y2="model.todayY + BAR + 4" />
      <text :x="x(q)" :y="TOP - 22" text-anchor="middle">{{ label }}</text>
    </g>
    <line :x1="model.todayX" :x2="model.todayX" :y1="TOP - 8" :y2="model.todayY" class="qb-today-line" />
    <g v-for="(r, i) in model.rows" :key="i" :class="['qb-row', { 'qb-row--hidden': !r.shown }]">
      <text :x="LEFT - 16" :y="r.y + 10" text-anchor="end" class="qb-target">{{ r.target }}</text>
      <text :x="LEFT - 16" :y="r.y + 30" text-anchor="end" class="qb-who">{{ r.who }}</text>
      <rect :x="LEFT" :y="r.y" :width="r.end - LEFT" :height="BAR" rx="4" class="qb-bar" />
      <text :x="r.inside ? r.end - 12 : r.end + 10" :y="r.y + 17" :text-anchor="r.inside ? 'end' : 'start'" class="qb-count">{{ r.count }} · {{ r.time }}</text>
    </g>
    <g class="qb-today">
      <text :x="LEFT - 16" :y="model.todayY + 10" text-anchor="end" class="qb-target">Biggest today</text>
      <text :x="LEFT - 16" :y="model.todayY + 30" text-anchor="end" class="qb-who">{{ today.note }}</text>
      <rect :x="LEFT" :y="model.todayY" :width="model.todayX - LEFT" :height="BAR" rx="4" class="qb-bar qb-bar--today" />
      <text :x="model.todayX + 10" :y="model.todayY + 17" class="qb-count qb-count--today">{{ today.count }}</text>
    </g>
    <g v-if="model.gap.show" class="qb-gap">
      <line :x1="model.gap.x0 + 4" :x2="model.gap.x1 - 4" :y1="model.gap.y" :y2="model.gap.y" marker-end="url(#qb-head)" />
      <text :x="(model.gap.x0 + model.gap.x1) / 2" :y="model.gap.y - 9" text-anchor="middle">{{ model.gap.label }}</text>
    </g>
  </svg>
</template>

<style scoped>
.qubit-budget {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.qb-tick line {
  stroke: var(--grid);
  stroke-width: 1;
}

.qb-tick text {
  font-family: var(--font-mono);
  font-size: 14px;
  fill: var(--ink-soft);
}

.qb-row {
  transition: opacity 0.4s ease;
}

.qb-row--hidden {
  opacity: 0;
}

.qb-target {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 19px;
  fill: var(--ink);
}

.qb-who {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
  fill: var(--ink-soft);
}

.qb-bar {
  fill: color-mix(in srgb, var(--magenta) 16%, white);
  stroke: var(--magenta);
  stroke-width: 1.6;
}

.qb-bar--today {
  fill: color-mix(in srgb, var(--cyan) 16%, white);
  stroke: var(--cyan);
}

.qb-count {
  font-family: var(--font-mono);
  font-size: 15px;
  fill: var(--magenta);
}

.qb-count--today {
  fill: var(--cyan);
}

.qb-today-line {
  stroke: var(--cyan);
  stroke-width: 1.6;
  stroke-dasharray: 5 5;
}

.qb-gap line {
  stroke: var(--violet);
  stroke-width: 2;
}

.qb-head {
  fill: var(--violet);
}

.qb-gap text {
  font-family: var(--font-mono);
  font-size: 15px;
  letter-spacing: 0.06em;
  fill: var(--violet);
}
</style>
