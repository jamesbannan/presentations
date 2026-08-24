<!--
  Closing slide — the title gradient again, bookending the deck.

  Frontmatter:
    title    — defaults to "THANK YOU"
    subtitle — e.g. "Questions · Discussion · Job Ready Program"
    note     — optional line under the contact block
  Slot content renders inside the contact block, typically <ContactLink> rows.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useSlideHeader } from '../composables/useSlideHeader'

const props = defineProps<{
  heading?: string
  subtitle?: string
  note?: string
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

      <div class="end-contact">
        <slot />
        <div v-if="note" class="end-note">{{ note }}</div>
      </div>
    </div>
  </div>
</template>
