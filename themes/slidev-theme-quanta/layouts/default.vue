<!--
  Content slide. A short circuit marks the head of the page, a corner of
  qubit lattice fades in at the top right, and the folio marks the foot.

  Frontmatter:
    kicker — optional mono line above the heading
    motif  — 'lattice' (default) | 'none' — the corner lattice
-->
<script setup lang="ts">
defineProps({
  kicker: { type: String, default: '' },
  motif: { type: String, default: 'lattice' },
})
</script>

<template>
  <div class="slidev-layout default">
    <CircuitRule class="default-circuit" :columns="5" :seed="2" height="24px" />
    <div v-if="motif !== 'none'" class="motif default-lattice" aria-hidden="true">
      <Lattice :rows="4" :cols="11" :seed="6" fade />
    </div>
    <div class="default-body">
      <span v-if="kicker" class="kicker">{{ kicker }}</span>
      <slot />
    </div>
    <Folio />
  </div>
</template>

<style scoped>
.default {
  padding: 76px 80px 60px;
}

.default-circuit {
  position: absolute;
  top: 26px;
  left: 80px;
}

.default-lattice {
  position: absolute;
  top: -40px;
  right: -50px;
  width: 300px;
  opacity: 0.4;
}

.default :deep(h1) {
  font-size: 1.85rem;
  margin: 0.3em 0 0.7em;
}
</style>
