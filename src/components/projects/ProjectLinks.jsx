import { ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '../icons/BrandIcons'

const linkClass =
  'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200'

// N'affiche que les liens renseignés : aucun bouton inactif.
export default function ProjectLinks({ project, compact = false }) {
  const { github, demo } = project.links
  const label = project.title

  if (!github && !demo) {
    return <p className="text-sm text-muted">Liens bientôt disponibles</p>
  }

  return (
    <div className="flex flex-wrap gap-3">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Code source de ${label} sur GitHub (nouvel onglet)`}
          className={`${linkClass} border-paper/30 hover:border-gold hover:text-gold-soft`}
        >
          <GithubIcon size={16} />
          {!compact && 'GitHub'}
        </a>
      )}
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Voir le projet ${label} en ligne (nouvel onglet)`}
          className={`${linkClass} border-gold bg-gold text-ink hover:bg-gold-soft`}
        >
          {!compact && 'Voir le projet'}
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      )}
    </div>
  )
}
