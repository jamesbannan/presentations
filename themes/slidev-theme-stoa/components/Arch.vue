<!--
  A Roman arch whose inner rings are a signal glyph.

    <Arch>
      <div>II</div>
    </Arch>

  Voussoirs and an ochre keystone above; inside the opening, a transmitter
  at the threshold radiating dashed arcs. Arches carried water and roads;
  the same curve now means "connected".

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

const SIGNAL = { x: CX, y: 304 }
const waves = [20, 36, 52].map((r, i) => {
  const s = Math.SQRT1_2
  return {
    d: `M${SIGNAL.x - r * s} ${SIGNAL.y - r * s} A${r} ${r} 0 0 1 ${SIGNAL.x + r * s} ${SIGNAL.y - r * s}`,
    o: 0.85 - i * 0.22,
    dash: i === 0 ? 'none' : i === 1 ? '6 3' : '2 4',
  }
})
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

      <!-- the signal -->
      <g fill="none" style="stroke: var(--aegean)" stroke-width="1.6" stroke-linecap="round">
        <path v-for="(w, i) in waves" :key="i" :d="w.d" :stroke-opacity="w.o" :stroke-dasharray="w.dash" />
      </g>
      <circle :cx="SIGNAL.x" :cy="SIGNAL.y" r="4" style="fill: var(--aegean)" />
      <path :d="`M${SIGNAL.x - 24} 330 H${SIGNAL.x + 24}`" style="stroke: var(--terracotta)" stroke-width="2" />
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
   half, clear of the signal at the threshold. */
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
