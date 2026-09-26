import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

export default function App() {
  // Lien direct vers une section (ex. /#projets) : React affiche la page après que le navigateur
  // a cherché l'ancre, il faut donc refaire le défilement une fois le contenu rendu.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-ink"
      >
        Aller au contenu
      </a>
      <Navbar />
      <main id="contenu">
        <Home />
      </main>
      <Footer />
    </>
  )
}
