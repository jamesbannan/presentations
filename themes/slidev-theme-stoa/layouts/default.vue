<!--
  Content slide. A short meander marks the head of the page, the folio
  marks its foot.

  Frontmatter:
    kicker — optional mono line above the heading
-->
<script setup lang="ts">
defineProps({
  kicker: { type: String, default: '' },
})
</script>

<template>
  <div class="slidev-layout default">
    <Meander class="default-meander" :periods="5" />
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

.default-meander {
  position: absolute;
  top: 34px;
  left: 80px;
}

.default :deep(h1) {
  font-size: 1.8rem;
  margin: 0.3em 0 0.7em;
}
</style>
