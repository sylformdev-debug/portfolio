import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import { navigation, sectionIds } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { usePreferences } from '../../hooks/usePreferences'
import Button from '../ui/Button'
import PreferenceToggles from '../ui/PreferenceToggles'

// « Projets » mène à la page dédiée ; les autres entrées vers les sections de l'accueil.
function hrefFor(item) {
  if (item.key === 'projects') return '/projects'
  if (item.key === 'home') return '/'
  return `/#${item.id}`
}

export default function Navbar() {
  const { t } = usePreferences()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const activeSection = useActiveSection(sectionIds, isHome)

  const isActive = (item) => {
    if (item.key === 'projects') return pathname.startsWith('/projects') || (isHome && activeSection === item.id)
    return isHome && activeSection === item.id
  }

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Referme le menu à chaque changement de page.
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && setIsOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1280px)')
    const onChange = (event) => event.matches && setIsOpen(false)
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  const closeMenu = () => setIsOpen(false)
  const isCompact = isScrolled || isOpen

  return (
    <header
      className={`intro-fade fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        isCompact
          ? 'border-line bg-[var(--nav-bg)] backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent'
      }`}
    >
      <nav
        aria-label={t('nav.label')}
        className={`container-page flex items-center justify-between gap-4 transition-[height] duration-300 ${
          isCompact ? 'h-16' : 'h-16 md:h-20'
        }`}
      >
        <Link to="/" viewTransition onClick={closeMenu} className="font-display text-2xl leading-none text-paper">
          {profile.firstName} <span className="text-gold">{profile.lastName.charAt(0)}.</span>
        </Link>

        <ul className="hidden items-center gap-6 xl:flex">
          {navigation.slice(1, -1).map((item) => {
            const active = isActive(item)
            return (
              <li key={item.id}>
                <Link
                  to={hrefFor(item)}
                  viewTransition={item.key === 'projects'}
                  aria-current={active ? 'true' : undefined}
                  className={`relative py-2 text-sm transition-colors duration-200 hover:text-paper ${
                    active ? 'text-paper' : 'text-muted'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <PreferenceToggles />
          <Button to="/#contact" variant="gold" className="hidden min-h-10! px-5! sm:inline-flex">
            {t('nav.cta')}
          </Button>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            aria-label={isOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            className="btn-glass btn-glass--icon xl:hidden"
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div
        id="menu-mobile"
        hidden={!isOpen}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink xl:hidden"
      >
        <ul className="container-page flex flex-col py-6">
          {navigation.map((item, index) => (
            <li key={item.id} className="fade-in border-b border-line" style={{ '--fade-delay': `${index * 35}ms` }}>
              <Link
                to={hrefFor(item)}
                onClick={closeMenu}
                className={`block py-3.5 font-display text-3xl ${isActive(item) ? 'text-gold' : 'text-paper'}`}
              >
                {t(`nav.${item.key}`)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="container-page pb-10">
          <Button to="/#contact" variant="gold" onClick={closeMenu} className="w-full sm:hidden">
            {t('nav.cta')}
          </Button>
          <a href={`mailto:${profile.email}`} className="mt-6 block text-sm text-muted hover:text-gold">
            {profile.email}
          </a>
        </div>
      </div>
    </header>
  )
}
