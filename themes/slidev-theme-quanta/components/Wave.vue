<!--
  A wave, drawn on an oscilloscope baseline.

    <Wave />                        a wave packet in its envelope
    <Wave mode="interference" />    two waves and their sum: where they
                                    agree it grows, where they disagree
                                    it cancels — how quantum algorithms
                                    make wrong answers disappear

  Props:
    mode    — 'packet' | 'interference'
    width   — length in units (the height is fixed at 40), so a longer
              wave at the same height is wider on the slide
    cycles  — oscillations across the width
    height  — CSS height; width follows
-->
<script setup lang="ts">
import { computed, useId } from 'vue'
import { safeId } from '../composables/motif'

const props = defineProps({
  mode: { type: String, default: 'packet' },
  width: { type: Number, default: 320 },
  cycles: { type: Number, default: 9 },
  height: { type: String, default: '40px' },
})

const gid = safeId('wave', useId() ?? 'x')
const A = 16
const f = (n: number) => Math.round(n * 100) / 100

const sample = (fn: (t: number) => number) => {
  const steps = Math.max(80, Math.round(props.width * 1.5))
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    d += `${i ? 'L' : 'M'}${f(t * props.width)} ${f(-fn(t))} `
  }
  return d
}

const k = computed(() => props.cycles * Math.PI * 2)

const paths = computed(() => {
  if (props.mode === 'interference') {
    // Two close frequencies beat against each other: the sum swells where
    // they're in phase and flattens where they cancel.
    const a = (t: number) => Math.sin(k.value * t) * A * 0.5
    const b = (t: number) => Math.sin(k.value * 1.18 * t + 0.4) * A * 0.5
    return {
      parts: [sample(a), sample(b)],
      main: sample(t => a(t) + b(t)),
      envelope: '',
    }
  }
  const env = (t: number) => Math.exp(-(((t - 0.5) / 0.2) ** 2))
  return {
    parts: [],
    main: sample(t => env(t) * Math.cos(k.value * (t - 0.5)) * A),
    envelope: `${sample(t => env(t) * A)} ${sample(t => -env(t) * A)}`,
  }
})
</script>

<template>
  <svg
    class="motif wave"
    :viewBox="`-2 -20 ${width + 4} 40`"
    :style="{ height }"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="gid" gradientUnits="userSpaceOnUse" x1="0" y1="0" :x2="width" y2="0">
        <stop offset="0" style="stop-color: var(--cyan)" />
        <stop offset="0.5" style="stop-color: var(--violet)" />
        <stop offset="1" style="stop-color: var(--magenta)" />
      </linearGradient>
    </defs>
    <path :d="`M0 0 H${width}`" class="baseline" />
    <path v-if="paths.envelope" :d="paths.envelope" class="envelope" />
    <path v-if="paths.parts[0]" :d="paths.parts[0]" class="part part--a" />
    <path v-if="paths.parts[1]" :d="paths.parts[1]" class="part part--b" />
    <path :d="paths.main" class="main" :stroke="`url(#${gid})`" />
  </svg>
</template>

<style scoped>
.wave {
  display: block;
  width: auto;
  overflow: visible;
}

.wave path {
  fill: none;
}

.baseline {
  stroke: var(--ink-soft);
  stroke-width: 0.6;
  stroke-dasharray: 2 3;
  opacity: 0.6;
}

.envelope {
  stroke: var(--violet);
  stroke-width: 0.7;
  stroke-dasharray: 3 3;
  opacity: 0.55;
}

.part {
  stroke-width: 0.8;
  opacity: 0.6;
}

.part--a { stroke: var(--cyan); }
.part--b { stroke: var(--magenta); }

.main {
  stroke-width: 1.8;
  stroke-linecap: round;
}
</style>
