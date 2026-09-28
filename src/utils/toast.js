// Affiche une courte notification (voir components/layout/Toaster.jsx). Utilisable depuis n'importe quel fichier.
export function showToast(message) {
  window.dispatchEvent(new CustomEvent('portfolio:toast', { detail: message }))
}

// Copie un texte dans le presse-papiers et affiche le résultat.
export async function copyText(text, successMessage, failureMessage) {
  try {
    await navigator.clipboard.writeText(text)
    showToast(successMessage)
  } catch {
    showToast(failureMessage)
  }
}
