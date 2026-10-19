<!--
  Title card. Text on the left, a Bloch sphere on the right over a faint
  qubit lattice, and a three-wire circuit running along the foot.

  Frontmatter:
    kicker — small mono line above the title, e.g. 'DDD Adelaide · 2026'
    motif  — 'bloch' (default) | 'none'
    theta, phi — the state drawn on the sphere, in degrees

  Slot: `# title`, `## subtitle`, then a paragraph for the speaker line.
-->
<script setup lang="ts">
defineProps({
  kicker: { type: String, default: '' },
  motif: { type: String, default: 'bloch' },
  theta: { type: Number, default: 55 },
  phi: { type: Number, default: 35 },
})
</script>

<template>
  <div class="slidev-layout cover">
    <div v-if="motif !== 'none'" class="motif cover-lattice" aria-hidden="true">
      <Lattice :rows="7" :cols="19" :seed="4" fade />
    </div>
    <div v-if="motif !== 'none'" class="motif cover-bloch" aria-hidden="true">
      <BlochSphere :theta="theta" :phi="phi" />
    </div>
    <div class="cover-body" :class="{ 'cover-body--solo': motif === 'none' }">
      <div class="cover-text">
        <span v-if="kicker" class="kicker">{{ kicker }}</span>
        <slot />
      </div>
    </div>
    <div class="motif cover-circuit" aria-hidden="true">
      <CircuitRule :wires="3" :columns="motif === 'none' ? 26 : 15" :seed="9" height="52px" />
    </div>
  </div>
</template>

<style scoped>
.cover-body {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 0 70px 64px;
}

.cover-text {
  max-width: 470px;
}

.cover-body--solo .cover-text {
  max-width: none;
  padding-right: 64px;
}

.cover-bloch {
  position: absolute;
  right: 36px;
  top: 34px;
  width: 400px;
}

.cover-lattice {
  position: absolute;
  right: -40px;
  top: 10px;
  width: 560px;
  opacity: 0.5;
}

.cover-circuit {
  position: absolute;
  left: 64px;
  bottom: 30px;
}

.cover :deep(h1) {
  font-size: 2.6rem;
  line-height: 1.08;
  margin-top: 0.5em;
}

.cover :deep(h2) {
  font-size: 1.3rem;
  margin-top: 0.7em;
}

.cover :deep(p) {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  color: var(--ink-soft);
  margin-top: 2em;
}
</style>
