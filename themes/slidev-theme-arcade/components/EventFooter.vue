<!-- Magenta event bar pinned to the bottom of the cover slide. -->
<script setup lang="ts">
const props = defineProps<{
  event?: string
  venue?: string
  eventDate?: string
}>()

const parts = () => [props.event, props.venue, props.eventDate].filter(Boolean)
</script>

<template>
  <div v-if="parts().length" class="event-footer">
    ★ {{ parts().join('\u00a0·\u00a0') }} ★
  </div>
</template>
