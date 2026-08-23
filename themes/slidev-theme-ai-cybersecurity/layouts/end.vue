<!--
  Closing slide — the title gradient again, bookending the deck.

  Frontmatter:
    title    — defaults to "THANK YOU"
    subtitle — e.g. "Questions · Discussion · Job Ready Program"
  Slot content renders beneath the subtitle for contact details.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useSlideHeader } from '../composables/useSlideHeader'

const props = defineProps<{
  heading?: string
  subtitle?: string
}>()

const { heading, subtitle } = useSlideHeader(props)
const title = computed(() => heading.value ?? 'THANK YOU')
</script>

<template>
  <div class="slidev-layout end bg-title">
    <SlideBg name="bg-title" />

    <div class="end-body">
      <Motif size="md" on-dark class="end-motif" />
      <h2 class="end-title">{{ title }}</h2>
      <p v-if="subtitle" class="end-subtitle">{{ subtitle }}</p>
      <slot />
    </div>
  </div>
</template>
