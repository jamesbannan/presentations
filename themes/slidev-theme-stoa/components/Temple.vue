<!--
  A temple front, drawn as a system diagram.

    <Temple />
    <Temple :columns="6" :dissolve="0.6" :seed="7" />

  - The pediment is a small feed-forward network: rows of 7, 5, 3 and 1
    nodes, fully connected, converging on the apex.
  - The frieze carries a row of bits where the triglyphs would be.
  - Columns on the left are fluted marble; moving right they resolve into
    pixels, and the topmost pixels drift off. `dissolve` is the share of the
    colonnade that has turned (0 = all marble, 1 = all pixels).

  The capitals and the entablature are drawn on every column regardless: the
  form persists, only the material changes. Sized by width; the viewBox is
  cropped tight to the drawing, so the aspect ratio is 29:20.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { rng } from '../composables/motif'

const props = defineProps({
  columns: { type: Number, default: 6 },
  dissolve: { type: Number, default: 0.6 },
  seed: { type: Number, default: 2026 },
})

const APEX = { x: 200, y: 34 }
const EAVE_Y = 110
const SHAFT_TOP = 140
const SHAFT_BOTTOM = 238

/* ---------------------------------------------------------- pediment -- */
const net = computed(() => {
  const rows = [
    { y: 101, n: 7, gap: 32 },
    { y: 88, n: 5, gap: 34 },
    { y: 72, n: 3, gap: 36 },
    { y: 56, n: 1, gap: 0 },
  ].map(({ y, n, gap }) =>
    Array.from({ length: n }, (_, i) => ({ x: APEX.x + (i - (n - 1) / 2) * gap, y })),
  )

  const edges: string[] = []
  for (let r = 0; r < rows.length - 1; r++) {
    for (const a of rows[r]) {
      for (const b of rows[r + 1])
        edges.push(`M${a.x} ${a.y} L${b.x} ${b.y}`)
    }
  }
  return { nodes: rows.flat(), edges: edges.join(' ') }
})

/* ------------------------------------------------------------ frieze -- */
const bits = computed(() => {
  const r = rng(props.seed + 11)
  return Array.from({ length: 36 }, (_, i) => (i % 9 === 8 ? ' ' : r() > 0.5 ? '1' : '0')).join('')
})

/* ----------------------------------------------------------- columns -- */
const cols = computed(() => {
  const n = Math.max(2, props.columns)
  const d = Math.min(1, Math.max(0, props.dissolve))
  const r = rng(props.seed)

  return Array.from({ length: n }, (_, i) => {
    const cx = 80 + i * (240 / (n - 1))
    const t = i / (n - 1)
    const amount = d === 0 ? 0 : Math.min(1, Math.max(0, (t - (1 - d)) / d + (1 / n)))

    // Below `cut` the shaft is still fluted stone; above it, pixels.
    const cut = SHAFT_TOP + (SHAFT_BOTTOM - SHAFT_TOP) * amount
    const flutes = [-9, -4.5, 0, 4.5, 9].map(o => `M${cx + o} ${cut} V${SHAFT_BOTTOM}`).join(' ')

    const cells: { x: number, y: number, o: number }[] = []
    const drift: { x: number, y: number, o: number }[] = []
    if (amount > 0) {
      const size = 4.4
      const rows = Math.floor((cut - SHAFT_TOP) / size)
      for (let row = 0; row < rows; row++) {
        const y = cut - (row + 1) * size
        const height = 1 - (y - SHAFT_TOP) / (SHAFT_BOTTOM - SHAFT_TOP) // 0 at foot, 1 at capital
        for (let c = 0; c < 5; c++) {
          const x = cx - 11 + c * size
          const loss = amount * (0.15 + 0.8 * height * height)
          if (r() > loss) {
            cells.push({ x, y, o: +(0.35 + r() * 0.45).toFixed(2) })
          }
          else if (r() < 0.55) {
            drift.push({
              x: +(x + 6 + r() * 26).toFixed(1),
              y: +(y - 2 - r() * 22).toFixed(1),
              o: +(0.15 + r() * 0.35).toFixed(2),
            })
          }
        }
      }
    }

    return { cx, cut, flutes, cells, drift, amount }
  })
})
</script>

<template>
  <svg class="motif temple" viewBox="26 26 348 240" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <!-- pediment -->
    <g fill="none" stroke-linejoin="miter">
      <path
        :d="`M36 ${EAVE_Y} L${APEX.x} ${APEX.y} L364 ${EAVE_Y} Z`"
        style="stroke: var(--ink)" stroke-opacity="0.7" stroke-width="1.2"
      />
      <path d="M62 105 L200 43 L338 105 Z" style="stroke: var(--vein)" stroke-width="0.8" />
      <path :d="net.edges" style="stroke: var(--aegean)" stroke-opacity="0.32" stroke-width="0.6" />
    </g>
    <circle
      v-for="(p, i) in net.nodes"
      :key="`n${i}`"
      :cx="p.x" :cy="p.y"
      :r="i === net.nodes.length - 1 ? 3.4 : 2.2"
      :style="i === net.nodes.length - 1
        ? 'fill: var(--ochre); stroke: var(--ochre)'
        : 'fill: var(--marble); stroke: var(--aegean)'"
      stroke-width="1"
    />

    <!-- entablature: cornice, frieze of bits, architrave -->
    <g fill="none" style="stroke: var(--ink)" stroke-opacity="0.7" stroke-width="1.2">
      <path :d="`M30 ${EAVE_Y} H370`" />
      <path d="M40 116 H360 M54 130 H346 M54 116 V130 M346 116 V130" stroke-width="0.9" />
    </g>
    <text
      x="200" y="126.2"
      text-anchor="middle"
      class="temple-bits"
      textLength="280"
      lengthAdjust="spacing"
    >{{ bits }}</text>

    <!-- columns -->
    <g v-for="(c, i) in cols" :key="`c${i}`">
      <!-- capital: abacus and echinus -->
      <rect :x="c.cx - 15" y="130" width="30" height="4.5" style="fill: var(--marble); stroke: var(--ink)" stroke-opacity="0.7" stroke-width="1" />
      <path :d="`M${c.cx - 13} 134.5 L${c.cx - 11} ${SHAFT_TOP} H${c.cx + 11} L${c.cx + 13} 134.5`" fill="none" style="stroke: var(--ink)" stroke-opacity="0.7" stroke-width="1" />

      <!-- stone: outline and flutes up to the cut -->
      <g fill="none" style="stroke: var(--ink)" stroke-width="0.8">
        <path :d="`M${c.cx - 11} ${c.cut} V${SHAFT_BOTTOM} M${c.cx + 11} ${c.cut} V${SHAFT_BOTTOM}`" stroke-opacity="0.75" />
        <path :d="c.flutes" stroke-opacity="0.35" />
      </g>

      <!-- pixels above the cut, and the ones that got away -->
      <rect
        v-for="(p, j) in c.cells"
        :key="`p${j}`"
        :x="p.x + 0.5" :y="p.y + 0.5" width="3.4" height="3.4"
        style="fill: var(--aegean)" :fill-opacity="p.o"
      />
      <rect
        v-for="(p, j) in c.drift"
        :key="`d${j}`"
        :x="p.x" :y="p.y" width="3" height="3"
        style="fill: var(--aegean)" :fill-opacity="p.o"
      />

      <!-- base -->
      <rect :x="c.cx - 13" :y="SHAFT_BOTTOM" width="26" height="4" style="fill: var(--marble); stroke: var(--ink)" stroke-opacity="0.7" stroke-width="1" />
    </g>

    <!-- stylobate -->
    <g fill="none" style="stroke: var(--ink)" stroke-opacity="0.7" stroke-width="1">
      <path d="M50 242 H350 M50 242 V248 M350 242 V248" />
      <path d="M42 248 H358 M42 248 V254 M358 248 V254" />
      <path d="M34 254 H366 M34 254 V260 M366 254 V260 M34 260 H366" />
    </g>
  </svg>
</template>

<style scoped>
.temple {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.temple-bits {
  font-family: var(--font-mono);
  font-size: 8.5px;
  fill: var(--ink-soft);
  fill-opacity: 0.75;
}
</style>
