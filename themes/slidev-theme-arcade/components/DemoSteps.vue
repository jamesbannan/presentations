<!--
  Numbered demo walkthrough: arrow-separated step cards plus a "watch for" strip.

  Preferred form — name a demo from the deck's synced facts and the component
  resolves theme/tag/steps/watch itself, so the slide stays declarative:

    <DemoSteps demo="gpg" />

  Any prop given explicitly wins over the facts, and passing :steps directly
  works without facts at all:

    <DemoSteps theme="red" tag="The 'before' picture" :steps="[...]" />

  Each step: { title, body, meta, good? }
  `body` and `meta` accept inline markdown (`code`, **bold**, *italic*).
-->
<script setup lang="ts">
import { computed } from 'vue'
import { inlineMarkdown } from '../composables/inlineMarkdown'
import { useFacts } from '../composables/useFacts'

interface Step {
  title: string
  body?: string
  meta?: string
  good?: boolean
  bad?: boolean
}

const props = withDefaults(defineProps<{
  /** Key into the deck's `facts.demos`; supplies any prop left unset. */
  demo?: string
  steps?: Step[]
  theme?: string
  tag?: string
  watch?: string[]
  watchLabel?: string
}>(), {
  watchLabel: '▶ WATCH FOR:',
})

const facts = useFacts()
const source = computed(() => (props.demo ? facts.demos?.[props.demo] : undefined) ?? {})

const steps = computed<Step[]>(() => props.steps ?? source.value.steps ?? [])
const theme = computed(() => props.theme ?? source.value.theme ?? 'cyan')
const tag = computed(() => props.tag ?? source.value.intro)
const watch = computed<string[]>(() => props.watch ?? source.value.watch ?? [])

const pad = (index: number) => String(index + 1).padStart(2, '0')
</script>

<template>
  <div class="demo-flow" :class="`demo-theme-${theme}`">
    <div v-if="tag" class="demo-tag">▶ {{ tag }}</div>

    <div class="demo-steps">
      <template v-for="(step, index) in steps" :key="step.title">
        <div v-if="index > 0" class="demo-sep">▶</div>
        <div class="demo-step" :class="{ 'demo-step-good': step.good, 'demo-step-bad': step.bad }">
          <div class="demo-step-num">{{ pad(index) }}</div>
          <div class="demo-step-title">{{ step.title }}</div>
          <div class="demo-step-body" v-html="inlineMarkdown(step.body)" />
          <div v-if="step.meta" class="demo-step-meta" v-html="inlineMarkdown(step.meta)" />
        </div>
      </template>
    </div>

    <div v-if="watch.length" class="demo-watch">
      <span class="demo-watch-label">{{ watchLabel }}</span>
      <span v-for="item in watch" :key="item" class="demo-pill">{{ item }}</span>
    </div>
  </div>
</template>
