<!--
  A run of reads: one dot per read, cyan for 0 and magenta for 1, with the
  tally underneath as an <Odds> bar. Each read is drawn from the odds for an
  arrow `theta` degrees from the north pole, with a seeded generator, so the
  dots, the tally and the PDF always agree.

    <Shots :theta="55" />                       400 reads
    <Shots :theta="55" :reads="1000" :per-row="50" />
    <Shots :theta="55" sorted />                grouped: 0s first, then 1s

  Props:
    theta  — the arrow, in degrees from the north pole
    reads  — how many dots
    perRow — dots per row
    sorted — group the outcomes so the split reads as a bar
    seed   — for the reads
-->
<script setup lang="ts">
import { computed } from 'vue'
import { rng } from '../composables/motif'

const props = defineProps({
  theta: { type: Number, default: 55 },
  reads: { type: Number, default: 400 },
  perRow: { type: Number, default: 40 },
  sorted: { type: Boolean, default: false },
  seed: { type: Number, default: 21 },
})

const STEP = 10

const outcomes = computed(() => {
  const r = rng(props.seed)
  const p0 = Math.cos(((props.theta * Math.PI) / 180) / 2) ** 2
  const all = Array.from({ length: props.reads }, () => (r() < p0 ? 0 : 1))
  return props.sorted ? [...all].sort((a, b) => a - b) : all
})

const tally = computed(() => {
  const ones = outcomes.value.reduce((n, o) => n + o, 0)
  return [outcomes.value.length - ones, ones]
})

const rowCount = computed(() => Math.ceil(props.reads / props.perRow))
const dots = computed(() =>
  outcomes.value.map((o, i) => ({
    x: (i % props.perRow) * STEP + STEP / 2,
    y: Math.floor(i / props.perRow) * STEP + STEP / 2,
    o,
  })),
)
</script>

<template>
  <div class="shots">
    <svg
      class="shots-grid"
      :viewBox="`0 0 ${perRow * STEP} ${rowCount * STEP}`"
      aria-hidden="true"
    >
      <circle
        v-for="(d, i) in dots" :key="i"
        :cx="d.x" :cy="d.y" r="2.9"
        :class="d.o ? 'shots-one' : 'shots-zero'"
      />
    </svg>
    <Odds :counts="tally" />
  </div>
</template>

<style scoped>
.shots {
  width: 100%;
}

.shots-grid {
  display: block;
  width: 100%;
  height: auto;
  margin: 0.6em 0 0.9em;
}

.shots-zero {
  fill: var(--cyan);
  opacity: 0.85;
}

.shots-one {
  fill: var(--magenta);
  opacity: 0.85;
}
</style>
