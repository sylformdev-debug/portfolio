import { navigation } from '../data/navigation'
import { profile } from '../data/profile'
import { socials } from '../data/socials'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line pt-16 pb-10">
      <div className="container-page">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <p className="font-display text-4xl leading-none">{profile.fullName}</p>
            <p className="mt-3 text-gold">{profile.role}</p>
            <p className="mt-6 max-w-xs text-sm text-muted">
              Conçu et développé à Cotonou, avec React et Tailwind CSS.
            </p>
          </div>

          <nav aria-label="Navigation du pied de page">
            <h2 className="text-sm font-semibold text-paper">Navigation</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-1">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-muted transition-colors hover:text-gold-soft">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-paper">Réseaux</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {socials.map((social) => {
                const Icon = social.icon
                const isExternal = social.href.startsWith('http')
                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      aria-label={social.name}
                      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-paper/80 transition-colors hover:border-gold hover:text-gold-soft"
                    >
                      <Icon size={18} aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <p className="mt-16 border-t border-line pt-6 text-xs text-muted">
          © {year} {profile.fullName}. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
