// Style entry point. Slidev auto-imports styles/index.ts from the theme.
//
// Fonts are self-hosted via @fontsource rather than fetched from a CDN: venue
// wifi is unreliable and the deck has to render identically offline.
import '@fontsource/cinzel/400.css'
import '@fontsource/cinzel/600.css'
import '@fontsource/eb-garamond/400.css'
import '@fontsource/eb-garamond/400-italic.css'
import '@fontsource/eb-garamond/500.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'

// Order matters: tokens define the palette and type stacks, base sets the slide
// surface, components style the furniture, overrides have the last word.
import './tokens.css'
import './base.css'
import './components.css'
import './overrides.css'
