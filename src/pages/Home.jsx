import { usePreferences } from '../hooks/usePreferences'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Hero from '../components/home/Hero'
import About from '../components/home/About'
import Skills from '../components/home/Skills'
import ProjectsPreview from '../components/home/ProjectsPreview'
import Experience from '../components/home/Experience'
import Certifications from '../components/home/Certifications'
import Services from '../components/home/Services'
import Contact from '../components/home/Contact'

export default function Home() {
  const { t } = usePreferences()
  useDocumentTitle(t('meta.home'))

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ProjectsPreview />
      <Experience />
      <Certifications />
      <Services />
      <Contact />
    </>
  )
}
