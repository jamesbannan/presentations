<!--
  A live readout of a qubit's arrow, to sit beside a <Globe>: how far it
  tilts from north, how far it turns round the equator, its length (always
  1, so the tip is always on the surface), and the state written out.

    <QubitState :theta="62" :phi="35" />

  Pair it with a wandering globe by sharing a ref on the slide:
    <Globe wander @move="s = $event" />  <QubitState v-bind="s" />
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  theta: { type: Number, default: 60 },
  phi: { type: Number, default: 0 },
})

const rad = (d: number) => (d * Math.PI) / 180
const f = (n: number) => Math.round(n * 100) / 100

const a = computed(() => Math.cos(rad(props.theta) / 2))
const b = computed(() => Math.sin(rad(props.theta) / 2))
const len = computed(() => Math.sqrt(a.value ** 2 + b.value ** 2))
const two = (n: number) => n.toFixed(2)
const degs = (n: number) => `${Math.round(n)}°`

// Tilt dial: north at the top, south at the bottom, needle swings down the right.
const tilt = computed(() => ({ x: f(Math.sin(rad(props.theta)) * 26), y: f(-Math.cos(rad(props.theta)) * 26) }))
const tiltArc = computed(() => {
  const large = props.theta > 180 ? 1 : 0
  return `M0 -26 A26 26 0 ${large} 1 ${tilt.value.x} ${tilt.value.y}`
})
// Turn dial: the equator seen from above, counting anticlockwise from the right.
const turn = computed(() => ({ x: f(Math.cos(rad(props.phi)) * 26), y: f(-Math.sin(rad(props.phi)) * 26) }))
const turnArc = computed(() => {
  const large = props.phi % 360 > 180 ? 1 : 0
  return `M26 0 A26 26 0 ${large} 0 ${turn.value.x} ${turn.value.y}`
})
</script>

<template>
  <div class="qstate">
    <div class="qstate-dials">
    <div class="qstate-item">
      <svg viewBox="-34 -34 68 68" class="qstate-dial" aria-hidden="true">
        <path d="M0 -26 A26 26 0 0 1 0 26" class="qstate-track" />
        <path d="M0 -30 V30" class="qstate-axis" />
        <path :d="tiltArc" class="qstate-sweep" />
        <path :d="`M0 0 L${tilt.x} ${tilt.y}`" class="qstate-needle" />
        <circle :cx="tilt.x" :cy="tilt.y" r="3.4" class="qstate-tip" />
        <text x="-13" y="-22" class="qstate-pole">0</text>
        <text x="-13" y="29" class="qstate-pole">1</text>
      </svg>
      <div>
        <b>Tilt <i>θ</i> = <span class="qstate-num">{{ degs(theta) }}</span></b>
        <span>Down from north</span>
      </div>
    </div>

    <div class="qstate-item">
      <svg viewBox="-34 -34 68 68" class="qstate-dial" aria-hidden="true">
        <ellipse rx="26" ry="26" class="qstate-track" />
        <path :d="turnArc" class="qstate-sweep qstate-sweep--turn" />
        <path :d="`M0 0 L${turn.x} ${turn.y}`" class="qstate-needle qstate-needle--turn" />
        <circle :cx="turn.x" :cy="turn.y" r="3.4" class="qstate-tip qstate-tip--turn" />
      </svg>
      <div>
        <b>Turn <i>φ</i> = <span class="qstate-num">{{ degs(phi) }}</span></b>
        <span>Round the equator</span>
      </div>
    </div>

    <div class="qstate-item">
      <svg viewBox="-34 -34 68 68" class="qstate-dial" aria-hidden="true">
        <path d="M-28 0 H28" class="qstate-track" />
        <path d="M-28 0 H28" class="qstate-length" />
        <path d="M-28 -7 V7 M28 -7 V7" class="qstate-axis" />
        <text x="-3" y="-10" class="qstate-pole">1</text>
      </svg>
      <div>
        <b>Length = <span class="qstate-num">{{ two(len) }}</span></b>
        <span>Always 1: the tip stays on the surface</span>
      </div>
    </div>

    </div>

    <div class="qstate-eq">
      <span class="qstate-cap">Written as a state</span>
      <span class="qstate-ket">
        <span class="qstate-num qstate-zero">{{ two(a) }}</span>|0⟩
        +
        <span class="qstate-num qstate-one">{{ two(b) }}</span><span class="qstate-phase">·e<sup>i{{ degs(phi) }}</sup></span>|1⟩
      </span>
      <span class="qstate-check">
        {{ two(a) }}² + {{ two(b) }}² = {{ two(a ** 2) }} + {{ two(1 - +two(a ** 2)) }} = 1
      </span>
    </div>
  </div>
</template>

<style scoped>
.qstate {
  display: grid;
  gap: 0.8rem;
  padding: 0.9rem 1.3rem;
  border: 1px solid var(--grid);
  border-radius: 14px;
  background: color-mix(in srgb, var(--paper) 88%, white);
  font-variant-numeric: tabular-nums;
}

.qstate-dials {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.qstate-item {
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 0.5rem;
  text-align: center;
}

.qstate-item b {
  display: block;
  font-size: 1.15rem;
  color: var(--ink);
}

.qstate-item span {
  display: block;
  font-size: 0.95rem;
  color: var(--ink-soft);
  line-height: 1.3;
}

.qstate-item b .qstate-num {
  display: inline;
  font-size: inherit;
  color: var(--violet);
}

.qstate-dial {
  width: 4.4rem;
  height: 4.4rem;
  overflow: visible;
}

.qstate-track {
  fill: none;
  stroke: var(--grid);
  stroke-width: 2;
}

.qstate-axis {
  fill: none;
  stroke: var(--ink-soft);
  stroke-width: 1;
  stroke-dasharray: 2 2.5;
  opacity: 0.6;
}

.qstate-sweep {
  fill: none;
  stroke: var(--cyan);
  stroke-width: 3.2;
  stroke-linecap: round;
  opacity: 0.55;
}

.qstate-sweep--turn {
  stroke: var(--violet);
}

.qstate-needle {
  stroke: var(--cyan);
  stroke-width: 2.6;
  stroke-linecap: round;
}

.qstate-needle--turn {
  stroke: var(--violet);
}

.qstate-tip {
  fill: var(--magenta);
  stroke: #fff;
  stroke-width: 1.2;
}

.qstate-tip--turn {
  fill: var(--violet);
}

.qstate-length {
  stroke: var(--amber);
  stroke-width: 4;
  stroke-linecap: round;
}

.qstate-pole {
  font-size: 10px;
  font-weight: 700;
  fill: var(--ink-soft);
}

.qstate-eq {
  display: grid;
  gap: 0.2rem;
  padding-top: 0.7rem;
  border-top: 1px dashed var(--grid);
}

.qstate-cap {
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.qstate-ket {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 1.3rem;
  color: var(--ink);
  white-space: nowrap;
}

.qstate-zero {
  color: var(--cyan);
  font-weight: 700;
}

.qstate-one {
  color: var(--magenta);
  font-weight: 700;
}

.qstate-phase {
  color: var(--violet);
}

.qstate-phase sup {
  font-size: 0.7em;
}

.qstate-check {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.95rem;
  color: var(--ink-soft);
}
</style>
