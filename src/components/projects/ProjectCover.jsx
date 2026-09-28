import { usePreferences } from '../../hooks/usePreferences'

// Courbes de niveau propres à chaque projet (calculées à partir de son nom) : même famille visuelle que le Hero.
function coverContours(seedText) {
  const seed = [...seedText].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 100
  return [40, 80, 125, 175, 230, 290].map((radius, index) => {
    let path = ''
    for (let i = 0; i <= 96; i += 1) {
      const angle = (i / 96) * Math.PI * 2
      const wobble =
        1 + 0.1 * Math.sin(3 * angle + seed * 0.3 + index * 0.5) + 0.05 * Math.sin(5 * angle + seed * 0.11)
      const x = 560 + radius * wobble * Math.cos(angle)
      const y = 150 + radius * wobble * Math.sin(angle) * 0.8
      path += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
    }
    return `${path}Z`
  })
}

/*
  Visuel principal d'un projet.
  Avec une capture : l'image, qui zoome légèrement au survol.
  Sans capture : une couverture composée à partir du nom, du type et des technologies du projet.
*/
export default function ProjectCover({ project, priority = false, className = 'aspect-[16/10]' }) {
  const { t, l } = usePreferences()

  return (
    <div
      data-cursor="media"
      className={`relative overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,box-shadow] duration-500 group-hover:border-gold/50 group-hover:shadow-[0_30px_60px_-30px_var(--gold-glow)] ${className}`}
    >
      {project.image ? (
        <img
          src={project.image}
          alt={t('project.screenshotAlt', { title: project.title })}
          width="1280"
          height="800"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{ objectPosition: project.imagePosition ?? 'left top' }}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <div className="absolute inset-0" aria-hidden="true">
          <svg
            viewBox="0 0 800 500"
            preserveAspectRatio="xMaxYMid slice"
            className="absolute inset-0 h-full w-full text-gold transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.2">
              {coverContours(project.slug).map((d, index) => (
                <path key={d.slice(0, 20)} d={d} opacity={0.62 - index * 0.08} />
              ))}
            </g>
            <circle cx="560" cy="150" r="4" className="fill-gold" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-tr from-surface via-surface/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <span className="block text-sm text-muted">{l(project.type)}</span>
            <span className="mt-2 block font-display text-4xl leading-none text-paper md:text-6xl">
              {project.title}
            </span>
            <span className="mt-4 block max-w-md text-xs leading-relaxed text-muted">
              {project.stack.slice(0, 5).join(', ')}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
