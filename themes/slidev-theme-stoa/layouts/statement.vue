<!--
  One line, centred, and nothing else. Beneath it, two meanders meet in the
  middle: classical at the centre, circuitry at the edges.

  Frontmatter:
    kicker — optional mono line above the statement
-->
<script setup lang="ts">
defineProps({
  kicker: { type: String, default: '' },
})
</script>

<template>
  <div class="slidev-layout statement">
    <div class="statement-body">
      <span v-if="kicker" class="kicker">{{ kicker }}</span>
      <slot />
      <div class="statement-ornament">
        <Meander :periods="9" flip />
        <span class="statement-lozenge" />
        <Meander :periods="9" />
      </div>
    </div>
    <Folio />
  </div>
</template>

<style scoped>
.statement {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 96px;
  text-align: center;
}

.statement :deep(h1) {
  font-size: 2.5rem;
  line-height: 1.3;
  margin-top: 0.4em;
}

.statement :deep(p) {
  font-size: 1.5rem;
  color: var(--ink-soft);
  margin-top: 0.8em;
}

.statement-ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 2.2em;
}

.statement-lozenge {
  width: 9px;
  height: 9px;
  background: var(--ochre);
  transform: rotate(45deg);
}
</style>
