# Portfolio — Sylvain Tevoedjre

Portfolio de développeur web full stack : **React 19**, **Vite**, **React Router**, **Tailwind CSS v4**, **Lucide React**.

Thème sombre et clair, français et anglais, page Projets avec filtres, étude de cas pour chaque projet avec visionneuse de captures, certifications vérifiables, recherche rapide (Ctrl + K), formulaire de contact validé.

**Mise en ligne : voir [DEPLOIEMENT.md](DEPLOIEMENT.md).**

## Démarrer

```bash
npm install
npm run dev       # développement : http://localhost:5173
npm run build     # version de production dans dist/ (+ pré-rendu des pages et sitemap)
npm run preview   # tester la version de production : http://localhost:4173
npm run lint      # vérifier le code
```

Node.js 20 ou plus récent est recommandé.

## Pages

| Adresse | Contenu |
| --- | --- |
| `/` | Accueil : Hero, À propos, Compétences, Projets mis en avant, Parcours, Certifications, Services, Contact |
| `/projects` | Tous les projets, avec filtres (`/projects?filtre=api`) |
| `/projects/:slug` | Étude de cas d'un projet (ex. `/projects/credixa`) |
| toute autre adresse | Page 404 |

## Modifier le contenu

Le contenu est séparé de l'affichage : vous n'avez normalement pas besoin de toucher aux composants.

| Fichier | Contenu |
| --- | --- |
| `src/data/profile.js` | Nom, titre, contacts, CV, texte « À propos », technologies du Hero |
| `src/data/projects.js` | Projets et études de cas |
| `src/data/skills.js` | Compétences par catégorie, reliées automatiquement aux projets |
| `src/data/experience.js` | Parcours : expérience et formation |
| `src/data/certifications.js` | Certifications |
| `src/data/services.js` | Services |
| `src/locales/fr.js`, `en.js` | Textes de l'interface (menus, boutons, messages d'erreur…) |

### Textes bilingues

Dans `src/data/`, chaque texte traduisible s'écrit ainsi :

```js
summary: { fr: 'Texte en français', en: 'Text in English' }
```

Une chaîne simple (`'React'`) est affichée telle quelle dans les deux langues.
Les textes d'interface sont appelés dans les composants avec `t('nav.projects')`, le contenu avec `l(project.summary)`.

### Ajouter un projet

1. Copiez un objet dans `src/data/projects.js`. Seuls `slug`, `title`, `categories`, `summary` et `stack` sont obligatoires.
   Les rubriques vides (rôle, architecture, défis techniques, galerie…) ne s'affichent pas.
2. **Captures** : placez les images dans `src/assets/projects/` (`.webp` conseillé, 1600 px de large, moins de 250 Ko), puis :
   ```js
   import credixaCover from '../assets/projects/credixa-cover.webp'
   import credixaAdmin from '../assets/projects/credixa-admin.webp'
   // …
   image: credixaCover,
   gallery: [credixaAdmin],
   ```
   Sans image, une couverture est générée automatiquement à partir du nom et des technologies du projet.
   Image de partage (facultative) : `public/og/<slug>.jpg`, 1200 × 630 px.
3. **Liens** : `links.github` et `links.demo`. Un bouton n'apparaît que si le lien est rempli.
4. `featured: true` affiche le projet sur l'accueil ; `draft: true` le masque du site.

### Catégories des filtres

`frontend`, `backend`, `fullstack`, `ecommerce`, `api`, `webapp`. Un filtre sans projet n'est pas affiché.

### CV

Remplacez `public/cv/CV_TEVOEDJRE_Sylvain.pdf` en gardant le même nom (ou modifiez `cvUrl` dans `profile.js`).

## Thème et langue

- Le thème suit la préférence du système à la première visite, puis le choix du visiteur est enregistré (`localStorage`).
- La langue suit celle du navigateur (anglais si le navigateur est en anglais, français sinon), puis le choix est enregistré.
- Couleurs de chaque thème : variables en haut de `src/index.css` (`:root[data-theme="dark"]` et `:root[data-theme="light"]`).
- Ajouter une langue : créer `src/locales/xx.js` avec les mêmes clés, l'ajouter dans `src/locales/index.js`, puis ajouter `xx` aux textes `{ fr, en }`.

## Formulaire de contact

Validation dans le navigateur (`src/utils/validateContact.js`), messages traduits, champ piège invisible contre les robots.
Les erreurs apparaissent au premier envoi, puis se mettent à jour pendant la saisie.

- **Sans configuration** : le bouton ouvre la messagerie du visiteur avec le message déjà rédigé.
- **Envoi direct** : renseignez `VITE_CONTACT_ENDPOINT` dans `.env` (formulaire Formspree, route de votre API Laravel…).
  Le service reçoit un `POST` JSON `{ name, email, subject, message }` — voir `src/services/contactService.js`.

Ne placez jamais de clé secrète dans une variable `VITE_` : elle est visible dans le navigateur.

## Fonctionnalités

- **Recherche rapide** : `Ctrl + K` (ou `⌘ + K`), ou l'icône loupe. Aller à une section ou un projet, changer de thème ou de langue, copier l'email, télécharger le CV.
- **Visionneuse** : sur une étude de cas, un clic sur une capture l'ouvre en plein écran (flèches ← → pour naviguer, Échap pour fermer).
- **Copie de l'email** en un clic dans la section Contact, avec notification.
- **Barre de progression** de lecture et bouton « Revenir en haut ».
- **Pré-rendu SEO** (`scripts/prerender.mjs`) : après le build, chaque page `/projects/...` reçoit son propre titre, sa description et son image de partage (`public/og/<slug>.jpg`), et un `sitemap.xml` est généré.
- **Mesure d'audience** Vercel, sans cookie, activable par variable d'environnement.

## Animations et accessibilité

- Séquence d'apparition au chargement, apparition des sections au défilement, parallaxe légère et relief du visuel du Hero à la souris.
- Boutons en verre (`.btn-glass` dans `src/index.css`), soulignements animés, transitions de page (View Transitions API).
- Curseur personnalisé sur ordinateur uniquement (désactivé au tactile).
- Si le visiteur a demandé de réduire les animations dans son système, elles sont désactivées.
- Lien « Aller au contenu », focus clavier visible, contrastes vérifiés (AA) dans les deux thèmes.

## Variables d'environnement

Copiez `.env.example` en `.env` :

- `VITE_SITE_URL` : adresse publique du site, sans `/` final (URL canonique, aperçu LinkedIn / WhatsApp).
- `VITE_CONTACT_ENDPOINT` : facultatif, voir ci-dessus.
- `VITE_ENABLE_ANALYTICS` : `true` pour activer Vercel Web Analytics.

## Déployer

Le site utilise des routes (`/projects/credixa`) : l'hébergeur doit renvoyer `index.html` pour ces adresses. C'est déjà configuré.

Guide pas à pas : [DEPLOIEMENT.md](DEPLOIEMENT.md). `vercel.json` contient déjà la configuration (routes, cache, en-têtes de sécurité).
Netlify fonctionne aussi grâce à `netlify.toml`.

## Structure

```
public/                 favicon, images de partage (og/), CV, certificats (certificates/)
scripts/prerender.mjs   pré-rendu des pages et sitemap après le build
src/
├── assets/projects/    captures des projets
├── components/
│   ├── home/           sections de l'accueil
│   ├── layout/         Navbar, Footer, curseur, gestion du défilement
│   ├── projects/       couverture, ligne de projet, liens
│   ├── icons/          icônes GitHub, LinkedIn, WhatsApp
│   └── ui/             Button (verre), Section, Reveal, FormField, Tag, PreferenceToggles
├── context/            thème et langue (PreferencesProvider)
├── data/               contenu modifiable
├── hooks/              usePreferences, useReveal, useActiveSection, useHeroMotion, useDocumentTitle
├── locales/            fr.js, en.js
├── pages/              Home, ProjectsPage, ProjectDetailPage, NotFoundPage
├── services/           envoi du formulaire
├── utils/              validation, stockage, transitions
├── App.jsx             routes
└── index.css           thèmes, boutons en verre, animations
```
