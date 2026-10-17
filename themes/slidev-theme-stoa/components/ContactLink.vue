<!--
  One contact line on the closing slide.

    <ContactLink icon="linkedin" text="linkedin.com/in/jamesbannan" />

  Sits in a `.contact-list` on the `end` layout. Each line carries its own
  plate, so it stays legible over the arch drawn behind it.
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
