import { skillGroups } from '../data/skills'
import Section from './ui/Section'
import Reveal from './ui/Reveal'

function SkillRow({ skill }) {
  const Icon = skill.icon

  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 border-b border-line py-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-baseline">
      <Icon size={20} className="translate-y-1 text-gold" aria-hidden="true" />
      <div>
        <h4 className="font-semibold text-paper">{skill.name}</h4>
        <p className="mt-1 text-sm text-muted">{skill.description}</p>
      </div>
      <p className="col-start-2 mt-2 text-xs text-paper/60 sm:col-start-3 sm:mt-0 sm:text-right">{skill.usage}</p>
    </li>
  )
}

export default function Skills() {
  return (
    <Section
      id="competences"
      title="Compétences"
      intro="Les technologies que j’utilise, et ce à quoi elles me servent dans un projet."
    >
      <div className="space-y-16">
        {skillGroups.map((group) => (
          <Reveal key={group.id} aria-labelledby={`groupe-${group.id}`} role="group">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-paper/25 pb-3">
              <h3 id={`groupe-${group.id}`} className="font-display text-3xl">
                {group.title}
              </h3>
              <p className="text-sm text-muted">{group.summary}</p>
            </div>
            <ul>
              {group.skills.map((skill) => (
                <SkillRow key={skill.name} skill={skill} />
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
