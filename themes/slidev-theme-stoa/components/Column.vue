<!--
  A single column, standing upright as a divider: fluted at the foot, pixels
  towards the capital. Used between the two halves of `two-cols`.

    <Column />
    <Column :dissolve="0.5" :seed="3" />

  `dissolve` is the share of the shaft, measured from the capital down, that
  has turned to pixels. Sized by height; the shaft stretches, the capital and
  base keep their proportions.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { rng } from '../composables/motif'

const props = defineProps({
  dissolve: { type: Number, default: 0.5 },
  seed: { type: Number, default: 1966 },
})

const H = 400
const TOP = 16
const BOTTOM = H - 14
const CX = 24

const cut = computed(() => TOP + (BOTTOM - TOP) * Math.min(1, Math.max(0, props.dissolve)))

const pixels = computed(() => {
  const r = rng(props.seed)
  const size = 4.4
  const out: { x: number, y: number, o: number }[] = []
  const rows = Math.floor((cut.value - TOP) / size)
  for (let row = 0; row < rows; row++) {
    const y = cut.value - (row + 1) * size
    const h = 1 - (y - TOP) / (cut.value - TOP) // 0 at the cut, 1 at the capital
    for (let c = 0; c < 4; c++) {
      const x = CX - 9 + c * size
      if (r() > 0.1 + 0.7 * h * h)
        out.push({ x, y, o: +(0.3 + r() * 0.5).toFixed(2) })
      else if (r() < 0.4)
        out.push({ x: +(x + (r() - 0.5) * 22).toFixed(1), y, o: +(0.12 + r() * 0.25).toFixed(2) })
    }
  }
  return out
})
</script>

<template>
  <svg class="motif column" :viewBox="`0 0 48 ${H}`" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <g fill="none" style="stroke: var(--ink)" stroke-opacity="0.65" stroke-width="1">
      <rect x="10" y="4" width="28" height="5" style="fill: var(--marble)" />
      <path :d="`M12 9 L15 ${TOP} H33 L36 9`" />
      <path :d="`M15 ${cut} V${BOTTOM} M33 ${cut} V${BOTTOM}`" />
      <path :d="`M19.5 ${cut} V${BOTTOM} M24 ${cut} V${BOTTOM} M28.5 ${cut} V${BOTTOM}`" stroke-opacity="0.3" />
      <rect x="12" :y="BOTTOM" width="24" height="5" style="fill: var(--marble)" />
      <path :d="`M8 ${BOTTOM + 5} H40 V${H - 2} H8 Z`" />
    </g>
    <rect
      v-for="(p, i) in pixels"
      :key="i"
      :x="p.x + 0.5" :y="p.y + 0.5" width="3.4" height="3.4"
      style="fill: var(--aegean)" :fill-opacity="p.o"
    />
  </svg>
</template>

<style scoped>
.column {
  display: block;
  height: 100%;
  width: auto;
  overflow: visible;
}
</style>
