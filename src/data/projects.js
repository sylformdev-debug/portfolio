import credixaCover from '../assets/projects/credixa.webp'
import autocostCover from '../assets/projects/autocost.webp'
import autocostSimulator from '../assets/projects/autocost-simulateur.webp'
import hotelSeguroCover from '../assets/projects/hotel-seguro.webp'
import hotelSeguroExperiences from '../assets/projects/hotel-seguro-experiences.webp'
import dropcreaCover from '../assets/projects/dropcrea.webp'
import globalImmigrationCover from '../assets/projects/global-immigration.webp'

/*
  PROJETS

  Ajouter un projet : copiez un objet et modifiez-le. Seuls slug, title, categories, summary et stack sont nécessaires :
  toutes les autres rubriques ne s'affichent que si elles sont remplies.

  - slug        : identifiant dans l'adresse (/projects/mon-projet), en minuscules et sans accents
  - draft: true : projet masqué du site tant que ses informations ne sont pas complètes
  - featured    : true pour l'afficher sur la page d'accueil
  - categories  : utilisées par les filtres (frontend, backend, fullstack, ecommerce, api, webapp)
  - image       : capture principale. Placez-la dans src/assets/projects/ puis importez-la en haut du fichier :
                    import credixaCover from '../assets/projects/credixa.webp'
                  et écrivez image: credixaCover
  - gallery     : autres captures, au même format [credixaDashboard, credixaAdmin]
  - links       : github et demo ; un bouton n'apparaît que si le lien est rempli

  Les textes { fr, en } sont affichés selon la langue choisie.
*/

export const projects = [
  {
    slug: 'credixa',
    title: 'Credixa',
    featured: true,
    categories: ['fullstack', 'webapp', 'api'],
    type: { fr: 'Plateforme de prêt en ligne', en: 'Online lending platform' },
    status: { fr: 'Presque prête pour le déploiement', en: 'Nearly ready for deployment' },
    summary: {
      fr: 'Une plateforme de prêt en ligne où l’emprunteur dépose sa demande, transmet ses documents en sécurité et suit son dossier.',
      en: 'An online lending platform where borrowers submit their application, upload documents securely and track their file.',
    },
    challenge: {
      fr: 'Demander un prêt implique de transmettre des pièces sensibles et de suivre un dossier sur plusieurs étapes. Le parcours doit rester simple pour l’emprunteur, avec un niveau de sécurité de production.',
      en: 'Applying for a loan means sending sensitive documents and following a file through several steps. The journey has to stay simple for the borrower, with production-grade security.',
    },
    solution: {
      fr: 'Une application React (Vite) qui gère son état avec Redux Toolkit et ses échanges serveur avec React Query, reliée à une API Node.js / Express et à une base MongoDB. L’authentification repose sur des jetons JWT, renforcée par une double authentification et une connexion Google.',
      en: 'A React (Vite) application that manages state with Redux Toolkit and server data with React Query, connected to a Node.js / Express API and a MongoDB database. Authentication relies on JWT, reinforced by two-factor authentication and Google sign-in.',
    },
    features: [
      {
        fr: 'Authentification JWT avec double authentification (TOTP et email) et connexion Google OAuth',
        en: 'JWT authentication with two-factor authentication (TOTP and email) and Google OAuth sign-in',
      },
      { fr: 'Détection de fraude par score', en: 'Score-based fraud detection' },
      {
        fr: 'Dépôt et téléchargement de documents protégés par authentification',
        en: 'Document upload and download protected by authentication',
      },
      { fr: 'Journal d’audit côté administrateur', en: 'Admin-side audit log' },
      { fr: 'Programme de parrainage', en: 'Referral programme' },
      { fr: 'Interface en 8 langues, installable en PWA', en: 'Interface in 8 languages, installable as a PWA' },
    ],
    architecture: {
      fr: 'Interface React / Vite (Redux Toolkit, React Query, Tailwind CSS) qui consomme une API REST Node.js / Express. Les données sont stockées dans MongoDB, les accès sont contrôlés par jetons JWT.',
      en: 'A React / Vite interface (Redux Toolkit, React Query, Tailwind CSS) consuming a Node.js / Express REST API. Data is stored in MongoDB and access is controlled with JWT.',
    },
    result: {
      fr: 'Application quasiment prête pour la production : la vérification de l’envoi d’emails par le SMTP de Brevo reste à confirmer avant la mise en ligne.',
      en: 'Nearly production-ready: email delivery through Brevo’s SMTP still needs to be confirmed before going live.',
    },
    stack: ['React', 'Vite', 'Redux Toolkit', 'React Query', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    image: credixaCover,
    gallery: [],
    links: { github: '', demo: '' },
  },
  {
    slug: 'rouage',
    title: 'Rouage',
    featured: true,
    categories: ['fullstack', 'ecommerce', 'backend'],
    type: { fr: 'Boutique de vélos en ligne', en: 'Online bike shop' },
    status: { fr: 'Fonctionnel en local', en: 'Running locally' },
    summary: {
      fr: 'Un site e-commerce Laravel pour une boutique de vélos au Bénin, du catalogue jusqu’au paiement Mobile Money.',
      en: 'A Laravel e-commerce site for a bike shop in Benin, from the catalogue to Mobile Money payment.',
    },
    challenge: {
      fr: 'Vendre des vélos en ligne au Bénin demande un parcours d’achat complet : livraison par zones, codes promo, paiement adapté aux usages locaux, et un back office pour gérer la boutique.',
      en: 'Selling bikes online in Benin requires a complete purchase journey: zone-based delivery, promo codes, payment suited to local habits, and a back office to run the shop.',
    },
    solution: {
      fr: 'Une application Laravel 9 avec MySQL : catalogue, panier et checkout côté client, back office complet côté administrateur, et emails transactionnels envoyés par le SMTP de Brevo.',
      en: 'A Laravel 9 application with MySQL: catalogue, cart and checkout for customers, a full back office for administrators, and transactional emails sent through Brevo’s SMTP.',
    },
    features: [
      { fr: 'Catalogue de produits', en: 'Product catalogue' },
      {
        fr: 'Panier et checkout avec zones de livraison et codes promo',
        en: 'Cart and checkout with delivery zones and promo codes',
      },
      { fr: 'Paiement Mobile Money déclaratif', en: 'Declarative Mobile Money payment' },
      { fr: 'Espace client', en: 'Customer account area' },
      { fr: 'Back office administrateur complet', en: 'Full admin back office' },
      { fr: 'Emails transactionnels', en: 'Transactional emails' },
      { fr: 'Bases du référencement (SEO)', en: 'SEO fundamentals' },
    ],
    result: {
      fr: 'Le site tourne en local (XAMPP) et l’envoi d’emails de production par le SMTP de Brevo a été configuré et testé avec succès.',
      en: 'The site runs locally (XAMPP), and production email delivery through Brevo’s SMTP has been configured and successfully tested.',
    },
    stack: ['Laravel 9', 'PHP', 'MySQL', 'Brevo SMTP'],
    image: null,
    gallery: [],
    links: { github: '', demo: '' },
  },
  {
    slug: 'autocost',
    title: 'AutoCost',
    featured: true,
    categories: ['frontend', 'api', 'webapp'],
    type: { fr: 'Comparateur de coût total de possession', en: 'Total cost of ownership comparator' },
    status: { fr: 'Terminé et déployé', en: 'Completed and deployed' },
    summary: {
      fr: 'Un outil qui compare ce que coûtent réellement plusieurs véhicules dans le temps : achat, entretien et carburant.',
      en: 'A tool that compares what several vehicles really cost over time: purchase, maintenance and fuel.',
    },
    challenge: {
      fr: 'Le prix d’achat ne dit pas combien un véhicule coûte vraiment. Pour comparer, il faut additionner achat, entretien et carburant sur plusieurs années.',
      en: 'The purchase price does not tell you what a vehicle really costs. A fair comparison adds up purchase, maintenance and fuel over several years.',
    },
    solution: {
      fr: 'Une application React (Vite) qui simule et compare plusieurs véhicules à partir de données structurées, avec des graphiques. L’environnement de démonstration est isolé de l’API réelle (CarAPI) : aucune donnée fictive ne se retrouve dans les résultats.',
      en: 'A React (Vite) application that simulates and compares several vehicles from structured data, with charts. The demo environment is isolated from the real API (CarAPI), so no mock data ever ends up in the results.',
    },
    features: [
      { fr: 'Simulation et comparaison de plusieurs véhicules', en: 'Simulation and comparison of several vehicles' },
      { fr: 'Graphiques d’évolution des coûts', en: 'Cost evolution charts' },
      {
        fr: 'Données de démonstration séparées de l’API réelle CarAPI',
        en: 'Demo data kept separate from the real CarAPI',
      },
    ],
    result: {
      fr: 'Projet académique terminé, présenté et déployé.',
      en: 'Academic project, completed, presented and deployed.',
    },
    stack: ['React', 'Vite', 'Recharts / Chart.js', 'Lucide', 'CarAPI', 'Vercel'],
    image: autocostCover,
    gallery: [autocostSimulator],
    links: { github: '', demo: '' },
  },
  {
    slug: 'hotel-seguro',
    title: 'Hôtel Seguro',
    featured: false,
    categories: ['fullstack', 'webapp'],
    date: '2025',
    type: { fr: 'Site hôtelier avec réservation', en: 'Hotel website with booking' },
    status: { fr: 'Réalisé au hackathon EIG 2025', en: 'Built at the EIG 2025 hackathon' },
    summary: {
      fr: 'Le site d’un hôtel de nature haut de gamme : chambres, services, expériences et réservation en ligne, avec un espace d’administration.',
      en: 'The website of an upscale nature hotel: rooms, services, experiences and online booking, with an admin area.',
    },
    challenge: {
      fr: 'Traduire en ligne le luxe et la nature de l’établissement, tout en permettant aux visiteurs de découvrir l’hôtel et de réserver facilement, sur tous les écrans.',
      en: 'Convey the hotel’s luxury and natural setting online, while letting visitors explore the property and book easily on any screen.',
    },
    solution: {
      fr: 'Une interface immersive en HTML, CSS (avec Tailwind CSS pour certains éléments) et JavaScript, reliée à un back-end PHP et MySQL qui stocke les utilisateurs, les chambres et les réservations.',
      en: 'An immersive interface in HTML, CSS (with Tailwind CSS for some components) and JavaScript, backed by PHP and MySQL storing users, rooms and bookings.',
    },
    features: [
      {
        fr: 'Page d’accueil immersive, animations au défilement et effets glassmorphism',
        en: 'Immersive home page, scroll animations and glassmorphism effects',
      },
      { fr: 'Présentation des chambres et suites', en: 'Rooms and suites showcase' },
      { fr: 'Services, expériences et galerie photos', en: 'Services, experiences and photo gallery' },
      { fr: 'Témoignages clients', en: 'Guest testimonials' },
      { fr: 'Formulaire de réservation', en: 'Booking form' },
      { fr: 'Gestion des clients et des réservations', en: 'Guest and booking management' },
      { fr: 'Espace administrateur pour gérer le site', en: 'Admin area to manage the site' },
      {
        fr: 'Page contact avec coordonnées et localisation',
        en: 'Contact page with details and location',
      },
    ],
    result: {
      fr: 'Projet conçu et présenté lors du hackathon EIG 2025.',
      en: 'Designed and presented during the EIG 2025 hackathon.',
    },
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'PHP', 'MySQL'],
    image: hotelSeguroCover,
    gallery: [hotelSeguroExperiences],
    links: { github: '', demo: '' },
  },
  {
    slug: 'splitmate',
    title: 'SplitMate',
    featured: false,
    categories: ['frontend', 'webapp'],
    type: { fr: 'Gestion de dépenses partagées', en: 'Shared expense management' },
    status: { fr: 'Front-end terminé', en: 'Front-end complete' },
    summary: {
      fr: 'Une application pour suivre et équilibrer les dépenses d’un groupe : qui a payé quoi, et qui doit combien.',
      en: 'An app to track and balance a group’s expenses: who paid for what, and who owes how much.',
    },
    challenge: {
      fr: 'Dans un groupe (colocation, voyage, association), les dépenses s’accumulent et les comptes deviennent vite flous.',
      en: 'In a group (flatmates, a trip, an association), expenses pile up and the accounts quickly get blurry.',
    },
    solution: {
      fr: 'Une application React (Vite) avec React Router v6 : une page de présentation, puis une application aux routes protégées, avec des styles CSS propres à chaque composant.',
      en: 'A React (Vite) application with React Router v6: a landing page, then an app with protected routes, styled with component-scoped CSS.',
    },
    features: [
      { fr: 'Landing page en 12 sections', en: '12-section landing page' },
      { fr: 'Routes protégées par authentification', en: 'Authentication-protected routes' },
      {
        fr: 'Tableau de bord, groupes, ajout de dépense, soldes, historique et profil',
        en: 'Dashboard, groups, add expense, balances, history and profile pages',
      },
    ],
    result: {
      fr: 'Front-end complet. L’application fonctionne pour l’instant avec des données simulées : le back-end reste à développer.',
      en: 'The front-end is complete. The app currently runs on simulated data: the back-end is still to be built.',
    },
    stack: ['React', 'Vite', 'React Router v6', 'CSS'],
    image: null,
    gallery: [],
    links: { github: '', demo: '' },
  },
  {
    slug: 'dropcrea',
    title: 'DropCrea',
    featured: false,
    categories: ['fullstack', 'ecommerce', 'backend'],
    type: { fr: 'Plateforme SaaS de produits numériques', en: 'SaaS platform for digital products' },
    status: { fr: 'En cours de développement', en: 'In development' },
    summary: {
      fr: 'Une plateforme SaaS pour que les créateurs francophones vendent en ligne leurs ebooks, formations et autres produits numériques, avec paiement en FCFA.',
      en: 'A SaaS platform for French-speaking creators to sell ebooks, courses and other digital products online, with payment in CFA francs.',
    },
    challenge: {
      fr: 'Les créateurs d’Afrique francophone ont peu d’outils pensés pour eux : prix en FCFA, publics locaux, besoin d’une boutique simple à mettre en place.',
      en: 'Creators in French-speaking Africa have few tools built for them: CFA franc pricing, local audiences, and the need for a shop that is simple to set up.',
    },
    solution: {
      fr: 'Une application Laravel (PHP 8.3, MySQL) avec des vues Blade, Tailwind CSS et Alpine.js, construite en phases successives validées une à une.',
      en: 'A Laravel application (PHP 8.3, MySQL) with Blade views, Tailwind CSS and Alpine.js, built in successive phases, each validated before the next.',
    },
    scope: [
      { fr: 'Plusieurs devises : FCFA, EUR, USD et GBP', en: 'Multiple currencies: CFA franc, EUR, USD and GBP' },
      { fr: 'Rémunération par commission sur les ventes', en: 'Commission-based revenue on sales' },
      { fr: 'Développement structuré en 20 phases', en: 'Development structured in 20 phases' },
    ],
    stack: ['Laravel', 'PHP 8.3', 'MySQL', 'Blade', 'Tailwind CSS', 'Alpine.js', 'Vite'],
    image: dropcreaCover,
    gallery: [],
    links: { github: '', demo: '' },
  },
  {
    // Décrit à partir de la capture d'écran : complétez challenge, solution, stack, rôle et liens.
    slug: 'global-immigration',
    title: 'Global Immigration',
    featured: false,
    categories: ['webapp'],
    type: { fr: 'Site d’agence d’immigration', en: 'Immigration agency website' },
    summary: {
      fr: 'Le site d’une agence d’accompagnement à l’immigration : services, pages par pays de destination, actualités, FAQ et contact.',
      en: 'The website of an immigration support agency: services, destination country pages, news, FAQ and contact.',
    },
    features: [
      {
        fr: 'Menu des destinations et page dédiée à chaque pays, comme le Royaume-Uni',
        en: 'Destinations menu and a dedicated page for each country, such as the United Kingdom',
      },
      { fr: 'Présentation de l’agence et de ses services', en: 'Agency and services presentation' },
      { fr: 'Pages actualités, FAQ et contact', en: 'News, FAQ and contact pages' },
      { fr: 'Accès connexion et inscription', en: 'Sign-in and sign-up access' },
    ],
    stack: [],
    image: globalImmigrationCover,
    gallery: [],
    links: { github: '', demo: '' },
  },
]

export const publishedProjects = projects.filter((project) => !project.draft)
export const featuredProjects = publishedProjects.filter((project) => project.featured)

export function findProject(slug) {
  return publishedProjects.find((project) => project.slug === slug)
}

export function getNextProject(slug) {
  const index = publishedProjects.findIndex((project) => project.slug === slug)
  return publishedProjects[(index + 1) % publishedProjects.length]
}
