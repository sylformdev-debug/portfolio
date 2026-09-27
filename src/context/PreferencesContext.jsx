import { useCallback, useEffect, useMemo, useState } from 'react'
import { PreferencesContext } from './preferences'
import { locales, DEFAULT_LANGUAGE } from '../locales'
import { readStorage, writeStorage } from '../utils/storage'
import { withViewTransition } from '../utils/transition'

const THEME_KEY = 'portfolio-theme'
const LANGUAGE_KEY = 'portfolio-lang'

// Premier affichage : choix enregistré, sinon préférence du système.
function getInitialTheme() {
  const saved = readStorage(THEME_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function getInitialLanguage() {
  const saved = readStorage(LANGUAGE_KEY)
  if (saved && locales[saved]) return saved
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : DEFAULT_LANGUAGE
}

function getByPath(object, path) {
  return path.split('.').reduce((value, key) => value?.[key], object)
}

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const toggleTheme = useCallback(() => {
    withViewTransition(() => {
      setTheme((current) => {
        const next = current === 'dark' ? 'light' : 'dark'
        writeStorage(THEME_KEY, next)
        return next
      })
    })
  }, [])

  const changeLanguage = useCallback((next) => {
    if (!locales[next]) return
    withViewTransition(() => {
      setLanguage(next)
      writeStorage(LANGUAGE_KEY, next)
    })
  }, [])

  const value = useMemo(() => {
    const dictionary = locales[language]

    // t('nav.projects') ou t('contact.errors.tooShort', { min: 2 })
    const t = (key, params) => {
      const text = getByPath(dictionary, key) ?? getByPath(locales[DEFAULT_LANGUAGE], key) ?? key
      if (!params || typeof text !== 'string') return text
      return text.replace(/\{(\w+)\}/g, (_, name) => params[name] ?? '')
    }

    // l({ fr: '…', en: '…' }) renvoie le texte dans la langue active ; une chaîne simple est renvoyée telle quelle.
    const l = (content) => {
      if (content && typeof content === 'object' && !Array.isArray(content)) {
        return content[language] ?? content[DEFAULT_LANGUAGE] ?? ''
      }
      return content
    }

    return { theme, toggleTheme, language, changeLanguage, t, l }
  }, [theme, toggleTheme, language, changeLanguage])

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
}
