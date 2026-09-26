import { AppWindow, LayoutTemplate, Plug, ShoppingBag, Wrench } from 'lucide-react'

export const services = [
  {
    title: 'Création de sites web',
    description: 'Sites vitrines modernes, responsive et optimisés pour le référencement.',
    icon: LayoutTemplate,
  },
  {
    title: 'Applications web',
    description: 'Des applications construites autour des besoins de leurs utilisateurs.',
    icon: AppWindow,
  },
  {
    title: 'E-commerce',
    description: 'Des plateformes pour vendre des produits ou des services en ligne.',
    icon: ShoppingBag,
  },
  {
    title: 'API & Backend',
    description: 'Création et intégration d’API REST, logique serveur et bases de données.',
    icon: Plug,
  },
  {
    title: 'Maintenance',
    description: 'Correction de bugs, améliorations et évolution de projets existants.',
    icon: Wrench,
  },
]
