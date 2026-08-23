<!--
  Section divider — white-to-sky gradient with scattered blue facets.

  Frontmatter:
    kicker   — e.g. "SECTION 01"
    title    — section name; \n becomes a line break
    subtitle — one-line framing of what the section covers
-->
<script setup lang="ts">
import { useSlideHeader } from '../composables/useSlideHeader'

const props = defineProps<{
  kicker?: string
  heading?: string
  subtitle?: string
}>()

const { kicker, heading, subtitle } = useSlideHeader(props)
</script>

<template>
  <div class="slidev-layout section bg-divider">
    <SlideBg name="bg-divider" />

    <div class="section-body">
      <Motif class="section-motif" />
      <div v-if="kicker" class="text-kicker section-kicker">{{ kicker }}</div>
      <h2 v-if="heading" class="text-section-title section-title" v-html="heading.replace(/\n/g, '<br>')" />
      <p v-if="subtitle" class="text-caption section-subtitle">{{ subtitle }}</p>
      <slot />
    </div>

    <PageNumber />
  </div>
</template>
