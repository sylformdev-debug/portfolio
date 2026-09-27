import { useEffect, useRef } from 'react'

/*
  Mouvement du visuel du Hero :
  - la souris décale légèrement chaque courbe (effet de profondeur)
  - le défilement fait monter le visuel un peu moins vite que la page (parallax)
  Les valeurs sont écrites en variables CSS (--mx, --my, --sy) : aucun rendu React à chaque mouvement.
  Désactivé si l'utilisateur a demandé moins d'animations.
*/
export function useHeroMotion() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    let frame = 0

    const onPointerMove = (event) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5
        const y = event.clientY / window.innerHeight - 0.5
        element.style.setProperty('--mx', x.toFixed(3))
        element.style.setProperty('--my', y.toFixed(3))
      })
    }

    const onScroll = () => {
      const offset = Math.min(window.scrollY, window.innerHeight)
      element.style.setProperty('--sy', `${(offset * 0.12).toFixed(1)}px`)
    }

    if (finePointer) window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return ref
}
