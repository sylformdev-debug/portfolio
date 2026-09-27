import {
  Atom,
  Braces,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  LayoutGrid,
  Layers,
  Server,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Webhook,
  Wind,
  Workflow,
  Zap,
} from 'lucide-react'
import { publishedProjects } from './projects'

/*
  Compétences par catégorie. Pas de pourcentages : chaque compétence est reliée aux projets où elle est utilisée.
  - match    : noms de technologies cherchés dans le champ « stack » des projets
  - projects : slugs de projets à associer explicitement
*/
const groups = [
  {
    id: 'frontend',
    title: { fr: 'Frontend', en: 'Frontend' },
    summary: { fr: 'Ce que l’utilisateur voit et manipule.', en: 'What users see and interact with.' },
    skills: [
      {
        name: 'HTML5 & CSS3',
        icon: FileCode2,
        description: {
          fr: 'Balisage sémantique, Flexbox et Grid, animations, intégration fidèle de maquettes.',
          en: 'Semantic markup, Flexbox and Grid, animations, faithful mock-up integration.',
        },
        match: ['HTML5', 'CSS3', 'CSS'],
      },
      {
        name: 'JavaScript',
        icon: Braces,
        description: {
          fr: 'DOM, événements, logique asynchrone, appels d’API avec fetch.',
          en: 'DOM, events, asynchronous logic, API calls with fetch.',
        },
        match: ['JavaScript'],
      },
      {
        name: 'React.js',
        icon: Atom,
        description: {
          fr: 'Composants réutilisables, hooks, routes protégées, applications avec Vite.',
          en: 'Reusable components, hooks, protected routes, Vite-based apps.',
        },
        match: ['React'],
      },
      {
        name: 'Redux Toolkit, React Query, React Router',
        icon: Workflow,
        description: {
          fr: 'État global, cache des données serveur et navigation entre pages.',
          en: 'Global state, server data caching and page routing.',
        },
        match: ['Redux Toolkit', 'React Query', 'React Router v6'],
      },
      {
        name: 'Tailwind CSS',
        icon: Wind,
        description: {
          fr: 'Interfaces cohérentes construites à partir d’un thème, y compris ce portfolio.',
          en: 'Consistent interfaces built from a theme, this portfolio included.',
        },
        match: ['Tailwind CSS'],
      },
      {
        name: 'Bootstrap & jQuery',
        icon: LayoutGrid,
        description: {
          fr: 'Mises en page rapides et interactions sur des sites existants.',
          en: 'Quick layouts and interactions on existing sites.',
        },
        match: ['Bootstrap', 'jQuery'],
      },
      {
        name: 'WordPress',
        icon: Globe,
        description: {
          fr: 'Mise en place et personnalisation de sites vitrines.',
          en: 'Setting up and customising showcase websites.',
        },
        match: ['WordPress'],
      },
      {
        name: 'Responsive design',
        icon: Smartphone,
        description: {
          fr: 'Interfaces pensées d’abord pour le mobile, puis élargies aux grands écrans.',
          en: 'Mobile-first interfaces, then scaled up to large screens.',
        },
        projects: ['hotel-seguro', 'rouage', 'credixa'],
      },
    ],
  },
  {
    id: 'backend',
    title: { fr: 'Backend', en: 'Backend' },
    summary: { fr: 'La logique métier, les API et la sécurité.', en: 'Business logic, APIs and security.' },
    skills: [
      {
        name: 'PHP',
        icon: Server,
        description: {
          fr: 'Programmation orientée objet, traitement de formulaires, sessions.',
          en: 'Object-oriented programming, form handling, sessions.',
        },
        match: ['PHP', 'PHP 8.3'],
      },
      {
        name: 'Laravel',
        icon: Layers,
        description: {
          fr: 'Routes, contrôleurs, Eloquent, migrations, Blade, emails transactionnels.',
          en: 'Routes, controllers, Eloquent, migrations, Blade, transactional emails.',
        },
        match: ['Laravel', 'Laravel 9'],
      },
      {
        name: 'Node.js & Express',
        icon: ServerCog,
        description: {
          fr: 'API REST, middlewares, gestion des fichiers envoyés.',
          en: 'REST APIs, middleware, uploaded file handling.',
        },
        match: ['Node.js', 'Express'],
      },
      {
        name: 'API REST',
        icon: Webhook,
        description: {
          fr: 'Conception d’API et consommation d’API externes.',
          en: 'Designing APIs and consuming third-party ones.',
        },
        projects: ['credixa', 'autocost'],
      },
      {
        name: { fr: 'Authentification', en: 'Authentication' },
        icon: ShieldCheck,
        description: {
          fr: 'JWT, double authentification TOTP et email, connexion Google OAuth.',
          en: 'JWT, TOTP and email two-factor authentication, Google OAuth sign-in.',
        },
        match: ['JWT'],
      },
    ],
  },
  {
    id: 'data',
    title: { fr: 'Bases de données', en: 'Databases' },
    summary: { fr: 'Stocker et interroger les données.', en: 'Storing and querying data.' },
    skills: [
      {
        name: 'MySQL / SQL',
        icon: Database,
        description: {
          fr: 'Modélisation relationnelle, requêtes, jointures, migrations Laravel.',
          en: 'Relational modelling, queries, joins, Laravel migrations.',
        },
        match: ['MySQL'],
      },
      {
        name: 'MongoDB',
        icon: Database,
        description: {
          fr: 'Base orientée documents pour une API Node.js.',
          en: 'Document database behind a Node.js API.',
        },
        match: ['MongoDB'],
      },
    ],
  },
  {
    id: 'tools',
    title: { fr: 'Outils', en: 'Tools' },
    summary: { fr: 'Ce qui rend le travail fiable et partageable.', en: 'What makes the work reliable and shareable.' },
    skills: [
      {
        name: 'Git & GitHub',
        icon: GitBranch,
        description: {
          fr: 'Versionnement, branches, publication du code.',
          en: 'Version control, branches, publishing code.',
        },
      },
      {
        name: 'Vite',
        icon: Zap,
        description: {
          fr: 'Environnement de développement et build des applications React.',
          en: 'Dev server and production builds for React apps.',
        },
        match: ['Vite'],
      },
      {
        name: 'VS Code & XAMPP',
        icon: Code2,
        description: {
          fr: 'Éditeur principal et serveur local PHP / MySQL.',
          en: 'Main editor and local PHP / MySQL server.',
        },
      },
    ],
  },
]

function relatedProjects(skill) {
  const names = (skill.match ?? []).map((name) => name.toLowerCase())
  return publishedProjects.filter(
    (project) =>
      skill.projects?.includes(project.slug) || project.stack.some((tech) => names.includes(tech.toLowerCase())),
  )
}

export const skillGroups = groups.map((group) => ({
  ...group,
  skills: group.skills.map((skill) => ({ ...skill, relatedProjects: relatedProjects(skill) })),
}))
