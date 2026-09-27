import { Outlet } from 'react-router'
import { usePreferences } from '../../hooks/usePreferences'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollManager from './ScrollManager'
import CustomCursor from './CustomCursor'

// Structure commune à toutes les pages.
export default function Layout() {
  const { t } = usePreferences()

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-on-gold"
      >
        {t('skipLink')}
      </a>
      <ScrollManager />
      <Navbar />
      <main id="contenu">
        <Outlet />
      </main>
      <Footer />
      <CustomCursor />
    </>
  )
}
