<!--
  An atom as physicists actually draw it now: a fuzzy probability cloud,
  with the old Bohr orbits sketched over the top for old times' sake.

    <Orbital />
    <Orbital :seed="3" :cloud="300" />

  Props:
    cloud — points in the probability cloud
    seed  — the same seed always draws the same cloud

  Scales to the width of its container.
-->
<script setup lang="ts">
import { computed, useId } from 'vue'
import { rng, safeId } from '../composables/motif'

const props = defineProps({
  cloud: { type: Number, default: 220 },
  seed: { type: Number, default: 5 },
})

const gid = safeId('orbital', useId() ?? 'x')
const f = (n: number) => Math.round(n * 100) / 100

const ORBITS = [0, 60, 120]
const RX = 150
const RY = 50

// Box–Muller for a gaussian cloud, stretched along each orbit in turn so it
// reads as lobes rather than a ball.
const points = computed(() => {
  const r = rng(props.seed)
  const gauss = () => Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r())
  return Array.from({ length: props.cloud }, (_, i) => {
    const a = (ORBITS[i % 3] * Math.PI) / 180
    const u = gauss() * 62
    const v = gauss() * 20
    const x = u * Math.cos(a) - v * Math.sin(a)
    const y = u * Math.sin(a) + v * Math.cos(a)
    const d = Math.hypot(x, y)
    return {
      x: f(x),
      y: f(y),
      r: f(0.6 + r() * 1.3),
      o: f(Math.max(0.12, 0.7 - d / 180)),
      tone: ['cyan', 'violet', 'magenta'][i % 3],
    }
  })
})

const electrons = ORBITS.map((deg, i) => {
  const t = (i * 2.1 + 0.6)
  const a = (deg * Math.PI) / 180
  const x = RX * Math.cos(t)
  const y = RY * Math.sin(t)
  return { x: f(x * Math.cos(a) - y * Math.sin(a)), y: f(x * Math.sin(a) + y * Math.cos(a)) }
})

const nucleus = (() => {
  const r = rng(99)
  return Array.from({ length: 9 }, (_, i) => ({
    x: f((r() - 0.5) * 12),
    y: f((r() - 0.5) * 12),
    tone: i % 2 ? 'violet' : 'magenta',
  }))
})()
</script>

<template>
  <svg class="motif orbital" viewBox="-170 -170 340 340" aria-hidden="true">
    <defs>
      <linearGradient :id="gid" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" style="stop-color: var(--cyan)" />
        <stop offset="0.5" style="stop-color: var(--violet)" />
        <stop offset="1" style="stop-color: var(--magenta)" />
      </linearGradient>
    </defs>
    <circle r="165" class="orbital-ring" stroke-dasharray="1 5" />
    <circle
      v-for="(p, i) in points" :key="i"
      :cx="p.x" :cy="p.y" :r="p.r"
      :style="{ fill: `var(--${p.tone})`, opacity: p.o }"
    />
    <ellipse
      v-for="deg in ORBITS" :key="deg"
      :rx="RX" :ry="RY"
      :transform="`rotate(${deg})`"
      class="orbit"
      :stroke="`url(#${gid})`"
    />
    <circle v-for="(e, i) in electrons" :key="`e${i}`" :cx="e.x" :cy="e.y" r="9" class="e-halo" />
    <circle v-for="(e, i) in electrons" :key="`ec${i}`" :cx="e.x" :cy="e.y" r="4" class="e" />
    <circle
      v-for="(n, i) in nucleus" :key="`n${i}`"
      :cx="n.x" :cy="n.y" r="4.6"
      class="nucleon"
      :style="{ fill: `var(--${n.tone})` }"
    />
  </svg>
</template>

<style scoped>
.orbital {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.orbital-ring {
  fill: none;
  stroke: var(--ink-soft);
  stroke-width: 0.8;
  opacity: 0.5;
}

.orbit {
  fill: none;
  stroke-width: 1.2;
}

.e {
  fill: var(--cyan);
  stroke: #fff;
  stroke-width: 1.2;
}

.e-halo {
  fill: var(--cyan);
  opacity: 0.18;
}

.nucleon {
  stroke: #fff;
  stroke-width: 0.8;
}
</style>
