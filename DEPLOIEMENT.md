# Mettre le portfolio en ligne sur Vercel

Durée : 15 minutes environ. Il faut un compte GitHub (tu as déjà `sylformdev-debug`) et Node.js 20 ou plus récent.

## 1. Vérifier le projet sur ton ordinateur

Dans le dossier du projet (VS Code → Terminal) :

```bash
npm install
npm run build
npm run preview
```

Ouvre http://localhost:4173 et vérifie le site. `Ctrl + C` pour arrêter.

## 2. Envoyer le code sur GitHub

1. Sur https://github.com/new, crée un dépôt nommé `portfolio`, **sans** README, .gitignore ni licence (le projet les contient déjà).
2. Dans le terminal, à la racine du projet :

```bash
git remote add origin https://github.com/sylformdev-debug/portfolio.git
git push -u origin main
```

Le dépôt Git est déjà initialisé, avec l'historique des modifications. Si Git demande un mot de passe, utilise un *personal access token* GitHub (Settings → Developer settings → Tokens), pas ton mot de passe.

## 3. Déployer sur Vercel

1. Va sur https://vercel.com/signup et choisis **Continue with GitHub**.
2. **Add New… → Project**, puis **Import** à côté du dépôt `portfolio`.
3. Vercel détecte **Vite** (réglages déjà fournis par `vercel.json`) : ne change rien.
4. Variables d'environnement : aucune n'est obligatoire. Tu pourras les ajouter plus tard (voir plus bas).
5. Clique sur **Deploy**. Au bout d'une minute environ, ton site est en ligne à une adresse du type `https://portfolio-xxxx.vercel.app`.

À chaque `git push` sur `main`, Vercel remet le site à jour automatiquement.

### Changer l'adresse

Project → Settings → Domains : tu peux remplacer l'adresse par exemple par `sylvain-tevoedjre.vercel.app` (si elle est libre) ou brancher un nom de domaine acheté.
L'adresse du site est détectée automatiquement pour les aperçus de partage et le sitemap.
Si tu branches un **domaine personnel**, ajoute `VITE_SITE_URL=https://ton-domaine.com` dans Settings → Environment Variables, puis **Redeploy**.

## 4. Options

| Variable (Settings → Environment Variables) | Effet |
| --- | --- |
| `VITE_CONTACT_ENDPOINT` | Le formulaire envoie directement les messages. Crée un formulaire gratuit sur https://formspree.io et colle son URL (`https://formspree.io/f/xxxx`). Sans cette variable, le formulaire ouvre la messagerie du visiteur. |
| `VITE_ENABLE_ANALYTICS` = `true` | Mesure d'audience sans cookie. Active aussi **Analytics** dans l'onglet du projet Vercel. Tu verras combien de personnes visitent ton portfolio et quelles pages elles regardent. |
| `VITE_SITE_URL` | Seulement pour un domaine personnel (voir plus haut). |

Après avoir ajouté ou modifié une variable : Deployments → **⋯** → **Redeploy**.

## 5. Vérifier après la mise en ligne

- Ouvre directement une étude de cas, par exemple `/projects/credixa`, puis recharge la page : elle doit s'afficher (pas de 404).
- Teste l'aperçu de partage LinkedIn sur https://www.linkedin.com/post-inspector/ avec l'adresse d'un projet : la capture du projet doit apparaître.
- Déclare le site dans Google Search Console (https://search.google.com/search-console) et soumets `https://ton-adresse/sitemap.xml`.
- Ajoute l'adresse du portfolio sur ton profil LinkedIn, ton CV et ton profil GitHub.

## Autre méthode : en ligne de commande

```bash
npm install -g vercel
vercel login
vercel --prod
```

Réponds aux questions (les réglages par défaut conviennent). Cette méthode ne relie pas le site à GitHub : il faudra relancer `vercel --prod` après chaque modification.
