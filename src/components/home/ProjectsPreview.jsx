import { ArrowRight } from 'lucide-react'
import { featuredProjects, publishedProjects } from '../../data/projects'
import { usePreferences } from '../../hooks/usePreferences'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import ProjectRow from '../projects/ProjectRow'

// Aperçu des projets mis en avant ; la liste complète est sur /projects.
export default function ProjectsPreview() {
  const { t } = usePreferences()

  const viewAll = (
    <Button to="/projects" variant="gold">
      {t('projects.viewAll')} ({publishedProjects.length})
      <ArrowRight size={16} aria-hidden="true" />
    </Button>
  )

  return (
    <Section id="projets" layout="stacked" title={t('projects.title')} intro={t('projects.homeIntro')} aside={viewAll}>
      <div className="space-y-20 md:space-y-28">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.slug}>
            <ProjectRow project={project} reversed={index % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
