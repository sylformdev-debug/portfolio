import Reveal from './Reveal'

/*
  Gabarit commun des sections de l'accueil.
  layout="split"   : titre à gauche, contenu à droite (grands écrans)
  layout="stacked" : titre au-dessus, contenu sur toute la largeur
*/
export default function Section({ id, title, intro, layout = 'split', aside, children }) {
  const titleId = `${id}-titre`
  const isSplit = layout === 'split'

  return (
    <section id={id} aria-labelledby={titleId} className="border-t border-line py-20 md:py-28">
      <div
        className={`container-page ${
          isSplit ? 'grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)] lg:gap-16' : ''
        }`}
      >
        <Reveal
          as="header"
          className={
            isSplit
              ? 'lg:sticky lg:top-28 lg:self-start'
              : 'mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16'
          }
        >
          <div className="max-w-2xl">
            <h2 id={titleId} className="font-display text-4xl leading-tight md:text-5xl">
              {title}
            </h2>
            {intro && <p className="mt-4 max-w-md text-muted">{intro}</p>}
          </div>
          {aside}
        </Reveal>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}
