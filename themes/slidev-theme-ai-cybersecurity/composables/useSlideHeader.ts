import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useSlideContext } from '@slidev/client'

/**
 * Slidev treats `title` as slide metadata (overview panel, TOC, exports) and
 * never forwards it to the layout as a prop. Reading it off the frontmatter
 * lets deck authors write plain `title:` and get both the metadata entry and
 * the rendered heading, instead of having to duplicate it under another key.
 *
 * An explicit prop still wins, so a layout can be driven directly when it is
 * used as a component rather than a layout.
 */
export function useSlideHeader(props: {
  kicker?: string
  heading?: string
  subtitle?: string
}): {
  kicker: ComputedRef<string | undefined>
  heading: ComputedRef<string | undefined>
  subtitle: ComputedRef<string | undefined>
} {
  const { $frontmatter } = useSlideContext()
  const fm = () => ($frontmatter ?? {}) as Record<string, any>

  return {
    kicker: computed(() => props.kicker ?? fm().kicker),
    heading: computed(() => props.heading ?? fm().title),
    subtitle: computed(() => props.subtitle ?? fm().subtitle),
  }
}
