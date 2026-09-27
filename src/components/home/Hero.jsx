import { Link } from 'react-router'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { usePreferences } from '../../hooks/usePreferences'
import Button from '../ui/Button'
import HeroMap from './HeroMap'

// Délai d'apparition de chaque élément au chargement (ms).
const delay = (ms) => ({ '--intro-delay': `${ms}ms` })

export default function Hero() {
  const { t, l } = usePreferences()

  return (
    <section
      id="accueil"
      aria-label={t('hero.label')}
      className="relative flex min-h-[100svh] flex-col justify-center pt-28 pb-12 md:pt-32"
    >
      <div className="container-page grid items-center gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h1>
            <span className="block overflow-hidden font-display text-[clamp(3.6rem,11vw,8rem)] leading-[0.95] tracking-[-0.01em]">
              <span className="intro block" style={delay(80)}>
                {profile.firstName}
              </span>
            </span>
            <span className="block overflow-hidden font-display text-[clamp(3.6rem,11vw,8rem)] leading-[0.95] tracking-[-0.01em]">
              <span className="intro block pl-[0.6em]" style={delay(200)}>
                {profile.lastName}
              </span>
            </span>
            <span
              className="intro mt-6 flex items-center gap-4 text-lg font-semibold text-gold md:text-xl"
              style={delay(360)}
            >
              <span aria-hidden="true" className="h-px w-10 bg-gold" />
              {l(profile.role)}
            </span>
          </h1>

          <p className="intro mt-8 max-w-xl text-lg text-paper/80 md:text-xl md:leading-relaxed" style={delay(460)}>
            {t('hero.tagline')}
          </p>

          <div className="intro mt-10 flex flex-wrap gap-3" style={delay(560)}>
            <Button to="/projects" variant="gold">
              {t('hero.ctaProjects')}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href={profile.cvUrl} download>
              <Download size={16} aria-hidden="true" />
              {t('hero.ctaCv')}
            </Button>
          </div>
          <Link
            to="/#contact"
            className="intro link-underline mt-5 inline-flex items-center gap-2 text-sm text-paper/80 hover:text-gold"
            style={delay(600)}
          >
            <Mail size={15} aria-hidden="true" />
            {t('nav.cta')}
          </Link>

          <div className="intro mt-10" style={delay(660)}>
            <p className="sr-only">{t('hero.stackLabel')}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              {profile.heroStack.map((tech) => (
                <li key={tech} className="flex items-center gap-2">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <HeroMap />
      </div>

      <Link
        to="/#a-propos"
        className="intro-fade container-page mt-14 hidden items-center gap-3 text-xs text-muted hover:text-paper md:flex"
        style={delay(1200)}
      >
        <span className="relative block h-9 w-px overflow-hidden bg-line" aria-hidden="true">
          <span className="scroll-cue absolute inset-x-0 top-0 h-3 bg-gold" />
        </span>
        {t('hero.scroll')}
      </Link>
    </section>
  )
}
