<!--
  Default content slide — text inside the pixel dialogue box.

  Frontmatter:
    scene  — optional badge text, e.g. '02 — PIPELINE'
    accent — '' | 'cyan' | 'magenta'. One accent per slide, never per element.
-->
<script setup lang="ts">
defineProps({
  scene: { type: [String, Number], default: '' },
  accent: { type: String, default: '' },
})
</script>

<template>
  <div class="slidev-layout dialog w-full h-full flex flex-col justify-center px-16 py-10">
    <span v-if="scene !== '' && scene !== null" class="scene-number mb-5 w-fit">{{ scene }}</span>
    <div class="dialog-box" :class="accent ? `dialog-box--${accent}` : ''">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dialog :deep(h1) { font-size: 1.1rem; color: var(--cyan); margin-bottom: 0.7em; }
.dialog :deep(h2) { font-size: 0.95rem; }
.dialog :deep(p),
.dialog :deep(li) { font-size: 0.95rem; }
.dialog :deep(p:last-child) { margin-bottom: 0; }
</style>
