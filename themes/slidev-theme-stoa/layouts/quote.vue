<!--
  A single passage, set in a tabula ansata like a Roman inscription.

  Frontmatter:
    cite — attribution, set in mono beneath the tablet
-->
<script setup lang="ts">
defineProps({
  cite: { type: String, default: '' },
})
</script>

<template>
  <div class="slidev-layout quote">
    <div class="quote-body">
      <Tabula>
        <slot />
      </Tabula>
      <p v-if="cite" class="quote-cite">{{ cite }}</p>
    </div>
    <Folio />
  </div>
</template>

<style scoped>
.quote {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 120px;
}

.quote-body {
  width: 100%;
}

.quote :deep(.tabula-field p),
.quote :deep(.tabula-field blockquote) {
  font-family: var(--font-display);
  font-size: 1.45rem;
  line-height: 1.55;
  letter-spacing: 0.03em;
  text-align: center;
  color: var(--ink);
  border: 0;
  padding: 0;
  margin: 0;
}

.quote-cite {
  margin-top: 1.6em;
  text-align: center;
  font-family: var(--font-mono) !important;
  font-size: 0.75rem !important;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.quote-cite::before {
  content: '— ';
  color: var(--terracotta);
}
</style>
