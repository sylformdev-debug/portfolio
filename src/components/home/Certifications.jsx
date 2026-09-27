import { ArrowUpRight, Award, FileText } from 'lucide-react'
import { certifications } from '../../data/certifications'
import { usePreferences } from '../../hooks/usePreferences'
import { formatDate } from '../../utils/formatDate'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'

function Certification({ certification, index }) {
  const { t, l, language } = usePreferences()
  const title = l(certification.title)
  const year = certification.issued.slice(0, 4)
  const fullDate = formatDate(certification.issued, language)
  const details = [fullDate !== year && fullDate, l(certification.duration)].filter(Boolean)

  return (
    <Reveal
      as="li"
      delay={(index % 2) * 100}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_24px_50px_-28px_var(--gold-glow)]"
    >
      {certification.image ? (
        <a
          href={certification.documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          data-cursor="media"
          className="relative block aspect-[16/9] overflow-hidden border-b border-line bg-white"
        >
          <img
            src={certification.image}
            alt=""
            width="960"
            height="600"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top opacity-90 transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-100"
          />
          <span className="absolute top-4 right-4 rounded-full bg-ink/85 px-3 py-1 font-display text-2xl leading-none text-gold backdrop-blur">
            {year}
          </span>
        </a>
      ) : (
        <div className="flex items-start justify-between gap-4 px-6 pt-6 md:px-7 md:pt-7">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
            <Award size={22} aria-hidden="true" />
          </span>
          <span className="font-display text-3xl leading-none text-gold/80">{year}</span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="text-lg leading-snug font-semibold">{title}</h3>
        {certification.organization && <p className="text-sm text-paper/70">{l(certification.organization)}</p>}
        {details.length > 0 && <p className="mt-1 text-sm text-gold">{details.join(', ')}</p>}
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

        {(certification.documentUrl || certification.credentialUrl || certification.credentialId) && (
          <div className="mt-auto pt-6">
            {certification.credentialId && (
              <p className="mb-4 text-xs break-all text-muted">
                {t('certifications.credentialId')} <span className="tabular-nums text-paper/80">{certification.credentialId}</span>
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {certification.documentUrl && (
                <Button
                  href={certification.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('certifications.viewAria', { title })}
                  className="min-h-10! px-4! text-xs!"
                >
                  <FileText size={15} aria-hidden="true" />
                  {t('certifications.view')}
                </Button>
              )}
              {certification.credentialUrl && (
                <Button
                  href={certification.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gold"
                  aria-label={t('certifications.verifyAria', { title })}
                  className="min-h-10! px-4! text-xs!"
                >
                  {t('certifications.verify')}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
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
