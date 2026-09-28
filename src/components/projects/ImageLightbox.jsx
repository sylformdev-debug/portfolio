import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { usePreferences } from '../../hooks/usePreferences'

/*
  Visionneuse plein écran des captures d'un projet.
  index === null : fermée. Flèches gauche/droite pour naviguer, Échap pour fermer.
*/
export default function ImageLightbox({ images, index, title, onChange, onClose }) {
  const { t } = usePreferences()
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const isOpen = index !== null
  const total = images.length

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) {
      dialog.showModal()
      closeRef.current?.focus()
    }
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  const go = (step) => onChange((index + step + total) % total)

  const onKeyDown = (event) => {
    if (total < 2) return
    if (event.key === 'ArrowRight') go(1)
    if (event.key === 'ArrowLeft') go(-1)
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={t('lightbox.label', { title })}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => event.target === dialogRef.current && dialogRef.current.close()}
      className="lightbox m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-0"
    >
      {isOpen && (
        <div
          className="flex h-full flex-col items-center justify-center gap-4 p-4 md:p-10"
          onClick={(event) => event.target === event.currentTarget && dialogRef.current.close()}
        >
          <img
            src={images[index]}
            alt={t('project.screenshotAlt', { title }) + (total > 1 ? ` (${index + 1}/${total})` : '')}
            className="max-h-[80dvh] max-w-full rounded-xl border border-white/15 object-contain shadow-2xl"
          />
          <div className="flex items-center gap-3 text-sm text-white/80">
            {total > 1 && (
              <button type="button" onClick={() => go(-1)} aria-label={t('lightbox.previous')} className="btn-glass btn-glass--icon text-white!">
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
            )}
            {total > 1 && (
              <span className="min-w-16 text-center tabular-nums">
                {t('lightbox.counter', { current: index + 1, total })}
              </span>
            )}
            {total > 1 && (
              <button type="button" onClick={() => go(1)} aria-label={t('lightbox.next')} className="btn-glass btn-glass--icon text-white!">
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              ref={closeRef}
              onClick={() => dialogRef.current.close()}
              aria-label={t('lightbox.close')}
              className="btn-glass btn-glass--icon text-white!"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
