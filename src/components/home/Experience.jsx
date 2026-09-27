import { Briefcase, GraduationCap } from 'lucide-react'
import { education, experience } from '../../data/experience'
import { usePreferences } from '../../hooks/usePreferences'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'

function TimelineItem({ item, index }) {
  const { l } = usePreferences()

  return (
    <Reveal as="li" delay={index * 90} className="group relative pb-10 pl-8 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute top-1.5 -left-[6px] h-[11px] w-[11px] rounded-full border border-gold bg-ink transition-colors duration-300 group-hover:bg-gold"
      />
      <p className="text-sm text-gold">{l(item.period)}</p>
      <h4 className="mt-1 text-lg font-semibold">{l(item.title)}</h4>
      <p className="text-paper/70">{l(item.organization)}</p>
      {item.description && <p className="mt-3 text-sm text-muted">{l(item.description)}</p>}
      {item.highlights && (
        <ul className="mt-3 space-y-2 text-sm text-muted">
          {item.highlights.map((highlight) => (
            <li key={highlight.fr} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-gold/70" />
              {l(highlight)}
            </li>
          ))}
        </ul>
      )}
      {item.stack && <p className="mt-4 text-xs text-paper/60">{item.stack.join(', ')}</p>}
    </Reveal>
  )
}

function Timeline({ title, icon: Icon, items }) {
  return (
    <div>
      <h3 className="flex items-center gap-3 font-display text-3xl">
        <Icon size={22} className="text-gold" aria-hidden="true" />
        {title}
      </h3>
      <ol className="mt-8 border-l border-line">
        {items.map((item, index) => (
          <TimelineItem key={item.title.fr ?? item.title} item={item} index={index} />
        ))}
      </ol>
    </div>
  )
}

export default function Experience() {
  const { t } = usePreferences()

  return (
    <Section id="parcours" title={t('experience.title')} intro={t('experience.intro')}>
      <div className="grid gap-16 md:grid-cols-2 md:gap-12">
        <Timeline title={t('experience.work')} icon={Briefcase} items={experience} />
        <Timeline title={t('experience.education')} icon={GraduationCap} items={education} />
      </div>
    </Section>
  )
}
