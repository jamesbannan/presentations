<!--
  Fallback layout, so a slide with no `layout:` still lands inside the
  dialogue box rather than on a bare surface. Same furniture as `dialog`,
  without the scene badge.
-->
<template>
  <div class="slidev-layout dialog w-full h-full flex flex-col justify-center px-16 py-10">
    <div class="dialog-box">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dialog :deep(h1) { font-size: 1.1rem; color: var(--cyan); margin-bottom: 0.7em; }
.dialog :deep(h2) { font-size: 0.95rem; }
.dialog :deep(p),
.dialog :deep(li) { font-size: 0.95rem; }
.dialog :deep(p:last-child) { margin-bottom: 0; }
</style>
