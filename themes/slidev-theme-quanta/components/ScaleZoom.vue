<!--
  A powers-of-ten zoom: a row of round frames, each one a close-up of a
  spot in the frame before it, from things you can hold down to a single
  electron. A band underneath marks where everyday rules give way to
  quantum ones.

    <ScaleZoom />
    <ScaleZoom :quantum-from="3" />

  Props:
    stops        — [{ kind, name, size }]; kind is coin | grain | cell | atom | electron
    quantumFrom  — index of the first stop drawn as quantum
    seed         — for the sand grain and the electron cloud
-->
<script setup lang="ts">
import { computed, useId } from 'vue'
import { rng, safeId } from '../composables/motif'

type Stop = { kind: string, name: string, size: string }

const props = defineProps({
  stops: {
    type: Array as () => Stop[],
    default: () => [
      { kind: 'coin', name: 'Coin', size: '2 cm' },
      { kind: 'grain', name: 'Grain of sand', size: 'half a millimetre' },
      { kind: 'cell', name: 'Cell', size: '1/100 mm' },
      { kind: 'atom', name: 'Atom', size: '1/10,000,000 mm' },
      { kind: 'electron', name: 'Electron', size: 'too small to size' },
    ],
  },
  quantumFrom: { type: Number, default: 3 },
  seed: { type: Number, default: 5 },
})

const uid = useId() ?? 'x'
const ids = {
  vec: safeId('zs-vec', uid),
  band: safeId('zs-band', uid),
}

const W = 1000
const CY = 100
const R = 62
const f = (n: number) => Math.round(n * 100) / 100

// The spot in each glyph that the next frame zooms into.
const targets: Record<string, [number, number]> = {
  coin: [20, -16],
  grain: [14, 12],
  cell: [-20, 14],
  atom: [36.4, -7],
  electron: [0, 0],
}

const layout = computed(() => {
  const n = props.stops.length
  const gap = W / n
  return props.stops.map((s, i) => {
    const cx = gap * (i + 0.5)
    const [dx, dy] = targets[s.kind] ?? [0, 0]
    const next = i < n - 1 ? gap * (i + 1.5) : null
    let funnel = null
    if (next !== null) {
      const tx = cx + dx
      const ty = CY + dy
      const r = 5
      funnel = {
        tx, ty, r,
        fill: `M${f(tx)} ${f(ty - r)} L${f(next)} ${CY - R} L${f(next)} ${CY + R} L${f(tx)} ${f(ty + r)} Z`,
        top: `M${f(tx)} ${f(ty - r)} L${f(next)} ${CY - R}`,
        bottom: `M${f(tx)} ${f(ty + r)} L${f(next)} ${CY + R}`,
      }
    }
    return { ...s, cx, funnel, quantum: i >= props.quantumFrom, last: i === n - 1 }
  })
})

const grain = computed(() => {
  const r = rng(props.seed)
  const n = 10
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + (r() - 0.5) * 0.4
    const d = 30 + r() * 12
    return `${f(Math.cos(a) * d)},${f(Math.sin(a) * d * 0.86)}`
  })
  const specks = Array.from({ length: 6 }, () => ({ x: f((r() - 0.5) * 40), y: f((r() - 0.5) * 30), s: f(1 + r() * 1.6) }))
  return { pts: pts.join(' '), specks }
})

const cloud = computed(() => {
  const r = rng(props.seed + 7)
  return Array.from({ length: 90 }, () => {
    const a = r() * Math.PI * 2
    const d = Math.sqrt(-2 * Math.log(r() + 1e-6)) * 12
    return { x: f(Math.cos(a) * d), y: f(Math.sin(a) * d), s: f(0.9 + r() * 1.3) }
  }).filter(p => Math.hypot(p.x, p.y) < 50)
})

const ticks = Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * Math.PI * 2
  return `M${f(Math.cos(a) * 35)} ${f(Math.sin(a) * 35)} L${f(Math.cos(a) * 39)} ${f(Math.sin(a) * 39)}`
}).join(' ')

const orbits = [0, 60, 120]
const electrons: [number, number][] = [[36.4, -7], [-24, -26], [-10, 34]]

const split = computed(() => {
  const n = props.stops.length
  const at = Math.max(0, Math.min(n, props.quantumFrom)) / n
  return { a: f(at - 0.07), b: f(at + 0.05), x: f(at * W) }
})
</script>

<template>
  <svg class="motif zs" :viewBox="`0 0 ${W} 272`" aria-hidden="true">
    <defs>
      <linearGradient :id="ids.vec" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" style="stop-color: var(--cyan)" />
        <stop offset="0.55" style="stop-color: var(--violet)" />
        <stop offset="1" style="stop-color: var(--magenta)" />
      </linearGradient>
      <linearGradient :id="ids.band" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" style="stop-color: var(--ink-soft)" stop-opacity="0.35" />
        <stop :offset="split.a" style="stop-color: var(--ink-soft)" stop-opacity="0.35" />
        <stop :offset="split.b" style="stop-color: var(--violet)" />
        <stop offset="1" style="stop-color: var(--magenta)" />
      </linearGradient>
    </defs>

    <template v-for="(s, i) in layout" :key="i">
      <g :transform="`translate(${s.cx} ${CY})`" class="zs-stop" :class="{ 'zs-stop--quantum': s.quantum }">
        <circle :r="R" class="zs-frame" :class="{ 'zs-frame--last': s.last }" :style="s.last ? { stroke: `url(#${ids.vec})` } : undefined" />

        <g v-if="s.kind === 'coin'" class="zs-coin">
          <circle r="40" />
          <circle r="31" class="zs-coin-inner" />
          <path :d="ticks" />
          <path d="M-9 -12 L0 -18 L0 18 M-9 18 L9 18" class="zs-coin-mark" />
        </g>

        <g v-else-if="s.kind === 'grain'" class="zs-grain">
          <polygon :points="grain.pts" />
          <circle v-for="(p, j) in grain.specks" :key="j" :cx="p.x" :cy="p.y" :r="p.s" />
        </g>

        <g v-else-if="s.kind === 'cell'" class="zs-cell">
          <ellipse rx="42" ry="30" transform="rotate(-16)" />
          <circle cx="8" cy="-4" r="11" class="zs-cell-nucleus" />
          <ellipse cx="-20" cy="10" rx="7" ry="3.5" transform="rotate(20 -20 10)" class="zs-cell-bit" />
          <ellipse cx="22" cy="14" rx="6" ry="3" transform="rotate(-30 22 14)" class="zs-cell-bit" />
          <ellipse cx="-12" cy="-16" rx="5" ry="2.6" class="zs-cell-bit" />
        </g>

        <g v-else-if="s.kind === 'atom'" class="zs-atom">
          <ellipse v-for="o in orbits" :key="o" rx="40" ry="13" :transform="`rotate(${o})`" />
          <circle cx="-2.6" cy="-2" r="4.4" class="zs-atom-p" />
          <circle cx="2.8" cy="-1.4" r="4.4" class="zs-atom-n" />
          <circle cx="0" cy="3" r="4.4" class="zs-atom-p" />
          <circle v-for="(e, j) in electrons" :key="j" :cx="e[0]" :cy="e[1]" r="3.4" class="zs-atom-e" />
        </g>

        <g v-else-if="s.kind === 'electron'" class="zs-electron">
          <circle v-for="(p, j) in cloud" :key="j" :cx="p.x" :cy="p.y" :r="p.s" class="zs-cloud" />
          <path d="M0 0 L16 -34" :stroke="`url(#${ids.vec})`" class="zs-spin" />
          <circle cx="16" cy="-34" r="4" class="zs-spin-tip" />
          <circle r="5.5" class="zs-electron-core" />
        </g>

        <text :y="R + 30" text-anchor="middle" class="zs-name">{{ s.name }}</text>
        <text :y="R + 50" text-anchor="middle" class="zs-size">{{ s.size }}</text>
      </g>

      <g v-if="s.funnel" class="zs-funnel">
        <path :d="s.funnel.fill" class="zs-funnel-fill" />
        <path :d="s.funnel.top" />
        <path :d="s.funnel.bottom" />
        <circle :cx="s.funnel.tx" :cy="s.funnel.ty" :r="s.funnel.r" class="zs-target" />
      </g>
    </template>

    <rect x="10" y="236" :width="W - 20" height="6" rx="3" :fill="`url(#${ids.band})`" />
    <path :d="`M${split.x} 228 L${split.x} 250`" class="zs-split" />
    <text x="10" y="266" class="zs-band zs-band--classical">Everyday rules · things have a definite value</text>
    <text :x="W - 10" y="266" text-anchor="end" class="zs-band zs-band--quantum">Quantum rules · things carry odds</text>
  </svg>
</template>

<style scoped>
.zs {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.zs-frame {
  fill: var(--paper);
  stroke: var(--ink-soft);
  stroke-width: 1.2;
}

.zs-stop--quantum .zs-frame {
  stroke: var(--violet);
  stroke-width: 1.6;
}

.zs-stop .zs-frame--last {
  stroke-width: 2.6;
}

.zs-coin circle {
  fill: color-mix(in srgb, var(--amber) 22%, var(--paper));
  stroke: color-mix(in srgb, var(--amber) 70%, var(--ink));
  stroke-width: 1.4;
}

.zs-coin .zs-coin-inner {
  fill: none;
  stroke-width: 0.9;
}

.zs-coin path {
  fill: none;
  stroke: color-mix(in srgb, var(--amber) 70%, var(--ink));
  stroke-width: 1;
}

.zs-coin .zs-coin-mark {
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.zs-grain polygon {
  fill: color-mix(in srgb, var(--amber) 14%, var(--paper-deep));
  stroke: var(--ink-soft);
  stroke-width: 1.2;
  stroke-linejoin: round;
}

.zs-grain circle {
  fill: var(--ink-soft);
  opacity: 0.4;
}

.zs-cell ellipse {
  fill: color-mix(in srgb, var(--cyan) 10%, var(--paper));
  stroke: var(--cyan);
  stroke-width: 1.4;
}

.zs-cell .zs-cell-nucleus {
  fill: color-mix(in srgb, var(--violet) 22%, var(--paper));
  stroke: var(--violet);
  stroke-width: 1.2;
}

.zs-cell .zs-cell-bit {
  fill: color-mix(in srgb, var(--cyan) 25%, var(--paper));
  stroke-width: 0.8;
}

.zs-atom ellipse {
  fill: none;
  stroke: var(--violet);
  stroke-width: 1;
  opacity: 0.7;
}

.zs-atom-p { fill: var(--magenta); }
.zs-atom-n { fill: var(--violet); }

.zs-atom-e {
  fill: var(--cyan);
  stroke: #fff;
  stroke-width: 1;
}

.zs-cloud {
  fill: var(--violet);
  opacity: 0.32;
}

.zs-spin {
  fill: none;
  stroke-width: 3.4;
  stroke-linecap: round;
}

.zs-spin-tip {
  fill: var(--magenta);
  stroke: #fff;
  stroke-width: 1.2;
}

.zs-electron-core {
  fill: var(--cyan);
  stroke: #fff;
  stroke-width: 1.4;
}

.zs-funnel path {
  fill: none;
  stroke: var(--violet);
  stroke-width: 0.9;
  stroke-dasharray: 3 3;
  opacity: 0.6;
}

.zs-funnel .zs-funnel-fill {
  fill: var(--violet);
  stroke: none;
  opacity: 0.06;
}

.zs-target {
  fill: none;
  stroke: var(--violet);
  stroke-width: 1.4;
}

.zs-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
  fill: var(--ink);
}

.zs-size {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.03em;
  fill: var(--ink-soft);
}

.zs-split {
  stroke: var(--violet);
  stroke-width: 1.2;
  stroke-dasharray: 2 3;
}

.zs-band {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.zs-band--classical { fill: var(--ink-soft); }
.zs-band--quantum { fill: var(--violet); }
</style>
