<!--
  A-vs-B comparison table: two accented headers with a dimension label column
  running down the middle.

    <VsTable
      :a="{ tag: '// OPTION A', title: 'SMALLSTEP', sub: 'private PKI' }"
      :b="{ tag: '// OPTION B', title: 'SIGSTORE', sub: 'public transparency' }"
      :rows="[{ dim: 'TRUST ROOT', a: 'Your CA', b: 'Fulcio + TUF' }]"
      footer="USE BOTH — THEY SOLVE DIFFERENT PROBLEMS" />
-->
<script setup lang="ts">
import { inlineMarkdown } from '../composables/inlineMarkdown'

interface Head {
  tag?: string
  title?: string
  sub?: string
}

interface Row {
  dim: string
  a?: string
  b?: string
}

withDefaults(defineProps<{
  rows: Row[]
  a?: Head
  b?: Head
  footer?: string
  versus?: string
}>(), { versus: 'VS' })
</script>

<template>
  <div class="vs-canvas">
    <div v-if="a || b" class="vs-heads">
      <div class="vs-head vs-head-a">
        <div v-if="a?.tag" class="vs-head-tag">{{ a.tag }}</div>
        <div v-if="a?.title" class="vs-head-title">{{ a.title }}</div>
        <div v-if="a?.sub" class="vs-head-sub">{{ a.sub }}</div>
      </div>
      <div class="vs-versus">{{ versus }}</div>
      <div class="vs-head vs-head-b">
        <div v-if="b?.tag" class="vs-head-tag">{{ b.tag }}</div>
        <div v-if="b?.title" class="vs-head-title">{{ b.title }}</div>
        <div v-if="b?.sub" class="vs-head-sub">{{ b.sub }}</div>
      </div>
    </div>

    <div class="vs-grid">
      <template v-for="row in rows" :key="row.dim">
        <div class="vs-cell vs-cell-a" v-html="inlineMarkdown(row.a)" />
        <div class="vs-dim">{{ row.dim }}</div>
        <div class="vs-cell vs-cell-b" v-html="inlineMarkdown(row.b)" />
      </template>
    </div>

    <div v-if="footer" class="vs-footer">{{ footer }}</div>
  </div>
</template>
