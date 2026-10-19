<!--
  Closing card. Centred, with an atom's probability cloud drawn faintly
  behind it and interfering waves along the foot.

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
    <div class="motif end-orbital" aria-hidden="true">
      <Orbital />
    </div>
    <div class="end-body">
      <span v-if="kicker" class="kicker">{{ kicker }}</span>
      <slot />
    </div>
    <div class="motif end-wave" aria-hidden="true">
      <Wave mode="interference" :width="720" :cycles="26" height="30px" />
    </div>
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

.end-orbital {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 520px;
  transform: translate(-50%, -52%);
  opacity: 0.32;
  /* Clear the nucleus from behind the text; keep the orbits at the rim. */
  -webkit-mask-image: radial-gradient(circle at 50% 52%, transparent 0 24%, #000 48%);
  mask-image: radial-gradient(circle at 50% 52%, transparent 0 24%, #000 48%);
}

.end-wave {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 22px;
  display: flex;
  justify-content: center;
}

.end :deep(h1) {
  font-size: 2.8rem;
  margin-top: 0.4em;
}

.end :deep(p) {
  color: var(--ink-soft);
  margin-top: 0.6em;
}
</style>
