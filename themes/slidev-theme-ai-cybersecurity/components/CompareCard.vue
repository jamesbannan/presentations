<!--
  A light card with a tracked kicker and a bulleted list. Cards on a white
  slide always stay light — `alt` only switches the tint and kicker colour so
  the two halves of a comparison read as a pair, never as light-vs-dark.

    <CompareCard kicker="WHAT DETECTION TOOLS DO" :items="['Flag statistical patterns…']" />
    <CompareCard kicker="WHAT ACTUALLY PROTECTS YOU" alt :items="[…]" />

  Omit `items` and put the body in the default slot for free-form content.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { inlineMarkdown } from '../composables/inlineMarkdown'

const props = withDefaults(defineProps<{
  kicker?: string
  items?: string[]
  alt?: boolean
}>(), { alt: false })

const bullets = computed(() => (props.items ?? []).map(inlineMarkdown))
</script>

<template>
  <div class="card-light compare-card" :class="{ 'card-light--alt': alt }">
    <div v-if="kicker" class="card-kicker text-kicker">{{ kicker }}</div>
    <ul v-if="bullets.length" class="compare-list">
      <li v-for="(item, index) in bullets" :key="index" v-html="item" />
    </ul>
    <slot />
  </div>
</template>
