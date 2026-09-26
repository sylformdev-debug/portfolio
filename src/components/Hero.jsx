import { ArrowDown, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import Button from './ui/Button'
import HeroMap from './HeroMap'

export default function Hero() {
  return (
    <section
      id="accueil"
      aria-label="Présentation"
      className="relative flex min-h-[100svh] items-center pt-28 pb-16 md:pt-32"
    >
      <div className="container-page grid items-center gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h1>
            <span className="block font-display text-[clamp(3.6rem,11vw,8rem)] leading-[0.92] tracking-[-0.01em]">
              {profile.firstName}
              <span className="block pl-[0.6em]">{profile.lastName}</span>
            </span>
            <span className="mt-6 flex items-center gap-4 text-lg font-semibold text-gold md:text-xl">
              <span aria-hidden="true" className="h-px w-10 bg-gold" />
              {profile.role}
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-paper/80 md:text-xl md:leading-relaxed">{profile.tagline}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="#projets">
              Voir mes projets
              <ArrowDown size={16} aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="secondary">
              <Mail size={16} aria-hidden="true" />
              Me contacter
            </Button>
          </div>
        </div>

        <HeroMap />
      </div>
    </section>
  )
}
