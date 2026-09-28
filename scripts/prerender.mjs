/*
  Exécuté après « vite build » (voir package.json).

  Le site est une application React : sans ce script, toutes les pages partagent les mêmes balises <title> et Open Graph.
  Ici, on génère une copie de index.html par page (/projects, /projects/credixa…) avec son propre titre,
  sa description et son image de partage, puis un sitemap.xml pour les moteurs de recherche.
  L'application React reste la même : seul le HTML initial change.
*/
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createServer, loadEnv } from 'vite'

const root = process.cwd()
const dist = path.join(root, 'dist')
const env = loadEnv('production', root, '')
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
const siteUrl = (env.VITE_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : '')).replace(/\/$/, '')

// Charge les données du site avec Vite (les imports d'images sont résolus comme dans l'application).
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { publishedProjects } = await server.ssrLoadModule('/src/data/projects.js')
const { fr } = await server.ssrLoadModule('/src/locales/fr.js')
await server.close()

const template = await readFile(path.join(dist, 'index.html'), 'utf8')

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const absolute = (pathname) => `${siteUrl}${pathname}`

function setMeta(html, attribute, key, value) {
  const pattern = new RegExp(`(<meta\\s+${attribute}="${key}"\\s+content=")[^"]*(")`)
  return html.replace(pattern, `$1${escapeHtml(value)}$2`)
}

function renderPage({ pathname, title, description, image }) {
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
  html = setMeta(html, 'name', 'description', description)
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', description)
  html = setMeta(html, 'property', 'og:url', absolute(pathname))
  html = setMeta(html, 'property', 'og:image', absolute(image))
  html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${absolute(pathname)}$2`)
  return html
}

async function writePage(pathname, html) {
  const directory = path.join(dist, pathname)
  await mkdir(directory, { recursive: true })
  await writeFile(path.join(directory, 'index.html'), html)
}

const pages = [
  {
    pathname: '/projects',
    title: fr.meta.projects,
    description: fr.projects.pageIntro,
    image: '/og-image.png',
  },
  ...publishedProjects.map((project) => ({
    pathname: `/projects/${project.slug}`,
    title: `${project.title} | Sylvain Tevoedjre`,
    description: project.summary.fr,
    image: existsSync(path.join(root, 'public', 'og', `${project.slug}.jpg`)) ? `/og/${project.slug}.jpg` : '/og-image.png',
  })),
]

for (const page of pages) {
  await writePage(page.pathname, renderPage(page))
}

// Sitemap et robots.txt (nécessitent l'adresse publique du site).
const robots = ['User-agent: *', 'Allow: /']
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = ['/', ...pages.map((page) => page.pathname)]
    .map((pathname) => `  <url><loc>${absolute(pathname)}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')
  await writeFile(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  )
  robots.push(`Sitemap: ${absolute('/sitemap.xml')}`)
}
await writeFile(path.join(dist, 'robots.txt'), `${robots.join('\n')}\n`)

console.log(
  `Pré-rendu : ${pages.length} pages${siteUrl ? `, sitemap pour ${siteUrl}` : ' (VITE_SITE_URL absente : pas de sitemap)'}.`,
)
