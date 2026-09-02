<!--
  One contact line on the closing slide.

    <ContactLink icon="linkedin" text="linkedin.com/in/jamesbannan" />

  Sits in a `.contact-list` on the cover layout. The scene runs full-bleed
  behind it, so each line carries its own dark backing — a readable plate over
  a lit shopfront, rather than text floating on whatever happens to be behind.
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
