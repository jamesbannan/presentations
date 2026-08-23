<!--
  Stat callout — full-bleed navy with one oversized cyan number.

  Frontmatter:
    kicker  — cyan eyebrow
    title   — the claim the number supports
    stat    — the number itself, e.g. "~75%"
    caption — what the number means; \n becomes a line break
    source  — italic source note along the bottom
  Slot content renders in the left column under the title.
-->
<script setup lang="ts">
import { useSlideHeader } from '../composables/useSlideHeader'

const props = defineProps<{
  kicker?: string
  heading?: string
  stat?: string
  caption?: string
  source?: string
}>()

const { kicker, heading } = useSlideHeader(props)
</script>

<template>
  <div class="slidev-layout stat card-dark-fullbleed">
    <FacetPanel side="left" flipped />

    <header class="slide-header">
      <div v-if="kicker" class="text-kicker slide-kicker card-kicker">{{ kicker }}</div>
      <h2 v-if="heading" class="text-slide-title slide-title">{{ heading }}</h2>
    </header>

    <div class="stat-grid">
      <div class="stat-notes">
        <slot />
      </div>
      <div class="stat-figure">
        <div v-if="stat" class="text-stat stat-number">{{ stat }}</div>
        <p v-if="caption" class="stat-caption" v-html="caption.replace(/\n/g, '<br>')" />
      </div>
    </div>

    <div v-if="source" class="stat-source">{{ source }}</div>

    <PageNumber on-dark />
  </div>
</template>
