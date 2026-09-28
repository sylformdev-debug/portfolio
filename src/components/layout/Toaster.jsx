import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

// Zone de notifications : reçoit les messages envoyés par showToast() et les efface après quelques secondes.
export default function Toaster() {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    let timer = 0
    const onToast = (event) => {
      clearTimeout(timer)
      setToast({ id: Date.now(), message: event.detail })
      timer = setTimeout(() => setToast(null), 3200)
    }
    window.addEventListener('portfolio:toast', onToast)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('portfolio:toast', onToast)
    }
  }, [])

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4"
    >
      {toast && (
        <p
          key={toast.id}
          className="fade-in btn-glass btn-glass--gold pointer-events-auto cursor-default gap-2! whitespace-normal! text-center"
        >
          <CheckCircle2 size={16} aria-hidden="true" className="shrink-0" />
          {toast.message}
        </p>
      )}
    </div>
  )
}
