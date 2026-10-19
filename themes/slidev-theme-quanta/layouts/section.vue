<!--
  Chapter card. The part number as a large ket over a qubit register that
  reads it out in binary, a full lattice across the page behind it, and
  the heading on the right.

  Frontmatter:
    numeral — the part number (1, 2, 3…), rendered as |2⟩ over ○●○○
    kicker  — optional mono line above the heading
-->
<script setup lang="ts">
import { computed } from 'vue'
import { toBinary } from '../composables/motif'

const props = defineProps({
  numeral: { type: [Number, String], default: '' },
  kicker: { type: String, default: '' },
})

const bits = computed(() => toBinary(props.numeral))
</script>

<template>
  <div class="slidev-layout section">
    <div class="motif section-lattice" aria-hidden="true">
      <Lattice :rows="8" :cols="27" :seed="Number(numeral) || 1" fade />
    </div>
    <div v-if="numeral !== ''" class="section-register">
      <span class="ket section-ket">{{ numeral }}</span>
      <span class="section-qubits">
        <i v-for="(b, i) in bits" :key="i" :class="{ on: b === '1' }" />
      </span>
      <span class="section-bits">{{ bits }}</span>
    </div>
    <div class="section-text">
      <span v-if="kicker" class="kicker">{{ kicker }}</span>
      <slot />
      <Wave class="section-wave" mode="interference" :width="360" :cycles="12" height="34px" />
    </div>
    <Folio />
  </div>
</template>

<style scoped>
.section {
  display: flex;
  align-items: center;
  gap: 56px;
  padding: 0 80px 0 72px;
}

.section-lattice {
  position: absolute;
  inset: 4% -4% auto -4%;
  opacity: 0.28;
}

.section-register {
  flex: 0 0 220px;
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid var(--grid);
  border-top: 2px solid var(--violet);
  border-radius: 6px;
  box-shadow: 0 10px 40px -18px rgba(98, 70, 234, 0.35);
}

.section-ket {
  font-family: var(--font-display) !important;
  font-size: 5.2rem !important;
  font-weight: 500;
  color: var(--violet);
}

.section-qubits {
  display: inline-flex;
  gap: 8px;
}

.section-qubits i {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid var(--violet);
  box-sizing: border-box;
}

.section-qubits i.on {
  background: radial-gradient(circle at 35% 35%, #fff 0 1.5px, var(--magenta) 2.5px);
  border-color: var(--magenta);
}

.section-bits {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: var(--cyan);
}

.section-text {
  flex: 1 1 auto;
}

.section :deep(h1) {
  font-size: 2.4rem;
  margin-top: 0.4em;
}

.section :deep(h2) {
  margin-top: 0.5em;
}

.section-wave {
  margin-top: 1.4em;
}
</style>
