<!--
  Standard content slide: kicker, title, and a flexible body on white.
  Decorated with corner shard clusters in the two corners no layout uses.

  Frontmatter:
    kicker — e.g. "01 · INDUSTRY SKILLS"
    title  — slide heading
    source — optional citation line pinned to the foot of the slide; the body
             region shrinks to make room, so content never collides with it
    bare   — skip the padded body wrapper when the slide supplies its own
             full-bleed canvas
-->
<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { useSlideHeader } from '../composables/useSlideHeader'

const props = defineProps<{
  kicker?: string
  heading?: string
  source?: string
  bare?: boolean
}>()

const { kicker, heading } = useSlideHeader(props)
const { $frontmatter } = useSlideContext()
const bare = computed(() => props.bare ?? ($frontmatter as any)?.bare ?? false)
const source = computed(() => props.source ?? ($frontmatter as any)?.source)
</script>

<template>
  <div class="slidev-layout default" :class="{ 'has-source': source }">
    <CornerArt />

    <header v-if="kicker || heading" class="slide-header">
      <div v-if="kicker" class="text-kicker slide-kicker">{{ kicker }}</div>
      <h2 v-if="heading" class="text-slide-title slide-title">{{ heading }}</h2>
    </header>

    <slot v-if="bare" />
    <div v-else class="slide-body">
      <slot />
    </div>

    <div v-if="source" class="slide-source">{{ source }}</div>

    <PageNumber />
  </div>
</template>
