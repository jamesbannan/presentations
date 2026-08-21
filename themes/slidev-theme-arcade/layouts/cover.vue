<!--
  Cover / title slide.

  Frontmatter:
    title    — full talk title (also used for slide metadata)
    headline — optional banner override; \n becomes a line break
    subtitle, speaker, contact, event, venue, eventDate
  Any slot content renders between the banner and the "insert coin" prompt.
-->
<script setup lang="ts">
import { useSlideHeader } from '../composables/useSlideHeader'

const props = defineProps<{
  headline?: string
  subtitle?: string
  speaker?: string
  contact?: string
  event?: string
  venue?: string
  eventDate?: string
  coin?: string
}>()

const { heading } = useSlideHeader({ heading: props.headline })
</script>

<template>
  <div class="slidev-layout cover">
    <div class="title-banner pixel-corners">
      <h1 v-if="heading" v-html="heading.replace(/\n/g, '<br>')" />
      <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
    </div>

    <div v-if="speaker" class="speaker-name">
      {{ speaker }}<template v-if="contact"> &nbsp;·&nbsp; {{ contact }}</template>
    </div>

    <slot />

    <div class="insert-coin">{{ coin ?? '▶ INSERT COIN ◀' }}</div>

    <EventFooter :event="event" :venue="venue" :event-date="eventDate" />
  </div>
</template>
