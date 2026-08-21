<!--
  Standard content slide: cyan-underlined header bar plus a flexible body.

  Frontmatter:
    tag   — the `/// SECTION` kicker above the title
    title — slide heading (upper-cased by CSS)
    bare  — set true to skip the .slide-body padding wrapper when the slide
            supplies its own full-bleed canvas (arch, demo, vs, problem)
-->
<script setup lang="ts">
import { useSlideHeader } from '../composables/useSlideHeader'

const props = defineProps<{
  tag?: string
  heading?: string
  bare?: boolean
}>()

const { tag, heading, bare } = useSlideHeader(props)
</script>

<template>
  <div class="slidev-layout default">
    <div v-if="tag || heading" class="slide-header">
      <span v-if="tag" class="header-tag">{{ tag }}</span>
      <h2 v-if="heading">{{ heading }}</h2>
    </div>

    <slot v-if="bare" />
    <div v-else class="slide-body">
      <slot />
    </div>
  </div>
</template>
