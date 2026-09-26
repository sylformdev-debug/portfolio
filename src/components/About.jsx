import { profile } from '../data/profile'
import Section from './ui/Section'
import Reveal from './ui/Reveal'

export default function About() {
  const { paragraphs, facts } = profile.about

  return (
    <Section id="a-propos" title="À propos" intro="Des sciences sociales au développement web.">
      <Reveal className="max-w-2xl space-y-6 text-lg text-paper/85">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </Reveal>

      <Reveal as="dl" delay={120} className="mt-14 grid gap-x-10 border-t border-line sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.label} className="border-b border-line py-6">
            <dt className="text-sm text-gold">{fact.label}</dt>
            {fact.value.map((line) => (
              <dd key={line} className="mt-1.5 text-paper/85">
                {line}
              </dd>
            ))}
          </div>
        ))}
      </Reveal>
    </Section>
  )
}
