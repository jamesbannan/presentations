<!--
  Chapter card. An arch on the left carries the part number as a Roman
  numeral over its binary; the heading sits to the right.

  Frontmatter:
    numeral — the part number (1, 2, 3…), rendered as II / 0010
    kicker  — optional mono line above the heading
-->
<script setup lang="ts">
import { computed } from 'vue'
import { toBinary, toRoman } from '../composables/motif'

const props = defineProps({
  numeral: { type: [Number, String], default: '' },
  kicker: { type: String, default: '' },
})

const roman = computed(() => toRoman(props.numeral))
const bits = computed(() => toBinary(props.numeral))
</script>

<template>
  <div class="slidev-layout section">
    <div class="section-arch">
      <Arch>
        <span v-if="roman" class="section-roman">{{ roman }}</span>
        <span v-if="bits" class="section-bits">{{ bits }}</span>
      </Arch>
    </div>
    <div class="section-text">
      <span v-if="kicker" class="kicker">{{ kicker }}</span>
      <slot />
    </div>
    <Folio />
  </div>
</template>

<style scoped>
.section {
  display: flex;
  align-items: center;
  gap: 56px;
  padding: 0 72px 0 56px;
}

.section-arch {
  height: 80%;
  flex: 0 0 auto;
}

.section-text {
  flex: 1 1 auto;
}

.section-roman {
  font-family: var(--font-display);
  font-size: 2.6rem;
  line-height: 1;
  color: var(--ink);
}

.section-bits {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--aegean);
  margin-top: 0.5em;
}

.section :deep(h1) {
  font-size: 2.2rem;
  margin-top: 0.5em;
}

.section :deep(h2) {
  margin-top: 0.6em;
}
</style>
