<!--
  A heavy-hex qubit lattice, the layout superconducting chips use: rows of
  coupled qubits, bridged to the row below every fourth site, with the
  bridges staggered row to row. A few qubits are lit, and one short path
  through the coupling map is traced as if a circuit were running on it.

    <Lattice />
    <Lattice :rows="6" :cols="21" :seed="4" fade />

  Props:
    rows, cols — lattice size in qubits
    seed       — which qubits light up and where the path runs
    lit        — fraction of qubits lit (0–1)
    fade       — feather the edges into the page

  Scales to the width of its container.
-->
<script setup lang="ts">
import { computed, useId } from 'vue'
import { rng, safeId } from '../composables/motif'

const props = defineProps({
  rows: { type: Number, default: 5 },
  cols: { type: Number, default: 17 },
  seed: { type: Number, default: 11 },
  lit: { type: Number, default: 0.16 },
  fade: { type: Boolean, default: false },
})

const gid = safeId('lattice', useId() ?? 'x')
const U = 20

type Node = { id: string, x: number, y: number, bridge: boolean }

const graph = computed(() => {
  const nodes = new Map<string, Node>()
  const adj = new Map<string, string[]>()
  const edges: [string, string][] = []
  const add = (n: Node) => {
    nodes.set(n.id, n)
    adj.set(n.id, [])
  }
  const link = (a: string, b: string) => {
    edges.push([a, b])
    adj.get(a)!.push(b)
    adj.get(b)!.push(a)
  }

  for (let r = 0; r < props.rows; r++) {
    for (let c = 0; c < props.cols; c++) {
      add({ id: `${r}:${c}`, x: c * U, y: r * 2 * U, bridge: false })
      if (c > 0) link(`${r}:${c - 1}`, `${r}:${c}`)
    }
  }
  for (let r = 0; r < props.rows - 1; r++) {
    for (let c = r % 2 ? 2 : 0; c < props.cols; c += 4) {
      const id = `b${r}:${c}`
      add({ id, x: c * U, y: r * 2 * U + U, bridge: true })
      link(`${r}:${c}`, id)
      link(id, `${r + 1}:${c}`)
    }
  }
  return { nodes, adj, edges }
})

const lit = computed(() => {
  const r = rng(props.seed)
  const tones = ['cyan', 'violet', 'magenta']
  const out = new Map<string, string>()
  for (const id of graph.value.nodes.keys()) {
    if (r() < props.lit) out.set(id, tones[Math.floor(r() * tones.length)])
  }
  return out
})

// A self-avoiding walk through the coupling map: the qubits a small circuit
// would be routed across.
const walk = computed(() => {
  const r = rng(props.seed + 7)
  const { nodes, adj } = graph.value
  const ids = [...nodes.keys()].filter(id => !nodes.get(id)!.bridge)
  let at = ids[Math.floor(r() * ids.length)]
  const path = [at]
  const seen = new Set(path)
  for (let i = 0; i < 9; i++) {
    const next = adj.get(at)!.filter(n => !seen.has(n))
    if (!next.length) break
    at = next[Math.floor(r() * next.length)]
    path.push(at)
    seen.add(at)
  }
  return path
})

const walkPath = computed(() =>
  walk.value.map((id, i) => {
    const n = graph.value.nodes.get(id)!
    return `${i ? 'L' : 'M'}${n.x} ${n.y}`
  }).join(' '),
)

const edgePath = computed(() =>
  graph.value.edges.map(([a, b]) => {
    const p = graph.value.nodes.get(a)!
    const q = graph.value.nodes.get(b)!
    return `M${p.x} ${p.y} L${q.x} ${q.y}`
  }).join(' '),
)

const W = computed(() => (props.cols - 1) * U)
const H = computed(() => (props.rows - 1) * 2 * U)
</script>

<template>
  <svg
    class="motif lattice"
    :class="{ 'lattice--fade': fade }"
    :viewBox="`-12 -12 ${W + 24} ${H + 24}`"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="gid" gradientUnits="userSpaceOnUse" x1="0" y1="0" :x2="W" :y2="H">
        <stop offset="0" style="stop-color: var(--cyan)" />
        <stop offset="0.55" style="stop-color: var(--violet)" />
        <stop offset="1" style="stop-color: var(--magenta)" />
      </linearGradient>
    </defs>
    <path :d="edgePath" class="edge" />
    <path :d="walkPath" class="walk" :stroke="`url(#${gid})`" />
    <g v-for="[id, n] in graph.nodes" :key="id">
      <circle
        v-if="lit.has(id)"
        :cx="n.x" :cy="n.y" r="8"
        class="halo"
        :style="{ fill: `var(--${lit.get(id)})` }"
      />
      <circle
        :cx="n.x" :cy="n.y" :r="n.bridge ? 2.6 : 3.6"
        class="node"
        :class="{ 'node--walk': walk.includes(id) }"
        :style="lit.has(id) ? { fill: `var(--${lit.get(id)})`, stroke: `var(--${lit.get(id)})` } : {}"
      />
    </g>
  </svg>
</template>

<style scoped>
.lattice {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.lattice--fade {
  -webkit-mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 35%, transparent 100%);
  mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 35%, transparent 100%);
}

.edge {
  fill: none;
  stroke: var(--ink-soft);
  stroke-width: 1.2;
  opacity: 0.35;
}

.walk {
  fill: none;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.85;
}

.node {
  fill: var(--paper);
  stroke: var(--ink-soft);
  stroke-width: 1;
}

.node--walk {
  stroke: var(--violet);
  stroke-width: 1.4;
}

.halo {
  opacity: 0.16;
}
</style>
