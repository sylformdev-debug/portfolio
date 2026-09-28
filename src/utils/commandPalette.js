export const PALETTE_EVENT = 'portfolio:palette'

// Ouvre la recherche rapide depuis n'importe quel composant (ex. bouton de la barre de navigation).
export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(PALETTE_EVENT))
}
