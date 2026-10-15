<!--
  Title card. Text on the left, the temple-as-system on the right, and a
  meander running out into circuit traces along the foot.

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
      <div v-if="motif !== 'none'" class="cover-motif">
        <Temple />
      </div>
    </div>
    <Meander class="cover-meander" :periods="34" height="32px" />
  </div>
</template>

<style scoped>
.cover-body {
  height: 100%;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 32px;
  padding: 0 56px 40px 64px;
}

.cover-body--solo {
  grid-template-columns: 1fr;
}

.cover-motif {
  align-self: center;
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
