import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/*
  Gère le défilement à chaque navigation :
  - lien vers une section (/#projets) : défile jusqu'à la section
  - nouvelle page : remonte en haut
*/
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const previousPath = useRef(null)

  useEffect(() => {
    const samePage = previousPath.current === pathname
    previousPath.current = pathname
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = samePage && !reduceMotion ? 'smooth' : 'instant'

    if (!hash) {
      if (!samePage) window.scrollTo({ top: 0, behavior: 'instant' })
      return undefined
    }

    // La section peut ne pas encore être rendue : on attend l'image suivante.
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior, block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, key])

  return null
}
