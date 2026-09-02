<!--
  A slide whose content is one piece of media — a clip, a screenshot, a chart.

  Frontmatter:
    scene    — optional badge text, e.g. '04 — DEMO'
    backdrop — 'interior' | 'exterior' | 'none'

  Unlike `terminal`, there is no panel around the slot. Media brings its own
  frame, and nesting one bezel inside another both looks wrong and costs the
  vertical space the media needs. The slot is height-constrained (min-height: 0
  through the flex chain) so a 16:9 clip scales down to fit rather than
  pushing itself off the bottom of the slide.
-->
<script setup lang="ts">
defineProps({
  scene: { type: [String, Number], default: '' },
  backdrop: { type: String, default: 'interior' },
})
</script>

<template>
  <div class="slidev-layout media w-full h-full flex flex-col justify-center px-16 py-10">
    <SceneBackdrop v-if="backdrop !== 'none'" :variant="backdrop" palette="cool" :seed="20260903" />
    <span v-if="scene !== '' && scene !== null" class="scene-number mb-4 w-fit">{{ scene }}</span>
    <div class="media-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.media-body {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1 1 auto;
}

.media :deep(h1) {
  color: var(--cyan);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.6em;
  flex: none;
}
</style>
