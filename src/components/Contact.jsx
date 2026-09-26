import { useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { socials } from '../data/socials'
import { CONTACT_LIMITS, cleanContactValues, validateContact } from '../utils/validateContact'
import { isDirectSendEnabled, sendContactMessage } from '../services/contactService'
import Section from './ui/Section'
import Reveal from './ui/Reveal'
import Button from './ui/Button'
import FormField from './ui/FormField'

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' }

const SUCCESS_MESSAGES = {
  endpoint: 'Message envoyé. Je vous réponds dans les meilleurs délais.',
  'mail-client': 'Votre messagerie s’est ouverte avec le message prérempli : il ne reste qu’à l’envoyer.',
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const isSending = status.state === 'sending'

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)
    if (touched[name]) setErrors(validateContact(nextValues))
  }

  const handleBlur = (event) => {
    setTouched((current) => ({ ...current, [event.target.name]: true }))
    setErrors(validateContact(values))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Champ invisible rempli : c'est un robot, on ignore l'envoi.
    if (honeypot) return

    const validationErrors = validateContact(values)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    if (Object.keys(validationErrors).length > 0) {
      setStatus({ state: 'error', message: 'Certains champs sont à corriger avant l’envoi.' })
      document.getElementById(Object.keys(validationErrors)[0])?.focus()
      return
    }

    setStatus({ state: 'sending', message: '' })
    try {
      const { method } = await sendContactMessage(cleanContactValues(values))
      setStatus({ state: 'success', message: SUCCESS_MESSAGES[method] })
      if (method === 'endpoint') {
        setValues(EMPTY_FORM)
        setTouched({})
      }
    } catch {
      setStatus({
        state: 'error',
        message: 'L’envoi a échoué. Réessayez dans un instant ou écrivez-moi directement par email.',
      })
    }
  }

  const fieldProps = (name) => ({
    id: name,
    value: values[name],
    error: touched[name] ? errors[name] : '',
    onChange: handleChange,
    onBlur: handleBlur,
    maxLength: CONTACT_LIMITS[name].max,
  })

  return (
    <Section
      id="contact"
      title="Contact"
      intro="Un projet, une offre de stage ou d’emploi, une question : écrivez-moi, je réponds personnellement."
    >
      <div className="grid gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
        <Reveal as="ul" className="border-t border-line">
          {socials.map((social) => {
            const Icon = social.icon
            const isExternal = social.href.startsWith('http')
            return (
              <li key={social.name} className="border-b border-line">
                <a
                  href={social.href}
                  {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="group flex items-center gap-4 py-4"
                >
                  <Icon size={20} className="shrink-0 text-gold" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{social.name}</span>
                    <span className="block truncate text-paper transition-colors duration-200 group-hover:text-gold-soft">
                      {social.handle}
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </Reveal>

        <Reveal as="form" delay={100} onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField {...fieldProps('name')} label="Nom" autoComplete="name" placeholder="Votre nom" />
            <FormField
              {...fieldProps('email')}
              label="Email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="vous@exemple.com"
            />
          </div>
          <FormField {...fieldProps('subject')} label="Sujet" placeholder="Objet de votre message" />
          <FormField
            {...fieldProps('message')}
            label="Message"
            multiline
            showCounter
            placeholder="Décrivez votre projet ou votre demande"
          />

          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="website">Ne pas remplir ce champ</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" disabled={isSending}>
              {isSending ? (
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              ) : (
                <Send size={16} aria-hidden="true" />
              )}
              {isSending ? 'Envoi en cours' : 'Envoyer le message'}
            </Button>
            {!isDirectSendEnabled && (
              <p className="text-xs text-muted sm:max-w-60 sm:text-right">
                L’envoi ouvre votre messagerie avec le message déjà rédigé.
              </p>
            )}
          </div>

          <div aria-live="polite" role="status">
            {status.message && (
              <p
                className={`flex items-start gap-3 rounded-md border px-4 py-3 text-sm ${
                  status.state === 'success'
                    ? 'border-gold/40 text-gold-soft'
                    : 'border-red-400/50 text-red-300'
                }`}
              >
                {status.state === 'success' ? (
                  <CheckCircle2 size={18} className="shrink-0" aria-hidden="true" />
                ) : (
                  <AlertCircle size={18} className="shrink-0" aria-hidden="true" />
                )}
                {status.message}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
