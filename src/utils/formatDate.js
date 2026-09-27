// « 2023-03-29 » → « 29 mars 2023 » / « March 29, 2023 ». Une année seule (« 2020 ») est renvoyée telle quelle.
export function formatDate(value, language) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  const [year, month, day] = value.split('-').map(Number)
  return new Intl.DateTimeFormat(language === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, day))
}
