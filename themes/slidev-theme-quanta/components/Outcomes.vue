<!--
  A histogram of measured outcomes, one bar per bit string, as a share of
  all shots. All-zero outcomes are cyan, all-one outcomes magenta, and mixed
  ones violet, so "they always agree" and "they don't" are visible at a
  glance. An outcome that never happened keeps an empty, dashed slot.

    <Outcomes title="Entangled" :counts="[487, 0, 0, 513]" />
    <Outcomes :counts="[248, 280, 246, 226]" :labels="['00', '01', '10', '11']" />

  Props:
    counts   — shots per outcome
    labels   — the outcome for each count (default: two-qubit bit strings)
    title    — heading above the bars
    ceiling  — the share at the top of the chart (default 0.6), so charts
               set side by side share a scale
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  counts: { type: Array as () => number[], required: true },
  labels: { type: Array as () => string[], default: () => ['00', '01', '10', '11'] },
  title: { type: String, default: '' },
  ceiling: { type: Number, default: 0.6 },
})

const W = 300
const TOP = 46
const BASE = 196
const f = (n: number) => Math.round(n * 100) / 100

const bars = computed(() => {
  const total = props.counts.reduce((a, b) => a + b, 0) || 1
  const n = props.counts.length
  const slot = (W - 20) / n
  const width = slot * 0.62
  return props.counts.map((c, i) => {
    const share = c / total
    const h = Math.min(1, share / props.ceiling) * (BASE - TOP)
    const label = props.labels[i] ?? String(i)
    const tone = /^0+$/.test(label) ? 'zero' : /^1+$/.test(label) ? 'one' : 'mixed'
    const x = 10 + slot * i + (slot - width) / 2
    return {
      x: f(x), y: f(BASE - h), w: f(width), h: f(h), cx: f(x + width / 2),
      label, tone, empty: c === 0,
      pct: `${(share * 100).toFixed(share === 0 ? 0 : 1)}%`,
    }
  })
})
</script>

<template>
  <svg class="motif outcomes" :viewBox="`0 0 ${W} 232`" role="img" :aria-label="title || 'Measured outcomes'">
    <text v-if="title" :x="W / 2" y="18" text-anchor="middle" class="oc-title">{{ title }}</text>
    <path :d="`M4 ${BASE} L${W - 4} ${BASE}`" class="oc-base" />
    <g v-for="(b, i) in bars" :key="i" :class="`oc-bar oc-bar--${b.tone}`">
      <rect v-if="b.empty" :x="b.x" :y="BASE - 26" :width="b.w" height="26" rx="3" class="oc-empty" />
      <rect v-else :x="b.x" :y="b.y" :width="b.w" :height="b.h" rx="3" class="oc-fill" />
      <text :x="b.cx" :y="(b.empty ? BASE - 26 : b.y) - 8" text-anchor="middle" class="oc-pct">{{ b.pct }}</text>
      <text :x="b.cx" :y="BASE + 22" text-anchor="middle" class="oc-label">{{ b.label }}</text>
    </g>
  </svg>
</template>

<style scoped>
.outcomes {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.oc-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  fill: var(--ink);
}

.oc-base {
  stroke: var(--ink-soft);
  stroke-width: 1;
  opacity: 0.6;
}

.oc-bar--zero { --tone: var(--cyan); }
.oc-bar--one { --tone: var(--magenta); }
.oc-bar--mixed { --tone: var(--violet); }

.oc-fill {
  fill: var(--tone);
  opacity: 0.85;
}

.oc-empty {
  fill: none;
  stroke: var(--tone);
  stroke-width: 1.2;
  stroke-dasharray: 3 3;
  opacity: 0.6;
}

.oc-pct {
  font-family: var(--font-mono);
  font-size: 12px;
  fill: var(--ink-soft);
}

.oc-label {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 15px;
  fill: var(--tone);
}
</style>
