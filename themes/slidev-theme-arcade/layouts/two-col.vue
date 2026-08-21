<!--
  Two-panel comparison slide. Content goes in the `left` and `right` slots;
  panel titles and accent borders come from frontmatter.

  Frontmatter:
    tag, title (title renders as the slide heading)
    leftTitle,  leftAccent  (cyan | yellow | magenta | green | red)
    rightTitle, rightAccent
-->
<script setup lang="ts">
import { useSlideHeader } from '../composables/useSlideHeader'

const props = withDefaults(defineProps<{
  tag?: string
  heading?: string
  leftTitle?: string
  rightTitle?: string
  leftAccent?: string
  rightAccent?: string
}>(), {
  leftAccent: 'cyan',
  rightAccent: 'yellow',
})

const { tag, heading } = useSlideHeader(props)
</script>

<template>
  <div class="slidev-layout two-col">
    <div v-if="tag || heading" class="slide-header">
      <span v-if="tag" class="header-tag">{{ tag }}</span>
      <h2 v-if="heading">{{ heading }}</h2>
    </div>

    <div class="two-col-grid">
      <div class="col-panel" :class="`${leftAccent}-border`">
        <h3 v-if="leftTitle" class="col-panel-title">{{ leftTitle }}</h3>
        <slot name="left" />
      </div>

      <div class="col-panel" :class="`${rightAccent}-border`">
        <h3 v-if="rightTitle" class="col-panel-title">{{ rightTitle }}</h3>
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
