import { useEffect, useRef, useState } from 'react'

const INTERACTIVE = 'a, button, [role="button"], label, summary'
const MEDIA = '[data-cursor="media"]'

// Anneau doré qui suit la souris, uniquement sur ordinateur et si les animations ne sont pas réduites.
export default function CustomCursor() {
  const ringRef = useRef(null)
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (!enabled) return undefined
    const ring = ringRef.current
    const target = { x: -100, y: -100 }
    const position = { x: -100, y: -100 }
    let frame = 0

    const render = () => {
      position.x += (target.x - position.x) * 0.22
      position.y += (target.y - position.y) * 0.22
      ring.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`
      frame = requestAnimationFrame(render)
    }

    const onMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      ring.classList.add('is-active')
    }

    const onOver = (event) => {
      const element = event.target instanceof Element ? event.target : null
      ring.classList.toggle('is-media', Boolean(element?.closest(MEDIA)))
      ring.classList.toggle('is-hover', Boolean(element?.closest(INTERACTIVE)))
    }

    const onLeave = () => ring.classList.remove('is-active')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null
  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
}
