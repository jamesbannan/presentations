<!--
  A Greek key that unrolls into circuit traces.

    <Meander :periods="24" />          key on the left, traces running right
    <Meander :periods="24" flip />     mirrored: traces on the left
    <Meander :periods="12" :traces="false" />

  The frieze is drawn on a 10-unit grid with line and gap the same width, like
  a carved key, and sized by height (default 22px): more periods means a
  longer band at the same grain. Below ~20px the key closes up into a bar. The stroke runs from
  terracotta through to aegean: the same line, two technologies.
-->
<script setup lang="ts">
import { computed, useId } from 'vue'
import { safeId } from '../composables/motif'

const props = defineProps({
  periods: { type: Number, default: 16 },
  traces: { type: Boolean, default: true },
  flip: { type: Boolean, default: false },
  height: { type: String, default: '22px' },
})

const gid = safeId('meander', useId() ?? 'x')
const U = 10
const TAIL = 56

const X = computed(() => props.periods * U)
const W = computed(() => X.value + (props.traces ? TAIL : 0))

// Running key: up, across, and a squared spiral back down to the baseline,
// which is where the next period starts. Each period ends at (x + 10, 8).
const key = computed(() => {
  let d = 'M0 8'
  for (let i = 0; i < props.periods; i++) {
    const x = i * U
    d += ` V0 H${x + 8} V6 H${x + 4} V4 H${x + 6} V2 H${x + 2} V8 H${x + 10}`
  }
  return d
})

const borders = computed(() => `M0 -2 H${X.value} M0 10 H${X.value}`)

// Where the frieze ends, its three lines carry on as PCB traces: 45° jogs,
// terminating pads, and a few packets in flight on the middle line.
const circuit = computed(() => {
  const x = X.value
  return {
    paths: [
      `M${x} -2 H${x + 8} L${x + 11} -5 H${x + 34}`,
      `M${x} 8 H${x + 4} L${x + 8} 4 H${x + 50}`,
      `M${x} 10 H${x + 16} L${x + 19} 13 H${x + 40}`,
      `M${x + 26} 4 L${x + 29} 1 H${x + 38}`,
    ],
    pads: [
      [x + 35.8, -5], [x + 51.8, 4], [x + 41.8, 13], [x + 39.8, 1],
    ],
    packets: [x + 16, x + 21, x + 44],
  }
})

const fade = computed(() => (props.traces ? Math.min(0.95, X.value / W.value) : 1))
</script>

<template>
  <svg
    class="motif meander"
    :class="{ 'meander--flip': flip }"
    :viewBox="`-1 -7 ${W + 2} 22`"
    :style="{ height }"
    preserveAspectRatio="xMinYMid meet"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="gid" gradientUnits="userSpaceOnUse" x1="0" y1="0" :x2="W" y2="0">
        <stop offset="0" style="stop-color: var(--terracotta)" />
        <stop :offset="fade * 0.55" style="stop-color: var(--terracotta)" />
        <stop :offset="fade * 0.98" style="stop-color: var(--ochre)" />
        <stop offset="1" style="stop-color: var(--aegean)" />
      </linearGradient>
    </defs>
    <g fill="none" :stroke="`url(#${gid})`" stroke-width="1" stroke-linecap="square">
      <path :d="borders" />
      <path :d="key" />
    </g>
    <g v-if="traces" fill="none" style="stroke: var(--aegean)" stroke-width="1" stroke-linejoin="round">
      <path v-for="(d, i) in circuit.paths" :key="i" :d="d" />
      <circle
        v-for="([cx, cy], i) in circuit.pads"
        :key="`p${i}`"
        :cx="cx" :cy="cy" r="1.8"
        style="fill: var(--marble)"
        stroke-width="0.9"
      />
      <rect
        v-for="(px, i) in circuit.packets"
        :key="`k${i}`"
        :x="px" y="2.6" width="3" height="2.8"
        style="fill: var(--aegean)" stroke="none"
      />
    </g>
  </svg>
</template>

<style scoped>
.meander {
  display: block;
  width: auto;
  overflow: visible;
}

.meander--flip {
  transform: scaleX(-1);
}
</style>
