<!--
  A histogram of measured outcomes, one bar per bit string, as a share of
  all shots. All-zero outcomes are cyan, all-one outcomes magenta, and mixed
  ones violet, so "they always agree" and "they don't" are visible at a
  glance. An outcome that never happened keeps an empty, dashed slot.

    <Outcomes title="Entangled" :counts="[487, 0, 0, 513]" />
    <Outcomes :counts="[248, 280, 246, 226]" :labels="['00', '01', '10', '11']" />
    <Outcomes :counts="[269, 260]" :labels="['0000', '0110']" :captions="['0+0=00', '0+1=01']" />
    <Outcomes title="Hardware" pending="No recording yet" />

  Props:
    counts   — shots per outcome
    labels   — the outcome for each count (default: two-qubit bit strings)
    captions — optional second line under each label, saying what it means
    title    — heading above the bars
    ceiling  — the share at the top of the chart (default 0.6), so charts
               set side by side share a scale
    pending  — placeholder text. Draws every slot dashed with "?" for its
               share and an amber stamp across the chart, for a slide whose
               data hasn't been recorded yet. `counts` can be left out
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  counts: { type: Array as () => number[], default: () => [] },
  labels: { type: Array as () => string[], default: () => ['00', '01', '10', '11'] },
  captions: { type: Array as () => string[], default: () => [] },
  title: { type: String, default: '' },
  ceiling: { type: Number, default: 0.6 },
  pending: { type: String, default: '' },
})

const W = 300
const TOP = 46
const BASE = 196
const f = (n: number) => Math.round(n * 100) / 100

const PENDING_H = 70

const bars = computed(() => {
  const counts = props.pending ? props.labels.map(() => 0) : props.counts
  const total = counts.reduce((a, b) => a + b, 0) || 1
  const n = counts.length
  const slot = (W - 20) / n
  const width = slot * 0.62
  return counts.map((c, i) => {
    const share = c / total
    const h = Math.min(1, share / props.ceiling) * (BASE - TOP)
    const label = props.labels[i] ?? String(i)
    const tone = /^0+$/.test(label) ? 'zero' : /^1+$/.test(label) ? 'one' : 'mixed'
    const x = 10 + slot * i + (slot - width) / 2
    return {
      x: f(x), y: f(BASE - h), w: f(width), h: f(h), cx: f(x + width / 2),
      label, tone, empty: c === 0, caption: props.captions[i] ?? '',
      pct: props.pending ? '?' : `${(share * 100).toFixed(share === 0 ? 0 : 1)}%`,
    }
  })
})
</script>

<template>
  <svg class="motif outcomes" :viewBox="`0 0 ${W} ${captions.length ? 254 : 232}`" role="img" :aria-label="title || 'Measured outcomes'">
    <text v-if="title" :x="W / 2" y="18" text-anchor="middle" class="oc-title">{{ title }}</text>
    <path :d="`M4 ${BASE} L${W - 4} ${BASE}`" class="oc-base" />
    <g v-for="(b, i) in bars" :key="i" :class="`oc-bar oc-bar--${b.tone}`">
      <rect v-if="pending" :x="b.x" :y="BASE - PENDING_H" :width="b.w" :height="PENDING_H" rx="3" class="oc-empty" />
      <rect v-else-if="b.empty" :x="b.x" :y="BASE - 26" :width="b.w" height="26" rx="3" class="oc-empty" />
      <rect v-else :x="b.x" :y="b.y" :width="b.w" :height="b.h" rx="3" class="oc-fill" />
      <text :x="b.cx" :y="(pending ? BASE - PENDING_H : b.empty ? BASE - 26 : b.y) - 8" text-anchor="middle" class="oc-pct">{{ b.pct }}</text>
      <text :x="b.cx" :y="BASE + 22" text-anchor="middle" class="oc-label">{{ b.label }}</text>
      <text v-if="b.caption" :x="b.cx" :y="BASE + 44" text-anchor="middle" class="oc-caption">{{ b.caption }}</text>
    </g>
    <g v-if="pending" class="oc-pending" :transform="`rotate(-6 ${W / 2} ${BASE - 124})`">
      <rect :x="W / 2 - 104" :y="BASE - 146" width="208" height="44" rx="6" class="oc-stamp" />
      <text :x="W / 2" :y="BASE - 128" text-anchor="middle" class="oc-stamp-kicker">PLACEHOLDER</text>
      <text :x="W / 2" :y="BASE - 111" text-anchor="middle" class="oc-stamp-text">{{ pending }}</text>
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

.oc-caption {
  font-family: var(--font-mono);
  font-size: 11px;
  fill: var(--ink-soft);
}

.oc-stamp {
  fill: var(--paper);
  fill-opacity: 0.9;
  stroke: var(--amber);
  stroke-width: 1.6;
  stroke-dasharray: 6 4;
}

.oc-stamp-kicker {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.22em;
  fill: var(--amber);
}

.oc-stamp-text {
  font-family: var(--font-mono);
  font-size: 12px;
  fill: var(--ink);
}

.oc-label {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 15px;
  fill: var(--tone);
}
</style>
