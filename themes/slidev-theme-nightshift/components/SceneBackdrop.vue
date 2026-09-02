<!--
  The "room" a slide is set in.

  The genre this theme nods to never puts text on an empty field: there is
  always a horizon, a silhouette, and a foreground framing the frame. This
  component supplies that depth as original CSS/SVG geometry — no game art,
  no bitmaps, nothing to license.

  Two scenes, because the deck alternates between them:

    exterior — night sky, a low warm horizon, a trestle silhouette, grass in
               the near field. Used behind cover and section cards, where
               text sits centred in the dark upper sky.
    interior — a room: back wall, window onto the same night, pendant lamps
               and a checker floor in perspective. Used behind the dialogue
               and terminal boxes, which cover the plain middle of the wall.

  The palette prop cools the interior down for terminal slides so the CRT
  panel reads as the brightest thing on the slide.

  Geometry is generated from a seeded PRNG rather than Math.random: an export
  renders each slide in a fresh browser, and stars that move between the PDF
  and the live deck would be a bug, not a feature.
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'exterior' }, // 'exterior' | 'interior'
  palette: { type: String, default: 'warm' },     // 'warm' | 'cool'
  seed: { type: Number, default: 20260901 },
})

// mulberry32 — small, fast, and deterministic for a given seed.
const rng = (seed: number) => {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const uid = computed(() => `${props.variant}-${props.palette}-${props.seed}`)

/* ---------------------------------------------------------------- stars --
   Weighted towards the top of the sky: a uniform scatter reads as noise,
   a thinning one reads as distance. */
const stars = computed(() => {
  const r = rng(props.seed)
  return Array.from({ length: 110 }, () => {
    const y = Math.pow(r(), 1.6) * 96
    return {
      x: +(r() * 320).toFixed(1),
      y: +y.toFixed(1),
      s: r() > 0.9 ? 2 : 1,
      o: +(0.25 + r() * 0.6).toFixed(2),
      twinkle: r() > 0.86,
      delay: +(r() * 6).toFixed(2),
    }
  })
})

/* ------------------------------------------------------------ treeline --
   Ragged conifer silhouettes on the far ridge — cheap depth cue between the
   horizon glow and the bridge. */
const conifers = computed(() => {
  const r = rng(props.seed + 7)
  return Array.from({ length: 26 }, (_, i) => {
    const x = i * 12.6 + r() * 6
    const h = 8 + r() * 12
    const w = 4 + r() * 3
    return `${x},116 ${x + w / 2},${116 - h} ${x + w},116`
  })
})

/* -------------------------------------------------------------- bridge --
   A generic railway trestle: deck, piers, and X-bracing between them. The
   bracing is what makes the silhouette read at a glance. */
const piers = computed(() =>
  Array.from({ length: 12 }, (_, i) => 12 + i * 27),
)

/* --------------------------------------------------------------- grass --
   Near-field blades, tall enough at the edges to frame the slide and short
   in the middle so they never crowd the content. */
const blades = computed(() => {
  const r = rng(props.seed + 13)
  return Array.from({ length: 190 }, (_, i) => {
    const x = (i / 190) * 340 - 10
    // Edge bias: tall at the margins, low across the centre.
    const edge = Math.abs(x - 160) / 160
    const h = 12 + r() * 16 + edge * edge * 44
    const lean = (r() - 0.5) * 9
    const base = 181
    return {
      d: `M${x.toFixed(1)},${base} L${(x + lean).toFixed(1)},${(base - h).toFixed(1)} L${(x + 2.6).toFixed(1)},${base} Z`,
      o: +(0.55 + r() * 0.45).toFixed(2),
    }
  })
})

/* ------------------------------------------------------- fireflies ------ */
const fireflies = computed(() => {
  const r = rng(props.seed + 29)
  return Array.from({ length: 7 }, () => ({
    x: +(20 + r() * 280).toFixed(1),
    y: +(120 + r() * 45).toFixed(1),
    delay: +(r() * 8).toFixed(2),
    dur: +(6 + r() * 5).toFixed(2),
  }))
})

/* ---------------------------------------------------------- floor tiles --
   Checker floor in one-point perspective. Row depth grows geometrically so
   the tiles foreshorten instead of marching at a constant pitch, and each
   row's tile width scales with its depth, which is what sells the vanishing
   point without a 3D transform. */
const floor = computed(() => {
  const horizon = 118
  const bottom = 190
  const rows = 9
  const out: { points: string; dark: boolean }[] = []
  const depth = (i: number) => horizon + (bottom - horizon) * Math.pow(i / rows, 2.1)

  for (let i = 0; i < rows; i++) {
    const yTop = depth(i)
    const yBot = depth(i + 1)
    const spreadTop = 0.1 + (yTop - horizon) / (bottom - horizon)
    const spreadBot = 0.1 + (yBot - horizon) / (bottom - horizon)
    const cols = 10
    for (let c = -1; c <= cols; c++) {
      const u0 = (c / cols - 0.5) * 2
      const u1 = ((c + 1) / cols - 0.5) * 2
      const x0t = 160 + u0 * 190 * spreadTop
      const x1t = 160 + u1 * 190 * spreadTop
      const x0b = 160 + u0 * 190 * spreadBot
      const x1b = 160 + u1 * 190 * spreadBot
      out.push({
        points: `${x0t},${yTop} ${x1t},${yTop} ${x1b},${yBot} ${x0b},${yBot}`,
        dark: (i + c) % 2 === 0,
      })
    }
  }
  return out
})

/* --------------------------------------------------------------- lamps -- */
const lamps = [40, 105, 170]

const cool = computed(() => props.palette === 'cool')
</script>

<template>
  <svg
    class="scene-backdrop"
    viewBox="0 0 320 180"
    preserveAspectRatio="xMidYMid slice"
    shape-rendering="crispEdges"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <!-- Night sky: deep indigo overhead falling to a low, dim horizon.
           The warm band is kept below the content band on purpose — a bright
           strip behind centred type is unreadable from the back of a room. -->
      <linearGradient :id="`sky-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#080118" />
        <stop offset="38%" stop-color="#0f0630" />
        <stop offset="60%" stop-color="#1b1149" />
        <stop offset="76%" stop-color="#2a2a63" />
        <stop offset="88%" stop-color="#3f4a6d" />
        <stop offset="95%" stop-color="#7a5f5a" />
        <stop offset="100%" stop-color="#a8713f" />
      </linearGradient>

      <radialGradient :id="`moonglow-${uid}`" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#eae6f5" stop-opacity="0.5" />
        <stop offset="100%" stop-color="#eae6f5" stop-opacity="0" />
      </radialGradient>

      <linearGradient :id="`water-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#5b4a62" />
        <stop offset="45%" stop-color="#241a44" />
        <stop offset="100%" stop-color="#120a2b" />
      </linearGradient>

      <!-- Interior wall: lit from the lamps above, falling off to the skirting. -->
      <linearGradient :id="`wall-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="cool ? '#0a0a24' : '#241640'" />
        <stop offset="45%" :stop-color="cool ? '#0d1130' : '#31204f'" />
        <stop offset="100%" :stop-color="cool ? '#080a1e' : '#1a1033'" />
      </linearGradient>

      <linearGradient :id="`cone-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="cool ? '#57e8d6' : '#ffce54'" stop-opacity="0.34" />
        <stop offset="100%" :stop-color="cool ? '#57e8d6' : '#ffce54'" stop-opacity="0" />
      </linearGradient>

      <radialGradient :id="`bulb-${uid}`" cx="50%" cy="50%" r="50%">
        <stop offset="0%" :stop-color="cool ? '#57e8d6' : '#ffce54'" stop-opacity="0.85" />
        <stop offset="100%" :stop-color="cool ? '#57e8d6' : '#ffce54'" stop-opacity="0" />
      </radialGradient>

      <radialGradient :id="`vignette-${uid}`" cx="50%" cy="48%" r="72%">
        <stop offset="45%" stop-color="#000000" stop-opacity="0" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0.72" />
      </radialGradient>
    </defs>

    <!-- ================================================== EXTERIOR ==== -->
    <g v-if="variant === 'exterior'">
      <rect x="0" y="0" width="320" height="180" :fill="`url(#sky-${uid})`" />

      <!-- Aurora smear above the ridge: one soft note against all the hard edges. -->
      <ellipse cx="150" cy="112" rx="150" ry="26" fill="#57e8d6" opacity="0.07" shape-rendering="auto" />

      <g>
        <circle cx="256" cy="30" r="15" :fill="`url(#moonglow-${uid})`" shape-rendering="auto" />
        <circle cx="256" cy="30" r="8" fill="#e6e2f2" />
        <rect x="252" y="26" width="3" height="2" fill="#cfc7e4" />
        <rect x="257" y="31" width="2" height="2" fill="#cfc7e4" />
        <rect x="254" y="33" width="2" height="1" fill="#cfc7e4" />
      </g>

      <rect
        v-for="(s, i) in stars"
        :key="`s${i}`"
        :x="s.x"
        :y="s.y"
        :width="s.s"
        :height="s.s"
        fill="#eae6f5"
        :opacity="s.o"
        :class="s.twinkle ? 'twinkle' : ''"
        :style="s.twinkle ? { animationDelay: `${s.delay}s` } : undefined"
      />

      <!-- Far ridge, then the treeline on top of it. -->
      <polygon points="0,120 44,110 96,118 150,106 210,116 268,104 320,114 320,180 0,180" fill="#1a1038" />
      <polygon v-for="(p, i) in conifers" :key="`c${i}`" :points="p" fill="#140c2c" />

      <!-- Water, and the horizon light broken up on it. -->
      <rect x="0" y="120" width="320" height="30" :fill="`url(#water-${uid})`" />
      <g fill="#c98b4f" opacity="0.22">
        <rect x="132" y="124" width="18" height="1" />
        <rect x="158" y="128" width="28" height="1" />
        <rect x="140" y="132" width="20" height="1" />
        <rect x="170" y="136" width="14" height="1" />
      </g>

      <!-- Railway trestle. -->
      <g fill="#0f0824">
        <rect x="0" y="103" width="320" height="5" />
        <rect x="0" y="99" width="320" height="1.5" />
        <template v-for="(x, i) in piers" :key="`p${i}`">
          <rect :x="x" y="108" width="3" height="16" />
        </template>
      </g>
      <g :stroke="'#0f0824'" stroke-width="1.4" fill="none">
        <template v-for="(x, i) in piers.slice(0, -1)" :key="`b${i}`">
          <line :x1="x + 3" y1="108" :x2="piers[i + 1]" y2="122" />
          <line :x1="x + 3" y1="122" :x2="piers[i + 1]" y2="108" />
        </template>
      </g>

      <!-- Near-field bank and foliage. -->
      <path d="M0,146 C60,138 110,150 160,145 C220,139 270,149 320,142 L320,180 L0,180 Z" fill="#0b0520" />
      <path v-for="(b, i) in blades" :key="`g${i}`" :d="b.d" fill="#080314" :opacity="b.o" />

      <!-- Bushes anchoring the bottom corners, the way a game frames a room. -->
      <g fill="#060210">
        <ellipse cx="10" cy="168" rx="52" ry="30" shape-rendering="auto" />
        <ellipse cx="56" cy="176" rx="40" ry="22" shape-rendering="auto" />
        <ellipse cx="310" cy="166" rx="56" ry="32" shape-rendering="auto" />
        <ellipse cx="256" cy="178" rx="42" ry="22" shape-rendering="auto" />
        <ellipse cx="160" cy="184" rx="60" ry="16" shape-rendering="auto" />
      </g>

      <!-- Trailhead sign in the near field: a prop, not a label. The boards are
           left as abstract marks — legible text here would fight the slide. -->
      <g fill="#050110">
        <rect x="98" y="146" width="3" height="26" />
        <rect x="84" y="136" width="31" height="15" />
      </g>
      <g fill="#241548" opacity="0.5">
        <rect x="87" y="139" width="18" height="1.5" />
        <rect x="87" y="143" width="24" height="1.5" />
        <rect x="87" y="146.5" width="13" height="1.5" />
      </g>

      <circle
        v-for="(f, i) in fireflies"
        :key="`f${i}`"
        :cx="f.x"
        :cy="f.y"
        r="1"
        fill="#ffce54"
        class="firefly"
        shape-rendering="auto"
        :style="{ animationDelay: `${f.delay}s`, animationDuration: `${f.dur}s` }"
      />
    </g>

    <!-- ================================================== INTERIOR ====
         Detail is deliberately banded: the window, clock and lamps live
         above where the dialogue box starts, the floor and furniture below
         where it ends. Anything drawn in the middle would be covered. -->
    <g v-else>
      <rect x="0" y="0" width="320" height="180" :fill="`url(#wall-${uid})`" />

      <!-- Skirting and a picture rail: two lines that turn a gradient into a room. -->
      <rect x="0" y="112" width="320" height="2" :fill="cool ? '#141a3c' : '#3d2a5c'" />
      <rect x="0" y="8" width="320" height="1.5" :fill="cool ? '#141a3c' : '#3d2a5c'" opacity="0.8" />

      <!-- Window onto the same night as the exterior scene, with a neon sign
           burning somewhere across the street. It lives on the right half of
           the wall: the scene badge always sits top-left, and its vertical
           position shifts with the height of the box below it. -->
      <g>
        <rect x="214" y="8" width="70" height="32" fill="#0a0420" />
        <rect
          v-for="(s, i) in stars.slice(0, 30)"
          :key="`ws${i}`"
          :x="216 + ((s.x * 0.21) % 66)"
          :y="10 + ((s.y * 0.28) % 22)"
          width="1"
          height="1"
          fill="#eae6f5"
          :opacity="s.o * 0.9"
        />
        <rect x="214" y="32" width="70" height="8" fill="#1d1442" opacity="0.9" />
        <rect x="220" y="34" width="10" height="3" fill="#ff4f93" opacity="0.6" />
        <rect x="236" y="34" width="16" height="3" fill="#57e8d6" opacity="0.4" />
        <rect x="258" y="34" width="6" height="3" fill="#ffce54" opacity="0.4" />
        <g :fill="cool ? '#1b2450' : '#4a3468'">
          <rect x="212" y="6" width="74" height="3" />
          <rect x="212" y="39" width="74" height="3" />
          <rect x="212" y="6" width="3" height="36" />
          <rect x="283" y="6" width="3" height="36" />
          <rect x="247" y="6" width="2" height="36" />
          <rect x="212" y="22" width="74" height="2" />
        </g>
      </g>

      <!-- Wall clock: the small prop that makes a wall read as a room. -->
      <g>
        <circle cx="196" cy="24" r="9" :fill="cool ? '#131c40' : '#3b2758'" shape-rendering="auto" />
        <circle cx="196" cy="24" r="6.5" :fill="cool ? '#0a0f28' : '#1c1236'" shape-rendering="auto" />
        <rect x="195.5" y="19" width="1" height="6" :fill="cool ? '#57e8d6' : '#ffce54'" />
        <rect x="196" y="23.5" width="4" height="1" :fill="cool ? '#57e8d6' : '#ffce54'" />
      </g>

      <!-- Pendant lamps: cord, shade, cone, bulb glow. -->
      <g v-for="(x, i) in lamps" :key="`l${i}`">
        <rect :x="x - 0.5" y="0" width="1" height="20" :fill="cool ? '#1c2a55' : '#4a3468'" />
        <polygon
          :points="`${x - 11},34 ${x + 11},34 ${x + 6},20 ${x - 6},20`"
          :fill="cool ? '#16204a' : '#3b2758'"
        />
        <polygon
          :points="`${x - 11},35 ${x + 11},35 ${x + 40},112 ${x - 40},112`"
          :fill="`url(#cone-${uid})`"
          shape-rendering="auto"
        />
        <circle :cx="x" cy="35" r="9" :fill="`url(#bulb-${uid})`" shape-rendering="auto" />
        <rect :x="x - 3" y="33" width="6" height="3" :fill="cool ? '#57e8d6' : '#ffce54'" opacity="0.85" />
      </g>

      <!-- Checker floor. -->
      <polygon
        v-for="(t, i) in floor"
        :key="`t${i}`"
        :points="t.points"
        :fill="t.dark ? (cool ? '#070a1c' : '#150c2b') : (cool ? '#0e1533' : '#2a1c46')"
      />

      <!-- Near-field furniture, below the dialogue box: a table and chairs on
           one side, a booth back on the other. Silhouettes only — anything
           lighter down here competes with the panel above it. -->
      <g :fill="cool ? '#05070f' : '#0c0619'">
        <rect x="18" y="150" width="64" height="4" />
        <rect x="46" y="154" width="6" height="26" />
        <rect x="30" y="176" width="38" height="4" />
        <rect x="4" y="142" width="5" height="38" />
        <rect x="-4" y="138" width="22" height="6" />
        <rect x="92" y="146" width="5" height="34" />
        <rect x="84" y="142" width="22" height="6" />
        <rect x="232" y="134" width="92" height="46" />
        <rect x="224" y="140" width="10" height="40" />
      </g>

      <!-- Column in the near field: a depth cue in front of the content,
           not just behind it. -->
      <rect x="300" y="0" width="10" height="150" :fill="cool ? '#080c20' : '#180f2f'" />
      <rect x="300" y="0" width="2" height="150" :fill="cool ? '#131c40' : '#33224e'" opacity="0.8" />
    </g>

    <rect x="0" y="0" width="320" height="180" :fill="`url(#vignette-${uid})`" shape-rendering="auto" />
  </svg>
</template>

<style scoped>
.scene-backdrop {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  /* Chunky edges when the 320x180 grid is scaled to a projector. */
  image-rendering: pixelated;
}

.twinkle {
  animation: twinkle 5.5s steps(2, end) infinite;
}

@keyframes twinkle {
  0%, 82%, 100% { opacity: 0.85; }
  88% { opacity: 0.15; }
}

.firefly {
  opacity: 0.75;
  animation-name: drift;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes drift {
  0%, 100% { transform: translate(0, 0); opacity: 0.15; }
  25% { opacity: 0.8; }
  50% { transform: translate(6px, -5px); opacity: 0.55; }
  75% { opacity: 0.85; }
}

/* Presenting to a room includes people who do not want motion. */
@media (prefers-reduced-motion: reduce) {
  .twinkle,
  .firefly {
    animation: none;
  }
}
</style>
