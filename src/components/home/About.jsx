import { profile } from '../../data/profile'
import { usePreferences } from '../../hooks/usePreferences'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'

export default function About() {
  const { t, l } = usePreferences()
  const { paragraphs, facts } = profile.about

  return (
    <Section id="a-propos" title={t('about.title')} intro={t('about.intro')}>
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] md:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <Reveal className="order-2 max-w-2xl space-y-6 text-lg text-paper/85 md:order-1">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.fr.slice(0, 32)}>{l(paragraph)}</p>
          ))}
        </Reveal>

        {profile.portrait && (
          <Reveal as="figure" delay={120} className="order-1 mx-auto w-full max-w-72 md:order-2 md:max-w-none">
            <div className="group relative mr-3 mb-3" data-cursor="media">
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-gold/50 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"
              />
              <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
                <img
                  src={profile.portrait}
                  alt={t('about.portraitAlt')}
                  width="960"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
            <figcaption className="mt-6 text-sm text-muted">
              {profile.fullName}, {l(profile.location)}
            </figcaption>
          </Reveal>
        )}
      </div>

      <Reveal as="dl" delay={120} className="mt-14 grid gap-x-10 border-t border-line sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.label.fr} className="border-b border-line py-6">
            <dt className="text-sm text-gold">{l(fact.label)}</dt>
            {fact.value.map((line) => (
              <dd key={line.fr} className="mt-1.5 text-paper/85">
                {l(line)}
              </dd>
            ))}
          </div>
        ))}
      </Reveal>
    </Section>
  )
}
