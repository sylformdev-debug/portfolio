import { useSearchParams } from 'react-router'
import { publishedProjects } from '../data/projects'
import { projectFilters } from '../data/projectFilters'
import { usePreferences } from '../hooks/usePreferences'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import ProjectRow from '../components/projects/ProjectRow'

export default function ProjectsPage() {
  const { t } = usePreferences()
  useDocumentTitle(t('meta.projects'))

  // Le filtre actif est dans l'adresse (?filtre=api) : la page filtrée peut être partagée.
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('filtre')
  const activeFilter = projectFilters.includes(requested) ? requested : 'all'

  const visibleProjects =
    activeFilter === 'all'
      ? publishedProjects
      : publishedProjects.filter((project) => project.categories.includes(activeFilter))

  const selectFilter = (filter) => {
    setSearchParams(filter === 'all' ? {} : { filtre: filter }, { replace: true, preventScrollReset: true })
  }

  return (
    <div className="pt-32 pb-24 md:pt-40">
      <header className="container-page">
        <h1 className="intro font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95]">{t('projects.pageTitle')}</h1>
        <p className="intro mt-6 max-w-2xl text-lg text-paper/80" style={{ '--intro-delay': '120ms' }}>
          {t('projects.pageIntro')}
        </p>

        <div
          className="intro mt-10 flex flex-wrap items-center gap-2 border-y border-line py-5"
          style={{ '--intro-delay': '220ms' }}
          role="group"
          aria-label={t('projects.filtersLabel')}
        >
          {projectFilters.map((filter) => {
            const isActive = filter === activeFilter
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => selectFilter(filter)}
                className={`btn-glass min-h-10! px-4! text-sm ${isActive ? 'btn-glass--gold' : 'text-muted!'}`}
              >
                {t(`projects.filters.${filter}`)}
              </button>
            )
          })}
          <p className="ml-auto text-sm text-muted" aria-live="polite">
            {t('projects.count', { count: visibleProjects.length })}
          </p>
        </div>
      </header>

      <div className="container-page mt-16 space-y-24 md:mt-20 md:space-y-32">
        {visibleProjects.length === 0 && <p className="text-muted">{t('projects.empty')}</p>}
        {visibleProjects.map((project, index) => (
          <div
            key={`${activeFilter}-${project.slug}`}
            className="fade-in"
            style={{ '--fade-delay': `${Math.min(index, 4) * 80}ms` }}
          >
            <ProjectRow project={project} reversed={index % 2 === 1} headingLevel={2} />
          </div>
        ))}
      </div>
    </div>
  )
}
