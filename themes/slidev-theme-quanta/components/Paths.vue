<!--
  Every route from a start to an answer, through one middle step: a 0 that
  splits into 0 and 1, then each of those splits again. Two routes reach
  each answer, and the figure adds them up.

    <Paths mode="coin" />    a coin flipped twice: every route carries a
                             probability, they only add, so it's still 50/50
    <Paths mode="qubit" />   a qubit tipped onto the equator twice (the H
                             gate): every route carries an amount with a
                             sign; the two routes to 1 are +0.5 and −0.5,
                             so they cancel and a read always gives 0

  Add the routes first, then square: that's interference.
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  mode: { type: String, default: 'qubit' },
})

const S = { x: 16, y: 82 }
const M = [{ x: 100, y: 22 }, { x: 100, y: 142 }]
const E = [{ x: 186, y: 22 }, { x: 186, y: 142 }]
const f = (n: number) => Math.round(n * 100) / 100
const at = (a: { x: number, y: number }, b: { x: number, y: number }, t: number) =>
  ({ x: f(a.x + (b.x - a.x) * t), y: f(a.y + (b.y - a.y) * t) })

const qubit = computed(() => props.mode === 'qubit')

// Each edge: where it runs, where its label sits, and its sign. Only the
// step from 1 to 1 turns negative (H sends 1 to minus).
const edges = computed(() => [
  { a: S, b: M[0], t: 0.5, neg: false },
  { a: S, b: M[1], t: 0.5, neg: false },
  { a: M[0], b: E[0], t: 0.5, neg: false },
  { a: M[0], b: E[1], t: 0.24, neg: false },
  { a: M[1], b: E[0], t: 0.24, neg: false },
  { a: M[1], b: E[1], t: 0.5, neg: qubit.value },
].map(e => ({ ...e, label: at(e.a, e.b, e.t) })))

const results = computed(() => qubit.value
  ? [
      { sum: '0.5 + 0.5 = 1', total: '100%', gone: false },
      { sum: '0.5 − 0.5 = 0', total: '0%', gone: true },
    ]
  : [
      { sum: '25% + 25%', total: '50%', gone: false },
      { sum: '25% + 25%', total: '50%', gone: false },
    ])
</script>

<template>
  <svg class="motif paths" :class="`paths--${mode}`" viewBox="0 0 300 166" role="img"
    :aria-label="qubit
      ? 'A qubit tipped twice: the two routes to 1 cancel, so it always reads 0'
      : 'A coin flipped twice: the routes only add, so it is still 50/50'">
    <line v-for="(e, i) in edges" :key="`l${i}`" :x1="e.a.x" :y1="e.a.y" :x2="e.b.x" :y2="e.b.y"
      class="paths-edge" :class="{ 'paths-edge--neg': e.neg }" />

    <g v-for="(e, i) in edges" :key="`t${i}`">
      <template v-if="qubit">
        <circle :cx="e.label.x" :cy="e.label.y" r="8" class="paths-sign" :class="{ 'paths-sign--neg': e.neg }" />
        <text :x="e.label.x" :y="e.label.y + 4" class="paths-sign-text" :class="{ 'paths-sign-text--neg': e.neg }">{{ e.neg ? '−' : '+' }}</text>
      </template>
      <text v-else :x="e.label.x" :y="e.label.y + 3.5" class="paths-odds">50%</text>
    </g>

    <g class="paths-node paths-node--zero">
      <circle :cx="S.x" :cy="S.y" r="13" /><text :x="S.x" :y="S.y + 5">0</text>
    </g>
    <g v-for="(m, i) in M" :key="`m${i}`" class="paths-node" :class="i ? 'paths-node--one' : 'paths-node--zero'">
      <circle :cx="m.x" :cy="m.y" r="13" /><text :x="m.x" :y="m.y + 5">{{ i }}</text>
    </g>
    <g v-for="(e, i) in E" :key="`e${i}`" class="paths-node"
      :class="[i ? 'paths-node--one' : 'paths-node--zero', { 'paths-node--gone': results[i].gone }]">
      <circle :cx="e.x" :cy="e.y" r="13" /><text :x="e.x" :y="e.y + 5">{{ i }}</text>
    </g>

    <g v-for="(r, i) in results" :key="`r${i}`" :class="{ 'paths-result--gone': r.gone }">
      <text x="300" :y="E[i].y - 2" class="paths-sum">{{ r.sum }}</text>
      <text x="300" :y="E[i].y + 20" class="paths-total">{{ r.total }}</text>
    </g>
  </svg>
</template>

<style scoped>
.paths {
  display: block;
  width: 100%;
  overflow: visible;
}

.paths-edge {
  stroke: var(--ink-soft);
  stroke-width: 1.6;
  opacity: 0.55;
}

.paths--qubit .paths-edge {
  stroke: var(--cyan);
  opacity: 0.8;
}

.paths--qubit .paths-edge--neg {
  stroke: var(--magenta);
  stroke-dasharray: 5 4;
}

.paths-odds {
  font-family: var(--font-mono);
  font-size: 10px;
  text-anchor: middle;
  fill: var(--ink-soft);
  paint-order: stroke;
  stroke: var(--paper);
  stroke-width: 5px;
  stroke-linejoin: round;
}

.paths-sign {
  fill: #fff;
  stroke: var(--cyan);
  stroke-width: 1.4;
}

.paths-sign--neg {
  fill: var(--magenta);
  stroke: var(--magenta);
}

.paths-sign-text {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  text-anchor: middle;
  fill: var(--cyan);
}

.paths-sign-text--neg {
  fill: #fff;
}

.paths-node circle {
  stroke-width: 0;
}

.paths-node--zero circle { fill: var(--cyan); }
.paths-node--one circle { fill: var(--magenta); }

.paths-node text {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  text-anchor: middle;
  fill: #fff;
}

.paths-node--gone circle {
  fill: #fff;
  stroke: var(--magenta);
  stroke-width: 1.4;
  stroke-dasharray: 3 3;
}

.paths-node--gone text {
  fill: var(--magenta);
}

.paths-sum {
  font-family: var(--font-mono);
  font-size: 11px;
  text-anchor: end;
  fill: var(--ink-soft);
}

.paths-total {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  text-anchor: end;
  fill: var(--ink);
}

.paths-result--gone .paths-total {
  fill: var(--magenta);
}
</style>
