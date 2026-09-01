<!--
  Diagonal corner decoration for white content slides — the same shard
  vocabulary as FacetPanel, but hugging the top-right and bottom-left corners
  where no layout places content (the header title caps at 10.5in and the page
  number sits bottom-right).

    <CornerArt />                 both corners, default size
    <CornerArt :size="2.2" />     inches, per corner
    <CornerArt corners="tr" />    top-right only
-->
<script setup lang="ts">
import { computed } from 'vue'
import { artUrl } from '../composables/useThemeArt'

const props = withDefaults(defineProps<{
  corners?: 'both' | 'tr' | 'bl'
  size?: number
  opacity?: number
}>(), {
  corners: 'both',
  size: 2.6,
})

const src = artUrl('corner-facets')
const style = computed(() => ({
  width: `calc(${props.size} * var(--in))`,
  height: `calc(${props.size} * var(--in))`,
  opacity: props.opacity,
}))
</script>

<template>
  <img
    v-if="corners !== 'bl'"
    class="corner-art corner-art--tr"
    :style="style"
    :src="src"
    alt=""
    aria-hidden="true"
  >
  <img
    v-if="corners !== 'tr'"
    class="corner-art corner-art--bl"
    :style="style"
    :src="src"
    alt=""
    aria-hidden="true"
  >
</template>
