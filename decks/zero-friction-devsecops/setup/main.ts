import { defineAppSetup } from '@slidev/types'
import facts from '../data/facts'

/**
 * Slidev compiles every slide into its own component, so a `<script setup>`
 * block in slides.md is only in scope for the slide it appears in. Providing
 * the facts here makes them available to every slide and, more importantly,
 * to the theme's components — which can then resolve their own data from a
 * key rather than having each slide wire it up by hand.
 */
export default defineAppSetup(({ app }) => {
  app.provide('arcade:facts', facts)
  app.config.globalProperties.$facts = facts
})
