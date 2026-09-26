# Portfolio — Sylvain Tevoedjre

Portfolio personnel de développeur web, construit avec **React 19**, **Vite**, **Tailwind CSS v4** et **Lucide React**.

## Démarrer

```bash
npm install
npm run dev       # serveur de développement : http://localhost:5173
npm run build     # version de production dans dist/
npm run preview   # tester la version de production en local
npm run lint      # vérifier le code
```

Node.js 20 ou plus récent est recommandé.

## Modifier le contenu

Tout le texte se trouve dans `src/data/`. Vous n'avez normalement pas besoin de toucher aux composants.

| Fichier | Contenu |
| --- | --- |
| `profile.js` | Nom, phrase d'accroche, email, WhatsApp, liens GitHub / LinkedIn, texte « À propos » |
| `skills.js` | Compétences par catégorie (nom, icône, description, usage) |
| `projects.js` | Projets : études de cas (`featured: true`) et liste « Autres projets » |
| `experience.js` | Formation et expérience de la timeline « Parcours » |
| `services.js` | Services proposés |
| `navigation.js` | Liens du menu |
| `socials.js` | Réseaux affichés dans Contact et le footer |

### Ajouter un projet

1. Placez la capture dans `src/assets/projects/` (format `.webp` conseillé, 1280 × 800 px, moins de 200 Ko).
2. Dans `src/data/projects.js`, importez-la en haut du fichier :
   ```js
   import dropcreaImage from '../assets/projects/dropcrea.webp'
   ```
3. Copiez un objet projet existant, changez les valeurs et écrivez `image: dropcreaImage`.
4. Renseignez `links.github` et `links.demo`. Un bouton n'apparaît que si son lien est rempli.

Les descriptions marquées `// À vérifier` ont été rédigées d'après le nom du projet : remplacez-les par la réalité.

### Changer les couleurs ou les polices

Les couleurs et les polices sont déclarées une seule fois, dans le bloc `@theme` de `src/index.css`.
Les polices (Instrument Serif et Manrope) sont hébergées avec le site via Fontsource : aucune requête vers Google.

## Formulaire de contact

Le formulaire valide les champs dans le navigateur (`src/utils/validateContact.js`) et contient un champ piège invisible contre les robots.

- **Sans configuration** : le bouton ouvre la messagerie du visiteur avec le message déjà rédigé.
- **Envoi direct** : renseignez `VITE_CONTACT_ENDPOINT` dans `.env` avec l'URL d'un service de formulaires
  (par exemple un formulaire Formspree : `https://formspree.io/f/xxxxxx`) ou d'une route de votre API Laravel.
  Le service reçoit un `POST` JSON `{ name, email, subject, message }`. La logique est dans `src/services/contactService.js`.

Ne placez jamais de clé secrète dans une variable `VITE_` : elle serait visible par tous les visiteurs.

## Variables d'environnement

Copiez `.env.example` en `.env` et complétez :

- `VITE_SITE_URL` : adresse publique du site, sans `/` final. Sert à l'URL canonique et à l'aperçu Open Graph (LinkedIn, WhatsApp).
- `VITE_CONTACT_ENDPOINT` : optionnel, voir ci-dessus.

Sur Vercel ou Netlify, ajoutez ces mêmes variables dans les réglages du projet.

## Déployer

**Vercel** : importez le dépôt GitHub, framework « Vite », puis ajoutez les variables d'environnement. `vercel.json` gère le cache des fichiers.

**Netlify** : importez le dépôt ; `netlify.toml` indique déjà la commande (`npm run build`) et le dossier (`dist`).

Le site tient sur une seule page ; la navigation utilise des ancres (`/#projets`, `/#contact`), aucune règle de redirection n'est nécessaire.

## Structure

```
public/            favicon, image de partage (og-image.png), robots.txt, manifeste
src/
├── assets/projects/   captures des projets
├── components/        sections de la page (Navbar, Hero, About, Skills, Projects, Experience, Services, Contact, Footer)
│   ├── projects/      étude de cas, visuel et liens d'un projet
│   ├── ui/            éléments réutilisables (Section, Button, Reveal, FormField)
│   └── icons/         icônes GitHub, LinkedIn, WhatsApp
├── data/              contenu modifiable
├── hooks/             useReveal (apparition au défilement), useActiveSection (menu actif)
├── pages/Home.jsx     assemblage des sections
├── services/          envoi du formulaire
├── utils/             validation du formulaire
├── App.jsx
├── main.jsx
└── index.css          thème, couleurs, animations
```

## Accessibilité et performance

- Lien « Aller au contenu », titres H1 → H2 → H3 dans l'ordre, focus clavier visible en or.
- Menu mobile fermable avec Échap, défilement bloqué pendant l'ouverture.
- Animations désactivées si le visiteur a choisi de réduire les animations dans son système.
- Une seule dépendance d'interface (Lucide), polices locales, images chargées à la demande (`loading="lazy"`).
