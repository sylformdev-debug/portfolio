import { useEffect, useRef } from 'react'

// Un seul IntersectionObserver partagé par tous les éléments animés.
let sharedObserver = null

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            sharedObserver.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
  }
  return sharedObserver
}

export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    if (!('IntersectionObserver' in window)) {
      element.classList.add('is-visible')
      return undefined
    }

    const observer = getObserver()
    observer.observe(element)
    return () => observer.unobserve(element)
  }, [])

  return ref
}
