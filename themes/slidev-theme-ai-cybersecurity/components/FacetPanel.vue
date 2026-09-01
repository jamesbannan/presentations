<!--
  Decorative facet panel — the shard cluster that bleeds off one edge of
  agenda and stat slides.

    <FacetPanel side="right" />           agenda: right edge, 90% opacity
    <FacetPanel side="left" flipped />    stat: left edge, rotated 180°, 65%
-->
<script setup lang="ts">
import { computed } from 'vue'
import { artUrl } from '../composables/useThemeArt'

const props = withDefaults(defineProps<{
  side?: 'left' | 'right'
  flipped?: boolean
  opacity?: number
}>(), {
  side: 'right',
  flipped: false,
})

const src = artUrl('panel-facets')
const style = computed(() => ({
  opacity: props.opacity ?? (props.side === 'left' ? 0.65 : 0.9),
}))
</script>

<template>
  <img
    class="facet-panel"
    :class="[`facet-panel--${side}`, { 'facet-panel--flipped': flipped }]"
    :style="style"
    :src="src"
    alt=""
    aria-hidden="true"
  >
</template>
