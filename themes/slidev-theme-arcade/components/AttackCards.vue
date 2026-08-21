<!--
  Hall-of-shame incident cards.

    <AttackCards
      headline="A stolen cert turns your supply chain into theirs."
      :attacks="[{ year: 2022, name: 'NVIDIA CERT LEAK', line: '…', impact: '…' }]" />
-->
<script setup lang="ts">
import { inlineMarkdown } from '../composables/inlineMarkdown'

interface Attack {
  year?: string | number
  name: string
  line?: string
  impact?: string
}

defineProps<{
  attacks: Attack[]
  headline?: string
  punchline?: string
}>()
</script>

<template>
  <div class="problem-canvas">
    <div v-if="headline" class="problem-headline">▶ {{ headline }}</div>
    <div class="attack-grid">
      <div v-for="attack in attacks" :key="attack.name" class="attack-card">
        <span v-if="attack.year" class="attack-year">{{ attack.year }}</span>
        <div class="attack-name">{{ attack.name }}</div>
        <div v-if="attack.line" class="attack-line" v-html="inlineMarkdown(attack.line)" />
        <div v-if="attack.impact" class="attack-impact" v-html="inlineMarkdown(attack.impact)" />
      </div>
    </div>
    <div v-if="punchline" class="problem-punchline">▶ {{ punchline }} ◀</div>
    <slot />
  </div>
</template>
