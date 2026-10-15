<!--
  A Roman arch with a stylised brain standing in its opening.

    <Arch>
      <div>II</div>
    </Arch>

  Voussoirs and an ochre keystone above; inside the opening, a brain seen
  from above. The left hemisphere is drawn as organic folds and the right
  as circuit traces, the same continuity the temple's columns make between
  stone and pixels.

  The default slot is overlaid in the upper part of the opening — the
  section layout puts its numeral there. Sized by height; aspect 300:340.
-->
<script setup lang="ts">
const CX = 150
const CY = 170
const R_OUT = 120
const R_IN = 92
const SEGMENTS = 13
const KEY = Math.floor(SEGMENTS / 2)

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180
  return [+(CX + r * Math.cos(a)).toFixed(2), +(CY - r * Math.sin(a)).toFixed(2)]
}

const joints = Array.from({ length: SEGMENTS - 1 }, (_, j) => {
  const deg = 180 - ((j + 1) * 180) / SEGMENTS
  const [x1, y1] = polar(R_IN, deg)
  const [x2, y2] = polar(R_OUT, deg)
  return `M${x1} ${y1} L${x2} ${y2}`
}).join(' ')

const keystone = (() => {
  const a0 = 180 - (KEY * 180) / SEGMENTS
  const a1 = 180 - ((KEY + 1) * 180) / SEGMENTS
  const [ax, ay] = polar(R_IN, a0)
  const [bx, by] = polar(R_OUT + 10, a0 + 1.5)
  const [cx, cy] = polar(R_OUT + 10, a1 - 1.5)
  const [dx, dy] = polar(R_IN, a1)
  return `M${ax} ${ay} L${bx} ${by} L${cx} ${cy} L${dx} ${dy} Z`
})()

const ring = (r: number) => `M${CX - r} ${CY} A${r} ${r} 0 0 1 ${CX + r} ${CY}`

// Brain, seen from above, centred in the lower half of the opening.
const BRAIN_LEFT =
  'M150 256 C138 250 118 250 110 260 C98 262 90 274 92 286 ' +
  'C86 296 92 310 104 312 C112 320 136 322 150 316'
const mirror = (d: string) =>
  d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${300 - +x} ${y}`)
const BRAIN_RIGHT = mirror(BRAIN_LEFT)

const GYRI = [
  'M146 264 C136 260 130 270 122 266 C115 262 108 266 104 272',
  'M146 280 C138 276 132 288 124 284 C116 280 108 286 99 290',
  'M146 298 C136 294 130 306 121 300 C114 296 108 300 103 305',
  'M124 266 C126 272 121 276 124 284',
  'M121 300 C118 306 124 310 122 316',
]

const TRACES = [
  { d: 'M154 268 H166 L172 262 H184', end: [184, 262] },
  { d: 'M154 280 H176 L182 274 H196', end: [196, 274] },
  { d: 'M154 292 H188 L194 298 H199', end: [199, 298] },
  { d: 'M154 304 H168 L174 310 H182', end: [182, 310] },
]
const VIAS = [[166, 280], [176, 292], [172, 262]]
</script>

<template>
  <div class="motif arch">
    <svg viewBox="0 0 300 340" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g fill="none" style="stroke: var(--ink)" stroke-opacity="0.7" stroke-width="1.2">
        <path :d="ring(R_OUT)" />
        <path :d="ring(R_IN)" />
        <path :d="joints" stroke-opacity="0.45" stroke-width="0.9" />
        <!-- piers and imposts -->
        <path :d="`M${CX - R_OUT} ${CY} V330 M${CX - R_IN} ${CY + 8} V330 M${CX + R_IN} ${CY + 8} V330 M${CX + R_OUT} ${CY} V330`" />
        <path :d="`M${CX - R_OUT - 6} ${CY} H${CX - R_IN + 4} V${CY + 8} H${CX - R_OUT - 6} Z M${CX + R_IN - 4} ${CY} H${CX + R_OUT + 6} V${CY + 8} H${CX + R_IN - 4} Z`" style="fill: var(--marble)" />
        <path d="M14 330 H286" />
      </g>
      <path :d="keystone" style="fill: var(--ochre); stroke: var(--ochre)" fill-opacity="0.22" stroke-width="1.2" />

      <!-- inner course of the opening, drawn as a dotted grid line -->
      <path :d="ring(R_IN - 10)" fill="none" style="stroke: var(--vein)" stroke-width="1" stroke-dasharray="1 5" stroke-linecap="round" />

      <!-- the brain: folds on the left, circuitry on the right -->
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path :d="BRAIN_LEFT" style="stroke: var(--ink)" stroke-opacity="0.75" stroke-width="1.5" />
        <path v-for="(d, i) in GYRI" :key="i" :d="d" style="stroke: var(--terracotta)" stroke-opacity="0.7" stroke-width="1.2" />
        <path :d="BRAIN_RIGHT" style="stroke: var(--aegean)" stroke-opacity="0.85" stroke-width="1.5" />
        <path v-for="(t, i) in TRACES" :key="i" :d="t.d" style="stroke: var(--aegean)" stroke-opacity="0.8" stroke-width="1.2" />
        <path d="M150 256 C147 270 153 284 150 298 C148 306 151 312 150 316" style="stroke: var(--ochre)" stroke-width="1.4" />
      </g>
      <circle v-for="(t, i) in TRACES" :key="`p${i}`" :cx="t.end[0]" :cy="t.end[1]" r="2.4" style="fill: var(--marble); stroke: var(--aegean)" stroke-width="1.2" />
      <rect v-for="([x, y], i) in VIAS" :key="`v${i}`" :x="x - 1.6" :y="y - 1.6" width="3.2" height="3.2" style="fill: var(--aegean)" />
      <path d="M126 330 H174" style="stroke: var(--terracotta)" stroke-width="2" />
    </svg>
    <div v-if="$slots.default" class="arch-slot">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.arch {
  position: relative;
  aspect-ratio: 300 / 340;
  height: 100%;
}

.arch svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* The opening runs from y≈78 to y=330 of 340; the slot sits in its upper
   half, clear of the brain at the threshold. */
.arch-slot {
  position: absolute;
  left: 30%;
  right: 30%;
  top: 38%;
  height: 26%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
