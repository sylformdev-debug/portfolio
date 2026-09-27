import udemyPreview from '../assets/certifications/udemy.webp'
import googlePreview from '../assets/certifications/google.webp'
import brevoPreview from '../assets/certifications/brevo.webp'

/*
  CERTIFICATIONS, de la plus récente à la plus ancienne.

  {
    title, organization,
    issued        : date au format AAAA-MM-JJ (ou seulement AAAA si le jour est inconnu)
    duration      : durée de la formation (facultatif)
    credentialId  : identifiant du certificat (facultatif)
    credentialUrl : lien de vérification officiel (facultatif, bouton « Vérifier »)
    documentUrl   : PDF du certificat placé dans public/certificates/ (facultatif, bouton « Voir le certificat »)
    image         : aperçu importé depuis src/assets/certifications/ (facultatif)
    description, skills
  }
*/

export const certifications = [
  {
    title: { fr: 'Formation Complète Développeur Web', en: 'Complete Web Developer Course' },
    organization: 'Udemy',
    issued: '2026-09-19',
    duration: { fr: '38 heures', en: '38 hours' },
    credentialId: 'UC-62d5c996-deb8-43ac-8702-6b383245c319',
    credentialUrl: 'https://ude.my/UC-62d5c996-deb8-43ac-8702-6b383245c319',
    documentUrl: '/certificates/udemy-formation-complete-developpeur-web.pdf',
    image: udemyPreview,
    description: {
      fr: 'Certificat de fin de formation de 38 heures, dispensée par John Taieb (Codeur) et Apprendre à Coder. Il complète ma formation professionnelle en développement web à EIG Bénin.',
      en: 'Certificate of completion for a 38-hour course taught by John Taieb (Codeur) and Apprendre à Coder. It complements my professional web development training at EIG Bénin.',
    },
    skills: [{ fr: 'Développement web', en: 'Web development' }],
  },
  {
    title: { fr: 'Certificat Emailing', en: 'Email Marketing Certificate' },
    organization: 'Sendinblue Academy (Brevo)',
    issued: '2023-03-29',
    credentialId: '6423d89254b33484d5000183',
    credentialUrl: '',
    documentUrl: '/certificates/sendinblue-academy-emailing.pdf',
    image: brevoPreview,
    description: {
      fr: 'Principes de l’email marketing, optimisation des taux d’ouverture, de clics et de conversions, RGPD et obligations légales, segmentation, personnalisation et tests A/B. J’utilise aujourd’hui Brevo pour les emails transactionnels de mes applications.',
      en: 'Email marketing principles, optimising open, click and conversion rates, GDPR and legal obligations, segmentation, personalisation and A/B testing. I now use Brevo for the transactional emails of my applications.',
    },
    skills: [
      { fr: 'Email marketing', en: 'Email marketing' },
      { fr: 'RGPD', en: 'GDPR' },
      { fr: 'Segmentation', en: 'Segmentation' },
      { fr: 'Tests A/B', en: 'A/B testing' },
    ],
  },
  {
    title: { fr: 'Fondamentaux du marketing numérique', en: 'Fundamentals of Digital Marketing' },
    organization: { fr: 'Google, L’Atelier numérique africain', en: 'Google, Digital Skills for Africa' },
    issued: '2023-03-21',
    credentialId: 'HC7 5LJ LQC',
    credentialUrl: 'https://learndigital.withgoogle.com/link/1ntbg5hvegw',
    documentUrl: '/certificates/google-fondamentaux-marketing-numerique.pdf',
    image: googlePreview,
    description: {
      fr: 'Certificat de réussite à l’examen « Fondamentaux du marketing numérique » du programme de Google pour l’Afrique, reconnu par l’IAB Europe et The Open University.',
      en: 'Certificate of success in the “Fundamentals of Digital Marketing” exam from Google’s programme for Africa, endorsed by IAB Europe and The Open University.',
    },
    skills: [{ fr: 'Marketing numérique', en: 'Digital marketing' }],
  },
  {
    title: { fr: 'Formation en informatique', en: 'Computer training' },
    organization: '',
    issued: '2020',
    image: null,
    description: null,
    skills: [],
  },
]
