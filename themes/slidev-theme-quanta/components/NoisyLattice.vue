<!--
  The lattice problem behind ML-KEM and ML-DSA, in two dimensions: a
  slanted grid of points, and a star that's one of them nudged by a little
  noise. Finding the grid point nearest the star is the secret. Easy by eye
  here; the real thing has hundreds of dimensions.

    <NoisyLattice />                    the answer shown
    <NoisyLattice :solved="$clicks >= 1" />   reveal the answer on a click

  Props:
    hidden  — [i, j]: which grid point the star is nudged from
    noise   — [dx, dy]: the nudge, in SVG units (keep it under half the
              grid spacing so the nearest point stays the hidden one)
    solved  — ring the hidden point and join it to the star
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  hidden: { type: Array as () => number[], default: () => [3, 2] },
  noise: { type: Array as () => number[], default: () => [16, 8] },
  solved: { type: Boolean, default: true },
})

const W = 440
const H = 330
const PAD = 18
const ORIGIN = [-70, 8]
const B1 = [66, 17]
const B2 = [27, 61]
const f = (n: number) => Math.round(n * 100) / 100
const at = (i: number, j: number) => [f(ORIGIN[0] + i * B1[0] + j * B2[0]), f(ORIGIN[1] + i * B1[1] + j * B2[1])]

const model = computed(() => {
  const points: { x: number; y: number; key: string }[] = []
  for (let i = -6; i <= 12; i++) {
    for (let j = -4; j <= 10; j++) {
      const [x, y] = at(i, j)
      if (x > PAD && x < W - PAD && y > PAD && y < H - PAD) points.push({ x, y, key: `${i},${j}` })
    }
  }
  const [hx, hy] = at(props.hidden[0], props.hidden[1])
  const star = { x: f(hx + props.noise[0]), y: f(hy + props.noise[1]) }
  return { points, secret: { x: hx, y: hy }, star }
})

const starPath = (cx: number, cy: number, r: number) => {
  const pts = []
  for (let k = 0; k < 10; k++) {
    const a = -Math.PI / 2 + (k * Math.PI) / 5
    const rr = k % 2 ? r * 0.45 : r
    pts.push(`${f(cx + rr * Math.cos(a))},${f(cy + rr * Math.sin(a))}`)
  }
  return `M${pts.join('L')}Z`
}
</script>

<template>
  <svg class="motif noisy-lattice" :viewBox="`0 0 ${W} ${H}`" role="img"
    aria-label="A slanted grid of points and a star near one of them: finding the nearest grid point is the secret">
    <rect x="1" y="1" :width="W - 2" :height="H - 2" rx="6" class="nl-frame" />
    <circle v-for="p in model.points" :key="p.key" :cx="p.x" :cy="p.y" r="4" class="nl-point" />
    <g :class="['nl-answer', { 'nl-answer--hidden': !solved }]">
      <line :x1="model.secret.x" :y1="model.secret.y" :x2="model.star.x" :y2="model.star.y" class="nl-noise" />
      <circle :cx="model.secret.x" :cy="model.secret.y" r="11" class="nl-ring" />
      <circle :cx="model.secret.x" :cy="model.secret.y" r="5.5" class="nl-secret" />
      <text :x="model.secret.x - 16" :y="model.secret.y + 30" text-anchor="middle" class="nl-label nl-label--secret">secret</text>
    </g>
    <path :d="starPath(model.star.x, model.star.y, 13)" class="nl-star" />
    <text :x="model.star.x + 18" :y="model.star.y - 12" class="nl-label">public key</text>
  </svg>
</template>

<style scoped>
.noisy-lattice {
  display: block;
  width: 100%;
  height: auto;
}

.nl-frame {
  fill: rgba(255, 255, 255, 0.6);
  stroke: var(--grid);
}

.nl-point {
  fill: var(--ink-soft);
  opacity: 0.45;
}

.nl-star {
  fill: var(--violet);
}

.nl-answer {
  transition: opacity 0.5s ease;
}

.nl-answer--hidden {
  opacity: 0;
}

.nl-noise {
  stroke: var(--magenta);
  stroke-width: 1.6;
  stroke-dasharray: 4 4;
}

.nl-ring {
  fill: none;
  stroke: var(--magenta);
  stroke-width: 2;
}

.nl-secret {
  fill: var(--magenta);
}

.nl-label {
  font-family: var(--font-mono);
  font-size: 15px;
  fill: var(--violet);
}

.nl-label--secret {
  fill: var(--magenta);
}
</style>
