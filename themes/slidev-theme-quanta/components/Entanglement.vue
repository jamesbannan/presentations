<!--
  Two qubits joined by a twisted pair: the hinge between two panels whose
  contents are correlated. Stretches to the height of its container.

    <Entanglement />
    <Entanglement :twists="6" />
-->
<script setup lang="ts">
import { computed, useId } from 'vue'
import { safeId } from '../composables/motif'

const props = defineProps({
  twists: { type: Number, default: 4 },
})

const gid = safeId('entangle', useId() ?? 'x')
const f = (n: number) => Math.round(n * 100) / 100

// Drawn in a 20 × 100 box and stretched; strokes don't scale with it.
const strands = computed(() => {
  const steps = 120
  const a: string[] = []
  const b: string[] = []
  const rungs: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const s = Math.sin(t * props.twists * Math.PI * 2) * 8
    a.push(`${i ? 'L' : 'M'}${f(10 + s)} ${f(t * 100)}`)
    b.push(`${i ? 'L' : 'M'}${f(10 - s)} ${f(t * 100)}`)
  }
  const n = props.twists * 4
  for (let i = 1; i < n; i++) {
    const t = (i + 0.5) / n
    const s = Math.sin(t * props.twists * Math.PI * 2) * 8
    if (Math.abs(s) > 3) rungs.push(`M${f(10 + s)} ${f(t * 100)} L${f(10 - s)} ${f(t * 100)}`)
  }
  return { a: a.join(' '), b: b.join(' '), rungs: rungs.join(' ') }
})
</script>

<template>
  <div class="motif entanglement">
    <span class="q q--top" />
    <svg viewBox="0 0 20 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient :id="gid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style="stop-color: var(--cyan)" />
          <stop offset="0.5" style="stop-color: var(--violet)" />
          <stop offset="1" style="stop-color: var(--magenta)" />
        </linearGradient>
      </defs>
      <path :d="strands.rungs" class="rung" vector-effect="non-scaling-stroke" />
      <path :d="strands.a" :stroke="`url(#${gid})`" class="strand" vector-effect="non-scaling-stroke" />
      <path :d="strands.b" :stroke="`url(#${gid})`" class="strand strand--b" vector-effect="non-scaling-stroke" />
    </svg>
    <span class="q q--bottom" />
  </div>
</template>

<style scoped>
.entanglement {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.entanglement svg {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  overflow: visible;
}

.q {
  flex: 0 0 auto;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid currentColor;
  background: radial-gradient(circle, currentColor 0 3px, var(--paper) 3.5px);
  box-shadow: 0 0 0 5px color-mix(in srgb, currentColor 14%, transparent);
}

.q--top { color: var(--cyan); margin-bottom: 6px; }
.q--bottom { color: var(--magenta); margin-top: 6px; }

.strand {
  fill: none;
  stroke-width: 1.4;
}

.strand--b {
  opacity: 0.55;
}

.rung {
  fill: none;
  stroke: var(--ink-soft);
  stroke-width: 0.8;
  opacity: 0.45;
}
</style>
