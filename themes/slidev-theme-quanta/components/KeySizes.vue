<!--
  Bytes on the wire: today's public-key algorithms against their
  post-quantum replacements, as bars on one linear scale. The first row in
  each group is the baseline; every other row is labelled with how many
  times bigger it is. Optional marks draw a dashed line across every row,
  for a limit such as one network packet.

    <KeySizes />                    every row and mark shown
    <KeySizes :stage="$clicks" />   0 today's rows, 1 adds the
                                    post-quantum rows, 2 adds the marks

  Props:
    groups — [{ label, rows: [{ name, bytes, pq }] }]; `pq` rows are the
             replacements, revealed at stage 1
    max    — bytes at the right-hand edge of the scale
    marks  — [{ bytes, label }]: limits drawn as dashed lines
    stage  — how much to show (default all)
-->
<script setup lang="ts">
import { computed } from 'vue'

type Row = { name: string; bytes: number; pq?: boolean }
type Group = { label: string; rows: Row[] }

const props = defineProps({
  groups: {
    type: Array as () => Group[],
    default: () => [
      {
        label: 'Agree a key',
        rows: [
          { name: 'X25519', bytes: 32 },
          { name: 'ML-KEM-768', bytes: 1184, pq: true },
        ],
      },
      {
        label: 'Sign',
        rows: [
          { name: 'Ed25519', bytes: 64 },
          { name: 'RSA-2048', bytes: 256 },
          { name: 'ML-DSA-65', bytes: 3309, pq: true },
          { name: 'SLH-DSA-128s', bytes: 7856, pq: true },
        ],
      },
    ],
  },
  max: { type: Number, default: 8000 },
  marks: {
    type: Array as () => { bytes: number; label: string }[],
    default: () => [{ bytes: 1500, label: 'one network packet' }],
  },
  stage: { type: Number, default: 99 },
})

const W = 900
const LEFT = 190
const RIGHT = 870
const TOP = 40
const ROW = 40
const BAR = 24
const GAP = 34
const f = (n: number) => Math.round(n * 100) / 100
const x = (b: number) => f(LEFT + (b / props.max) * (RIGHT - LEFT))
const fmt = (n: number) => n.toLocaleString('en-AU')

const TICK_STEP = 2000

const model = computed(() => {
  let y = TOP
  const groups = props.groups.map((g) => {
    const base = g.rows[0]?.bytes ?? 1
    const labelY = y
    y += 26
    const rows = g.rows.map((r) => {
      const row = {
        ...r,
        y,
        end: x(r.bytes),
        inside: x(r.bytes) > RIGHT - 170,
        shown: r.pq ? props.stage >= 1 : true,
        times: r.bytes !== base ? `${Math.round(r.bytes / base)}×` : '',
      }
      y += ROW
      return row
    })
    y += GAP - ROW + BAR
    return { label: g.label, labelY, rows }
  })
  const bottom = y - GAP + 8
  const ticks = []
  for (let b = 0; b <= props.max; b += TICK_STEP) ticks.push(b)
  return { groups, bottom, ticks, height: bottom + 34 }
})
</script>

<template>
  <svg class="motif key-sizes" :viewBox="`0 0 ${W} ${model.height}`" role="img"
    aria-label="Bytes on the wire for today's public-key algorithms against their post-quantum replacements">
    <g v-for="b in model.ticks" :key="b" class="ks-tick">
      <line :x1="x(b)" :x2="x(b)" :y1="TOP - 6" :y2="model.bottom" />
      <text :x="x(b)" :y="model.bottom + 22" text-anchor="middle">{{ b === 0 ? '0' : `${b / 1000}k` }}</text>
    </g>
    <text :x="RIGHT" :y="model.bottom + 22" dx="26" class="ks-unit">bytes</text>
    <g v-for="m in marks" :key="m.label" :class="['ks-mark', { 'ks-mark--hidden': stage < 2 }]">
      <line :x1="x(m.bytes)" :x2="x(m.bytes)" :y1="TOP - 14" :y2="model.bottom" />
      <text :x="x(m.bytes) + 8" :y="TOP - 18">{{ m.label }}, ~{{ fmt(m.bytes) }}</text>
    </g>
    <g v-for="(g, gi) in model.groups" :key="gi">
      <text :x="LEFT - 16" :y="g.labelY + 6" text-anchor="end" class="ks-group">{{ g.label }}</text>
      <line :x1="LEFT" :x2="RIGHT" :y1="g.labelY + 2" :y2="g.labelY + 2" class="ks-rule" />
      <g v-for="(r, ri) in g.rows" :key="ri" :class="['ks-row', { 'ks-row--pq': r.pq, 'ks-row--hidden': !r.shown }]">
        <text :x="LEFT - 16" :y="r.y + 17" text-anchor="end" class="ks-name">{{ r.name }}</text>
        <rect :x="LEFT" :y="r.y" :width="Math.max(r.end - LEFT, 3)" :height="BAR" rx="3" class="ks-bar" />
        <text :x="r.inside ? r.end - 12 : r.end + 10" :y="r.y + 17" :text-anchor="r.inside ? 'end' : 'start'" :class="['ks-count', { 'ks-count--inside': r.inside }]">{{ fmt(r.bytes) }}<tspan v-if="r.times" class="ks-times"> · {{ r.times }}</tspan></text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.key-sizes {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.ks-tick line {
  stroke: var(--grid);
  stroke-width: 1;
}

.ks-tick text,
.ks-unit {
  font-family: var(--font-mono);
  font-size: 14px;
  fill: var(--ink-soft);
}

.ks-group {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  fill: var(--violet);
}

.ks-rule {
  stroke: var(--violet);
  stroke-width: 1;
  opacity: 0.35;
}

.ks-row {
  transition: opacity 0.4s ease;
}

.ks-row--hidden {
  opacity: 0;
}

.ks-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 19px;
  fill: var(--ink);
}

.ks-bar {
  fill: color-mix(in srgb, var(--cyan) 16%, white);
  stroke: var(--cyan);
  stroke-width: 1.6;
  transform-box: fill-box;
  transform-origin: left;
  transition: transform 0.6s ease;
}

.ks-row--pq .ks-bar {
  fill: color-mix(in srgb, var(--magenta) 16%, white);
  stroke: var(--magenta);
}

.ks-row--hidden .ks-bar {
  transform: scaleX(0);
}

.ks-count {
  font-family: var(--font-mono);
  font-size: 15px;
  fill: var(--cyan);
  paint-order: stroke;
  stroke: var(--paper);
  stroke-width: 6px;
  stroke-linejoin: round;
}

.ks-count--inside {
  stroke: none;
}

.ks-row--pq .ks-count {
  fill: var(--magenta);
}

.ks-times {
  fill: var(--ink-soft);
}

.ks-mark {
  transition: opacity 0.4s ease;
}

.ks-mark--hidden {
  opacity: 0;
}

.ks-mark line {
  stroke: var(--amber);
  stroke-width: 1.8;
  stroke-dasharray: 6 5;
}

.ks-mark text {
  font-family: var(--font-mono);
  font-size: 14px;
  fill: var(--amber);
}
</style>
