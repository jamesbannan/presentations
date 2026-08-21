import { inject } from 'vue'

export interface Facts {
  architecture?: unknown[]
  demos?: Record<string, any>
  [key: string]: unknown
}

export const FACTS_KEY = 'arcade:facts'

/**
 * Facts are provided by the deck (see a deck's `setup/main.ts`), not the theme,
 * so the theme stays deck-agnostic. Decks that provide nothing still render —
 * components fall back to their explicit props.
 */
export function useFacts(): Facts {
  return inject<Facts>(FACTS_KEY, {})
}

export function useDemo(id?: string): Record<string, any> | undefined {
  if (!id) return undefined
  return useFacts().demos?.[id]
}
