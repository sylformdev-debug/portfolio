import { Briefcase, GraduationCap } from 'lucide-react'
import { education, experience } from '../data/experience'
import Section from './ui/Section'
import Reveal from './ui/Reveal'

function Timeline({ title, icon: Icon, children }) {
  return (
    <Reveal>
      <h3 className="flex items-center gap-3 font-display text-3xl">
        <Icon size={22} className="text-gold" aria-hidden="true" />
        {title}
      </h3>
      <ol className="mt-8 border-l border-line">{children}</ol>
    </Reveal>
  )
}

function TimelineItem({ period, children }) {
  return (
    <li className="relative pb-10 pl-7 last:pb-0">
      <span aria-hidden="true" className="absolute top-2 -left-[5px] h-[9px] w-[9px] rounded-full bg-gold" />
      <p className="text-sm text-gold">{period}</p>
      {children}
    </li>
  )
}

export default function Experience() {
  return (
    <Section id="parcours" title="Parcours" intro="Formation et expériences, de la plus récente à la plus ancienne.">
      <div className="grid gap-16 md:grid-cols-2 md:gap-12">
        <Timeline title="Formation" icon={GraduationCap}>
          {education.map((item) => (
            <TimelineItem key={item.title} period={item.period}>
              <h4 className="mt-1 text-lg font-semibold">{item.title}</h4>
              <p className="text-paper/70">{item.institution}</p>
              <p className="mt-3 text-sm text-muted">{item.description}</p>
              {item.certifications.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-paper/80">
                  {item.certifications.map((certification) => (
                    <li key={certification}>{certification}</li>
                  ))}
                </ul>
              )}
            </TimelineItem>
          ))}
        </Timeline>

        <Timeline title="Expérience" icon={Briefcase}>
          {experience.map((item) => (
            <TimelineItem key={`${item.role}-${item.organization}`} period={item.period}>
              <h4 className="mt-1 text-lg font-semibold">{item.role}</h4>
              <p className="text-paper/70">{item.organization}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {item.missions.map((mission) => (
                  <li key={mission} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-gold/70" />
                    {mission}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-paper/60">{item.stack.join(', ')}</p>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </Section>
  )
}
