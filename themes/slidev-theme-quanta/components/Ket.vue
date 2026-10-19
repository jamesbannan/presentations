<!--
  Dirac notation, without needing the glyphs.

    <Ket>0</Ket>     |0⟩
    <Ket>ψ</Ket>     |ψ⟩
    <Ket bra>φ</Ket> ⟨φ|

  The bar and angle are drawn in CSS (see `.ket` in components.css), so
  they match the surrounding type and never fall back to a system font.
  The same classes work in raw HTML: `<span class="ket">+</span>`.
-->
<script setup lang="ts">
defineProps({
  bra: { type: Boolean, default: false },
})
</script>

<template>
  <span :class="bra ? 'bra' : 'ket'"><slot /></span>
</template>
