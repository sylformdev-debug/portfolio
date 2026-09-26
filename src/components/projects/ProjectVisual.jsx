// Affiche la capture du projet, ou un cadre neutre tant qu'aucune capture n'est fournie.
export default function ProjectVisual({ project }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface transition-colors duration-300 group-hover:border-gold/60">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-paper/20" />
        <span className="h-2 w-2 rounded-full bg-paper/20" />
        <span className="h-2 w-2 rounded-full bg-paper/20" />
      </div>

      <div className="aspect-[16/10] overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={`Capture d’écran du projet ${project.title}`}
            width="1280"
            height="800"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="font-display text-5xl text-gold md:text-6xl">{project.title}</span>
            <span className="text-sm text-muted">Capture d’écran à venir</span>
          </div>
        )}
      </div>
    </div>
  )
}
