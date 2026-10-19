// Shared geometry and notation for the theme's motifs.

// Slide numbers are shown as a ket and in binary: |7⟩ · 0111. The register
// is wide enough for a long talk.
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

const f = (n: number) => Math.round(n * 100) / 100

// None of the webfonts carry ⟨ or ⟩, and a fallback face would both look
// wrong and fail the render check, so kets inside SVG are drawn: a bar
// before the label and an angle after it. Labels are set in Plex Mono, whose
// advance is 0.6em, so the width of the label is known without measuring.
export function ketPath(x: number, y: number, size: number, chars: number, anchor: 'start' | 'middle' | 'end' = 'start') {
  const text = chars * size * 0.6
  const pad = size * 0.16
  const angle = size * 0.32
  const total = pad + text + pad + angle
  const left = anchor === 'start' ? x : anchor === 'middle' ? x - total / 2 : x - total
  const top = y - size * 0.82
  const bottom = y + size * 0.2
  const right = left + pad + text + pad
  return {
    textX: left + pad,
    d: `M${f(left)} ${f(top)} V${f(bottom)} M${f(right)} ${f(top)} L${f(right + angle)} ${f((top + bottom) / 2)} L${f(right)} ${f(bottom)}`,
  }
}

// Orthographic view of a unit sphere from slightly above. z is up; the
// camera sits on the +y side, raised by `elevation`. Returns screen x/y
// (y down) and depth (positive = facing the viewer).
export function project(
  [x, y, z]: [number, number, number],
  r: number,
  elevation = 0.3,
  azimuth = -0.5,
) {
  const ca = Math.cos(azimuth)
  const sa = Math.sin(azimuth)
  const x1 = x * ca - y * sa
  const y1 = x * sa + y * ca
  const ce = Math.cos(elevation)
  const se = Math.sin(elevation)
  return {
    x: x1 * r,
    y: (-z * ce + y1 * se) * r,
    depth: y1 * ce + z * se,
  }
}

// A circle on the sphere, sampled and split into the arcs that face the
// viewer and the arcs that face away, so the back can be drawn dashed.
export function sphereCircle(
  point: (t: number) => [number, number, number],
  r: number,
  elevation?: number,
  azimuth?: number,
  samples = 96,
) {
  const front: string[] = []
  const back: string[] = []
  let current = ''
  let facing: boolean | null = null
  for (let i = 0; i <= samples; i++) {
    const p = project(point((i / samples) * Math.PI * 2), r, elevation, azimuth)
    const isFront = p.depth >= 0
    if (facing === null || isFront !== facing) {
      if (current) (facing ? front : back).push(current)
      current = `M${f(p.x)} ${f(p.y)}`
      facing = isFront
    }
    else {
      current += ` L${f(p.x)} ${f(p.y)}`
    }
  }
  if (current) (facing ? front : back).push(current)
  return { front: front.join(' '), back: back.join(' ') }
}
