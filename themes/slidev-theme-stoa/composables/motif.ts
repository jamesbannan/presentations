// Slide numbers are shown twice: as a Roman numeral and as binary. Two
// notations for the same count, two thousand years apart.

const ROMAN: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

export function toRoman(value: number | string): string {
  let n = Math.floor(Number(value))
  if (!Number.isFinite(n) || n <= 0) return ''
  let out = ''
  for (const [v, s] of ROMAN) {
    while (n >= v) {
      out += s
      n -= v
    }
  }
  return out
}

export function toBinary(value: number | string, width = 4): string {
  const n = Math.floor(Number(value))
  if (!Number.isFinite(n) || n < 0) return ''
  return n.toString(2).padStart(width, '0')
}

// mulberry32 — small, fast and deterministic. Motifs are generated, never
// random: an export renders each slide in a fresh browser, and geometry that
// moved between the PDF and the live deck would be a bug.
export function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6D2B79F5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// SVG ids must be unique across the document, and Slidev keeps neighbouring
// slides mounted, so every gradient gets an instance-scoped id.
export function safeId(prefix: string, id: string): string {
  return `${prefix}-${id.replace(/[^\w-]/g, '')}`
}
