import { flushSync } from 'react-dom'

// Applique un changement d'état React avec un fondu (View Transitions API) si le navigateur le permet.
export function withViewTransition(update) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduceMotion) {
    update()
    return
  }
  document.startViewTransition(() => flushSync(update))
}
