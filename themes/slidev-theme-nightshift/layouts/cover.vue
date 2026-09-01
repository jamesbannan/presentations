<!--
  Cover / closing slide — full-bleed, centred, no dialogue box.

  Content comes from the slot: `# heading`, `## subtitle`, then paragraphs.
-->
<template>
  <div class="slidev-layout cover w-full h-full flex flex-col items-center justify-center text-center px-16">
    <slot />
  </div>
</template>

<style scoped>
.cover :deep(h1) {
  font-size: 2rem;
  line-height: 1.8;
  color: var(--ghost);
  text-shadow: 4px 4px 0 var(--line);
}
.cover :deep(h2) {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  color: var(--cyan);
  margin-top: 1.2em;
}
.cover :deep(p) {
  color: var(--ghost-dim);
  margin-top: 1.6em;
  font-size: 0.85rem;
}
</style>
