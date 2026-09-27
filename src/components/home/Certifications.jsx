import { Award, ArrowUpRight } from 'lucide-react'
import { certifications } from '../../data/certifications'
import { usePreferences } from '../../hooks/usePreferences'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'

function Certification({ certification, index }) {
  const { t, l } = usePreferences()

  return (
    <Reveal
      as="li"
      delay={(index % 2) * 100}
      className="group relative flex flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_24px_50px_-28px_var(--gold-glow)] md:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        {certification.image ? (
          <img
            src={certification.image}
            alt=""
            width="56"
            height="56"
            loading="lazy"
            className="h-14 w-14 rounded-lg object-contain"
          />
        ) : (
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
            <Award size={22} aria-hidden="true" />
          </span>
        )}
        <span className="font-display text-3xl leading-none text-gold/80">{certification.date}</span>
      </div>

      <h3 className="mt-6 text-lg leading-snug font-semibold">{l(certification.title)}</h3>
      {certification.organization && <p className="text-sm text-paper/70">{certification.organization}</p>}
      {certification.description && <p className="mt-4 text-sm text-muted">{l(certification.description)}</p>}

      {certification.skills.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('certifications.skills')}>
          {certification.skills.map((skill) => (
            <li key={skill.fr} className="rounded-full border border-line px-3 py-1 text-xs text-paper/75">
              {l(skill)}
            </li>
          ))}
        </ul>
      )}

      {(certification.credentialId || certification.credentialUrl) && (
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6 text-xs text-muted">
          {certification.credentialId && <span className="tabular-nums">ID {certification.credentialId}</span>}
          {certification.credentialUrl && (
            <a
              href={certification.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1 text-paper hover:text-gold"
            >
              {t('certifications.verify')}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </Reveal>
  )
}

export default function Certifications() {
  const { t } = usePreferences()

  return (
    <Section id="certifications" title={t('certifications.title')} intro={t('certifications.intro')}>
      <ul className="grid gap-5 sm:grid-cols-2">
        {certifications.map((certification, index) => (
          <Certification key={certification.title.fr} certification={certification} index={index} />
        ))}
      </ul>
    </Section>
  )
}
