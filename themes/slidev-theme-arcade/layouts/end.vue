<!--
  Closing "game over" slide. Slot content is placed inside the contact box, so
  a deck typically fills it with <ContactLink> entries.

  Frontmatter:
    gameOver, thankYou, note
-->
<script setup lang="ts">
withDefaults(defineProps<{
  gameOver?: string
  thankYou?: string
  note?: string
}>(), {
  gameOver: 'GAME OVER',
  thankYou: 'THANKS FOR PLAYING',
})
</script>

<template>
  <div class="slidev-layout end">
    <div class="end-title">
      <div class="game-over">{{ gameOver }}</div>
      <div class="thank-you">{{ thankYou }}</div>
    </div>

    <div class="contact-box">
      <slot />
      <div v-if="note" class="contact-note">{{ note }}</div>
    </div>
  </div>
</template>
