<!--
  A recorded clip, framed as an in-game CRT screen.

  Props:
    src      — path under the deck's public/ (e.g. "/demo-clip.mp4")
    poster   — optional poster frame, same rules as src
    label    — yellow badge text
    caption  — line under the bezel

  Two details matter here:

  1. Decks are served from /<slug>/ (and /<repo>/<slug>/ on Pages), so a
     root-absolute src has to carry the Vite base or it 404s in the build.
     Vite rewrites URLs in CSS and in static template attributes, not in
     bound ones, so the prefixing is done explicitly.
  2. The clip is a recording made shortly before the talk and is deliberately
     not committed. If it is missing, the bezel shows a "NO SIGNAL" holding
     frame rather than a broken video element, so the deck still builds,
     exports, and presents on a clean clone.
-->
<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' },
  label: { type: String, default: 'RECORDED FOOTAGE' },
  caption: { type: String, default: '' },
  autoplay: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  muted: { type: Boolean, default: true },
})

const base = import.meta.env.BASE_URL ?? '/'
const withBase = (path: string) =>
  path.startsWith('/') ? `${base.replace(/\/$/, '')}${path}` : path

const resolvedSrc = computed(() => withBase(props.src))
const resolvedPoster = computed(() => (props.poster ? withBase(props.poster) : undefined))

const failed = ref(false)
</script>

<template>
  <div class="scene-video">
    <div class="scene-video__bezel">
      <div class="scene-video__label">{{ label }}</div>

      <div v-if="failed" class="scene-video__missing">
        <span class="scene-video__missing-title">NO SIGNAL</span>
        <span class="scene-video__missing-body">Drop the clip at <code>public{{ src }}</code></span>
      </div>

      <video
        v-else
        :src="resolvedSrc"
        :poster="resolvedPoster"
        :autoplay="autoplay"
        :loop="loop"
        :muted="muted"
        controls
        playsinline
        class="scene-video__el"
        @error="failed = true"
      />

      <div class="scene-video__scan" />
    </div>
    <p v-if="caption" class="scene-video__caption">{{ caption }}</p>
  </div>
</template>

<style scoped>
/*
  The bezel shrink-wraps the frame rather than stretching to the slide width.
  A 16:9 clip is nearly always taller than the space left under the heading, so
  a full-width bezel would letterbox the video and surround it with dead black
  bars. Sizing the frame from the available *height* and letting the bezel
  follow means the picture fills its own frame at whatever size fits.
*/
.scene-video {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 0;
  flex: 1 1 auto;
}

.scene-video__bezel {
  position: relative;
  background: #06010f;
  border: 2px solid var(--cyan);
  box-shadow:
    0 0 0 2px var(--void),
    0 0 28px rgba(87, 232, 214, 0.3);
  padding: 0.6em;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 100%;
  min-height: 0;
  flex: 1 1 auto;
}

.scene-video__label {
  font-family: var(--font-display);
  font-size: 0.5rem;
  color: var(--void);
  background: var(--yellow);
  align-self: flex-start;
  flex: none;
  padding: 0.3em 0.5em;
  margin-bottom: 0.5em;
  box-shadow: 2px 2px 0 0 var(--line);
}

.scene-video__el {
  display: block;
  height: 100%;
  width: auto;
  max-width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 0;
  flex: 1 1 auto;
  object-fit: contain;
  background: #000;
}

.scene-video__missing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9em;
  height: 100%;
  width: auto;
  max-width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 0;
  flex: 1 1 auto;
  background: #000;
  text-align: center;
}

.scene-video__missing-title {
  font-family: var(--font-display);
  font-size: 0.9rem;
  color: var(--magenta);
}

.scene-video__missing-body {
  font-family: var(--font-body);
  font-size: 0.7rem;
  color: var(--ghost-dim);
}

/* Faint scanlines over the frame, matching the slide background. */
.scene-video__scan {
  position: absolute;
  inset: 0.6em;
  top: calc(0.5em + 1.3em);
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.18) 0px,
    rgba(0, 0, 0, 0.18) 1px,
    transparent 2px,
    transparent 4px
  );
  mix-blend-mode: multiply;
  opacity: 0.35;
}

.scene-video__caption {
  margin-top: 0.7em;
  flex: none;
  font-size: 0.8rem;
  color: var(--ghost-dim);
}
</style>
