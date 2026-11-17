<!--
  The rhythm at the heart of Shor's algorithm: powers of a number, keeping
  only the remainder after dividing by another, laid out as a row of tiles.
  The remainders repeat, so each distinct value gets its own colour and a
  bracket marks every full repeat. The first bracket is labelled with the
  period, the number Shor's quantum step finds.

    <Period :multiplier="7" :modulus="15" />          1 7 4 13 1 7 4 13 …
    <Period :multiplier="2" :modulus="21" :terms="14" />

  Props:
    multiplier — the number being raised to each power (x in the label)
    modulus    — the number being factored; each tile is a remainder of it
    terms      — how many powers to draw, from 0 (default 12)
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  multiplier: { type: Number, default: 7 },
  modulus: { type: Number, default: 15 },
  terms: { type: Number, default: 12 },
})

const W = 900
const TILE = 56
const TOP = 30
const TONES = ['cyan', 'violet', 'magenta', 'amber']
const f = (n: number) => Math.round(n * 100) / 100

const model = computed(() => {
  const n = Math.max(1, props.terms)
  const gap = Math.min(14, (W - 20 - n * TILE) / Math.max(1, n - 1))
  const span = n * TILE + (n - 1) * gap
  const left = (W - span) / 2
  const x = (i: number) => left + i * (TILE + gap)

  const values: number[] = []
  let v = 1 % props.modulus
  for (let i = 0; i < n; i++) {
    values.push(v)
    v = (v * props.multiplier) % props.modulus
  }

  let period = 0
  let w = props.multiplier % props.modulus
  for (let k = 1; k <= props.modulus; k++) {
    if (w === 1 % props.modulus) { period = k; break }
    w = (w * props.multiplier) % props.modulus
  }

  const seen = new Map<number, number>()
  const tiles = values.map((value, i) => {
    if (!seen.has(value)) seen.set(value, seen.size)
    return {
      x: f(x(i)), cx: f(x(i) + TILE / 2), value,
      power: i,
      tone: TONES[seen.get(value)! % TONES.length],
    }
  })

  const brackets = []
  if (period) {
    for (let s = 0; s + period <= n; s += period) {
      const x0 = x(s) + 3
      const x1 = x(s + period - 1) + TILE - 3
      brackets.push({ d: `M${f(x0)} ${TOP + TILE + 10} v8 H${f(x1)} v-8`, mid: f((x0 + x1) / 2), first: s === 0 })
    }
  }
  return { tiles, brackets, period }
})
</script>

<template>
  <svg class="motif period" :viewBox="`0 0 ${W} ${model.period ? 128 : 96}`" role="img"
    :aria-label="`Powers of ${multiplier}, remainder after dividing by ${modulus}${model.period ? `, repeating every ${model.period}` : ''}`">
    <g v-for="(t, i) in model.tiles" :key="i" :class="`pd-tile pd-tile--${t.tone}`">
      <text :x="t.cx" :y="TOP - 10" text-anchor="middle" class="pd-power">{{ multiplier }}<tspan class="pd-exp" dy="-7">{{ t.power }}</tspan></text>
      <rect :x="t.x" :y="TOP" :width="TILE" :height="TILE" rx="8" class="pd-box" />
      <text :x="t.cx" :y="TOP + TILE / 2 + 8" text-anchor="middle" class="pd-value">{{ t.value }}</text>
    </g>
    <g v-for="(b, i) in model.brackets" :key="`b${i}`" :class="['pd-bracket', { 'pd-bracket--first': b.first }]">
      <path :d="b.d" />
      <text v-if="b.first" :x="b.mid" :y="TOP + TILE + 40" text-anchor="middle" class="pd-label">repeats every {{ model.period }}</text>
    </g>
  </svg>
</template>

<style scoped>
.period {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.pd-exp {
  font-size: 11px;
}

.pd-power {
  font-family: var(--font-display);
  font-size: 17px;
  fill: var(--ink-soft);
}

.pd-box {
  stroke-width: 2;
}

.pd-value {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 24px;
}

.pd-tile--cyan .pd-box { fill: rgba(5, 144, 192, 0.1); stroke: var(--cyan); }
.pd-tile--violet .pd-box { fill: rgba(98, 70, 234, 0.1); stroke: var(--violet); }
.pd-tile--magenta .pd-box { fill: rgba(212, 48, 124, 0.09); stroke: var(--magenta); }
.pd-tile--amber .pd-box { fill: rgba(224, 154, 18, 0.12); stroke: var(--amber); }
.pd-tile--cyan .pd-value { fill: var(--cyan); }
.pd-tile--violet .pd-value { fill: var(--violet); }
.pd-tile--magenta .pd-value { fill: var(--magenta); }
.pd-tile--amber .pd-value { fill: var(--amber); }

.pd-bracket path {
  fill: none;
  stroke: var(--ink-soft);
  stroke-width: 1.6;
  opacity: 0.45;
}

.pd-bracket--first path {
  stroke: var(--violet);
  opacity: 1;
}

.pd-label {
  font-family: var(--font-mono);
  font-size: 15px;
  letter-spacing: 0.08em;
  fill: var(--violet);
}
</style>
