const bundled = import.meta.glob('../assets/svg/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/**
 * Background and decorative art shipped with the theme, addressable by
 * filename: `bg-title`, `bg-dark`, `bg-divider`, `panel-facets`.
 * Anything unrecognised is passed straight through as a URL, so a deck can
 * supply its own artwork without changing the theme.
 */
export const themeArt: Record<string, string> = Object.fromEntries(
  Object.entries(bundled).map(([path, url]) => [
    path.split('/').pop()!.replace(/\.svg$/, ''),
    url,
  ]),
)

export const artUrl = (name?: string): string | undefined =>
  name ? themeArt[name] ?? name : undefined
