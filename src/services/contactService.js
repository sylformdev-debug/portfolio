import { profile } from '../data/profile'

/*
  Envoi du formulaire de contact.

  Sans configuration, le formulaire ouvre la messagerie du visiteur avec le message prérempli.
  Pour un envoi direct, définissez VITE_CONTACT_ENDPOINT dans le fichier .env :
  l'URL d'un service de formulaires (Formspree, Getform…) ou de votre propre API (Laravel, Node…).
  Le service reçoit un POST JSON : { name, email, subject, message }.

  N'y mettez jamais de clé secrète : tout ce qui commence par VITE_ est visible dans le navigateur.
*/

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

export const isDirectSendEnabled = Boolean(endpoint)

function openMailClient({ name, email, subject, message }) {
  const body = `${message}\n\n${name}\n${email}`
  const href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = href
}

export async function sendContactMessage(values) {
  if (!isDirectSendEnabled) {
    openMailClient(values)
    return { method: 'mail-client' }
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(values),
  })

  if (!response.ok) {
    throw new Error(`Le service d'envoi a répondu avec le code ${response.status}.`)
  }

  return { method: 'endpoint' }
}
