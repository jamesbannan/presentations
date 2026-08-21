// Minimal inline-markdown renderer for strings that arrive from data
// (frontmatter arrays, or facts.yaml synced from a content repository).
// Deliberately tiny: `code`, **bold**, *italic*, and HTML escaping only.

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

export const inlineMarkdown = (value?: string): string => {
  if (!value) return ''
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
}
