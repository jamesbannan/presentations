<!--
  The odds of reading a 0 or a 1, as a split bar: cyan for 0, magenta for 1.

    <Odds :theta="90" />            worked out from the arrow: 50 / 50
    <Odds :counts="[316, 84]" />    or from a tally of actual reads
    <Odds :chance="0.5" :labels="['−', '+']" />   or a chance, for another question
    <Odds :counts="[120, 31]" :out-of="500" />    a tally still filling up: the bar
                                                  grows in from both ends
    <Odds :theta="30" amps />       also write the arrow as its two amounts,
                                    0.97|0⟩ + 0.26|1⟩, and show each squared

  For an arrow `theta` degrees from the north pole, a read gives 0 with
  probability cos²(θ/2). That's the only maths in the theme, and it lives
  here so the slides don't need it.
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  theta: { type: Number, default: null },
  counts: { type: Array as () => number[], default: null },
  chance: { type: Number, default: null },
  labels: { type: Array as () => string[], default: () => ['0', '1'] },
  outOf: { type: Number, default: null },
  amps: { type: Boolean, default: false },
})

// The arrow's two amounts: how much 0 and how much 1. Squared, they're the
// probabilities.
const amp = computed(() => {
  if (!props.amps || props.theta === null) return null
  const h = ((props.theta * Math.PI) / 180) / 2
  return [Math.cos(h).toFixed(2), Math.sin(h).toFixed(2)]
})

const split = computed(() => {
  if (props.counts) {
    const [zeros = 0, ones = 0] = props.counts
    const total = zeros + ones
    const slots = props.outOf || total || 1
    return {
      p0: total ? zeros / total : null,
      w0: zeros / slots,
      w1: ones / slots,
      zeros,
      ones,
    }
  }
  const p0 = props.chance ?? Math.cos((((props.theta ?? 90) * Math.PI) / 180) / 2) ** 2
  return { p0, w0: p0, w1: 1 - p0, zeros: null, ones: null }
})

const pct = (p: number | null) => (p === null ? '–' : `${Math.round(p * 100)}%`)
</script>

<template>
  <div class="odds">
    <div v-if="amp" class="odds-ket">
      <b class="odds-amp--zero">{{ amp[0] }}</b>|0⟩ + <b class="odds-amp--one">{{ amp[1] }}</b>|1⟩
    </div>
    <div class="odds-bar">
      <span class="odds-zero" :style="{ flexBasis: `${split.w0 * 100}%` }" />
      <span class="odds-one" :style="{ flexBasis: `${split.w1 * 100}%` }" />
    </div>
    <div class="odds-legend">
      <span class="odds-key odds-key--zero">
        <template v-if="amp">{{ amp[0] }}² = {{ pct(split.p0) }}</template>
        <template v-else><b>{{ labels[0] }}</b> {{ pct(split.p0) }}</template><template v-if="split.zeros !== null"> · {{ split.zeros }}</template>
      </span>
      <span class="odds-key odds-key--one">
        <template v-if="split.ones !== null">{{ split.ones }} · </template><template v-if="amp">{{ amp[1] }}² = {{ pct(1 - split.p0) }}</template><template v-else>{{ pct(split.p0 === null ? null : 1 - split.p0) }} <b>{{ labels[1] }}</b></template>
      </span>
    </div>
  </div>
</template>

<style scoped>
.odds {
  width: 100%;
}

.odds-bar {
  display: flex;
  justify-content: space-between;
  height: 12px;
  border-radius: 6px;
  overflow: hidden;
  background: var(--paper-deep);
  box-shadow: inset 0 0 0 1px var(--grid);
}

.odds-zero {
  background: linear-gradient(90deg, color-mix(in srgb, var(--cyan) 70%, white), var(--cyan));
}

.odds-one {
  background: linear-gradient(90deg, var(--magenta), color-mix(in srgb, var(--magenta) 70%, white));
}

.odds-legend {
  display: flex;
  justify-content: space-between;
  margin-top: 0.45em;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: var(--ink-soft);
}

.odds-ket {
  margin-bottom: 0.45em;
  font-family: var(--font-mono);
  font-size: 0.95rem;
  color: var(--ink);
  text-align: center;
  white-space: nowrap;
}

.odds-ket b {
  font-weight: 700;
}

.odds-amp--zero { color: var(--cyan); }
.odds-amp--one { color: var(--magenta); }

.odds-key b {
  font-weight: 500;
}

.odds-key--zero b { color: var(--cyan); }
.odds-key--one b { color: var(--magenta); }
</style>
