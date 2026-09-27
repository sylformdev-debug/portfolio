import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '../icons/BrandIcons'
import { usePreferences } from '../../hooks/usePreferences'
import Button from '../ui/Button'

// Affiche uniquement les liens renseignés : jamais de bouton sans destination.
export default function ProjectLinks({ project }) {
  const { t } = usePreferences()
  const { github, demo } = project.links

  if (!github && !demo) return null

  return (
    <div className="flex flex-wrap gap-3">
      {demo && (
        <Button
          href={demo}
          variant="gold"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t('project.demo')}, ${project.title}`}
        >
          {t('project.demo')}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Button>
      )}
      {github && (
        <Button
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t('project.github')}, ${project.title}`}
        >
          <GithubIcon size={16} />
          {t('project.github')}
        </Button>
      )}
    </div>
  )
}
