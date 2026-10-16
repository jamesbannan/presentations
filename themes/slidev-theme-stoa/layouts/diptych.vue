<!--
  Two panels hinged on a column — then and now, side by side. A diptych was
  a pair of hinged wax tablets: the Roman notebook.

  Frontmatter:
    kicker — optional mono line above the heading
    class: spread — spread the panel lists down the full height

  Slots: the default slot is the heading across the top, then `::left::`
  and `::right::` for the two panels.

    # Heading
    ::left::
    ### Then
    …
    ::right::
    ### Now
    …
-->
<script setup lang="ts">
defineProps({
  kicker: { type: String, default: '' },
})
</script>

<template>
  <div class="slidev-layout diptych">
    <Meander class="diptych-meander" :periods="5" />
    <header class="diptych-head">
      <span v-if="kicker" class="kicker">{{ kicker }}</span>
      <slot />
    </header>
    <div class="diptych-body">
      <div class="diptych-panel">
        <slot name="left" />
      </div>
      <div class="diptych-hinge">
        <Column />
      </div>
      <div class="diptych-panel">
        <slot name="right" />
      </div>
    </div>
    <Folio />
  </div>
</template>

<style scoped>
.diptych {
  display: flex;
  flex-direction: column;
  padding: 76px 80px 60px;
}

.diptych-meander {
  position: absolute;
  top: 34px;
  left: 80px;
}

.diptych :deep(h1) {
  font-size: 1.8rem;
  margin: 0.3em 0 0.5em;
}

.diptych-body {
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 48px 1fr;
  grid-template-rows: minmax(0, 1fr);
  gap: 32px;
}

/* The column is drawn to whatever height the panels leave it, and must never
   be the thing that decides that height. */
.diptych-hinge {
  position: relative;
  min-height: 0;
}

.diptych-hinge :deep(.column) {
  position: absolute;
  inset: 0;
  width: 100%;
}

.diptych-panel :deep(h3) {
  margin-bottom: 0.8em;
}

/* `class: spread` — distribute the panel lists down the full column height
   rather than stacking them at the top. */
.diptych.spread .diptych-panel {
  display: flex;
  flex-direction: column;
}

.diptych.spread .diptych-panel :deep(ul) {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0;
}

.diptych.spread .diptych-panel :deep(li) {
  margin: 0;
}

/* `class: spread large` — for short lists, also set the items larger. */
.diptych.spread.large .diptych-panel :deep(ul) {
  justify-content: space-around;
}

.diptych.spread.large .diptych-panel :deep(li) {
  font-size: 1.65rem;
}
</style>
