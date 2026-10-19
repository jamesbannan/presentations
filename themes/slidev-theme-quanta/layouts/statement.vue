<!--
  One line, centred, and nothing else. Beneath it, a wave packet: a
  particle that hasn't decided where it is yet.

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
      <Wave class="statement-wave" :width="420" :cycles="14" height="44px" />
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
  font-size: 2.6rem;
  line-height: 1.18;
  margin-top: 0.4em;
}

.statement :deep(p) {
  font-size: 1.35rem;
  color: var(--ink-soft);
  margin-top: 0.8em;
}

.statement-wave {
  margin: 2em auto 0;
}
</style>
