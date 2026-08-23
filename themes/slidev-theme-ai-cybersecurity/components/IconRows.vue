<!--
  Numbered rows with a circular badge, a bold title and a muted description —
  the workhorse content block on white slides.

    <IconRows :rows="[{ title: 'Critical evaluation', body: 'Judging AI output…' }]" />

  `n` overrides the auto-numbering; pass `icon` to swap the number for a glyph.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { inlineMarkdown } from '../composables/inlineMarkdown'

interface IconRow {
  n?: number | string
  icon?: string
  title: string
  body?: string
}

const props = defineProps<{ rows: IconRow[] }>()

const items = computed(() =>
  props.rows.map((row, index) => ({
    badge: row.icon ?? String(row.n ?? index + 1),
    title: inlineMarkdown(row.title),
    body: inlineMarkdown(row.body),
  })),
)
</script>

<template>
  <div class="icon-rows">
    <div v-for="(row, index) in items" :key="index" class="icon-row">
      <div class="icon-row-badge">{{ row.badge }}</div>
      <div class="icon-row-text">
        <div class="icon-row-title" v-html="row.title" />
        <div v-if="row.body" class="icon-row-body" v-html="row.body" />
      </div>
    </div>
  </div>
</template>
