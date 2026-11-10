<!--
  A hybrid key exchange: today's elliptic-curve exchange and a
  post-quantum one run side by side, and both secrets are mixed into the
  one session key. An attacker has to break both.

    <HybridKex />
    <HybridKex :broken="$clicks >= 1" />   strike out the classical half,
                                           as on Q-Day: the key still holds

  Props:
    classical — { name, note } for the elliptic-curve half
    pq        — { name, note } for the post-quantum half
    result    — { name, note } for the session key
    broken    — strike out the classical half
-->
<script setup lang="ts">
type Box = { name: string; note: string }

defineProps({
  classical: { type: Object as () => Box, default: () => ({ name: 'X25519', note: "today's maths · battle-tested" }) },
  pq: { type: Object as () => Box, default: () => ({ name: 'ML-KEM-768', note: 'quantum-safe · new' }) },
  result: { type: Object as () => Box, default: () => ({ name: 'One session key', note: 'safe while either half holds' }) },
  broken: { type: Boolean, default: false },
})

const W = 900
const H = 214
const BW = 280
const BH = 74
const A = { x: 16, y: 12 }
const B = { x: 16, y: 128 }
const C = { x: 596, y: 70 }
const M = { x: 452, y: 107, r: 30 }
</script>

<template>
  <svg class="motif hybrid-kex" :viewBox="`0 0 ${W} ${H}`" role="img"
    aria-label="A hybrid key exchange: an elliptic-curve secret and a post-quantum secret mixed into one session key">
    <defs>
      <marker id="hk-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" class="hk-head" />
      </marker>
    </defs>

    <g :class="['hk-box', 'hk-box--classical', { 'hk-box--broken': broken }]">
      <rect :x="A.x" :y="A.y" :width="BW" :height="BH" rx="6" />
      <text :x="A.x + 20" :y="A.y + 32" class="hk-name">{{ classical.name }}</text>
      <text :x="A.x + 20" :y="A.y + 56" class="hk-note">{{ classical.note }}</text>
      <line class="hk-strike" :x1="A.x + 14" :y1="A.y + 25" :x2="A.x + 122" :y2="A.y + 25" />
      <text class="hk-qday" :x="A.x + BW - 14" :y="A.y + 30" text-anchor="end">broken on Q-Day</text>
    </g>
    <g class="hk-box hk-box--pq">
      <rect :x="B.x" :y="B.y" :width="BW" :height="BH" rx="6" />
      <text :x="B.x + 20" :y="B.y + 32" class="hk-name">{{ pq.name }}</text>
      <text :x="B.x + 20" :y="B.y + 56" class="hk-note">{{ pq.note }}</text>
    </g>

    <path :class="['hk-wire', { 'hk-wire--broken': broken }]" :d="`M${A.x + BW} ${A.y + BH / 2} C ${A.x + BW + 80} ${A.y + BH / 2}, ${M.x - 80} ${M.y - 12}, ${M.x - M.r - 4} ${M.y - 8}`" marker-end="url(#hk-head)" />
    <path class="hk-wire" :d="`M${B.x + BW} ${B.y + BH / 2} C ${B.x + BW + 80} ${B.y + BH / 2}, ${M.x - 80} ${M.y + 12}, ${M.x - M.r - 4} ${M.y + 8}`" marker-end="url(#hk-head)" />
    <text :x="A.x + BW + 26" :y="A.y + BH / 2 - 10" :class="['hk-wire-label', { 'hk-wire-label--broken': broken }]">secret 1</text>
    <text :x="B.x + BW + 26" :y="B.y + BH / 2 + 24" class="hk-wire-label">secret 2</text>

    <circle :cx="M.x" :cy="M.y" :r="M.r" class="hk-mix" />
    <path :d="`M${M.x - 11} ${M.y} H${M.x + 11} M${M.x} ${M.y - 11} V${M.y + 11}`" class="hk-plus" />
    <text :x="M.x" :y="M.y + M.r + 22" text-anchor="middle" class="hk-wire-label">mix both</text>

    <line class="hk-wire" :x1="M.x + M.r + 4" :y1="M.y" :x2="C.x - 6" :y2="M.y" marker-end="url(#hk-head)" />

    <g class="hk-box hk-box--result">
      <rect :x="C.x" :y="C.y" :width="BW + 8" :height="BH" rx="6" />
      <text :x="C.x + 20" :y="C.y + 32" class="hk-name">{{ result.name }}</text>
      <text :x="C.x + 20" :y="C.y + 56" class="hk-note">{{ result.note }}</text>
    </g>
  </svg>
</template>

<style scoped>
.hybrid-kex {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.hk-box rect {
  fill: color-mix(in srgb, var(--tone) 10%, white);
  stroke: var(--tone);
  stroke-width: 1.8;
}

.hk-box--classical { --tone: var(--cyan); }
.hk-box--pq { --tone: var(--violet); }
.hk-box--result { --tone: var(--magenta); }

.hk-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 22px;
  fill: var(--tone);
}

.hk-note {
  font-family: var(--font-mono);
  font-size: 14px;
  fill: var(--ink-soft);
}

.hk-box--classical > * {
  transition: opacity 0.4s ease;
}

.hk-strike,
.hk-qday {
  opacity: 0;
  transition: opacity 0.4s ease;
}

.hk-strike {
  stroke: var(--magenta);
  stroke-width: 2.4;
}

.hk-qday {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
  fill: var(--magenta);
}

.hk-box--broken rect,
.hk-box--broken .hk-name,
.hk-box--broken .hk-note {
  opacity: 0.4;
}

.hk-box--broken .hk-strike,
.hk-box--broken .hk-qday {
  opacity: 1;
}

.hk-wire {
  fill: none;
  stroke: var(--ink-soft);
  stroke-width: 1.8;
  transition: opacity 0.4s ease;
}

.hk-wire--broken,
.hk-wire-label--broken {
  opacity: 0.3;
}

.hk-head {
  fill: var(--ink-soft);
}

.hk-wire-label {
  font-family: var(--font-mono);
  font-size: 14px;
  fill: var(--ink-soft);
}

.hk-mix {
  fill: white;
  stroke: var(--violet);
  stroke-width: 2;
}

.hk-plus {
  stroke: var(--violet);
  stroke-width: 2.6;
  stroke-linecap: round;
}
</style>
