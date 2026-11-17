<!--
  One image on a lab plate, with a caption beneath.

  Frontmatter:
    src     — image path; root-absolute paths resolve against the deck's
              public/ directory and get the build base prefixed
    caption — caption text; prefixed "FIG." with the slide's number
    kicker  — optional mono line above the heading
    fit     — 'contain' (default) | 'cover'

  Without `src` the plate shows an interference-fringe placeholder, so the
  deck builds and exports before the imagery has been chosen.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const props = defineProps({
  src: { type: String, default: '' },
  caption: { type: String, default: '' },
  kicker: { type: String, default: '' },
  fit: { type: String, default: 'contain' },
})

const base = import.meta.env.BASE_URL ?? '/'
const resolved = computed(() =>
  props.src.startsWith('/') ? `${base.replace(/\/$/, '')}${props.src}` : props.src,
)

const { $page } = useSlideContext()
const fig = computed(() => String(Number($page.value ?? 0)).padStart(2, '0'))
</script>

<template>
  <div class="slidev-layout figure">
    <CircuitRule class="figure-circuit" :columns="5" :seed="2" height="24px" />
    <header class="figure-head">
      <span v-if="kicker" class="kicker">{{ kicker }}</span>
      <slot />
    </header>
    <div class="figure-plate">
      <img v-if="src" :src="resolved" alt="" :style="{ objectFit: fit }">
      <div v-else class="figure-empty">
        <span>FIGURE · IMAGE TO COME</span>
      </div>
      <i class="corner corner--tl" /><i class="corner corner--tr" />
      <i class="corner corner--bl" /><i class="corner corner--br" />
    </div>
    <p v-if="caption" class="figure-caption">
      <span class="figure-label">FIG. {{ fig }}</span>{{ caption }}
    </p>
    <Folio />
  </div>
</template>

<style scoped>
.figure {
  display: flex;
  flex-direction: column;
  padding: 76px 80px 56px;
}

.figure-circuit {
  position: absolute;
  top: 26px;
  left: 80px;
}

.figure :deep(h1) {
  font-size: 1.6rem;
  margin: 0.3em 0 0.5em;
}

.figure-plate {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--grid);
  padding: 10px;
}

.figure-plate img {
  width: 100%;
  height: 100%;
  min-height: 0;
}

/* Registration marks at the plate corners, like a detector frame. */
.corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border: 0 solid var(--violet);
}

.corner--tl { top: -5px; left: -5px; border-top-width: 2px; border-left-width: 2px; }
.corner--tr { top: -5px; right: -5px; border-top-width: 2px; border-right-width: 2px; }
.corner--bl { bottom: -5px; left: -5px; border-bottom-width: 2px; border-left-width: 2px; }
.corner--br { bottom: -5px; right: -5px; border-bottom-width: 2px; border-right-width: 2px; }

/* Double-slit fringes: bright bands that fade out from the centre. */
.figure-empty {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(ellipse 60% 120% at 50% 50%, transparent 30%, rgba(246, 248, 252, 0.95) 85%),
    repeating-linear-gradient(90deg, rgba(98, 70, 234, 0.22) 0 3px, transparent 3px 16px);
}

.figure-empty span {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  background: var(--paper);
  padding: 0.4em 0.9em;
  border: 1px solid var(--grid);
}

.figure-caption {
  margin-top: 0.8em;
  font-size: 0.95rem !important;
  color: var(--ink-soft);
}

.figure-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  color: var(--magenta);
  margin-right: 0.9em;
}
</style>
