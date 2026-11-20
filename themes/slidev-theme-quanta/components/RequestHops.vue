<!--
  One request's trip, hop by hop, coloured by who has to make each hop
  quantum-safe: the provider (browser to edge), you (edge to your
  servers), or nobody (data at rest under AES-256).

    <RequestHops />
    <RequestHops :stage="$clicks" />   colour hop 1, 2, 3 as stage reaches it

  Props:
    nodes — four { name, note } stops along the trip
    hops  — three { label, note, tone } links between them
    stage — how many hops are coloured in (default: all)
-->
<script setup lang="ts">
type Stop = { name: string; note: string }
type Hop = { label: string; note: string; tone: string }

const props = defineProps({
  nodes: {
    type: Array as () => Stop[],
    default: () => [
      { name: 'Browser', note: 'Chrome · Safari' },
      { name: 'Provider edge', note: 'CDN · front door' },
      { name: 'Your servers', note: 'apps · APIs · VMs' },
      { name: 'Your data', note: 'disks · databases' },
    ],
  },
  hops: {
    type: Array as () => Hop[],
    default: () => [
      { label: 'hybrid ML-KEM', note: '~70% of visits', tone: 'cyan' },
      { label: 'classical', note: '~15% of servers', tone: 'magenta' },
      { label: 'AES-256', note: 'already safe', tone: 'amber' },
    ],
  },
  stage: { type: Number, default: 3 },
})

const W = 900
const H = 96
const NW = 128
const NH = 62
const GAP = (W - 4 * NW) / 3
const Y = 28
const x = (i: number) => i * (NW + GAP)
</script>

<template>
  <svg class="motif request-hops" :viewBox="`0 0 ${W} ${H}`" role="img"
    aria-label="A request's trip from browser to provider edge to your servers to your data, coloured by who makes each hop quantum-safe">
    <g v-for="(hop, i) in props.hops" :key="hop.label"
      :class="['rh-hop', `rh-hop--${hop.tone}`, { 'rh-hop--on': props.stage > i }]">
      <line :x1="x(i) + NW" :y1="Y + NH / 2" :x2="x(i + 1)" :y2="Y + NH / 2" />
      <text :x="x(i) + NW + GAP / 2" :y="Y + NH / 2 - 10" text-anchor="middle" class="rh-label">{{ hop.label }}</text>
      <text :x="x(i) + NW + GAP / 2" :y="Y + NH / 2 + 22" text-anchor="middle" class="rh-note">{{ hop.note }}</text>
    </g>

    <g v-for="(node, i) in props.nodes" :key="node.name" class="rh-node">
      <rect :x="x(i)" :y="Y" :width="NW" :height="NH" rx="6" />
      <text :x="x(i) + NW / 2" :y="Y + 27" text-anchor="middle" class="rh-name">{{ node.name }}</text>
      <text :x="x(i) + NW / 2" :y="Y + 48" text-anchor="middle" class="rh-sub">{{ node.note }}</text>
    </g>

    <text :x="x(0)" :y="14" class="rh-bracket rh-bracket--cyan" :class="{ 'rh-bracket--on': props.stage >= 1 }">← their side</text>
    <text :x="x(3) + NW" :y="14" text-anchor="end" class="rh-bracket rh-bracket--magenta" :class="{ 'rh-bracket--on': props.stage >= 2 }">your side →</text>
  </svg>
</template>

<style scoped>
.request-hops {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.rh-node rect {
  fill: white;
  stroke: var(--ink-soft);
  stroke-width: 1.4;
}

.rh-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  fill: var(--ink);
}

.rh-sub {
  font-family: var(--font-mono);
  font-size: 11px;
  fill: var(--ink-soft);
}

.rh-hop--cyan { --tone: var(--cyan); }
.rh-hop--magenta { --tone: var(--magenta); }
.rh-hop--amber { --tone: var(--amber); }

.rh-hop line {
  stroke: var(--grid);
  stroke-width: 3;
  stroke-dasharray: 6 6;
  transition: stroke 0.4s ease;
}

.rh-hop text {
  opacity: 0;
  transition: opacity 0.4s ease;
}

.rh-hop--on line {
  stroke: var(--tone);
  stroke-dasharray: none;
  stroke-width: 4;
}

.rh-hop--on text {
  opacity: 1;
}

.rh-label {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 13px;
  fill: var(--tone);
}

.rh-note {
  font-family: var(--font-mono);
  font-size: 11px;
  fill: var(--ink-soft);
}

.rh-bracket {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.rh-bracket--cyan { fill: var(--cyan); }
.rh-bracket--magenta { fill: var(--magenta); }
.rh-bracket--on { opacity: 1; }
</style>
