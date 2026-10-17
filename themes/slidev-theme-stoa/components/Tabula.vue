<!--
  Tabula ansata — the Roman inscription tablet with dovetail handles.

    <Tabula>
      The quotation goes here.
    </Tabula>

  Dedications, laws and epitaphs were set in this frame for centuries: a
  fixed format for text meant to be read by strangers. The quote layout uses
  it; it works anywhere a single passage needs to be set apart.
-->
<template>
  <div class="tabula">
    <svg class="motif tabula-ear tabula-ear--l" viewBox="0 0 60 120" aria-hidden="true">
      <path d="M60 60 L4 12 L4 108 Z" />
      <circle cx="20" cy="60" r="4" />
    </svg>
    <div class="tabula-field">
      <slot />
    </div>
    <svg class="motif tabula-ear tabula-ear--r" viewBox="0 0 60 120" aria-hidden="true">
      <path d="M60 60 L4 12 L4 108 Z" />
      <circle cx="20" cy="60" r="4" />
    </svg>
  </div>
</template>

<style scoped>
.tabula {
  position: relative;
  margin: 0 64px;
}

.tabula-field {
  position: relative;
  background: var(--marble-deep);
  border: 1px solid var(--ink-soft);
  box-shadow:
    inset 0 0 0 7px var(--marble-deep),
    inset 0 0 0 8px var(--vein),
    0 18px 40px -24px rgba(42, 40, 48, 0.45);
  padding: 2.2em 3em;
}

.tabula-ear {
  position: absolute;
  top: 50%;
  width: 58px;
  height: 116px;
  transform: translateY(-50%);
  overflow: visible;
}

.tabula-ear path {
  fill: var(--marble-deep);
  stroke: var(--ink-soft);
  stroke-width: 1;
}

.tabula-ear circle {
  fill: none;
  stroke: var(--ochre);
  stroke-width: 1.5;
}

.tabula-ear--l { left: -57px; }
.tabula-ear--r { right: -57px; transform: translateY(-50%) scaleX(-1); }
</style>
