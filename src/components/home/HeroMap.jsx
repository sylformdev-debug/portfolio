import { profile } from '../../data/profile'
import { usePreferences } from '../../hooks/usePreferences'
import { useHeroMotion } from '../../hooks/useHeroMotion'

/*
  Visuel du Hero : des courbes de niveau tracées en or autour d'un point, Cotonou.
  Un clin d'œil au travail de terrain de l'anthropologue, et au plan que l'on dessine avant de construire.
  Chaque courbe réagit à la souris avec une intensité différente, ce qui crée une impression de relief.
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
  delay: 300 + index * 140,
  depth: (6 - index) * 3.2, // les courbes centrales bougent le plus : le « sommet » se détache
}))

const ticks = Array.from({ length: 13 }, (_, index) => 24 + index * 36)

export default function HeroMap() {
  const { l } = usePreferences()
  const motionRef = useHeroMotion()

  return (
    <figure
      ref={motionRef}
      className="intro-fade relative mx-auto w-full max-w-[26rem] lg:max-w-none"
      style={{ '--intro-delay': '200ms', transform: 'translate3d(0, var(--sy, 0px), 0)' }}
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-auto w-full overflow-visible" aria-hidden="true" focusable="false">
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
            <g
              key={contour.d.slice(0, 24)}
              style={{
                transform: `translate(calc(var(--mx, 0) * ${contour.depth}px), calc(var(--my, 0) * ${contour.depth}px))`,
                transition: 'transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)',
              }}
            >
              <path
                d={contour.d}
                pathLength="1"
                className="draw-line"
                style={{ '--draw-delay': `${contour.delay}ms`, opacity: contour.opacity }}
              />
            </g>
          ))}
        </g>

        <g
          style={{
            transform: 'translate(calc(var(--mx, 0) * 22px), calc(var(--my, 0) * 22px))',
            transition: 'transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)',
          }}
        >
          <circle cx={CENTER} cy={CENTER} r="4.5" className="fill-gold" />
          <circle cx={CENTER} cy={CENTER} r="11" fill="none" stroke="currentColor" className="text-gold/50" />
        </g>
      </svg>

      <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-3 text-sm text-muted">
        <span>{l(profile.location)}</span>
        <span className="tabular-nums">{profile.coordinates}</span>
      </figcaption>
    </figure>
  )
}
