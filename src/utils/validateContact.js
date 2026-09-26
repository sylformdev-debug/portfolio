export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 120 },
  subject: { min: 3, max: 120 },
  message: { min: 20, max: 2000 },
}

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i
const NAME_PATTERN = /^[\p{L}\p{M}' .-]+$/u
// Caractères de contrôle invisibles (sauf retours à la ligne et tabulations)
// eslint-disable-next-line no-control-regex
const CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g

export function cleanValue(value) {
  return value.replace(CONTROL_CHARACTERS, '').trim()
}

export function cleanContactValues(values) {
  return {
    name: cleanValue(values.name).replace(/\s+/g, ' '),
    email: cleanValue(values.email).toLowerCase(),
    subject: cleanValue(values.subject).replace(/\s+/g, ' '),
    message: cleanValue(values.message),
  }
}

function checkLength(value, { min, max }, label) {
  if (!value) return `Indiquez ${label}.`
  if (min && value.length < min) return `${capitalize(label)} doit contenir au moins ${min} caractères.`
  if (max && value.length > max) return `${capitalize(label)} ne doit pas dépasser ${max} caractères.`
  return ''
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// Renvoie un objet { champ: message } ; il est vide lorsque tout est valide.
export function validateContact(rawValues) {
  const values = cleanContactValues(rawValues)
  const errors = {}

  const nameError = checkLength(values.name, CONTACT_LIMITS.name, 'votre nom')
  if (nameError) errors.name = nameError
  else if (!NAME_PATTERN.test(values.name)) {
    errors.name = 'Le nom ne peut contenir que des lettres, des espaces, des tirets et des apostrophes.'
  }

  if (!values.email) errors.email = 'Indiquez votre adresse email.'
  else if (values.email.length > CONTACT_LIMITS.email.max || !EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Cette adresse email n’est pas valide. Exemple : prenom@domaine.com'
  }

  const subjectError = checkLength(values.subject, CONTACT_LIMITS.subject, 'le sujet')
  if (subjectError) errors.subject = subjectError

  const messageError = checkLength(values.message, CONTACT_LIMITS.message, 'votre message')
  if (messageError) errors.message = messageError

  return errors
}
