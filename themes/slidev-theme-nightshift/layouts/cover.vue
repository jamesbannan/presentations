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

/* A struck-through word in a headline reads as a correction, so it wants to
   look deliberate. The font's own line-through metric sits low against this
   pixel face, and a background stripe disappears under the headline's drop
   shadow, so the rule is its own element: centred on the glyphs, drawn over
   them, with a shadow of its own so it survives a lit backdrop. */
.cover :deep(h1 s),
.cover :deep(h1 del) {
  position: relative;
  color: var(--ghost-dim);
  text-decoration: none;
}

.cover :deep(h1 s)::after,
.cover :deep(h1 del)::after {
  content: '';
  position: absolute;
  left: -0.06em;
  right: -0.06em;
  top: 50%;
  height: 0.08em;
  transform: translateY(-50%);
  background: var(--magenta);
  box-shadow: 0 0.04em 0 rgba(8, 1, 24, 0.85);
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
