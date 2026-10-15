<!--
  Title card. Text on the left and the temple-as-system filling the right,
  standing on the same ground line as the meander, whose circuit traces run
  into its steps.

  Frontmatter:
    kicker — small mono line above the title, e.g. 'TEDxUniMelb · MMXXVI'
    motif  — 'temple' (default) | 'none'

  Slot: `# title`, `## subtitle`, then a paragraph for the speaker line.
-->
<script setup lang="ts">
defineProps({
  kicker: { type: String, default: '' },
  motif: { type: String, default: 'temple' },
})
</script>

<template>
  <div class="slidev-layout cover">
    <div class="cover-body" :class="{ 'cover-body--solo': motif === 'none' }">
      <div class="cover-text">
        <span v-if="kicker" class="kicker">{{ kicker }}</span>
        <slot />
      </div>
    </div>
    <div v-if="motif !== 'none'" class="motif cover-motif">
      <Temple />
    </div>
    <Meander class="cover-meander" :periods="motif === 'none' ? 34 : 22" height="32px" />
  </div>
</template>

<style scoped>
.cover-body {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 0 56px 64px;
}

.cover-text {
  max-width: 400px;
}

.cover-body--solo .cover-text {
  max-width: none;
  padding-right: 64px;
}

/* Sized so the stylobate lines up with the middle of the meander. */
.cover-motif {
  position: absolute;
  right: 28px;
  bottom: 42px;
  width: 500px;
}

.cover-meander {
  position: absolute;
  left: 64px;
  bottom: 36px;
}

.cover :deep(h1) {
  font-size: 2.35rem;
  line-height: 1.2;
  margin-top: 0.6em;
}

.cover :deep(h2) {
  font-size: 1.4rem;
  margin-top: 0.7em;
}

.cover :deep(p) {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  color: var(--ink-soft);
  margin-top: 2.4em;
}
</style>
