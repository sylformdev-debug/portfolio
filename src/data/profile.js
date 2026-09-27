// Informations personnelles. Les textes { fr, en } sont traduits automatiquement selon la langue choisie.

export const profile = {
  firstName: 'Sylvain',
  lastName: 'Tevoedjre',
  fullName: 'Sylvain Tevoedjre',
  role: { fr: 'Développeur Web Full Stack', en: 'Full Stack Web Developer' },
  location: { fr: 'Cotonou, Bénin', en: 'Cotonou, Benin' },
  coordinates: '6°22′ N, 2°25′ E',

  email: 'sylformdev@gmail.com',
  phoneDisplay: '+229 01 67 30 09 17',
  whatsappNumber: '2290167300917', // format international, sans « + » ni espaces

  socials: {
    github: 'https://github.com/sylformdev-debug',
    linkedin: 'https://www.linkedin.com/in/tevoedjre-sylvain',
  },

  // Fichier placé dans public/cv/ : remplacez-le pour mettre votre CV à jour.
  cvUrl: '/cv/CV_TEVOEDJRE_Sylvain.pdf',

  heroStack: ['React', 'Laravel', 'Node.js', 'MySQL', 'MongoDB', 'Tailwind CSS'],

  about: {
    paragraphs: [
      {
        fr: 'Je viens des sciences sociales. En licence de sociologie-anthropologie à l’Université d’Abomey-Calavi, j’ai appris à observer avant de conclure : qui utilise un service, dans quelles conditions, et ce qui le freine vraiment.',
        en: 'I come from the social sciences. Studying sociology and anthropology at the University of Abomey-Calavi taught me to observe before concluding: who uses a service, under which conditions, and what really holds them back.',
      },
      {
        fr: 'J’applique cette habitude au développement web. Formé en développement web à EIG Bénin, je construis des applications complètes, avec React côté interface, Laravel ou Node.js côté serveur, MySQL ou MongoDB pour les données.',
        en: 'I bring that habit to web development. Trained in web development at EIG Bénin, I build complete applications, with React on the interface, Laravel or Node.js on the server, and MySQL or MongoDB for data.',
      },
      {
        fr: 'Je travaille par étapes courtes et validées : clarifier le besoin, poser une structure propre, livrer une première version utilisable, puis l’améliorer. Je préfère une fonctionnalité simple qui marche à une promesse affichée qui ne fonctionne pas.',
        en: 'I work in short, validated steps: clarify the need, set up a clean structure, ship a first usable version, then improve it. I would rather deliver a simple feature that works than display a promise that does not.',
      },
    ],
    facts: [
      {
        label: { fr: 'Formation', en: 'Education' },
        value: [
          { fr: 'Développement web, EIG Bénin', en: 'Web development, EIG Bénin' },
          {
            fr: 'Licence 3 Sociologie-Anthropologie, UAC',
            en: 'Bachelor’s (year 3) in Sociology and Anthropology, UAC',
          },
        ],
      },
      { label: { fr: 'Basé à', en: 'Based in' }, value: [{ fr: 'Cotonou, Bénin', en: 'Cotonou, Benin' }] },
      {
        label: { fr: 'Langues', en: 'Languages' },
        value: [{ fr: 'Français courant, anglais B1', en: 'French (fluent), English (B1)' }],
      },
      {
        label: { fr: 'Objectif', en: 'Goal' },
        value: [
          {
            fr: 'Mener des projets complets, de l’API à l’interface, au sein d’une équipe ou pour des clients.',
            en: 'Lead complete projects, from the API to the interface, within a team or for clients.',
          },
        ],
      },
    ],
  },
}

export const whatsappLink = `https://wa.me/${profile.whatsappNumber}`
export const emailLink = `mailto:${profile.email}`
