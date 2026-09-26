import { featuredProjects, otherProjects } from '../data/projects'
import Section from './ui/Section'
import Reveal from './ui/Reveal'
import ProjectCase from './projects/ProjectCase'
import ProjectLinks from './projects/ProjectLinks'

export default function Projects() {
  return (
    <Section
      id="projets"
      layout="stacked"
      title="Projets"
      intro="Chaque projet part d’un besoin précis. Voici lequel, et comment j’y ai répondu."
    >
      <div>
        {featuredProjects.map((project, index) => (
          <ProjectCase key={project.slug} project={project} reversed={index % 2 === 1} />
        ))}
      </div>

      {otherProjects.length > 0 && (
        <Reveal className="mt-8 border-t border-paper/25 pt-12">
          <h3 className="font-display text-3xl">Autres projets</h3>
          <ul className="mt-6">
            {otherProjects.map((project) => (
              <li
                key={project.slug}
                className="grid gap-3 border-b border-line py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] md:items-center md:gap-8"
              >
                <div>
                  <h4 className="text-lg font-semibold">{project.title}</h4>
                  <p className="text-sm text-muted">{project.category}</p>
                </div>
                <div>
                  <p className="text-paper/80">{project.summary}</p>
                  <p className="mt-1 text-xs text-paper/55">{project.stack.join(', ')}</p>
                </div>
                <ProjectLinks project={project} compact />
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  )
}
