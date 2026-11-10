<!--
  When might Q-Day come, and when do the rules say to be ready? A year axis
  with today marked. Above it, the expert odds that a code-breaking quantum
  computer exists by each point, as a fuzzy band through the published
  ranges. Below it, one lane per regulator, with each deadline as a dot.

    <QdayTimeline />                     everything shown
    <QdayTimeline :stage="$clicks" />    0 axis, 1 odds, 2 first lane, 3 second…

  Props:
    from, to — the years at each end of the axis (default 2026, 2041)
    now      — today, as a fractional year (default 2026.85)
    odds     — [{ year, low, high }]: published chance ranges, in percent
    lanes    — [{ name, place, tone, marks: [{ year, title, detail }] }];
               `tone` is cyan, violet, magenta or amber
    stage    — how much to show (default all)
-->
<script setup lang="ts">
import { computed } from 'vue'

type Mark = { year: number; title: string; detail?: string }
type Lane = { name: string; place: string; tone: string; marks: Mark[] }

const props = defineProps({
  from: { type: Number, default: 2026 },
  to: { type: Number, default: 2041 },
  now: { type: Number, default: 2026.85 },
  odds: {
    type: Array as () => { year: number; low: number; high: number }[],
    default: () => [
      { year: 2036, low: 28, high: 49 },
      { year: 2041, low: 51, high: 70 },
    ],
  },
  lanes: {
    type: Array as () => Lane[],
    default: () => [
      {
        name: 'ASD', place: 'Australia', tone: 'cyan',
        marks: [
          { year: 2027, title: 'Plan', detail: 'ready' },
          { year: 2029, title: 'Start', detail: 'migrating' },
          { year: 2031, title: 'Done', detail: 'no RSA, ECC' },
        ],
      },
      {
        name: 'NIST', place: 'United States', tone: 'violet',
        marks: [
          { year: 2031, title: 'Deprecated', detail: 'RSA, ECC' },
          { year: 2036, title: 'Disallowed', detail: 'RSA, ECC' },
        ],
      },
    ],
  },
  stage: { type: Number, default: 99 },
})

const W = 900
const LEFT = 150
const RIGHT = 870
const CHART_TOP = 44
const CHART_BOTTOM = 166
const AXIS = 182
const LANE0 = 240
const LANE = 70
const PEAK = 80
const f = (n: number) => Math.round(n * 100) / 100

const model = computed(() => {
  const x = (year: number) => f(LEFT + ((year - props.from) / (props.to - props.from)) * (RIGHT - LEFT))
  const y = (pct: number) => f(CHART_BOTTOM - (pct / PEAK) * (CHART_BOTTOM - CHART_TOP))

  const years = []
  for (let yr = props.from; yr <= props.to; yr++) {
    years.push({ x: x(yr), label: (yr - props.from) % 2 === 0 ? String(yr) : '' })
  }

  const start = { x: x(props.now), y: y(0) }
  const pts = props.odds.map(o => ({ x: x(o.year), lo: y(o.low), hi: y(o.high), label: `${o.low}–${o.high}%` }))
  const band = [`M${start.x} ${start.y}`, ...pts.map(p => `L${p.x} ${p.hi}`), ...pts.slice().reverse().map(p => `L${p.x} ${p.lo}`), 'Z'].join(' ')
  const mid = [`M${start.x} ${start.y}`, ...pts.map(p => `L${p.x} ${f((p.lo + p.hi) / 2)}`)].join(' ')
  const grid = [25, 50, 75].map(p => ({ y: y(p), label: `${p}%` }))

  const lanes = props.lanes.map((l, i) => {
    const ly = LANE0 + i * LANE
    const marks = l.marks.map(m => ({ ...m, x: x(m.year) }))
    const last = marks.length ? marks[marks.length - 1].x : start.x
    return { ...l, y: ly, marks, track: `M${start.x} ${ly} H${last}`, shown: props.stage >= i + 2 }
  })

  return {
    years, start, pts, band, mid, grid, lanes,
    oddsShown: props.stage >= 1,
    height: LANE0 + (props.lanes.length - 1) * LANE + 52,
  }
})
</script>

<template>
  <svg class="motif qday-timeline" :viewBox="`0 0 ${W} ${model.height}`" role="img"
    aria-label="A timeline from today: expert odds of a code-breaking quantum computer rising over the next fifteen years, and the deadlines regulators have set to move off RSA and elliptic curves">
    <defs>
      <linearGradient id="qt-band" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" style="stop-color: var(--magenta); stop-opacity: 0.04" />
        <stop offset="1" style="stop-color: var(--magenta); stop-opacity: 0.32" />
      </linearGradient>
    </defs>

    <g :class="['qt-odds', { 'qt-hidden': !model.oddsShown }]">
      <g v-for="g in model.grid" :key="g.label" class="qt-grid">
        <line :x1="LEFT" :x2="RIGHT" :y1="g.y" :y2="g.y" />
        <text :x="LEFT - 12" :y="g.y + 5" text-anchor="end">{{ g.label }}</text>
      </g>
      <text :x="LEFT" :y="CHART_TOP - 22" class="qt-caption">Chance a code-breaking machine exists, by expert survey</text>
      <path :d="model.band" class="qt-band" />
      <path :d="model.mid" class="qt-mid" />
      <g v-for="(p, i) in model.pts" :key="i" class="qt-range">
        <line :x1="p.x" :x2="p.x" :y1="p.lo" :y2="p.hi" />
        <line :x1="p.x - 7" :x2="p.x + 7" :y1="p.lo" :y2="p.lo" />
        <line :x1="p.x - 7" :x2="p.x + 7" :y1="p.hi" :y2="p.hi" />
        <text :x="p.x - 14" :y="(p.lo + p.hi) / 2 + 6" text-anchor="end">{{ p.label }}</text>
      </g>
    </g>

    <g class="qt-axis">
      <line :x1="LEFT" :x2="RIGHT" :y1="AXIS" :y2="AXIS" />
      <g v-for="(t, i) in model.years" :key="i">
        <line :x1="t.x" :x2="t.x" :y1="AXIS - 4" :y2="AXIS + 4" />
        <text v-if="t.label" :x="t.x" :y="AXIS + 24" text-anchor="middle">{{ t.label }}</text>
      </g>
    </g>

    <g class="qt-now">
      <line :x1="model.start.x" :x2="model.start.x" :y1="CHART_TOP - 6" :y2="AXIS + 6" />
      <text :x="model.start.x + 8" :y="CHART_TOP + 8">today</text>
    </g>

    <g v-for="l in model.lanes" :key="l.name" :class="['qt-lane', `qt-lane--${l.tone}`, { 'qt-hidden': !l.shown }]">
      <text :x="LEFT - 16" :y="l.y + 2" text-anchor="end" class="qt-lane-name">{{ l.name }}</text>
      <text :x="LEFT - 16" :y="l.y + 20" text-anchor="end" class="qt-lane-place">{{ l.place }}</text>
      <path :d="l.track" class="qt-track" />
      <g v-for="m in l.marks" :key="m.title">
        <circle :cx="m.x" :cy="l.y" r="7" class="qt-dot" />
        <text :x="m.x" :y="l.y + 27" text-anchor="middle" class="qt-mark-title">{{ m.title }}</text>
        <text v-if="m.detail" :x="m.x" :y="l.y + 44" text-anchor="middle" class="qt-mark-detail">{{ m.detail }}</text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.qday-timeline {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.qt-odds,
.qt-lane {
  transition: opacity 0.4s ease;
}

.qt-hidden {
  opacity: 0;
}

.qt-grid line {
  stroke: var(--grid);
  stroke-dasharray: 2 5;
}

.qt-grid text,
.qt-axis text {
  font-family: var(--font-mono);
  font-size: 13px;
  fill: var(--ink-soft);
}

.qt-caption {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  fill: var(--magenta);
}

.qt-band {
  fill: url(#qt-band);
}

.qt-mid {
  fill: none;
  stroke: var(--magenta);
  stroke-width: 1.6;
  stroke-dasharray: 6 5;
  opacity: 0.7;
}

.qt-range line {
  stroke: var(--magenta);
  stroke-width: 2.2;
}

.qt-range text {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 19px;
  fill: var(--magenta);
}

.qt-axis line {
  stroke: var(--ink-soft);
  stroke-width: 1.4;
}

.qt-now line {
  stroke: var(--ink);
  stroke-width: 1.4;
  stroke-dasharray: 3 4;
}

.qt-now text {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  fill: var(--ink);
}

.qt-lane-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 18px;
  fill: var(--ink);
}

.qt-lane-place {
  font-family: var(--font-mono);
  font-size: 12px;
  fill: var(--ink-soft);
}

.qt-track {
  fill: none;
  stroke-width: 2.4;
  opacity: 0.5;
}

.qt-dot {
  stroke-width: 2.4;
  fill: var(--paper);
}

.qt-mark-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 16px;
}

.qt-mark-detail {
  font-family: var(--font-mono);
  font-size: 12px;
  fill: var(--ink-soft);
}

.qt-lane--cyan .qt-track, .qt-lane--cyan .qt-dot { stroke: var(--cyan); }
.qt-lane--cyan .qt-mark-title { fill: var(--cyan); }
.qt-lane--violet .qt-track, .qt-lane--violet .qt-dot { stroke: var(--violet); }
.qt-lane--violet .qt-mark-title { fill: var(--violet); }
.qt-lane--magenta .qt-track, .qt-lane--magenta .qt-dot { stroke: var(--magenta); }
.qt-lane--magenta .qt-mark-title { fill: var(--magenta); }
.qt-lane--amber .qt-track, .qt-lane--amber .qt-dot { stroke: var(--amber); }
.qt-lane--amber .qt-mark-title { fill: var(--amber); }
</style>
