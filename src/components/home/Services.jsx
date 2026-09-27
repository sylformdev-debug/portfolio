import { services } from '../../data/services'
import { usePreferences } from '../../hooks/usePreferences'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'

export default function Services() {
  const { t, l } = usePreferences()

  return (
    <Section id="services" title={t('services.title')} intro={t('services.intro')}>
      <ul className="border-t border-line">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <Reveal
              as="li"
              key={service.title.fr}
              delay={(index % 4) * 60}
              className="group grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 border-b border-line py-7 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.3fr)] md:items-baseline md:gap-x-8"
            >
              <Icon
                size={22}
                className="translate-y-1 text-gold transition-transform duration-300 group-hover:rotate-[-8deg]"
                aria-hidden="true"
              />
              <h3 className="font-display text-3xl leading-tight transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-gold">
                {l(service.title)}
              </h3>
              <div className="col-start-2 mt-2 md:col-start-3 md:mt-0">
                <p className="text-paper/80">{l(service.description)}</p>
                <p className="mt-2 text-xs text-muted">{service.stack.map((tech) => l(tech)).join(', ')}</p>
              </div>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
