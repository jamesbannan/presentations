<!--
  One image, framed like a museum plate, with a caption beneath.

  Frontmatter:
    src     — image path; root-absolute paths resolve against the deck's
              public/ directory and get the build base prefixed
    caption — caption text; prefixed "FIG." with the slide's numeral
    kicker  — optional mono line above the heading
    fit     — 'contain' (default) | 'cover'

  Without `src` the plate shows a hatched placeholder, so the deck builds and
  exports before the imagery has been chosen.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { toRoman } from '../composables/motif'

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
const fig = computed(() => toRoman(Number($page.value ?? 0)))
</script>

<template>
  <div class="slidev-layout figure">
    <Meander class="figure-meander" :periods="5" />
    <header class="figure-head">
      <span v-if="kicker" class="kicker">{{ kicker }}</span>
      <slot />
    </header>
    <div class="figure-plate">
      <img v-if="src" :src="resolved" alt="" :style="{ objectFit: fit }">
      <div v-else class="figure-empty">
        <span>FIGURE · IMAGE TO COME</span>
      </div>
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

.figure-meander {
  position: absolute;
  top: 34px;
  left: 80px;
}

.figure :deep(h1) {
  font-size: 1.6rem;
  margin: 0.3em 0 0.5em;
}

.figure-plate {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  background: var(--marble-deep);
  border: 1px solid var(--vein);
  padding: 10px;
}

.figure-plate img {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.figure-empty {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    repeating-linear-gradient(135deg, transparent 0 11px, rgba(211, 201, 182, 0.55) 11px 12px);
}

.figure-empty span {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
  background: var(--marble-deep);
  padding: 0.4em 0.9em;
  border: 1px solid var(--vein);
}

.figure-caption {
  margin-top: 0.8em;
  font-size: 1rem !important;
  color: var(--ink-soft);
}

.figure-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  color: var(--terracotta);
  margin-right: 0.9em;
}
</style>
