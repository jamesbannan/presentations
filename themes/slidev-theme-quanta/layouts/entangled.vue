<!--
  Two panels joined by an entangled pair — for things that only make
  sense together: myth and reality, today and post-quantum, Shor and
  Grover.

  Frontmatter:
    kicker — optional mono line above the heading
    class: spread — spread the panel lists down the full height; add
           `large` for short lists

  Wrap a panel's content in `<div v-click>` to reveal it on click; the
  spread layout still applies inside the wrapper.

  Slots: the default slot is the heading across the top, then `::left::`
  and `::right::` for the two panels.

    # Heading
    ::left::
    ### Classical
    …
    ::right::
    ### Quantum
    …
-->
<script setup lang="ts">
defineProps({
  kicker: { type: String, default: '' },
})
</script>

<template>
  <div class="slidev-layout entangled">
    <CircuitRule class="entangled-circuit" :columns="5" :seed="2" height="24px" />
    <header class="entangled-head">
      <span v-if="kicker" class="kicker">{{ kicker }}</span>
      <slot />
    </header>
    <div class="entangled-body">
      <div class="entangled-panel">
        <slot name="left" />
      </div>
      <div class="entangled-hinge">
        <Entanglement />
      </div>
      <div class="entangled-panel">
        <slot name="right" />
      </div>
    </div>
    <Folio />
  </div>
</template>

<style scoped>
.entangled {
  display: flex;
  flex-direction: column;
  padding: 76px 80px 60px;
}

.entangled-circuit {
  position: absolute;
  top: 26px;
  left: 80px;
}

.entangled :deep(h1) {
  font-size: 1.85rem;
  margin: 0.3em 0 0.5em;
}

.entangled-body {
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 34px 1fr;
  grid-template-rows: minmax(0, 1fr);
  gap: 32px;
}

/* The pair is drawn to whatever height the panels leave it, and must never
   be the thing that decides that height. */
.entangled-hinge {
  position: relative;
  min-height: 0;
}

.entangled-hinge :deep(.entanglement) {
  position: absolute;
  inset: 0;
}

.entangled-panel :deep(h3) {
  margin-bottom: 0.8em;
}

.entangled.spread .entangled-panel {
  display: flex;
  flex-direction: column;
}

.entangled.spread .entangled-panel :deep(ul) {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0;
}

.entangled.spread .entangled-panel :deep(li) {
  margin: 0;
}

.entangled.spread .entangled-panel > :deep(div) {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.entangled.spread.large .entangled-panel :deep(ul) {
  justify-content: space-around;
}

.entangled.spread.large .entangled-panel :deep(li) {
  font-size: 1.5rem;
}
</style>
