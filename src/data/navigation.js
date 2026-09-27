// Sections de la page d'accueil, dans l'ordre. « key » renvoie au libellé traduit dans src/locales (nav.xxx).
export const navigation = [
  { id: 'accueil', key: 'home' },
  { id: 'a-propos', key: 'about' },
  { id: 'competences', key: 'skills' },
  { id: 'projets', key: 'projects' },
  { id: 'parcours', key: 'experience' },
  { id: 'certifications', key: 'certifications' },
  { id: 'services', key: 'services' },
  { id: 'contact', key: 'contact' },
]

export const sectionIds = navigation.map((item) => item.id)
