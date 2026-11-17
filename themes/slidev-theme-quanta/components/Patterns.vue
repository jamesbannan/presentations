<!--
  Every pattern a register of `qubits` bits can hold, as a grid of cells
  (4 qubits: 16 cells, 0000 to 1111). What fills the cells says what the
  register is doing:

    <Patterns mode="bits" />    a classical register: one pattern, solid ink
    <Patterns mode="odds" />    qubits: a share of the odds on every pattern
    <Patterns mode="focus" />   after interference: the odds piled onto one
    <Patterns mode="grover" :rounds="1" />   Grover's search after that many
                                rounds, looking for `pick`: the exact odds

  The filled square's area is that pattern's share of the odds; in 'grover'
  mode it's to an absolute scale, so you can watch the answer grow. Cells are
  labelled in 'bits' mode, and only `pick` is in 'focus' mode (and in 'grover'
  mode once it holds most of the odds), so labels never sit on a small square.
  In 'grover' mode the `pick` cell is outlined so the target shows from round 0.

  Props:
    qubits — register width (default 4)
    mode   — 'bits' | 'odds' | 'focus' | 'grover'
    pick   — the pattern held ('bits') or found ('focus'), as an index
             (default 11, i.e. 1011)
    seed   — for the spread of odds in 'odds' mode
    rounds — Grover rounds applied in 'grover' mode (default 0)
-->
<script setup lang="ts">
import { computed } from 'vue'
import { rng } from '../composables/motif'

const props = defineProps({
  qubits: { type: Number, default: 4 },
  mode: { type: String, default: 'odds' },
  pick: { type: Number, default: 11 },
  seed: { type: Number, default: 7 },
  rounds: { type: Number, default: 0 },
})

const CELL = 50
const GAP = 6
const f = (n: number) => Math.round(n * 100) / 100

const across = computed(() => 2 ** Math.ceil(props.qubits / 2))
const down = computed(() => 2 ** Math.floor(props.qubits / 2))
const width = computed(() => across.value * CELL + (across.value - 1) * GAP)
const height = computed(() => down.value * CELL + (down.value - 1) * GAP)

const cells = computed(() => {
  const n = 2 ** props.qubits
  const r = rng(props.seed)
  // Grover: the target's odds after k rounds are sin²((2k+1)θ), sin θ = 1/√N.
  const hit = Math.sin((2 * props.rounds + 1) * Math.asin(1 / Math.sqrt(n))) ** 2
  const grover = props.mode === 'grover'
  const weights = Array.from({ length: n }, (_, i) => {
    if (props.mode === 'bits') return i === props.pick ? 1 : 0
    if (props.mode === 'focus') return i === props.pick ? 1 : 0.03
    if (grover) return i === props.pick ? hit : (1 - hit) / (n - 1)
    return 0.3 + 0.7 * r()
  })
  const top = grover ? 1 : Math.max(...weights)
  return weights.map((w, i) => {
    const side = Math.sqrt(w / top) * (CELL - 8)
    const x = (i % across.value) * (CELL + GAP)
    const y = Math.floor(i / across.value) * (CELL + GAP)
    return {
      x, y,
      cx: x + CELL / 2, cy: y + CELL / 2,
      side: f(side), sx: f(x + (CELL - side) / 2), sy: f(y + (CELL - side) / 2),
      label: i.toString(2).padStart(props.qubits, '0'),
      strong: i === props.pick,
      empty: w === 0,
      labelled: props.mode === 'bits' || (i === props.pick && (props.mode === 'focus' || (grover && hit > 0.4))),
    }
  })
})
</script>

<template>
  <svg class="motif patterns" :class="`patterns--${mode}`" :viewBox="`-2 -2 ${width + 4} ${height + 4}`" role="img"
    :aria-label="`${2 ** qubits} patterns of ${qubits} bits`">
    <g v-for="(c, i) in cells" :key="i">
      <rect :x="c.x" :y="c.y" :width="CELL" :height="CELL" rx="6" class="pt-cell" :class="{ 'pt-cell--mark': mode === 'grover' && c.strong }" />
      <rect v-if="!c.empty" :x="c.sx" :y="c.sy" :width="c.side" :height="c.side" rx="4" class="pt-fill" :class="{ 'pt-fill--mark': mode === 'grover' && c.strong }" />
      <text v-if="c.labelled" :x="c.cx" :y="c.cy + 3.5" text-anchor="middle" class="pt-label" :class="{ 'pt-label--on': c.strong }">{{ c.label }}</text>
    </g>
  </svg>
</template>

<style scoped>
.patterns {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.pt-cell {
  fill: #fff;
  fill-opacity: 0.7;
  stroke: var(--grid);
  stroke-width: 1.2;
}

.pt-fill {
  fill: var(--violet);
  opacity: 0.82;
}

.patterns--bits .pt-fill {
  fill: var(--ink);
  opacity: 1;
}

.patterns--focus .pt-fill {
  fill: var(--magenta);
}

.pt-cell--mark {
  stroke: var(--magenta);
  stroke-width: 2;
  stroke-dasharray: 4 3;
}

.pt-fill--mark {
  fill: var(--magenta);
}

.pt-label {
  font-family: var(--font-mono);
  font-size: 10px;
  fill: var(--ink-soft);
  opacity: 0.75;
}

.pt-label--on {
  fill: #fff;
  opacity: 1;
  font-weight: 600;
}
</style>
