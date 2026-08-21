<!--
  One line inside the closing slide's contact box.

    <ContactLink icon="github" accent="cyan" text="github.com/me/repo" />
-->
<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string
  text?: string
  accent?: string
}>(), { accent: 'cyan' })
</script>

<template>
  <div>
    <BrandIcon v-if="icon" :name="icon" />
    <span :class="accent === 'yellow' ? 'arcade-yellow' : `neon-${accent}`">
      <slot>{{ text }}</slot>
    </span>
  </div>
</template>
