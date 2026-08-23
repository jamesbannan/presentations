<!--
  Two-column comparison. Both cards stay light — the design system reserves
  dark fills for slides that are themselves full-bleed dark.

  Frontmatter:
    kicker, title
    leftTitle, rightTitle — card kickers
  Content goes in the ::left:: and ::right:: slots.
-->
<script setup lang="ts">
import { useSlideHeader } from '../composables/useSlideHeader'

const props = defineProps<{
  kicker?: string
  heading?: string
  leftTitle?: string
  rightTitle?: string
}>()

const { kicker, heading } = useSlideHeader(props)
</script>

<template>
  <div class="slidev-layout two-col">
    <header v-if="kicker || heading" class="slide-header">
      <div v-if="kicker" class="text-kicker slide-kicker">{{ kicker }}</div>
      <h2 v-if="heading" class="text-slide-title slide-title slide-title--tight">{{ heading }}</h2>
    </header>

    <div class="two-col-grid">
      <CompareCard :kicker="leftTitle">
        <slot name="left" />
      </CompareCard>
      <CompareCard :kicker="rightTitle" alt>
        <slot name="right" />
      </CompareCard>
    </div>

    <PageNumber />
  </div>
</template>
