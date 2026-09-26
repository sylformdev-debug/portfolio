/*
  Ajouter un projet : copiez un objet ci-dessous et modifiez ses valeurs.

  - featured: true  → présenté en étude de cas détaillée
  - featured: false → présenté dans la liste « Autres projets »
  - image : importez une capture depuis src/assets/projects/ (ex. import dropcrea from '../assets/projects/dropcrea.webp')
            puis écrivez image: dropcrea. Laissez null tant qu'aucune capture n'existe.
  - links.github / links.demo : laissez une chaîne vide si le lien n'existe pas encore.
    Le bouton n'est affiché que si l'adresse est renseignée.

  Les textes marqués « À vérifier » ont été rédigés à partir du nom du projet :
  remplacez-les par la description exacte.
*/

export const projects = [
  {
    slug: 'dropcrea',
    title: 'DropCrea',
    category: 'Plateforme SaaS',
    status: 'En développement',
    featured: true,
    summary:
      'Une plateforme qui permet aux créateurs de vendre leurs produits numériques : ebooks, formations, templates, presets, fichiers audio et vidéo, logiciels ou services.',
    context:
      'Les créateurs d’Afrique francophone ont peu d’outils pensés pour eux : prix en FCFA, publics locaux, besoin d’une boutique simple à mettre en place. DropCrea part de ce constat, avec un modèle à la commission plutôt qu’un abonnement.',
    role: 'Conception produit, modélisation des données et développement complet.',
    features: [
      'Boutique personnelle pour chaque créateur',
      'Catalogue de produits numériques de plusieurs types',
      'Prix en FCFA, EUR, USD et GBP',
      'Rémunération de la plateforme par commission sur les ventes',
    ],
    stack: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Tailwind CSS', 'Alpine.js'],
    image: null,
    links: { github: '', demo: '' },
  },
  {
    slug: 'global-immigration',
    title: 'Global Immigration',
    category: 'Site web',
    status: '',
    featured: true,
    // À vérifier
    summary:
      'Un site pour un service d’accompagnement en immigration : présentation des démarches, des destinations et prise de contact.',
    context:
      'Les démarches d’immigration sont longues et mal expliquées. Le site doit rassurer, orienter le visiteur vers la bonne démarche et faciliter le premier contact.',
    role: 'Intégration et développement front-end.',
    features: [
      'Présentation claire des services et des démarches',
      'Parcours orienté vers la prise de contact',
      'Mise en page responsive',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: null,
    links: { github: '', demo: '' },
  },
  {
    slug: 'hotel-seguro',
    title: 'Hôtel Seguro',
    category: 'Site vitrine',
    status: '',
    featured: true,
    // À vérifier
    summary:
      'Le site d’un hôtel : chambres, services, galerie et informations pratiques pour préparer un séjour.',
    context:
      'Un visiteur doit trouver en quelques secondes les chambres, les tarifs et le moyen de réserver, y compris depuis un téléphone.',
    role: 'Intégration et développement front-end.',
    features: [
      'Présentation des chambres et des services',
      'Galerie photos',
      'Informations d’accès et de contact',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: null,
    links: { github: '', demo: '' },
  },
  {
    slug: 'splitmate',
    title: 'SplitMate',
    category: 'Application web',
    status: '',
    featured: true,
    // À vérifier
    summary:
      'Une application pour partager des dépenses entre plusieurs personnes et savoir qui doit combien à qui.',
    context:
      'Entre colocataires, amis en voyage ou collègues, les comptes partagés deviennent vite confus. L’application calcule les soldes à la place des participants.',
    role: 'Conception et développement.',
    features: [
      'Création d’un groupe et ajout de dépenses',
      'Calcul automatique des soldes',
      'Récapitulatif des remboursements',
    ],
    stack: ['React.js', 'JavaScript', 'CSS'],
    image: null,
    links: { github: '', demo: '' },
  },
  {
    slug: 'boutique-velos',
    title: 'Boutique de vélos',
    category: 'E-commerce',
    status: '',
    featured: false,
    // À vérifier
    summary: 'Catalogue et panier pour une boutique de vélos.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: null,
    links: { github: '', demo: '' },
  },
  {
    slug: 'plateforme-pret',
    title: 'Plateforme de prêt',
    category: 'Application web',
    status: '',
    featured: false,
    // À vérifier
    summary: 'Demande et suivi de prêts en ligne.',
    stack: ['PHP', 'MySQL'],
    image: null,
    links: { github: '', demo: '' },
  },
  {
    slug: 'simulateur-api',
    title: 'Simulateur API',
    category: 'API',
    status: '',
    featured: false,
    // À vérifier
    summary: 'Simulateur qui consomme une API et affiche les résultats calculés.',
    stack: ['JavaScript', 'Fetch API'],
    image: null,
    links: { github: '', demo: '' },
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const otherProjects = projects.filter((project) => !project.featured)
