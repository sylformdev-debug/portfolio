import Reveal from '../ui/Reveal'
import ProjectVisual from './ProjectVisual'
import ProjectLinks from './ProjectLinks'

// Étude de cas : visuel d'un côté, contexte, rôle, fonctionnalités et technologies de l'autre.
export default function ProjectCase({ project, reversed = false }) {
  const titleId = `projet-${project.slug}`

  return (
    <Reveal
      as="article"
      aria-labelledby={titleId}
      className="group grid gap-8 border-t border-line py-14 first:border-t-0 first:pt-0 md:py-20 lg:grid-cols-12 lg:gap-14"
    >
      <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
        <ProjectVisual project={project} />
      </div>

      <div className="lg:col-span-5">
        <p className="flex flex-wrap gap-x-3 text-sm text-muted">
          <span>{project.category}</span>
          {project.status && <span className="text-gold">{project.status}</span>}
        </p>
        <h3 id={titleId} className="mt-2 font-display text-4xl leading-tight md:text-5xl">
          {project.title}
        </h3>
        <p className="mt-4 text-paper/85">{project.summary}</p>

        <dl className="mt-8 space-y-6 text-sm">
          <div>
            <dt className="font-semibold text-gold">Le besoin</dt>
            <dd className="mt-1.5 text-paper/75">{project.context}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gold">Mon rôle</dt>
            <dd className="mt-1.5 text-paper/75">{project.role}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gold">Fonctionnalités principales</dt>
            <dd className="mt-2">
              <ul className="space-y-1.5 text-paper/75">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" />
                    {feature}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gold">Technologies</dt>
            <dd className="mt-2">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs text-paper/80">
                    {tech}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <div className="mt-8">
          <ProjectLinks project={project} />
        </div>
      </div>
    </Reveal>
  )
}
