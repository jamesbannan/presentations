<!--
  The page marker: this slide's number as a Roman numeral and in binary.

    <Folio />

  Reads the slide's own number from its context rather than the current
  navigation position — Slidev keeps neighbouring slides mounted, and a
  folio that showed the presenter's position would be wrong on all of them.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { toBinary, toRoman } from '../composables/motif'

const { $page } = useSlideContext()
const n = computed(() => Number($page.value ?? 0))
</script>

<template>
  <div v-if="n > 0" class="motif folio">
    <span class="folio-roman">{{ toRoman(n) }}</span>
    <span class="folio-dot">·</span>
    <span class="folio-bits">{{ toBinary(n) }}</span>
  </div>
</template>

<style scoped>
.folio {
  position: absolute;
  right: 40px;
  bottom: 22px;
  display: flex;
  align-items: baseline;
  gap: 0.45em;
  color: var(--ink-soft);
}

.folio-roman {
  font-family: var(--font-display);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
}

.folio-dot {
  font-family: var(--font-display);
  color: var(--terracotta);
}

.folio-bits {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: var(--aegean);
}
</style>
