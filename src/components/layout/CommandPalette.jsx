import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  ArrowRight,
  Copy,
  CornerDownLeft,
  Download,
  FolderOpen,
  Hash,
  Languages,
  Moon,
  Search,
  Sun,
} from 'lucide-react'
import { navigation } from '../../data/navigation'
import { publishedProjects } from '../../data/projects'
import { profile, whatsappLink } from '../../data/profile'
import { usePreferences } from '../../hooks/usePreferences'
import { copyText } from '../../utils/toast'
import { PALETTE_EVENT } from '../../utils/commandPalette'
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../icons/BrandIcons'

// Recherche sans tenir compte des accents ni des majuscules.
function normalize(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

function downloadFile(url) {
  const link = document.createElement('a')
  link.href = url
  link.download = ''
  link.click()
}

function openExternal(url) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

/*
  Recherche rapide (Ctrl + K ou ⌘ + K) : aller à une section ou à un projet,
  changer de thème ou de langue, copier l'email, télécharger le CV.
*/
export default function CommandPalette() {
  const { t, l, theme, toggleTheme, language, changeLanguage } = usePreferences()
  const navigate = useNavigate()
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  const open = useCallback(() => {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    setQuery('')
    setActiveIndex(0)
    dialog.showModal()
    inputRef.current?.focus()
  }, [])

  const close = useCallback(() => dialogRef.current?.close(), [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (dialogRef.current?.open) close()
        else open()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener(PALETTE_EVENT, open)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener(PALETTE_EVENT, open)
    }
  }, [open, close])

  const items = useMemo(() => {
    const sections = navigation.map((item) => ({
      id: `section-${item.id}`,
      group: 'sections',
      label: t(`nav.${item.key}`),
      icon: Hash,
      run: () => navigate(item.key === 'home' ? '/' : item.key === 'projects' ? '/projects' : `/#${item.id}`),
    }))

    const projects = [
      {
        id: 'projects-all',
        group: 'projects',
        label: t('palette.allProjects'),
        icon: FolderOpen,
        run: () => navigate('/projects', { viewTransition: true }),
      },
      ...publishedProjects.map((project) => ({
        id: `project-${project.slug}`,
        group: 'projects',
        label: project.title,
        hint: l(project.type),
        keywords: project.stack.join(' '),
        icon: ArrowRight,
        run: () => navigate(`/projects/${project.slug}`, { viewTransition: true }),
      })),
    ]

    const actions = [
      {
        id: 'action-theme',
        group: 'actions',
        label: theme === 'dark' ? t('palette.toLight') : t('palette.toDark'),
        keywords: 'theme mode clair sombre dark light',
        icon: theme === 'dark' ? Sun : Moon,
        run: toggleTheme,
      },
      {
        id: 'action-language',
        group: 'actions',
        label: t('palette.switchLanguage'),
        keywords: 'langue language english français',
        icon: Languages,
        run: () => changeLanguage(language === 'fr' ? 'en' : 'fr'),
      },
      {
        id: 'action-copy-email',
        group: 'actions',
        label: t('palette.copyEmail'),
        hint: profile.email,
        keywords: 'email mail contact',
        icon: Copy,
        run: () => copyText(profile.email, t('toast.emailCopied'), t('toast.copyFailed')),
      },
      {
        id: 'action-cv',
        group: 'actions',
        label: t('palette.downloadCv'),
        keywords: 'cv resume pdf',
        icon: Download,
        run: () => downloadFile(profile.cvUrl),
      },
      {
        id: 'action-linkedin',
        group: 'actions',
        label: t('palette.openLinkedin'),
        icon: LinkedinIcon,
        run: () => openExternal(profile.socials.linkedin),
      },
      {
        id: 'action-github',
        group: 'actions',
        label: t('palette.openGithub'),
        icon: GithubIcon,
        run: () => openExternal(profile.socials.github),
      },
      {
        id: 'action-whatsapp',
        group: 'actions',
        label: t('palette.openWhatsapp'),
        icon: WhatsappIcon,
        run: () => openExternal(whatsappLink),
      },
    ]

    return [...sections, ...projects, ...actions]
  }, [t, l, theme, toggleTheme, language, changeLanguage, navigate])

  const results = useMemo(() => {
    const search = normalize(query.trim())
    if (!search) return items
    return items.filter((item) => normalize(`${item.label} ${item.hint ?? ''} ${item.keywords ?? ''}`).includes(search))
  }, [items, query])

  const run = (item) => {
    close()
    item.run()
  }

  const onInputKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (results.length ? (index + 1) % results.length : 0))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (results.length ? (index - 1 + results.length) % results.length : 0))
    } else if (event.key === 'Enter' && results[activeIndex]) {
      event.preventDefault()
      run(results[activeIndex])
    }
  }

  // Garde l'option active visible pendant la navigation au clavier.
  useEffect(() => {
    document.getElementById(`palette-${results[activeIndex]?.id}`)?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, results])

  const groups = ['sections', 'projects', 'actions']
    .map((group) => ({ group, entries: results.filter((item) => item.group === group) }))
    .filter(({ entries }) => entries.length > 0)

  return (
    <dialog
      ref={dialogRef}
      aria-label={t('palette.label')}
      onClick={(event) => event.target === dialogRef.current && close()}
      className="command-palette m-auto mt-[12vh] w-[min(40rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-2xl border border-line bg-surface p-0 text-paper shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]"
    >
      <div className="flex items-center gap-3 border-b border-line px-5">
        <Search size={18} className="shrink-0 text-gold" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-results"
          aria-activedescendant={results[activeIndex] ? `palette-${results[activeIndex].id}` : undefined}
          aria-label={t('palette.label')}
          placeholder={t('palette.placeholder')}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActiveIndex(0)
          }}
          onKeyDown={onInputKeyDown}
          className="h-14 w-full bg-transparent text-base text-paper placeholder:text-muted focus:outline-none"
        />
        <kbd className="hidden shrink-0 rounded-md border border-line px-2 py-0.5 text-xs text-muted sm:inline">Esc</kbd>
      </div>

      <div id="palette-results" role="listbox" aria-label={t('palette.label')} className="max-h-[55vh] overflow-y-auto p-2">
        {results.length === 0 && (
          <p className="px-3 py-8 text-center text-sm text-muted">{t('palette.empty', { query })}</p>
        )}
        {groups.map(({ group, entries }) => (
          <div key={group} role="group" aria-labelledby={`palette-group-${group}`} className="py-1">
            <p id={`palette-group-${group}`} className="px-3 pt-2 pb-1 text-xs text-muted">
              {t(`palette.${group}`)}
            </p>
            {entries.map((item) => {
              const index = results.indexOf(item)
              const isActive = index === activeIndex
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  id={`palette-${item.id}`}
                  role="option"
                  aria-selected={isActive}
                  onMouseMove={() => setActiveIndex(index)}
                  onClick={() => run(item)}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ${
                    isActive ? 'bg-gold/12 text-paper' : 'text-paper/80'
                  }`}
                >
                  <Icon size={16} aria-hidden="true" className={isActive ? 'text-gold' : 'text-muted'} />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.hint && <span className="hidden truncate text-xs text-muted sm:inline">{item.hint}</span>}
                  {isActive && <CornerDownLeft size={14} aria-hidden="true" className="shrink-0 text-gold" />}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <p className="border-t border-line px-5 py-3 text-xs text-muted">{t('palette.hint')}</p>
    </dialog>
  )
}
