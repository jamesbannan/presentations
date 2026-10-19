<!--
  The plain-language Bloch sphere: a globe with 0 at the north pole and 1
  at the south, and an arrow for the state. No angles, no axes labels, no
  maths, so it can carry the bit-versus-qubit story on its own.

    <Globe bit :theta="0" />            a classical bit: an arrow on a line, 0
    <Globe :theta="60" />                a qubit, a little north of the equator
    <Globe :theta="60" :ghosts="14" />   …with faint arrows showing it could point anywhere
    <Globe :theta="0" :was="60" />       …after it's read: snapped to 0, old arrow ghosted
    <Globe :theta="0" ask="ew" />        the same globe asked a different question: west or east?

  Props:
    theta    — degrees from the north pole (0 = 0, 180 = 1)
    phi      — degrees around the equator; only changes the drawing
    bit      — draw a classical bit: the globe fades back, the arrow goes ink
    ghosts   — faint arrows to other directions (seeded)
    latitude — draw the arrow's line of latitude
    was      — a previous theta: ghosts the old arrow and draws the snap
    seed     — for the ghosts
    ask      — which question a read asks: 'ns' (north or south, the
               default) or 'ew' (west or east, an axis drawn across the
               globe). An arrow points due east at theta 90, phi 28.65

  Scales to the width of its container. Font sizes and opacity live in the
  stylesheet, not in attributes: UnoCSS attributify reads those as utilities.
-->
<script setup lang="ts">
import { computed, useId } from 'vue'
import { project, rng, safeId, sphereCircle } from '../composables/motif'

const props = defineProps({
  theta: { type: Number, default: 60 },
  phi: { type: Number, default: 35 },
  bit: { type: Boolean, default: false },
  ghosts: { type: Number, default: 0 },
  latitude: { type: Boolean, default: false },
  was: { type: Number, default: null },
  seed: { type: Number, default: 13 },
  ask: { type: String, default: 'ns' },
})

const uid = useId() ?? 'x'
const ids = {
  vec: safeId('globe-vec', uid),
  glass: safeId('globe-glass', uid),
  head: safeId('globe-head', uid),
}

const R = 100
const f = (n: number) => Math.round(n * 100) / 100
const rad = (d: number) => (d * Math.PI) / 180
type V = [number, number, number]
const unit = (t: number, p: number): V => [Math.sin(t) * Math.cos(p), Math.sin(t) * Math.sin(p), Math.cos(t)]
const P = (v: V, r = R) => project(v, r)
const latitudeAt = (polar: number) => (t: number): V =>
  [Math.sin(polar) * Math.cos(t), Math.sin(polar) * Math.sin(t), Math.cos(polar)]
const meridian = (az: number) => (t: number): V =>
  [Math.sin(t) * Math.cos(az), Math.sin(t) * Math.sin(az), Math.cos(t)]

const wire = computed(() => ({
  equator: sphereCircle(latitudeAt(Math.PI / 2), R),
  lats: [Math.PI / 4, (3 * Math.PI) / 4].map(p => sphereCircle(latitudeAt(p), R)),
  meridians: [0, Math.PI / 3, (2 * Math.PI) / 3].map(a => sphereCircle(meridian(a), R)),
}))

const north = P([0, 0, 1])
const south = P([0, 0, -1])
const axis = (() => {
  const a = P([0, 0, 1.12])
  const b = P([0, 0, -1.12])
  return `M${f(a.x)} ${f(a.y)} L${f(b.x)} ${f(b.y)}`
})()

// Due east is the azimuth that the projection draws flat across the page.
const EAST = 0.5
const ew = (() => {
  const a = P([-1.12 * Math.cos(EAST), -1.12 * Math.sin(EAST), 0])
  const b = P([1.12 * Math.cos(EAST), 1.12 * Math.sin(EAST), 0])
  return { axis: `M${f(a.x)} ${f(a.y)} L${f(b.x)} ${f(b.y)}`, west: P([-Math.cos(EAST), -Math.sin(EAST), 0]), east: P([Math.cos(EAST), Math.sin(EAST), 0]) }
})()
const atSide = computed(() => {
  const d = Math.sin(rad(props.theta)) * Math.cos(rad(props.phi) - EAST)
  return d >= 0.999 ? 'e' : d <= -0.999 ? 'w' : null
})

const tip = computed(() => P(unit(rad(props.theta), rad(props.phi))))
const atPole = computed(() => (props.theta <= 0.5 ? 0 : props.theta >= 179.5 ? 1 : null))

const ring = computed(() =>
  props.latitude && atPole.value === null ? sphereCircle(latitudeAt(rad(props.theta)), R) : null,
)

// Ghost arrows: spread over the sphere (a Fibonacci spiral, jittered by the
// seed) so "anywhere" reads as anywhere, not as a cluster.
const ghostArrows = computed(() => {
  const r = rng(props.seed)
  const n = props.ghosts
  const golden = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: n }, (_, i) => {
    const z = 1 - ((i + 0.5) / n) * 2
    const t = Math.acos(Math.max(-1, Math.min(1, z + (r() - 0.5) * 0.18)))
    const p = i * golden + r() * 0.6
    const q = P(unit(t, p))
    return { x: f(q.x), y: f(q.y), front: q.depth >= 0 }
  })
})

// The snap: the old arrow, ghosted, and an arc along its meridian to where
// the arrow ends up.
const snap = computed(() => {
  if (props.was === null) return null
  const from = rad(props.was)
  const to = rad(props.theta)
  const ph = rad(props.phi)
  const old = P(unit(from, ph))
  const pts: string[] = []
  const n = 32
  for (let i = 0; i <= n; i++) {
    const t = from + ((to - from) * i) / n
    const q = P(unit(t, ph), R * 1.14)
    pts.push(`${i ? 'L' : 'M'}${f(q.x)} ${f(q.y)}`)
  }
  return { old: `M0 0 L${f(old.x)} ${f(old.y)}`, oldTip: old, arc: pts.join(' ') }
})
</script>

<template>
  <svg class="motif globe" :class="{ 'globe--bit': bit, 'globe--ew': ask === 'ew' }" viewBox="-130 -142 260 284" aria-hidden="true">
    <defs>
      <linearGradient :id="ids.vec" gradientUnits="userSpaceOnUse" x1="0" y1="0" :x2="tip.x" :y2="tip.y">
        <stop offset="0" style="stop-color: var(--cyan)" />
        <stop offset="0.55" style="stop-color: var(--violet)" />
        <stop offset="1" style="stop-color: var(--magenta)" />
      </linearGradient>
      <radialGradient :id="ids.glass" cx="0.36" cy="0.3" r="0.75">
        <stop offset="0" stop-color="#fff" stop-opacity="0.95" />
        <stop offset="0.6" style="stop-color: var(--paper)" stop-opacity="0.8" />
        <stop offset="1" style="stop-color: var(--violet)" stop-opacity="0.16" />
      </radialGradient>
      <marker :id="ids.head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" class="globe-snap-head" />
      </marker>
    </defs>

    <!-- Back of the globe -->
    <g class="globe-back" fill="none">
      <path :d="wire.equator.back" />
      <path v-for="(c, i) in wire.lats" :key="`lb${i}`" :d="c.back" />
      <path v-for="(c, i) in wire.meridians" :key="`mb${i}`" :d="c.back" />
      <path v-if="ring" :d="ring.back" class="globe-lat" />
    </g>
    <g class="globe-ghosts globe-ghosts--back">
      <template v-for="(g, i) in ghostArrows" :key="`gb${i}`">
        <template v-if="!g.front">
          <path :d="`M0 0 L${g.x} ${g.y}`" />
          <circle :cx="g.x" :cy="g.y" r="2.4" />
        </template>
      </template>
    </g>

    <circle :r="R" :fill="`url(#${ids.glass})`" class="globe-glass" />

    <!-- Front of the globe -->
    <g class="globe-front" fill="none">
      <path :d="wire.equator.front" class="globe-equator" />
      <path v-for="(c, i) in wire.lats" :key="`lf${i}`" :d="c.front" />
      <path v-for="(c, i) in wire.meridians" :key="`mf${i}`" :d="c.front" />
      <path v-if="ring" :d="ring.front" class="globe-lat" />
    </g>
    <circle :r="R" fill="none" class="globe-rim" />
    <path :d="axis" class="globe-axis" fill="none" />
    <path v-if="ask === 'ew'" :d="ew.axis" class="globe-axis globe-axis--ew" fill="none" />

    <g class="globe-ghosts">
      <template v-for="(g, i) in ghostArrows" :key="`gf${i}`">
        <template v-if="g.front">
          <path :d="`M0 0 L${g.x} ${g.y}`" />
          <circle :cx="g.x" :cy="g.y" r="2.6" />
        </template>
      </template>
    </g>

    <!-- The snap after a read -->
    <g v-if="snap" class="globe-snap" fill="none">
      <path :d="snap.old" class="globe-snap-old" />
      <circle :cx="snap.oldTip.x" :cy="snap.oldTip.y" r="3.6" class="globe-snap-oldtip" />
      <path :d="snap.arc" class="globe-snap-arc" :marker-end="`url(#${ids.head})`" />
    </g>

    <!-- The arrow -->
    <path
      :d="`M0 0 L${f(tip.x)} ${f(tip.y)}`"
      class="globe-arrow"
      :stroke="bit ? undefined : `url(#${ids.vec})`"
      fill="none"
    />
    <circle :cx="tip.x" :cy="tip.y" r="12" class="globe-tip-halo" />
    <circle :cx="tip.x" :cy="tip.y" r="5.2" class="globe-tip" />
    <circle r="2.6" class="globe-origin" />

    <!-- Poles -->
    <g class="globe-pole globe-pole--ns globe-pole--zero" :class="{ 'globe-pole--on': atPole === 0 }">
      <circle :cx="north.x" :cy="north.y - 24" r="12" />
      <text :x="north.x" :y="north.y - 24" text-anchor="middle" dominant-baseline="central">0</text>
    </g>
    <g class="globe-pole globe-pole--ns globe-pole--one" :class="{ 'globe-pole--on': atPole === 1 }">
      <circle :cx="south.x" :cy="south.y + 24" r="12" />
      <text :x="south.x" :y="south.y + 24" text-anchor="middle" dominant-baseline="central">1</text>
    </g>

    <template v-if="ask === 'ew'">
      <g class="globe-pole globe-pole--zero" :class="{ 'globe-pole--on': atSide === 'w' }">
        <circle :cx="ew.west.x - 22" :cy="ew.west.y" r="12" />
        <text :x="ew.west.x - 22" :y="ew.west.y" text-anchor="middle" dominant-baseline="central">W</text>
      </g>
      <g class="globe-pole globe-pole--one" :class="{ 'globe-pole--on': atSide === 'e' }">
        <circle :cx="ew.east.x + 22" :cy="ew.east.y" r="12" />
        <text :x="ew.east.x + 22" :y="ew.east.y" text-anchor="middle" dominant-baseline="central">E</text>
      </g>
    </template>
  </svg>
</template>

<style scoped>
.globe {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.globe-back path {
  stroke: var(--ink-soft);
  stroke-width: 0.6;
  stroke-dasharray: 2 3;
  opacity: 0.35;
}

.globe-front path {
  stroke: var(--ink-soft);
  stroke-width: 0.8;
  opacity: 0.5;
}

.globe-front .globe-equator {
  stroke: var(--cyan);
  stroke-width: 1.1;
  opacity: 0.8;
}

.globe-back .globe-lat,
.globe-front .globe-lat {
  stroke: var(--violet);
  stroke-width: 1.4;
  stroke-dasharray: 5 4;
  opacity: 0.9;
}

.globe-back .globe-lat {
  opacity: 0.35;
}

.globe-rim {
  stroke: var(--ink);
  stroke-width: 1.2;
  opacity: 0.7;
}

.globe-axis {
  stroke: var(--ink);
  stroke-width: 0.8;
  opacity: 0.45;
}

.globe-ghosts path {
  stroke: var(--violet);
  stroke-width: 1.2;
  stroke-linecap: round;
  opacity: 0.28;
}

.globe-ghosts circle {
  fill: var(--violet);
  opacity: 0.4;
}

.globe-ghosts--back path,
.globe-ghosts--back circle {
  opacity: 0.12;
}

.globe-snap-old {
  stroke: var(--ink-soft);
  stroke-width: 1.6;
  stroke-dasharray: 3 3;
  opacity: 0.55;
}

.globe-snap-oldtip {
  fill: var(--paper);
  stroke: var(--ink-soft);
  stroke-width: 1.2;
  stroke-dasharray: 2 2;
}

.globe-snap-arc {
  stroke: var(--magenta);
  stroke-width: 1.6;
  stroke-dasharray: 4 3;
}

.globe-snap-head {
  fill: var(--magenta);
}

.globe-arrow {
  stroke-width: 4;
  stroke-linecap: round;
}

.globe-tip {
  fill: var(--magenta);
  stroke: #fff;
  stroke-width: 1.6;
}

.globe-tip-halo {
  fill: var(--magenta);
  opacity: 0.16;
}

.globe-origin {
  fill: var(--ink);
}

.globe-pole circle {
  fill: var(--paper);
  stroke-width: 1.4;
}

.globe-pole text {
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 14px;
}

.globe-pole--zero circle { stroke: var(--cyan); }
.globe-pole--zero text { fill: var(--cyan); }
.globe-pole--one circle { stroke: var(--magenta); }
.globe-pole--one text { fill: var(--magenta); }

.globe-pole--on.globe-pole--zero circle { fill: var(--cyan); }
.globe-pole--on.globe-pole--one circle { fill: var(--magenta); }
.globe-pole--on text { fill: #fff; }

/* Asked west-or-east: that axis is the one that counts, so north and south
   step back. */
.globe-axis--ew {
  stroke: var(--violet);
  stroke-width: 1.6;
  stroke-dasharray: 5 4;
  opacity: 0.9;
}

.globe--ew .globe-axis:not(.globe-axis--ew) {
  opacity: 0.2;
}

.globe--ew .globe-pole--ns {
  opacity: 0.3;
}

/* A classical bit: the globe is there to be ignored. Only the line between
   the poles counts, and the arrow is plain ink. */
.globe--bit .globe-back path,
.globe--bit .globe-front path {
  opacity: 0.14;
}

.globe--bit .globe-glass {
  opacity: 0.35;
}

.globe--bit .globe-rim {
  opacity: 0.2;
  stroke-dasharray: 3 4;
}

.globe--bit .globe-axis {
  stroke-width: 2;
  opacity: 0.35;
}

.globe--bit .globe-arrow {
  stroke: var(--ink);
}

.globe--bit .globe-tip {
  fill: var(--ink);
}

.globe--bit .globe-tip-halo {
  fill: var(--ink);
  opacity: 0.08;
}
</style>
