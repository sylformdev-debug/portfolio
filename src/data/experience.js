// Parcours, du plus récent au plus ancien. Champs facultatifs : description, highlights, stack.

export const education = [
  {
    title: { fr: 'Formation professionnelle en développement web', en: 'Professional web development training' },
    organization: 'EIG Bénin',
    period: { fr: 'En fin de formation', en: 'Completing' },
    description: {
      fr: 'Développement front-end et back-end : HTML, CSS, JavaScript, React, PHP, Laravel, MySQL, Git.',
      en: 'Front-end and back-end development: HTML, CSS, JavaScript, React, PHP, Laravel, MySQL, Git.',
    },
  },
  {
    title: { fr: 'Licence 3, Sociologie-Anthropologie', en: 'Bachelor’s (year 3), Sociology and Anthropology' },
    organization: { fr: 'Université d’Abomey-Calavi, FLASH', en: 'University of Abomey-Calavi, FLASH' },
    period: { fr: 'Fin prévue en 2026', en: 'Expected 2026' },
    description: {
      fr: 'Méthodes d’enquête et d’observation, travaux sur le développement, la planification, le genre et les migrations.',
      en: 'Survey and observation methods, work on development, planning, gender and migration.',
    },
  },
  {
    title: { fr: 'Baccalauréat, série A2', en: 'Baccalaureate, A2 series' },
    organization: { fr: 'Bénin', en: 'Benin' },
    period: '2019',
  },
]

export const experience = [
  {
    title: { fr: 'Développeur web full stack', en: 'Full stack web developer' },
    organization: { fr: 'Projets personnels et académiques', en: 'Personal and academic projects' },
    period: { fr: 'En cours', en: 'Ongoing' },
    highlights: [
      {
        fr: 'Credixa : plateforme de prêt en ligne, React, Node.js / Express et MongoDB',
        en: 'Credixa: online lending platform, React, Node.js / Express and MongoDB',
      },
      {
        fr: 'Rouage : boutique de vélos en ligne sous Laravel 9',
        en: 'Rouage: Laravel 9 online bike shop',
      },
      {
        fr: 'AutoCost : comparateur de coûts de véhicules, projet académique déployé',
        en: 'AutoCost: vehicle cost comparator, deployed academic project',
      },
      {
        fr: 'DropCrea : plateforme de vente de produits numériques, en développement',
        en: 'DropCrea: digital product marketplace, in development',
      },
    ],
    stack: ['React', 'Laravel', 'Node.js', 'MySQL', 'MongoDB', 'Tailwind CSS', 'Git'],
  },
  {
    title: { fr: 'Hackathon EIG', en: 'EIG Hackathon' },
    organization: 'EIG Bénin',
    period: '2025',
    description: {
      fr: 'Conception et présentation d’Hôtel Seguro, site hôtelier avec réservation et espace d’administration.',
      en: 'Designed and presented Hôtel Seguro, a hotel website with booking and an admin area.',
    },
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'PHP', 'MySQL'],
  },
]
