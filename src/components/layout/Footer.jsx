import { Link } from 'react-router'
import { Download } from 'lucide-react'
import { navigation } from '../../data/navigation'
import { profile } from '../../data/profile'
import { socials } from '../../data/socials'
import { usePreferences } from '../../hooks/usePreferences'

export default function Footer() {
  const { t, l } = usePreferences()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line pt-16 pb-10">
      <div className="container-page">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="font-display text-4xl leading-none">{profile.fullName}</p>
            <p className="mt-3 text-gold">{l(profile.role)}</p>
            <p className="mt-6 max-w-xs text-sm text-muted">{t('footer.note')}</p>
            <a
              href={profile.cvUrl}
              download
              className="link-underline mt-6 inline-flex items-center gap-2 text-sm text-paper hover:text-gold"
            >
              <Download size={15} aria-hidden="true" />
              {t('hero.ctaCv')}
            </a>
          </div>

          <nav aria-label={t('footer.navLabel')}>
            <h2 className="text-sm font-semibold text-paper">{t('footer.navigation')}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.key === 'projects' ? '/projects' : item.key === 'home' ? '/' : `/#${item.id}`}
                    className="link-underline text-muted hover:text-paper"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-paper">{t('footer.networks')}</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {socials.map((social) => {
                const Icon = social.icon
                const isExternal = social.href.startsWith('http')
                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      aria-label={social.name}
                      title={social.name}
                      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                      className="btn-glass btn-glass--icon"
                    >
                      <Icon size={17} aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <p className="mt-16 border-t border-line pt-6 text-xs text-muted">
          © {year} {profile.fullName}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
