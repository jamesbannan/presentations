<!--
  Closing card. Centred, with the arch drawn faintly behind it.

  Frontmatter:
    kicker — optional mono line above the heading

  Slot: `# Thank you`, a line, then a `.contact-list` of <ContactLink>s.
-->
<script setup lang="ts">
defineProps({
  kicker: { type: String, default: '' },
})
</script>

<template>
  <div class="slidev-layout end">
    <div class="motif end-arch">
      <Arch />
    </div>
    <div class="end-body">
      <span v-if="kicker" class="kicker">{{ kicker }}</span>
      <slot />
    </div>
    <Meander class="end-meander end-meander--l" :periods="30" flip />
    <Meander class="end-meander end-meander--r" :periods="30" />
  </div>
</template>

<style scoped>
.end {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 96px;
}

.end-arch {
  position: absolute;
  inset: 3% 0 12% 0;
  display: flex;
  justify-content: center;
  opacity: 0.32;
}

/* 30 periods a side, plus the 16px gap, spans ~75% of the slide width. */
.end-meander {
  position: absolute;
  bottom: 26px;
}

.end-meander--l { right: 50%; margin-right: 8px; }
.end-meander--r { left: 50%; margin-left: 8px; }

.end :deep(h1) {
  font-size: 2.6rem;
  margin-top: 0.4em;
}

.end :deep(p) {
  color: var(--ink-soft);
  margin-top: 0.6em;
}
</style>
