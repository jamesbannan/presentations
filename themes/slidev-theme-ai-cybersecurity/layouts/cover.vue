<!--
  Title slide — navy-to-blue gradient with the reflective skyline.

  Frontmatter:
    kicker   — tracked cyan eyebrow, e.g. "JOB READY  //  FACULTY OF ARTS"
    title    — hero title (also used for slide metadata)
    subtitle — one-line framing
    footer   — bottom credit line
  Slot content renders between the subtitle and the footer.
-->
<script setup lang="ts">
import { useSlideHeader } from '../composables/useSlideHeader'

const props = defineProps<{
  kicker?: string
  heading?: string
  subtitle?: string
  footer?: string
}>()

const { kicker, heading, subtitle } = useSlideHeader(props)
</script>

<template>
  <div class="slidev-layout cover bg-title">
    <SlideBg name="bg-title" />

    <div class="cover-body">
      <div v-if="kicker" class="text-kicker cover-kicker">{{ kicker }}</div>
      <h1 v-if="heading" class="text-hero cover-title" v-html="heading.replace(/\n/g, '<br>')" />
      <p v-if="subtitle" class="text-body cover-subtitle">{{ subtitle }}</p>
      <Motif size="lg" on-dark class="cover-motif" />
      <slot />
    </div>

    <div v-if="footer" class="cover-footer">{{ footer }}</div>
  </div>
</template>
