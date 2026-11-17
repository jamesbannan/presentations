<!--
  A measurement, as it's drawn in a circuit: a meter in a box, and the
  plain result it hands back.

    <Readout value="0" />
    <Readout value="1" label="read" />
-->
<script setup lang="ts">
defineProps({
  value: { type: String, default: '0' },
  label: { type: String, default: 'read' },
})
</script>

<template>
  <div class="readout" :class="value === '1' ? 'readout--one' : 'readout--zero'">
    <svg class="readout-meter" viewBox="0 0 40 32" aria-hidden="true">
      <rect x="1" y="1" width="38" height="30" rx="4" />
      <path d="M8 23 A12 12 0 0 1 32 23" />
      <path d="M20 23 L29 10" class="readout-needle" />
    </svg>
    <span v-if="label" class="readout-label">{{ label }}</span>
    <svg class="readout-wire" viewBox="0 0 60 12" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 4 H52 M0 8 H52" />
      <path d="M50 1 L58 6 L50 11" />
    </svg>
    <span class="readout-value">{{ value }}</span>
  </div>
</template>

<style scoped>
.readout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
}

.readout-meter {
  width: 56px;
  height: auto;
  overflow: visible;
}

.readout-meter rect {
  fill: #fff;
  stroke: var(--violet);
  stroke-width: 1.6;
}

.readout-meter path {
  fill: none;
  stroke: var(--violet);
  stroke-width: 1.8;
  stroke-linecap: round;
}

.readout-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.readout-wire {
  width: 72px;
  height: 12px;
  overflow: visible;
}

.readout-wire path {
  fill: none;
  stroke: var(--ink-soft);
  stroke-width: 1.2;
  vector-effect: non-scaling-stroke;
}

.readout-value {
  display: grid;
  place-items: center;
  width: 2.2em;
  height: 2.2em;
  border-radius: 50%;
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 1.5rem;
  color: #fff;
}

.readout--zero .readout-value { background: var(--cyan); }
.readout--one .readout-value { background: var(--magenta); }
</style>
