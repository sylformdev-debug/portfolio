import { Link, useParams } from 'react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { findProject, getNextProject } from '../data/projects'
import { usePreferences } from '../hooks/usePreferences'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import Tag from '../components/ui/Tag'
import ProjectCover from '../components/projects/ProjectCover'
import ProjectLinks from '../components/projects/ProjectLinks'
import NotFoundPage from './NotFoundPage'

// Une rubrique de l'étude de cas : titre à gauche, contenu à droite. N'est affichée que si elle a un contenu.
function CaseSection({ title, children }) {
  return (
    <Reveal
      as="section"
      className="grid gap-4 border-t border-line py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] md:gap-12 md:py-16"
    >
      <h2 className="font-display text-3xl leading-tight md:text-4xl">{title}</h2>
      <div className="min-w-0 text-lg text-paper/85">{children}</div>
    </Reveal>
  )
}

function BulletList({ items }) {
  const { l } = usePreferences()
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.fr ?? item} className="flex gap-4">
          <span aria-hidden="true" className="mt-[0.8em] h-px w-4 shrink-0 bg-gold" />
          {l(item)}
        </li>
      ))}
    </ul>
  )
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const { t, l } = usePreferences()
  const project = findProject(slug)
  useDocumentTitle(project ? `${project.title} | Sylvain Tevoedjre` : t('meta.notFound'))

  if (!project) return <NotFoundPage title={t('project.notFoundTitle')} text={t('project.notFoundText')} />

  const next = getNextProject(project.slug)
  const hasLinks = project.links.github || project.links.demo
  const meta = [
    { label: t('project.category'), value: l(project.type) },
    { label: t('project.status'), value: l(project.status) },
    { label: t('project.date'), value: project.date },
  ].filter((item) => item.value)

  return (
    <article className="pt-28 pb-24 md:pt-36">
      <header className="container-page">
        <Button to="/projects" className="intro">
          <ArrowLeft size={16} aria-hidden="true" />
          {t('project.back')}
        </Button>

        <h1
          className="intro mt-10 font-display text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.92]"
          style={{ '--intro-delay': '80ms' }}
        >
          {project.title}
        </h1>
        <p className="intro mt-6 max-w-3xl text-xl text-paper/80 md:text-2xl md:leading-snug" style={{ '--intro-delay': '160ms' }}>
          {l(project.summary)}
        </p>

        <div className="intro mt-10 flex flex-wrap items-end justify-between gap-8" style={{ '--intro-delay': '240ms' }}>
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="mt-1 text-paper">{item.value}</dd>
              </div>
            ))}
          </dl>
          <ProjectLinks project={project} />
        </div>
      </header>

      <div className="intro container-page mt-14" style={{ '--intro-delay': '320ms' }}>
        <div className="group">
          <ProjectCover
            project={project}
            priority
            className={project.image ? 'aspect-[16/9]' : 'aspect-[16/9] md:aspect-[21/8]'}
          />
        </div>
      </div>

      <div className="container-page mt-10">
        {project.overview && (
          <CaseSection title={t('project.overview')}>
            <p>{l(project.overview)}</p>
          </CaseSection>
        )}
        {project.challenge && (
          <CaseSection title={t('project.challenge')}>
            <p>{l(project.challenge)}</p>
          </CaseSection>
        )}
        {project.solution && (
          <CaseSection title={t('project.solution')}>
            <p>{l(project.solution)}</p>
          </CaseSection>
        )}
        {project.features?.length > 0 && (
          <CaseSection title={t('project.features')}>
            <BulletList items={project.features} />
          </CaseSection>
        )}
        {project.scope?.length > 0 && (
          <CaseSection title={t('project.scope')}>
            <BulletList items={project.scope} />
          </CaseSection>
        )}
        <CaseSection title={t('project.technologies')}>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </CaseSection>
        {project.role && (
          <CaseSection title={t('project.role')}>
            <p>{l(project.role)}</p>
          </CaseSection>
        )}
        {project.architecture && (
          <CaseSection title={t('project.architecture')}>
            <p>{l(project.architecture)}</p>
          </CaseSection>
        )}
        {project.gallery?.length > 0 && (
          <CaseSection title={t('project.screenshots')}>
            <ul className="grid gap-5 sm:grid-cols-2">
              {project.gallery.map((image, index) => (
                <li key={image} className="group overflow-hidden rounded-2xl border border-line" data-cursor="media">
                  <img
                    src={image}
                    alt={`${t('project.screenshotAlt', { title: project.title })} (${index + 1})`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </li>
              ))}
            </ul>
          </CaseSection>
        )}
        {project.technicalChallenges?.length > 0 && (
          <CaseSection title={t('project.technicalChallenges')}>
            <BulletList items={project.technicalChallenges} />
          </CaseSection>
        )}
        {project.result && (
          <CaseSection title={t('project.result')}>
            <p>{l(project.result)}</p>
          </CaseSection>
        )}
        {hasLinks && (
          <CaseSection title={t('project.links')}>
            <ProjectLinks project={project} />
          </CaseSection>
        )}
      </div>

      {next && next.slug !== project.slug && (
        <div className="container-page mt-10">
          <Link
            to={`/projects/${next.slug}`}
            viewTransition
            className="group block border-t border-line pt-10"
          >
            <span className="text-sm text-muted">{t('project.next')}</span>
            <span className="mt-2 flex items-center justify-between gap-6">
              <span className="font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-none transition-colors duration-300 group-hover:text-gold">
                {next.title}
              </span>
              <ArrowRight
                size={40}
                aria-hidden="true"
                className="shrink-0 text-gold transition-transform duration-500 group-hover:translate-x-2"
              />
            </span>
            <span className="mt-3 block text-muted">{l(next.type)}</span>
          </Link>
        </div>
      )}
    </article>
  )
}
