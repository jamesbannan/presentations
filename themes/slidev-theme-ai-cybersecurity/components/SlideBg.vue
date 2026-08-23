<!--
  Full-bleed background artwork. `name` resolves against the theme's
  assets/svg directory (bg-title, bg-dark, bg-divider); anything else is
  treated as a URL so a deck can drop in its own image.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { artUrl } from '../composables/useThemeArt'

const props = defineProps<{ name: string }>()

const src = computed(() => artUrl(props.name))
</script>

<template>
  <img class="slide-bg" :src="src" alt="" aria-hidden="true">
</template>
