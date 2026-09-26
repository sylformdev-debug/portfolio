import { profile } from '../data/profile'

/*
  Élément visuel du Hero : des courbes de niveau tracées en or autour d'un point, Cotonou.
  Un clin d'œil au travail de terrain de l'anthropologue, et au plan que l'on dessine avant de construire.
  Les tracés sont calculés une seule fois au chargement du module.
*/

const SIZE = 480
const CENTER = SIZE / 2

function contourPath(radius, seed) {
  const steps = 120
  let path = ''
  for (let i = 0; i <= steps; i += 1) {
    const angle = (i / steps) * Math.PI * 2
    const wobble =
      1 +
      0.09 * Math.sin(3 * angle + seed) +
      0.05 * Math.sin(5 * angle + seed * 1.7) +
      0.025 * Math.sin(9 * angle + seed * 0.6)
    const x = CENTER + radius * wobble * Math.cos(angle)
    const y = CENTER + radius * wobble * Math.sin(angle) * 0.84
    path += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return `${path}Z`
}

const contours = [32, 58, 86, 116, 148, 182].map((radius, index) => ({
  d: contourPath(radius, index * 0.55),
  opacity: 1 - index * 0.13,
  delay: index * 140,
}))

const ticks = Array.from({ length: 13 }, (_, index) => 24 + index * 36)

export default function HeroMap() {
  return (
    <figure className="relative mx-auto w-full max-w-[26rem] lg:max-w-none">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-auto w-full" aria-hidden="true" focusable="false">
        <g stroke="currentColor" className="text-line" strokeWidth="1">
          <line x1="0" y1={CENTER} x2={SIZE} y2={CENTER} />
          <line x1={CENTER} y1="0" x2={CENTER} y2={SIZE} />
          {ticks.map((position) => (
            <line key={`t-${position}`} x1={position} y1={SIZE - 1} x2={position} y2={SIZE - 9} />
          ))}
          {ticks.map((position) => (
            <line key={`l-${position}`} x1="1" y1={position} x2="9" y2={position} />
          ))}
        </g>

        <g fill="none" stroke="currentColor" className="text-gold" strokeWidth="1.1">
          {contours.map((contour) => (
            <path
              key={contour.d.slice(0, 24)}
              d={contour.d}
              pathLength="1"
              className="draw-line"
              style={{ '--draw-delay': `${contour.delay}ms`, opacity: contour.opacity }}
            />
          ))}
        </g>

        <circle cx={CENTER} cy={CENTER} r="4.5" className="fill-gold" />
        <circle cx={CENTER} cy={CENTER} r="11" fill="none" stroke="currentColor" className="text-gold/50" />
      </svg>

      <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-3 text-sm text-muted">
        <span>{profile.location}</span>
        <span className="tabular-nums">{profile.coordinates}</span>
      </figcaption>
    </figure>
  )
}
