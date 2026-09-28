import { useEffect, useRef, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { usePreferences } from '../../hooks/usePreferences'

/*
  - Barre de progression dorée en haut de l'écran : indique la position dans la page.
  - Bouton « Revenir en haut » qui apparaît après un écran de défilement.
*/
export default function ScrollExtras() {
  const { t } = usePreferences()
  const barRef = useRef(null)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
      setShowTop(window.scrollY > window.innerHeight)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' })
    document.getElementById('contenu')?.focus({ preventScroll: true })
  }

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5">
        <div ref={barRef} className="h-full origin-left bg-gold" style={{ transform: 'scaleX(0)' }} />
      </div>
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={t('backToTop')}
        title={t('backToTop')}
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
        className={`btn-glass btn-glass--icon fixed right-4 bottom-4 z-40 transition-[opacity,transform] duration-300 md:right-6 md:bottom-6 ${
          showTop ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <ArrowUp size={18} aria-hidden="true" />
      </button>
    </>
  )
}
