import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navigation, sectionIds } from '../data/navigation'
import { profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menu mobile : bloque le défilement et se ferme avec Échap.
  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  // Referme le menu mobile si l'écran repasse en largeur desktop.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onChange = (event) => event.matches && setIsOpen(false)
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  const closeMenu = () => setIsOpen(false)
  const hasBackground = isScrolled || isOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        hasBackground ? 'border-b border-line bg-ink/90 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Navigation principale" className="container-page flex h-16 items-center justify-between md:h-20">
        <a href="#accueil" onClick={closeMenu} className="font-display text-2xl leading-none text-paper">
          {profile.firstName} <span className="text-gold">{profile.lastName.charAt(0)}.</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navigation.slice(1).map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative py-2 text-sm transition-colors duration-200 hover:text-paper ${
                    isActive ? 'text-paper' : 'text-muted'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="menu-mobile"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-paper lg:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        id="menu-mobile"
        hidden={!isOpen}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink lg:hidden"
      >
        <ul className="container-page flex flex-col py-8">
          {navigation.map((item) => (
            <li key={item.id} className="border-b border-line">
              <a
                href={`#${item.id}`}
                onClick={closeMenu}
                className={`flex items-center justify-between py-4 font-display text-3xl ${
                  activeId === item.id ? 'text-gold-soft' : 'text-paper'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="container-page pb-10 text-sm text-muted">
          <a href={`mailto:${profile.email}`} className="hover:text-gold-soft">
            {profile.email}
          </a>
        </p>
      </div>
    </header>
  )
}
