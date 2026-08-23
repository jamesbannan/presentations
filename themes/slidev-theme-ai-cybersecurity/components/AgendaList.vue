<!--
  Numbered agenda rows separated by hairline dividers.

    <AgendaList :items="['AI skills expected in industry', 'Using AI and staying safe']" />
    <AgendaList :items="[{ n: '01', label: 'AI skills expected in industry' }]" />
-->
<script setup lang="ts">
import { computed } from 'vue'
import { inlineMarkdown } from '../composables/inlineMarkdown'

interface AgendaItem {
  n?: number | string
  label: string
}

const props = defineProps<{ items: (AgendaItem | string)[] }>()

const rows = computed(() =>
  props.items.map((item, index) => {
    const row = typeof item === 'string' ? { label: item } : item
    return {
      n: String(row.n ?? index + 1).padStart(2, '0'),
      label: inlineMarkdown(row.label),
    }
  }),
)
</script>

<template>
  <ol class="agenda-list">
    <li v-for="row in rows" :key="row.n" class="agenda-row">
      <span class="agenda-num">{{ row.n }}</span>
      <span class="agenda-label" v-html="row.label" />
    </li>
  </ol>
</template>
