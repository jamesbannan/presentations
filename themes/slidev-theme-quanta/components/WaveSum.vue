<!--
  Two waves added together, twice: once in step, once out of step.

    <WaveSum />

  Top row: two matching waves, peak on peak, sum to one twice as tall.
  Bottom row: the second wave is flipped, peak on trough, so they sum to a
  flat line. Interference, the everyday version.
-->
<script setup lang="ts">
import { useId } from 'vue'
import { safeId } from '../composables/motif'

const gid = safeId('wavesum', useId() ?? 'x')
const f = (n: number) => Math.round(n * 100) / 100

const wave = (x0: number, x1: number, y: number, amp: number, cycles = 2.5) => {
  const steps = 90
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    d += `${i ? 'L' : 'M'}${f(x0 + t * (x1 - x0))} ${f(y - Math.sin(t * cycles * Math.PI * 2) * amp)} `
  }
  return d
}

const rows = [
  { label: 'In step', y: 0, sign: 1, sum: 'Twice as big' },
  { label: 'Out of step', y: 84, sign: -1, sum: 'Gone' },
].map(r => ({
  ...r,
  a: wave(0, 112, r.y + 28, 9),
  b: wave(0, 112, r.y + 56, 9 * r.sign),
  total: wave(150, 300, r.y + 42, r.sign > 0 ? 18 : 0),
}))
</script>

<template>
  <svg class="motif wavesum" viewBox="-4 -14 308 170" role="img"
    aria-label="Two waves in step add up to a bigger wave; out of step they cancel to a flat line">
    <defs>
      <linearGradient :id="gid" gradientUnits="userSpaceOnUse" x1="150" y1="0" x2="300" y2="0">
        <stop offset="0" style="stop-color: var(--cyan)" />
        <stop offset="0.5" style="stop-color: var(--violet)" />
        <stop offset="1" style="stop-color: var(--magenta)" />
      </linearGradient>
    </defs>
    <g v-for="r in rows" :key="r.label">
      <text class="wavesum-label" x="0" :y="r.y + 4">{{ r.label }}</text>
      <path :d="r.a" class="wavesum-part wavesum-part--a" />
      <text class="wavesum-op" x="56" :y="r.y + 47">+</text>
      <path :d="r.b" class="wavesum-part wavesum-part--b" />
      <text class="wavesum-op" x="131" :y="r.y + 48">=</text>
      <path :d="`M150 ${r.y + 42} H300`" class="wavesum-base" />
      <path :d="r.total" class="wavesum-total" :stroke="`url(#${gid})`" />
      <text class="wavesum-result" x="300" :y="r.y + 4" text-anchor="end">{{ r.sum }}</text>
    </g>
  </svg>
</template>

<style scoped>
.wavesum {
  display: block;
  width: 100%;
  overflow: visible;
}

.wavesum path {
  fill: none;
}

.wavesum-label,
.wavesum-result {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  fill: var(--violet);
}

.wavesum-result {
  fill: var(--ink-soft);
}

.wavesum-op {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  text-anchor: middle;
  fill: var(--ink-soft);
}

.wavesum-part {
  stroke-width: 2;
  stroke-linecap: round;
}

.wavesum-part--a { stroke: var(--cyan); }
.wavesum-part--b { stroke: var(--magenta); }

.wavesum-base {
  stroke: var(--ink-soft);
  stroke-width: 0.8;
  stroke-dasharray: 2 3;
  opacity: 0.6;
}

.wavesum-total {
  stroke-width: 3;
  stroke-linecap: round;
}
</style>
