import { ArrowLeft } from 'lucide-react'
import { usePreferences } from '../hooks/usePreferences'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Button from '../components/ui/Button'

export default function NotFoundPage({ title, text }) {
  const { t } = usePreferences()
  useDocumentTitle(t('meta.notFound'))

  return (
    <section className="container-page flex min-h-[80svh] flex-col justify-center pt-32 pb-20">
      <p className="intro font-display text-[clamp(6rem,20vw,12rem)] leading-none text-gold/70">404</p>
      <h1 className="intro mt-4 font-display text-4xl md:text-5xl" style={{ '--intro-delay': '80ms' }}>
        {title ?? t('notFound.title')}
      </h1>
      <p className="intro mt-4 max-w-md text-muted" style={{ '--intro-delay': '160ms' }}>
        {text ?? t('notFound.text')}
      </p>
      <div className="intro mt-10 flex flex-wrap gap-3" style={{ '--intro-delay': '240ms' }}>
        <Button to="/" variant="gold">
          <ArrowLeft size={16} aria-hidden="true" />
          {t('notFound.back')}
        </Button>
        <Button to="/projects">{t('projects.viewAll')}</Button>
      </div>
    </section>
  )
}
