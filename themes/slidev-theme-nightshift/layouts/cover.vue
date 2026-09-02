<!--
  Cover / closing slide — full-bleed exterior scene, no dialogue box.

  Frontmatter:
    backdrop — 'exterior' (default) | 'interior' | 'none'

  Content comes from the slot: `# heading`, `## subtitle`, then paragraphs.
-->
<script setup lang="ts">
defineProps({
  backdrop: { type: String, default: 'exterior' },
})
</script>

<template>
  <div class="slidev-layout cover w-full h-full flex flex-col items-center justify-center text-center px-16">
    <SceneBackdrop v-if="backdrop !== 'none'" :variant="backdrop" />
    <slot />
  </div>
</template>

<style scoped>
.cover :deep(h1) {
  font-size: 2rem;
  line-height: 1.8;
  color: var(--ghost);
  text-shadow: 4px 4px 0 var(--line), 0 0 24px rgba(8, 1, 24, 0.9);
}
.cover :deep(h2) {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  color: var(--cyan);
  margin-top: 1.2em;
  text-shadow: 0 2px 10px rgba(8, 1, 24, 0.95);
}
.cover :deep(p) {
  color: var(--ghost-dim);
  margin-top: 1.6em;
  font-size: 0.85rem;
  text-shadow: 0 2px 10px rgba(8, 1, 24, 0.95);
}
</style>
