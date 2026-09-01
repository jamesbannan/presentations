<!--
  Full-bleed "chapter" title card.

  Frontmatter:
    scene — chapter number, rendered as "SCENE <n>" in the yellow badge
-->
<script setup lang="ts">
defineProps({
  scene: { type: [String, Number], default: '' },
})
</script>

<template>
  <div class="slidev-layout section w-full h-full flex flex-col items-center justify-center text-center px-16">
    <span v-if="scene !== '' && scene !== null" class="scene-number mb-8">SCENE {{ scene }}</span>
    <slot />
  </div>
</template>

<style scoped>
.section :deep(h1) {
  font-size: 1.8rem;
  line-height: 1.8;
  color: var(--ghost);
  text-shadow: 4px 4px 0 var(--line);
}
.section :deep(h2) {
  font-family: var(--font-body);
  font-weight: 500;
  color: var(--yellow);
  margin-top: 1em;
  font-size: 0.95rem;
}
</style>
