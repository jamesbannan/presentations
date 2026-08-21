<!--
  Agenda list of numbered stages, each with its own accent colour.

    <StageList :stages="[{ n: 1, accent: 'cyan', title: 'THE STATUS QUO', body: '…' }]" />
-->
<script setup lang="ts">
import { inlineMarkdown } from '../composables/inlineMarkdown'

interface Stage {
  n?: number | string
  accent?: string
  title: string
  body?: string
}

const props = defineProps<{ stages: Stage[] }>()

const swatch: Record<string, string> = {
  cyan: '#00f5ff',
  magenta: '#ff00ff',
  green: '#39ff14',
  yellow: '#ffe600',
  orange: '#ff6b00',
  red: '#ff003c',
}

const accentOf = (stage: Stage) => stage.accent ?? 'cyan'
const colour = (stage: Stage) => swatch[accentOf(stage)] ?? swatch.cyan
const glow = (stage: Stage) => `var(--glow-${accentOf(stage) === 'yellow' ? 'yellow' : accentOf(stage)})`
const textClass = (stage: Stage) => (accentOf(stage) === 'yellow' ? 'arcade-yellow' : `neon-${accentOf(stage)}`)
const number = (stage: Stage, index: number) => stage.n ?? index + 1

void props
</script>

<template>
  <div v-for="(stage, index) in stages" :key="stage.title" class="stage-badge">
    <div
      class="stage-num"
      :style="{ color: colour(stage), borderColor: colour(stage), textShadow: glow(stage) }"
    >
      {{ number(stage, index) }}
    </div>
    <div class="stage-label">
      <strong :class="textClass(stage)">{{ stage.title }}</strong>
      <span v-if="stage.body" v-html="inlineMarkdown(stage.body)" />
    </div>
  </div>
</template>
