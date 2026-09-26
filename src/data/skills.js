import {
  Atom,
  Braces,
  Cable,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Layers,
  Palette,
  PenTool,
  Server,
  Smartphone,
  Webhook,
  Wind,
} from 'lucide-react'
import { GithubIcon } from '../components/icons/BrandIcons'

// Pas de pourcentages : chaque compétence indique à quoi elle sert concrètement (champ « usage »).
export const skillGroups = [
  {
    id: 'front-end',
    title: 'Front-end',
    summary: 'Ce que l’utilisateur voit et manipule.',
    skills: [
      {
        name: 'HTML',
        icon: FileCode2,
        description: 'Structure sémantique, formulaires, balisage pensé pour l’accessibilité et le référencement.',
        usage: 'Tous les projets',
      },
      {
        name: 'CSS',
        icon: Palette,
        description: 'Mises en page Flexbox et Grid, variables, pseudo-éléments, transitions.',
        usage: 'Intégration de maquettes',
      },
      {
        name: 'JavaScript',
        icon: Braces,
        description: 'Manipulation du DOM, événements, logique asynchrone, modules ES.',
        usage: 'Interactivité et appels d’API',
      },
      {
        name: 'React.js',
        icon: Atom,
        description: 'Composants réutilisables, state, hooks, données séparées de l’affichage.',
        usage: 'Interfaces et applications',
      },
      {
        name: 'Tailwind CSS',
        icon: Wind,
        description: 'Construction rapide d’interfaces cohérentes à partir d’un thème défini.',
        usage: 'Ce portfolio, DropCrea',
      },
      {
        name: 'Responsive Design',
        icon: Smartphone,
        description: 'Interfaces conçues d’abord pour le mobile, puis élargies aux grands écrans.',
        usage: 'Tous les projets',
      },
    ],
  },
  {
    id: 'back-end',
    title: 'Back-end',
    summary: 'Les données, la logique métier et la sécurité.',
    skills: [
      {
        name: 'PHP',
        icon: Server,
        description: 'Programmation orientée objet, traitement de formulaires, sessions.',
        usage: 'Applications serveur',
      },
      {
        name: 'Laravel',
        icon: Layers,
        description: 'Routes, contrôleurs, Eloquent, migrations, authentification, vues Blade.',
        usage: 'DropCrea',
      },
      {
        name: 'MySQL',
        icon: Database,
        description: 'Modélisation de bases relationnelles, requêtes, jointures et index.',
        usage: 'Stockage des données applicatives',
      },
      {
        name: 'API REST',
        icon: Webhook,
        description: 'Conception d’endpoints clairs, codes HTTP adaptés, réponses JSON.',
        usage: 'Échanges front-end et back-end',
      },
    ],
  },
  {
    id: 'outils',
    title: 'Outils',
    summary: 'Ce qui rend le travail fiable et partageable.',
    skills: [
      {
        name: 'Git',
        icon: GitBranch,
        description: 'Commits lisibles, branches, historique propre.',
        usage: 'Versionnement quotidien',
      },
      {
        name: 'GitHub',
        icon: GithubIcon,
        description: 'Hébergement du code, publication et suivi des projets.',
        usage: 'Dépôts publics',
      },
      {
        name: 'VS Code',
        icon: Code2,
        description: 'Éditeur principal, extensions de formatage et de débogage.',
        usage: 'Environnement de travail',
      },
      {
        name: 'API / Fetch / Axios',
        icon: Cable,
        description: 'Consommation d’API externes, gestion des erreurs et des états de chargement.',
        usage: 'Données dynamiques',
      },
      {
        name: 'Figma',
        icon: PenTool,
        description: 'Lecture et intégration de maquettes, prototypes simples.',
        usage: 'Selon le projet',
      },
    ],
  },
]
