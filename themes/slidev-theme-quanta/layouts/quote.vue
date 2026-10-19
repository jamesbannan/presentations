<!--
  A single passage, held between a bra and a ket: ⟨ … ⟩.

  Frontmatter:
    cite — attribution, set in mono beneath the quote
-->
<script setup lang="ts">
import { useId } from 'vue'
import { safeId } from '../composables/motif'

defineProps({
  cite: { type: String, default: '' },
})

const gid = safeId('quote', useId() ?? 'x')
</script>

<template>
  <div class="slidev-layout quote">
    <svg class="motif quote-defs" aria-hidden="true">
      <defs>
        <linearGradient :id="gid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style="stop-color: var(--cyan)" />
          <stop offset="0.5" style="stop-color: var(--violet)" />
          <stop offset="1" style="stop-color: var(--magenta)" />
        </linearGradient>
      </defs>
    </svg>
    <div class="quote-body">
      <div class="quote-frame">
        <div class="quote-bracket" aria-hidden="true">
          <svg viewBox="0 0 20 100" preserveAspectRatio="none">
            <path d="M18 1 L2 50 L18 99" :stroke="`url(#${gid})`" vector-effect="non-scaling-stroke" />
          </svg>
        </div>
        <div class="quote-text">
          <slot />
        </div>
        <div class="quote-bracket" aria-hidden="true">
          <svg viewBox="0 0 20 100" preserveAspectRatio="none">
            <path d="M2 1 L18 50 L2 99" :stroke="`url(#${gid})`" vector-effect="non-scaling-stroke" />
          </svg>
        </div>
      </div>
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
  padding: 48px 100px;
}

.quote-defs {
  position: absolute;
  width: 0;
  height: 0;
}

.quote-body {
  width: 100%;
}

.quote-frame {
  display: flex;
  align-items: stretch;
  gap: 28px;
}

/* The bracket is drawn to the height of the quote, and must never be the
   thing that decides it: an SVG flex item would size itself from its
   viewBox ratio. */
.quote-bracket {
  position: relative;
  flex: 0 0 26px;
  min-height: 120px;
}

.quote-bracket svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.quote-bracket path {
  fill: none;
  stroke-width: 2;
  stroke-linejoin: round;
}

.quote-text {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.6em 0;
}

.quote :deep(.quote-text p),
.quote :deep(.quote-text blockquote) {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.4;
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
  font-size: 0.72rem !important;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-soft);
}

.quote-cite::before {
  content: '— ';
  color: var(--magenta);
}
</style>
