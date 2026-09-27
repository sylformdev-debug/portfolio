import { useContext } from 'react'
import { PreferencesContext } from '../context/preferences'

// Donne accès au thème, à la langue et aux fonctions de traduction t() et l().
export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (!context) throw new Error('usePreferences doit être utilisé dans <PreferencesProvider>.')
  return context
}
