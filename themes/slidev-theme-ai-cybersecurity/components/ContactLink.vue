<!--
  One contact line on the closing slide.

    <ContactLink icon="linkedin" text="linkedin.com/in/jamesbannan" />

  Icons are rendered monochrome white so they stay legible across the whole
  height of the title gradient; bundled SVG assets keep their own colours.
-->
<script setup lang="ts">
defineProps<{
  icon?: string
  text?: string
}>()
</script>

<template>
  <div class="contact-link">
    <BrandIcon v-if="icon" :name="icon" />
    <span><slot>{{ text }}</slot></span>
  </div>
</template>
