import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, WhatsappIcon } from '../components/icons/BrandIcons'
import { profile, emailLink, whatsappLink } from './profile'

// Liens affichés dans la section Contact et le footer.
export const socials = [
  { name: 'Email', handle: profile.email, href: emailLink, icon: Mail },
  { name: 'LinkedIn', handle: 'tevoedjre-sylvain', href: profile.socials.linkedin, icon: LinkedinIcon },
  { name: 'GitHub', handle: 'sylformdev-debug', href: profile.socials.github, icon: GithubIcon },
  { name: 'WhatsApp', handle: profile.phoneDisplay, href: whatsappLink, icon: WhatsappIcon },
]
