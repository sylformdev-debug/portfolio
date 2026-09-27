import { AppWindow, Gauge, LayoutTemplate, MonitorSmartphone, Plug, ServerCog, ShoppingBag, Wrench } from 'lucide-react'

export const services = [
  {
    title: { fr: 'Création de sites web', en: 'Websites' },
    description: {
      fr: 'Sites vitrines modernes, responsive et pensés pour le référencement.',
      en: 'Modern, responsive showcase websites built with SEO in mind.',
    },
    stack: ['HTML', 'CSS', 'JavaScript', 'WordPress'],
    icon: LayoutTemplate,
  },
  {
    title: { fr: 'Applications web', en: 'Web applications' },
    description: {
      fr: 'Des applications complètes, avec comptes utilisateurs, tableaux de bord et données.',
      en: 'Complete applications with user accounts, dashboards and data.',
    },
    stack: ['React', 'Laravel', 'Node.js'],
    icon: AppWindow,
  },
  {
    title: { fr: 'Développement frontend', en: 'Frontend development' },
    description: {
      fr: 'Intégration de maquettes en interfaces rapides, accessibles et responsive.',
      en: 'Turning mock-ups into fast, accessible, responsive interfaces.',
    },
    stack: ['React', 'Tailwind CSS', 'Vite'],
    icon: MonitorSmartphone,
  },
  {
    title: { fr: 'Développement backend', en: 'Backend development' },
    description: {
      fr: 'Logique métier, authentification, bases de données et emails transactionnels.',
      en: 'Business logic, authentication, databases and transactional emails.',
    },
    stack: ['PHP', 'Laravel', 'Express', 'MySQL', 'MongoDB'],
    icon: ServerCog,
  },
  {
    title: { fr: 'API', en: 'APIs' },
    description: {
      fr: 'Création d’API REST sécurisées et intégration d’API externes.',
      en: 'Building secure REST APIs and integrating third-party APIs.',
    },
    stack: ['REST', 'JWT', 'Express', 'Laravel'],
    icon: Plug,
  },
  {
    title: { fr: 'E-commerce', en: 'E-commerce' },
    description: {
      fr: 'Catalogue, panier, livraison, codes promo et paiement adapté au marché local.',
      en: 'Catalogue, cart, delivery, promo codes and payment suited to the local market.',
    },
    stack: ['Laravel', 'MySQL', 'Mobile Money'],
    icon: ShoppingBag,
  },
  {
    title: { fr: 'Maintenance', en: 'Maintenance' },
    description: {
      fr: 'Correction de bugs, améliorations et évolution de projets existants.',
      en: 'Bug fixes, improvements and evolution of existing projects.',
    },
    stack: ['Git', 'PHP', 'JavaScript'],
    icon: Wrench,
  },
  {
    title: { fr: 'Optimisation', en: 'Optimisation' },
    description: {
      fr: 'Temps de chargement, accessibilité et bases du référencement.',
      en: 'Load times, accessibility and SEO fundamentals.',
    },
    stack: ['SEO', { fr: 'Accessibilité', en: 'Accessibility' }, { fr: 'Performance', en: 'Performance' }],
    icon: Gauge,
  },
]
