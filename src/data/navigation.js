// L'ordre de ce tableau définit l'ordre du menu. Chaque id doit correspondre à l'id d'une section.
export const navigation = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'projets', label: 'Projets' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
]

export const sectionIds = navigation.map((item) => item.id)
