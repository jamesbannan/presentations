<!--
  The page marker: this slide's number as a ket and as a register readout.

    <Folio />           |7⟩ · 0111

  Reads the slide's own number from its context rather than the current
  navigation position — Slidev keeps neighbouring slides mounted, and a
  folio that showed the presenter's position would be wrong on all of them.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { toBinary } from '../composables/motif'

const { $page } = useSlideContext()
const n = computed(() => Number($page.value ?? 0))
const bits = computed(() => toBinary(n.value, n.value > 15 ? 6 : 4))
</script>

<template>
  <div v-if="n > 0" class="motif folio">
    <span class="ket folio-ket">{{ n }}</span>
    <span class="folio-reg">
      <i v-for="(b, i) in bits" :key="i" :class="{ on: b === '1' }" />
    </span>
    <span class="folio-bits">{{ bits }}</span>
  </div>
</template>

<style scoped>
.folio {
  position: absolute;
  right: 40px;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 0.6em;
  color: var(--ink-soft);
}

.folio-ket {
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--ink);
}

.folio-reg {
  display: inline-flex;
  gap: 3px;
}

.folio-reg i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1px solid var(--violet);
  box-sizing: border-box;
}

.folio-reg i.on {
  background: var(--violet);
}

.folio-bits {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: var(--cyan);
}
</style>
