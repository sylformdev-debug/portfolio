import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { usePreferences } from '../../hooks/usePreferences'
import Button from '../ui/Button'
import Tag from '../ui/Tag'
import ProjectCover from './ProjectCover'
import ProjectLinks from './ProjectLinks'

// Présentation d'un projet dans une liste : visuel d'un côté, résumé et accès à l'étude de cas de l'autre.
export default function ProjectRow({ project, reversed = false, headingLevel = 3 }) {
  const { t, l } = usePreferences()
  const Heading = `h${headingLevel}`
  const caseUrl = `/projects/${project.slug}`

  return (
    <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <Link
        to={caseUrl}
        viewTransition
        tabIndex={-1}
        aria-hidden="true"
        className={`block lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}
      >
        <ProjectCover project={project} />
      </Link>

      <div className="lg:col-span-5">
        <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
          <span className="text-muted">{l(project.type)}</span>
          {project.status && <span className="text-gold">{l(project.status)}</span>}
        </p>
        <Heading className="mt-2 font-display text-4xl leading-tight md:text-5xl">
          <Link to={caseUrl} viewTransition className="transition-colors duration-200 hover:text-gold">
            {project.title}
          </Link>
        </Heading>
        <p className="mt-4 text-paper/80">{l(project.summary)}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 6).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button to={caseUrl} aria-label={`${t('projects.readCase')}, ${project.title}`}>
            {t('projects.readCase')}
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Button>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  )
}
