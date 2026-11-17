<!--
  A Bloch sphere drawn as a lab instrument: wireframe sphere, axes, the
  state vector with its projections and angles, a dial around the outside,
  and a scatter of measurement "shots" at the poles — as many at |0⟩ and
  |1⟩ as the state's probabilities say there should be.

    <BlochSphere />                          default state, θ 55°, φ 35°
    <BlochSphere :theta="90" :phi="0" />     |+⟩, on the equator
    <BlochSphere :hud="false" :shots="0" />  just the sphere

  Props:
    theta, phi — the state, in degrees
    shots      — measurement dots to scatter at the poles (0 to hide)
    hud        — the dial and the read-out in the corners
    animate    — precession dashes along the state's latitude
    seed       — for the scatter; the same seed always draws the same dots

  Scales to the width of its container.
-->
<script setup lang="ts">
import { computed, useId } from 'vue'
import { ketPath, project, rng, safeId, sphereCircle } from '../composables/motif'

const props = defineProps({
  theta: { type: Number, default: 55 },
  phi: { type: Number, default: 35 },
  shots: { type: Number, default: 64 },
  hud: { type: Boolean, default: true },
  animate: { type: Boolean, default: true },
  seed: { type: Number, default: 7 },
})

const uid = useId() ?? 'x'
const ids = {
  vec: safeId('bloch-vec', uid),
  glass: safeId('bloch-glass', uid),
  rim: safeId('bloch-rim', uid),
}

const R = 100
const f = (n: number) => Math.round(n * 100) / 100
const rad = (d: number) => (d * Math.PI) / 180
const P = (v: [number, number, number], r = R) => project(v, r)

const th = computed(() => rad(props.theta))
const ph = computed(() => rad(props.phi))

const unit = (t: number, p: number): [number, number, number] =>
  [Math.sin(t) * Math.cos(p), Math.sin(t) * Math.sin(p), Math.cos(t)]

const latitude = (polar: number) => (t: number): [number, number, number] =>
  [Math.sin(polar) * Math.cos(t), Math.sin(polar) * Math.sin(t), Math.cos(polar)]

const meridian = (az: number) => (t: number): [number, number, number] =>
  [Math.sin(t) * Math.cos(az), Math.sin(t) * Math.sin(az), Math.cos(t)]

const rings = computed(() => ({
  equator: sphereCircle(latitude(Math.PI / 2), R),
  lats: [Math.PI / 4, (3 * Math.PI) / 4].map(p => sphereCircle(latitude(p), R)),
  meridians: [0, Math.PI / 3, (2 * Math.PI) / 3].map(a => sphereCircle(meridian(a), R)),
  precession: sphereCircle(latitude(th.value), R),
}))

const line = (a: [number, number, number], b: [number, number, number]) => {
  const p = P(a)
  const q = P(b)
  return `M${f(p.x)} ${f(p.y)} L${f(q.x)} ${f(q.y)}`
}

const axes = computed(() => ({
  z: line([0, 0, -1.2], [0, 0, 1.2]),
  x: line([-1.2, 0, 0], [1.25, 0, 0]),
  y: line([0, -1.2, 0], [0, 1.25, 0]),
}))

const state = computed(() => {
  const v = unit(th.value, ph.value)
  const foot: [number, number, number] = [v[0], v[1], 0]
  const tip = P(v)
  // Small arcs for θ (from the pole) and φ (from the x axis).
  let thetaArc = ''
  for (let i = 0; i <= 24; i++) {
    const p = P(unit((th.value * i) / 24, ph.value), R * 0.32)
    thetaArc += `${i ? 'L' : 'M'}${f(p.x)} ${f(p.y)} `
  }
  let phiArc = ''
  for (let i = 0; i <= 24; i++) {
    const p = P(unit(Math.PI / 2, (ph.value * i) / 24), R * 0.36)
    phiArc += `${i ? 'L' : 'M'}${f(p.x)} ${f(p.y)} `
  }
  const thetaLabel = P(unit(th.value / 2, ph.value), R * 0.46)
  const phiLabel = P(unit(Math.PI / 2, ph.value / 2), R * 0.5)
  return {
    tip,
    vector: `M0 0 L${f(tip.x)} ${f(tip.y)}`,
    drop: line(v, foot),
    shadow: line([0, 0, 0], foot),
    thetaArc,
    phiArc,
    thetaLabel,
    phiLabel,
  }
})

// Font sizes for the basis labels live in CSS, not attributes: Slidev's
// UnoCSS attributify mode reads `font-size="6"` as a utility (1.5rem).

// Measurement shots: each lands at |0⟩ with probability cos²(θ/2), at |1⟩
// otherwise, and is scattered a little around its pole.
const shots = computed(() => {
  const r = rng(props.seed)
  const p0 = Math.cos(th.value / 2) ** 2
  return Array.from({ length: props.shots }, () => {
    const zero = r() < p0
    const spread = 0.12 + r() * 0.34
    const az = r() * Math.PI * 2
    const v = unit(zero ? spread : Math.PI - spread, az)
    const p = P(v, R * 1.005)
    return {
      x: f(p.x),
      y: f(p.y),
      r: f(0.9 + r() * 1.5),
      zero,
      front: p.depth >= 0,
    }
  })
})

const probability = computed(() => Math.cos(th.value / 2) ** 2)

const labels = computed(() => {
  const top = P([0, 0, 1.2])
  const bottom = P([0, 0, -1.2])
  const x = P([1.25, 0, 0])
  const y = P([0, 1.25, 0])
  const size = 12
  return {
    zero: { ...ketPath(top.x + 8, top.y + 4, size, 1), y: top.y + 4, size },
    one: { ...ketPath(bottom.x + 8, bottom.y + 4, size, 1), y: bottom.y + 4, size },
    plus: { ...ketPath(x.x + 6, x.y + 4, 10, 1), y: x.y + 4, size: 10 },
    i: { ...ketPath(y.x - 6, y.y + 12, 10, 1, 'end'), y: y.y + 12, size: 10 },
  }
})

// Dial ticks: every 6°, longer every 30°.
const ticks = computed(() => {
  let d = ''
  for (let a = 0; a < 360; a += 6) {
    const long = a % 30 === 0
    const r1 = 134
    const r2 = long ? 143 : 138
    const c = Math.cos(rad(a))
    const s = Math.sin(rad(a))
    d += `M${f(r1 * c)} ${f(r1 * s)} L${f(r2 * c)} ${f(r2 * s)} `
  }
  return d
})
</script>

<template>
  <svg class="motif bloch" viewBox="-165 -160 330 320" aria-hidden="true">
    <defs>
      <linearGradient :id="ids.vec" gradientUnits="userSpaceOnUse" x1="0" y1="0" :x2="state.tip.x" :y2="state.tip.y">
        <stop offset="0" style="stop-color: var(--cyan)" />
        <stop offset="0.55" style="stop-color: var(--violet)" />
        <stop offset="1" style="stop-color: var(--magenta)" />
      </linearGradient>
      <radialGradient :id="ids.glass" cx="0.36" cy="0.3" r="0.75">
        <stop offset="0" stop-color="#fff" stop-opacity="0.95" />
        <stop offset="0.6" style="stop-color: var(--paper)" stop-opacity="0.75" />
        <stop offset="1" style="stop-color: var(--violet)" stop-opacity="0.14" />
      </radialGradient>
      <linearGradient :id="ids.rim" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" style="stop-color: var(--cyan)" />
        <stop offset="0.5" style="stop-color: var(--violet)" />
        <stop offset="1" style="stop-color: var(--magenta)" />
      </linearGradient>
    </defs>

    <!-- Dial -->
    <g v-if="hud" class="bloch-dial">
      <circle r="128" fill="none" class="hair" stroke-dasharray="1 4" />
      <path :d="ticks" class="hair" />
      <circle r="150" fill="none" :stroke="`url(#${ids.rim})`" stroke-width="0.8" stroke-dasharray="60 8 4 8" opacity="0.6" />
    </g>

    <!-- Back of the sphere -->
    <g fill="none" class="back">
      <path :d="rings.equator.back" />
      <path v-for="(r, i) in rings.lats" :key="`lb${i}`" :d="r.back" />
      <path v-for="(r, i) in rings.meridians" :key="`mb${i}`" :d="r.back" />
    </g>
    <g v-if="shots.length">
      <circle
        v-for="(s, i) in shots.filter(s => !s.front)" :key="`sb${i}`"
        :cx="s.x" :cy="s.y" :r="s.r"
        :style="{ fill: s.zero ? 'var(--cyan)' : 'var(--magenta)' }"
        opacity="0.22"
      />
    </g>

    <!-- Glass -->
    <circle :r="R" :fill="`url(#${ids.glass})`" />

    <!-- Axes -->
    <g class="axis" fill="none">
      <path :d="axes.z" />
      <path :d="axes.x" stroke-dasharray="3 3" />
      <path :d="axes.y" stroke-dasharray="3 3" />
    </g>

    <!-- Front of the sphere -->
    <g fill="none" class="front">
      <path :d="rings.equator.front" class="equator" />
      <path v-for="(r, i) in rings.lats" :key="`lf${i}`" :d="r.front" />
      <path v-for="(r, i) in rings.meridians" :key="`mf${i}`" :d="r.front" />
    </g>
    <circle :r="R" fill="none" class="rim" />

    <!-- Precession of the state around z -->
    <g fill="none" class="precession" :class="{ 'precession--animate': animate }">
      <path :d="rings.precession.back" opacity="0.35" />
      <path :d="rings.precession.front" />
    </g>

    <!-- Measurement shots -->
    <g v-if="shots.length">
      <circle
        v-for="(s, i) in shots.filter(s => s.front)" :key="`sf${i}`"
        :cx="s.x" :cy="s.y" :r="s.r"
        :style="{ fill: s.zero ? 'var(--cyan)' : 'var(--magenta)' }"
        opacity="0.7"
      />
    </g>

    <!-- State -->
    <g fill="none">
      <path :d="state.shadow" class="guide" />
      <path :d="state.drop" class="guide" />
      <path :d="state.thetaArc" class="angle" />
      <path :d="state.phiArc" class="angle" />
      <path :d="state.vector" :stroke="`url(#${ids.vec})`" stroke-width="2.6" stroke-linecap="round" />
    </g>
    <circle :cx="state.tip.x" :cy="state.tip.y" r="11" class="tip-halo" />
    <circle :cx="state.tip.x" :cy="state.tip.y" r="4.6" class="tip" />
    <circle r="2.4" class="origin" />
    <text :x="state.thetaLabel.x" :y="state.thetaLabel.y + 4" class="greek" text-anchor="middle">θ</text>
    <text :x="state.phiLabel.x" :y="state.phiLabel.y + 4" class="greek" text-anchor="middle">φ</text>

    <!-- Basis labels -->
    <g class="label">
      <text :x="labels.zero.textX" :y="labels.zero.y">0</text>
      <path :d="labels.zero.d" />
      <text :x="labels.one.textX" :y="labels.one.y">1</text>
      <path :d="labels.one.d" />
    </g>
    <g class="label label--minor">
      <text :x="labels.plus.textX" :y="labels.plus.y">+</text>
      <path :d="labels.plus.d" />
      <text :x="labels.i.textX" :y="labels.i.y">i</text>
      <path :d="labels.i.d" />
    </g>

    <!-- Read-out -->
    <g v-if="hud" class="readout">
      <text x="-160" y="-140"><tspan class="g">θ</tspan> = {{ theta }}°</text>
      <text x="-160" y="-127"><tspan class="g">φ</tspan> = {{ phi }}°</text>
      <text x="160" y="140" text-anchor="end">P(0) = {{ probability.toFixed(2) }}</text>
      <text x="160" y="153" text-anchor="end">P(1) = {{ (1 - probability).toFixed(2) }}</text>
    </g>
  </svg>
</template>

<style scoped>
.bloch {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.hair {
  stroke: var(--ink-soft);
  stroke-width: 0.7;
  opacity: 0.5;
}

.back path {
  stroke: var(--ink-soft);
  stroke-width: 0.6;
  stroke-dasharray: 2 3;
  opacity: 0.4;
}

.front path {
  stroke: var(--ink-soft);
  stroke-width: 0.8;
  opacity: 0.55;
}

.front .equator {
  stroke: var(--cyan);
  stroke-width: 1.1;
  opacity: 0.9;
}

.rim {
  stroke: var(--ink);
  stroke-width: 1.1;
  opacity: 0.7;
}

.axis path {
  stroke: var(--ink);
  stroke-width: 0.8;
  opacity: 0.55;
}

.precession path {
  stroke: var(--violet);
  stroke-width: 1.4;
  stroke-dasharray: 5 4;
}

.precession--animate path {
  animation: bloch-precess 6s linear infinite;
}

@keyframes bloch-precess {
  to { stroke-dashoffset: -90; }
}

@media (prefers-reduced-motion: reduce) {
  .precession--animate path { animation: none; }
}

.guide {
  stroke: var(--violet);
  stroke-width: 0.8;
  stroke-dasharray: 2 2.5;
  opacity: 0.8;
}

.angle {
  stroke: var(--magenta);
  stroke-width: 1;
}

.tip {
  fill: var(--magenta);
  stroke: #fff;
  stroke-width: 1.4;
}

.tip-halo {
  fill: var(--magenta);
  opacity: 0.16;
}

.origin {
  fill: var(--ink);
}

.greek {
  font-family: var(--font-body);
  font-style: italic;
  font-size: 11px;
  fill: var(--magenta);
}

.label text {
  font-size: 12px;
  font-family: var(--font-mono);
  font-weight: 500;
  fill: var(--ink);
}

.label path {
  fill: none;
  stroke: var(--ink);
  stroke-width: 1.1;
}

.label--minor text {
  font-size: 10px;
  fill: var(--ink-soft);
}

.label--minor path {
  stroke: var(--ink-soft);
  stroke-width: 0.9;
}

.readout .g {
  font-family: var(--font-body);
  font-style: italic;
  fill: var(--magenta);
}

.readout text {
  font-family: var(--font-mono);
  font-size: 8.5px;
  letter-spacing: 0.06em;
  fill: var(--ink-soft);
}
</style>
