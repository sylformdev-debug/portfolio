// Informations personnelles : c'est le premier fichier à mettre à jour.

export const profile = {
  firstName: 'Sylvain',
  lastName: 'Tevoedjre',
  fullName: 'Sylvain Tevoedjre',
  role: 'Développeur Web',
  tagline:
    'Je conçois des sites et des applications web qui partent des besoins réels de leurs utilisateurs, et je les construis pour qu’ils restent simples à faire évoluer.',
  location: 'Cotonou, Bénin',
  coordinates: '6°22′ N, 2°25′ E',

  email: 'sylformdev@gmail.com',
  phoneDisplay: '+229 01 67 30 09 17',
  whatsappNumber: '2290167300917', // format international sans « + » ni espaces

  socials: {
    github: 'https://github.com/sylformdev-debug',
    linkedin: 'https://www.linkedin.com/in/tevoedjre-sylvain',
  },

  about: {
    paragraphs: [
      'Je viens des sciences sociales. Étudiant en sociologie-anthropologie à l’Université d’Abomey-Calavi, j’ai appris à observer avant de conclure : qui utilise un service, dans quelles conditions, et ce qui le freine vraiment.',
      'J’applique cette habitude au développement web. Je termine une formation professionnelle en développement web à EIG Bénin, et je construis des interfaces et des applications en partant de l’usage plutôt que de la technique.',
      'Je travaille par étapes courtes et validées : clarifier le besoin, poser une structure propre, livrer une première version utilisable, puis l’améliorer. Je préfère une fonctionnalité simple qui marche à une promesse affichée qui ne fonctionne pas.',
    ],
    facts: [
      {
        label: 'Formation',
        value: [
          'Développement web, EIG Bénin',
          'Sociologie-anthropologie, Université d’Abomey-Calavi',
        ],
      },
      { label: 'Basé à', value: ['Cotonou, Bénin'] },
      {
        label: 'Centres d’intérêt',
        value: [
          'Produits numériques pour l’Afrique francophone',
          'Développement local, migrations, questions de genre',
        ],
      },
      {
        label: 'Objectif',
        value: [
          'Mener des projets complets, du back-end Laravel à l’interface React, au sein d’une équipe ou pour des clients.',
        ],
      },
    ],
  },
}

export const whatsappLink = `https://wa.me/${profile.whatsappNumber}`
export const emailLink = `mailto:${profile.email}`
