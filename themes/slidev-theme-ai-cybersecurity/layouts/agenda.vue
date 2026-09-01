<!--
  Agenda — numbered rows on white, with the facet panel bleeding off the right.

  Frontmatter:
    kicker — e.g. "SESSION OVERVIEW"
    title  — e.g. "Agenda"
    items  — array of strings, or { n, label } objects

  Omit `items` and put your own content in the default slot to hand-roll the body.
-->
<script setup lang="ts">
import { useSlideHeader } from '../composables/useSlideHeader'

const props = defineProps<{
  kicker?: string
  heading?: string
  items?: (string | { n?: number | string, label: string })[]
}>()

const { kicker, heading } = useSlideHeader(props)
</script>

<template>
  <div class="slidev-layout agenda">
    <FacetPanel side="right" />

    <header class="slide-header">
      <div v-if="kicker" class="text-kicker slide-kicker">{{ kicker }}</div>
      <h2 v-if="heading" class="text-slide-title slide-title">{{ heading }}</h2>
    </header>

    <div class="slide-body">
      <AgendaList v-if="items?.length" :items="items" />
      <slot />
    </div>

    <PageNumber />
  </div>
</template>
