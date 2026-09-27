/*
  CERTIFICATIONS

  {
    title, organization, date,
    credentialId  : numéro du certificat (facultatif)
    credentialUrl : lien de vérification (facultatif, un bouton « Vérifier » apparaît s'il est rempli)
    image         : badge ou visuel importé depuis src/assets/ (facultatif)
    description, skills
  }
*/

export const certifications = [
  {
    title: { fr: 'Développement Web Full Stack', en: 'Full Stack Web Development' },
    organization: 'Udemy',
    date: '2026',
    credentialId: '',
    credentialUrl: '',
    image: null,
    description: {
      fr: 'Formation en ligne consacrée au développement web front-end et back-end, qui complète ma formation à EIG Bénin.',
      en: 'Online course covering front-end and back-end web development, complementing my training at EIG Bénin.',
    },
    skills: [{ fr: 'Développement full stack', en: 'Full stack development' }],
  },
  {
    title: { fr: 'Atelier Numérique : Marketing numérique', en: 'Digital Skills for Africa: Digital Marketing' },
    organization: 'Google',
    date: '2023',
    credentialId: '',
    credentialUrl: '',
    image: null,
    description: {
      fr: 'Programme de Google pour l’Afrique sur les fondamentaux du marketing numérique. Il m’aide à concevoir des sites pensés pour être trouvés et pour convertir.',
      en: 'Google’s programme for Africa on digital marketing fundamentals. It helps me build sites designed to be found and to convert.',
    },
    skills: [
      { fr: 'Marketing numérique', en: 'Digital marketing' },
      { fr: 'Présence en ligne', en: 'Online presence' },
    ],
  },
  {
    title: { fr: 'Emailing', en: 'Email marketing' },
    organization: 'Sendinblue Academy (Brevo)',
    date: '2023',
    credentialId: '',
    credentialUrl: '',
    image: null,
    description: {
      fr: 'Formation à l’emailing sur la plateforme Brevo, que j’utilise aussi pour les emails transactionnels de mes applications.',
      en: 'Email marketing training on the Brevo platform, which I also use for the transactional emails of my applications.',
    },
    skills: [
      { fr: 'Campagnes emailing', en: 'Email campaigns' },
      { fr: 'Brevo', en: 'Brevo' },
    ],
  },
  {
    title: { fr: 'Formation en informatique', en: 'Computer training' },
    organization: '',
    date: '2020',
    credentialId: '',
    credentialUrl: '',
    image: null,
    description: null,
    skills: [],
  },
]
