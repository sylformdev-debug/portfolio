import { Link } from 'react-router'
import { skillGroups } from '../../data/skills'
import { usePreferences } from '../../hooks/usePreferences'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'

function SkillItem({ skill }) {
  const { t, l } = usePreferences()
  const Icon = skill.icon

  return (
    <li className="group relative border-t border-line py-5 pr-2">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
      />
      <div className="flex items-start gap-4">
        <Icon
          size={20}
          className="mt-0.5 shrink-0 text-gold transition-transform duration-300 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <h4 className="font-semibold text-paper">{l(skill.name)}</h4>
          <p className="mt-1 text-sm text-muted">{l(skill.description)}</p>
          {skill.relatedProjects.length > 0 && (
            <p className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <span className="text-muted">{t('skills.usedIn')}</span>
              {skill.relatedProjects.map((project) => (
                <Link
                  key={project.slug}
                  to={`/projects/${project.slug}`}
                  viewTransition
                  className="link-underline text-paper/80 hover:text-gold"
                >
                  {project.title}
                </Link>
              ))}
            </p>
          )}
        </div>
      </div>
    </li>
  )
}

export default function Skills() {
  const { t, l } = usePreferences()

  return (
    <Section id="competences" title={t('skills.title')} intro={t('skills.intro')}>
      <div className="space-y-16">
        {skillGroups.map((group) => (
          <Reveal key={group.id} role="group" aria-labelledby={`groupe-${group.id}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3">
              <h3 id={`groupe-${group.id}`} className="font-display text-3xl">
                {l(group.title)}
              </h3>
              <p className="text-sm text-muted">{l(group.summary)}</p>
            </div>
            <ul className="grid gap-x-10 md:grid-cols-2">
              {group.skills.map((skill) => (
                <SkillItem key={l(skill.name)} skill={skill} />
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
