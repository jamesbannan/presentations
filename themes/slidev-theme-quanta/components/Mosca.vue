<!--
  Harvest now, decrypt later, drawn as Mosca's inequality. Each row is a
  kind of data: anything sent until you finish migrating can be recorded
  (violet), and it then has to stay secret for its shelf life (cyan). Past
  the fuzzy Q-Day band, the part still meant to be secret turns magenta:
  recorded today, readable then. A row that runs off the end gets an arrow.

    <Mosca />                          the default examples, exposure shown
    <Mosca :exposed="$clicks >= 1" />  shade the exposure on a click

  Props:
    assets  — [{ label, life, years }]: `life` is the shelf life as words,
              `years` as a number
    migrated — the year migration is finished (default 2031, end of 2030)
    qday    — [first, last]: the fuzzy band (default [2032, 2046])
    from, to — the years at each end of the axis (default 2026, 2046)
    now     — today, as a fractional year (default 2026.85)
    exposed — shade what is still secret after the band starts (default true)
-->
<script setup lang="ts">
import { computed } from 'vue'

type Asset = { label: string; life: string; years: number }

const props = defineProps({
  assets: {
    type: Array as () => Asset[],
    default: () => [
      { label: 'Login session', life: 'secret for hours', years: 0 },
      { label: 'Credit card', life: 'secret for ~3 years', years: 3 },
      { label: 'Trade secrets', life: 'secret for ~10 years', years: 10 },
      { label: 'Cabinet papers', life: 'secret for 20 years', years: 20 },
      { label: 'Health records', life: 'secret for life', years: 70 },
    ],
  },
  migrated: { type: Number, default: 2031 },
  qday: { type: Array as () => number[], default: () => [2032, 2046] },
  from: { type: Number, default: 2026 },
  to: { type: Number, default: 2046 },
  now: { type: Number, default: 2026.85 },
  exposed: { type: Boolean, default: true },
})

const W = 900
const LEFT = 240
const RIGHT = 870
const TOP = 46
const ROW0 = 80
const ROW = 45
const BAR = 20
const f = (n: number) => Math.round(n * 100) / 100

const model = computed(() => {
  const x = (year: number) => f(LEFT + ((Math.min(year, props.to) - props.from) / (props.to - props.from)) * (RIGHT - LEFT))
  const q0 = props.qday[0]
  const rows = props.assets.map((a, i) => {
    const y = ROW0 + i * ROW
    const end = props.migrated + a.years
    const safeEnd = Math.min(end, q0)
    return {
      ...a, y,
      migrate: { x: x(props.now), w: f(x(props.migrated) - x(props.now)) },
      secret: { x: x(props.migrated), w: f(Math.max(0, x(safeEnd) - x(props.migrated))) },
      risk: end > q0 ? { x: x(Math.max(q0, props.migrated)), w: f(x(end) - x(Math.max(q0, props.migrated))) } : null,
      overflow: end > props.to,
    }
  })
  const axis = ROW0 + props.assets.length * ROW + 4
  const years = []
  for (let yr = props.from; yr <= props.to; yr += 2) years.push({ x: x(yr), label: (yr - props.from) % 4 === 0 ? String(yr) : '' })
  return {
    rows, axis, years,
    band: { x: x(q0), w: f(x(props.qday[1]) - x(q0)) },
    nowX: x(props.now),
    migratedX: x(props.migrated),
    height: axis + 34,
  }
})
</script>

<template>
  <svg class="motif mosca" :viewBox="`0 0 ${W} ${model.height}`" role="img"
    aria-label="Harvest now, decrypt later: for each kind of data, the time until migration plus the time it must stay secret, against the years when Q-Day might arrive">
    <defs>
      <linearGradient id="mo-band" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" style="stop-color: var(--magenta); stop-opacity: 0.03" />
        <stop offset="0.5" style="stop-color: var(--magenta); stop-opacity: 0.14" />
        <stop offset="1" style="stop-color: var(--magenta); stop-opacity: 0.2" />
      </linearGradient>
      <marker id="mo-more" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" class="mo-more" />
      </marker>
    </defs>

    <g class="mo-legend">
      <rect :x="LEFT" y="4" width="16" height="12" rx="2" class="mo-migrate" />
      <text :x="LEFT + 24" y="15">recorded until you migrate</text>
      <rect :x="LEFT + 252" y="4" width="16" height="12" rx="2" class="mo-secret" />
      <text :x="LEFT + 276" y="15">must stay secret</text>
      <rect :x="LEFT + 438" y="4" width="16" height="12" rx="2" :class="['mo-risk', { 'mo-hidden': !exposed }]" />
      <text :x="LEFT + 462" y="15" :class="{ 'mo-hidden': !exposed }">readable after Q-Day</text>
    </g>

    <rect :x="model.band.x" :y="TOP" :width="model.band.w" :height="model.axis - TOP" class="mo-band" />
    <text :x="model.band.x + 10" :y="TOP + 22" class="mo-band-label">Q-Day: somewhere in here</text>

    <line :x1="model.migratedX" :x2="model.migratedX" :y1="TOP" :y2="model.axis" class="mo-done" />
    <text :x="model.migratedX - 8" :y="TOP + 22" text-anchor="end" class="mo-done-label">migrated</text>

    <g v-for="(r, i) in model.rows" :key="i" class="mo-row">
      <text :x="LEFT - 16" :y="r.y + 9" text-anchor="end" class="mo-label">{{ r.label }}</text>
      <text :x="LEFT - 16" :y="r.y + 26" text-anchor="end" class="mo-life">{{ r.life }}</text>
      <rect :x="r.migrate.x" :y="r.y" :width="r.migrate.w" :height="BAR" rx="3" class="mo-migrate" />
      <rect v-if="r.secret.w > 0" :x="r.secret.x" :y="r.y" :width="r.secret.w" :height="BAR" class="mo-secret" />
      <rect v-if="r.risk" :x="r.risk.x" :y="r.y" :width="r.risk.w" :height="BAR"
        :class="['mo-secret', 'mo-risk', { 'mo-risk--off': !exposed }]" />
      <line v-if="r.overflow" :x1="RIGHT" :x2="RIGHT + 4" :y1="r.y + BAR / 2" :y2="r.y + BAR / 2" marker-end="url(#mo-more)"
        :class="['mo-more-line', { 'mo-more-line--off': !exposed }]" />
    </g>

    <g class="mo-axis">
      <line :x1="LEFT" :x2="RIGHT" :y1="model.axis" :y2="model.axis" />
      <g v-for="(t, i) in model.years" :key="i">
        <line :x1="t.x" :x2="t.x" :y1="model.axis - 4" :y2="model.axis + 4" />
        <text v-if="t.label" :x="t.x" :y="model.axis + 24" text-anchor="middle">{{ t.label }}</text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.mosca {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.mo-legend text {
  font-family: var(--font-mono);
  font-size: 13px;
  fill: var(--ink-soft);
}

.mo-hidden {
  opacity: 0;
}

.mo-band {
  fill: url(#mo-band);
}

.mo-band-label,
.mo-done-label {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.mo-band-label {
  fill: var(--magenta);
}

.mo-done {
  stroke: var(--violet);
  stroke-width: 1.4;
  stroke-dasharray: 3 4;
}

.mo-done-label {
  fill: var(--violet);
}

.mo-label {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  fill: var(--ink);
}

.mo-life {
  font-family: var(--font-mono);
  font-size: 12px;
  fill: var(--ink-soft);
}

.mo-migrate {
  fill: rgba(98, 70, 234, 0.22);
  stroke: var(--violet);
  stroke-width: 1.4;
}

.mo-secret {
  fill: rgba(5, 144, 192, 0.2);
  stroke: var(--cyan);
  stroke-width: 1.4;
}

.mo-risk {
  fill: rgba(212, 48, 124, 0.32);
  stroke: var(--magenta);
  transition: fill 0.4s ease, stroke 0.4s ease, opacity 0.4s ease;
}

.mo-risk--off {
  fill: rgba(5, 144, 192, 0.2);
  stroke: var(--cyan);
}

.mo-more {
  fill: var(--magenta);
}

.mo-more-line {
  stroke: var(--magenta);
  stroke-width: 2;
}

.mo-more-line--off {
  opacity: 0;
}

.mo-axis line {
  stroke: var(--ink-soft);
  stroke-width: 1.4;
}

.mo-axis text {
  font-family: var(--font-mono);
  font-size: 13px;
  fill: var(--ink-soft);
}
</style>
