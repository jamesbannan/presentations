<!--
  Full-bleed quote / guiding principle on the dark gradient.

  Frontmatter:
    quote  — the line itself; falls back to the slot if omitted
    kicker — attribution or section label beneath the quote
-->
<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { useSlideHeader } from '../composables/useSlideHeader'

const props = defineProps<{
  kicker?: string
  quote?: string
}>()

const { kicker } = useSlideHeader(props)
const { $frontmatter } = useSlideContext()
const quote = computed(() => props.quote ?? ($frontmatter as any)?.quote)
</script>

<template>
  <div class="slidev-layout quote bg-dark">
    <SlideBg name="bg-dark" />

    <div class="quote-body">
      <Motif on-dark class="quote-motif" />
      <blockquote v-if="quote" class="quote-text">{{ quote }}</blockquote>
      <div v-else class="quote-text">
        <slot />
      </div>
      <div v-if="kicker" class="text-kicker quote-kicker">{{ kicker }}</div>
    </div>

    <PageNumber on-dark />
  </div>
</template>
