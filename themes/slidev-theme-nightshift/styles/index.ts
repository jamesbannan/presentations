// Style entry point. Slidev auto-imports styles/index.ts from the theme.
//
// Fonts are self-hosted via @fontsource rather than fetched from a CDN: venue
// wifi is unreliable and the deck has to render identically offline. They are
// imported here (not via CSS @import) so bundling never depends on CSS import
// ordering rules.
import '@fontsource/press-start-2p'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import '@fontsource/jetbrains-mono/700.css'

// Order matters: tokens define the palette and type stacks, base sets the slide
// surface, components style the signature furniture, overrides have last word.
import './tokens.css'
import './base.css'
import './components.css'
import './overrides.css'
