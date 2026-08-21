<!--
  Chapter break / section divider.

  Frontmatter:
    level — the "LEVEL 01" style kicker
    title — the section name
    prompt — bottom "press start" line
-->
<script setup lang="ts">
import { useSlideHeader } from '../composables/useSlideHeader'

const props = defineProps<{
  level?: string
  heading?: string
  prompt?: string
}>()

const { heading } = useSlideHeader(props)
</script>

<template>
  <div class="slidev-layout section">
    <div v-if="level" class="level-label">{{ level }}</div>
    <h2 v-if="heading">{{ heading }}</h2>
    <hr class="scanline-divider">
    <slot />
    <div v-if="prompt" class="press-start">{{ prompt }}</div>
  </div>
</template>
