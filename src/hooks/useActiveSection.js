import { useEffect, useState } from 'react'

// Renvoie l'id de la section actuellement au centre de l'écran (uniquement si « enabled »).
export function useActiveSection(sectionIds, enabled = true) {
  const [activeId, setActiveId] = useState(sectionIds[0])

  useEffect(() => {
    if (!enabled) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [sectionIds, enabled])

  return activeId
}
