import { services } from '../data/services'
import Section from './ui/Section'
import Reveal from './ui/Reveal'

export default function Services() {
  return (
    <Section id="services" title="Services" intro="Ce que je peux prendre en charge pour vous, du site vitrine à l’application complète.">
      <Reveal as="ul" className="border-t border-line">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <li
              key={service.title}
              className="group grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 border-b border-line py-7 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.3fr)] md:items-baseline md:gap-x-8"
            >
              <Icon size={22} className="translate-y-1 text-gold" aria-hidden="true" />
              <h3 className="font-display text-3xl leading-tight transition-colors duration-200 group-hover:text-gold-soft">
                {service.title}
              </h3>
              <p className="col-start-2 mt-2 text-paper/75 md:col-start-3 md:mt-0">{service.description}</p>
            </li>
          )
        })}
      </Reveal>
    </Section>
  )
}
