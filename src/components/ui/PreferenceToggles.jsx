import { Moon, Sun } from 'lucide-react'
import { usePreferences } from '../../hooks/usePreferences'

// Boutons langue (FR / EN) et thème (clair / sombre).
export default function PreferenceToggles() {
  const { theme, toggleTheme, language, changeLanguage, t } = usePreferences()
  const nextLanguage = language === 'fr' ? 'en' : 'fr'

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => changeLanguage(nextLanguage)}
        aria-label={t('nav.switchLanguage')}
        title={t('nav.switchLanguage')}
        className="btn-glass btn-glass--icon text-xs font-bold tracking-wide"
      >
        <span aria-hidden="true">{nextLanguage.toUpperCase()}</span>
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t('nav.toLight') : t('nav.toDark')}
        title={theme === 'dark' ? t('nav.toLight') : t('nav.toDark')}
        className="btn-glass btn-glass--icon"
      >
        {theme === 'dark' ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
      </button>
    </div>
  )
}
