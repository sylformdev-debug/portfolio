import { publishedProjects } from './projects'

// Ordre des filtres de la page Projets. Un filtre sans projet n'est pas affiché.
const FILTER_ORDER = ['all', 'fullstack', 'frontend', 'backend', 'webapp', 'ecommerce', 'api']

export const projectFilters = FILTER_ORDER.filter(
  (filter) => filter === 'all' || publishedProjects.some((project) => project.categories.includes(filter)),
)
