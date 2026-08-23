<!--
  The 45°-rotated square that anchors a kicker or title. It is the theme's
  only accent shape — the design system explicitly rules out accent stripes,
  sidebar colour bars and single-side card borders.

    <Motif />                 0.35in, blue @10%, on light backgrounds
    <Motif size="lg" on-dark />  0.5in, blue @15% with a cyan stroke
-->
<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg'
  onDark?: boolean
}>(), {
  size: 'sm',
  onDark: false,
})
</script>

<template>
  <div class="motif" :class="[`motif--${size}`, { 'motif--on-dark': onDark }]" aria-hidden="true" />
</template>
