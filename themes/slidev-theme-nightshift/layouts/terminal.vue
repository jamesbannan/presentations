<!--
  Code / demo slide — an in-game computer screen.

  Frontmatter:
    scene — optional badge text, e.g. '03 — SOURCE'

  The box scrolls rather than bleeding off the canvas, so a long transcluded
  file degrades instead of overflowing the slide. The room behind it is lit
  cool, so the CRT panel stays the brightest thing on the slide.
-->
<script setup lang="ts">
defineProps({
  scene: { type: [String, Number], default: '' },
  backdrop: { type: String, default: 'interior' },
})
</script>

<template>
  <div class="slidev-layout terminal w-full h-full flex flex-col justify-center px-16 py-10">
    <SceneBackdrop v-if="backdrop !== 'none'" :variant="backdrop" palette="cool" :seed="20260903" />
    <span v-if="scene !== '' && scene !== null" class="scene-number mb-5 w-fit">{{ scene }}</span>
    <div class="terminal-box">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.terminal :deep(h1),
.terminal :deep(h2),
.terminal :deep(h3) {
  color: var(--cyan);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.6em;
}
.terminal :deep(p),
.terminal :deep(li) { color: var(--cyan); font-size: 0.9rem; }
.terminal :deep(strong) { color: var(--yellow); }
</style>
