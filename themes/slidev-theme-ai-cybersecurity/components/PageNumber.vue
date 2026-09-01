<!--
  Slide number in the bottom-right corner. Muted blue-grey on light slides,
  a lighter blue on dark ones — matched to the source template.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'

withDefaults(defineProps<{ onDark?: boolean }>(), { onDark: false })

const { currentPage } = useNav()
const label = computed(() => String(currentPage.value).padStart(2, '0'))
</script>

<template>
  <div class="page-number" :class="{ 'page-number--on-dark': onDark }">{{ label }}</div>
</template>
