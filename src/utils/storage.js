// localStorage peut être indisponible (navigation privée, stockage bloqué) : on ne plante jamais.

export function readStorage(key) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Préférence non sauvegardée : le site fonctionne quand même.
  }
}
