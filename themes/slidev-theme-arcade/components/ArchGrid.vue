<!--
  Architecture map: colour-coded component cards with optional flow arrows.

    <ArchGrid label="▶ KUBERNETES CLUSTER" :cards="facts.architecture" />

  Each card: { role, tag, title, sub, meta }
  An entry of { arrow: '▼ sign A', side: 'left' } renders a flow arrow instead.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { inlineMarkdown } from '../composables/inlineMarkdown'
import { useFacts } from '../composables/useFacts'

interface Card {
  role?: string
  tag?: string
  title?: string
  sub?: string | string[]
  meta?: string
  arrow?: string
  side?: string
}

const props = defineProps<{
  /** Defaults to the deck's `facts.architecture` when omitted. */
  cards?: Card[]
  label?: string
}>()

const facts = useFacts()
const cards = computed<Card[]>(() => props.cards ?? (facts.architecture as Card[]) ?? [])

const subs = (card: Card) => (card.sub ? [card.sub].flat() : [])
</script>

<template>
  <div class="arch-canvas">
    <div v-if="label" class="arch-cluster-label">{{ label }}</div>
    <div class="arch-grid">
      <template v-for="(card, index) in cards" :key="index">
        <div v-if="card.arrow" class="arch-arrow" :class="card.side ? `arch-arrow-${card.side}` : ''">
          {{ card.arrow }}
        </div>
        <div v-else class="arch-card" :class="card.role ? `arch-${card.role}` : ''">
          <div v-if="card.tag" class="arch-card-tag">{{ card.tag }}</div>
          <div v-if="card.title" class="arch-card-title" v-html="inlineMarkdown(card.title)" />
          <div v-for="(sub, i) in subs(card)" :key="i" class="arch-card-sub" v-html="inlineMarkdown(sub)" />
          <div v-if="card.meta" class="arch-card-meta" v-html="inlineMarkdown(card.meta)" />
        </div>
      </template>
      <slot />
    </div>
  </div>
</template>
