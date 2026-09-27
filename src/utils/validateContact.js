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

function cleanValue(value) {
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

function checkLength(value, { min, max }) {
  if (!value) return { code: 'required' }
  if (min && value.length < min) return { code: 'tooShort', params: { min } }
  if (max && value.length > max) return { code: 'tooLong', params: { max } }
  return null
}

/*
  Renvoie { champ: { code, params } } ; l'objet est vide si tout est valide.
  Les codes sont traduits dans l'interface (locales : contact.errors.<code>).
*/
export function validateContact(rawValues) {
  const values = cleanContactValues(rawValues)
  const errors = {}

  const nameError = checkLength(values.name, CONTACT_LIMITS.name)
  if (nameError) errors.name = nameError
  else if (!NAME_PATTERN.test(values.name)) errors.name = { code: 'invalidName' }

  if (!values.email) errors.email = { code: 'required' }
  else if (values.email.length > CONTACT_LIMITS.email.max || !EMAIL_PATTERN.test(values.email)) {
    errors.email = { code: 'invalidEmail' }
  }

  const subjectError = checkLength(values.subject, CONTACT_LIMITS.subject)
  if (subjectError) errors.subject = subjectError

  const messageError = checkLength(values.message, CONTACT_LIMITS.message)
  if (messageError) errors.message = messageError

  return errors
}
