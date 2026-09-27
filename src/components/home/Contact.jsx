import { useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { socials } from '../../data/socials'
import { CONTACT_LIMITS, cleanContactValues, validateContact } from '../../utils/validateContact'
import { isDirectSendEnabled, sendContactMessage } from '../../services/contactService'
import { usePreferences } from '../../hooks/usePreferences'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import FormField from '../ui/FormField'

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' }
const FIELDS = Object.keys(EMPTY_FORM)

export default function Contact() {
  const { t } = usePreferences()
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  // Les erreurs s'affichent après une première tentative d'envoi, puis se mettent à jour pendant la saisie.
  const [submitted, setSubmitted] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState({ state: 'idle', messageKey: '' })

  const isSending = status.state === 'sending'

  const handleChange = (event) => {
    const { name, value } = event.target
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)
    if (submitted) setErrors(validateContact(nextValues))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (honeypot) return // champ invisible rempli : envoi d'un robot ignoré

    const validationErrors = validateContact(values)
    setErrors(validationErrors)
    setSubmitted(true)

    const firstInvalid = FIELDS.find((field) => validationErrors[field])
    if (firstInvalid) {
      setStatus({ state: 'error', messageKey: 'contact.formError' })
      document.getElementById(firstInvalid)?.focus()
      return
    }

    setStatus({ state: 'sending', messageKey: '' })
    try {
      const { method } = await sendContactMessage(cleanContactValues(values))
      setStatus({
        state: 'success',
        messageKey: method === 'endpoint' ? 'contact.successEndpoint' : 'contact.successMail',
      })
      if (method === 'endpoint') {
        setValues(EMPTY_FORM)
        setSubmitted(false)
      }
    } catch {
      setStatus({ state: 'error', messageKey: 'contact.sendError' })
    }
  }

  const errorText = (field) => {
    const error = submitted && errors[field]
    return error ? t(`contact.errors.${error.code}`, error.params) : ''
  }

  const fieldProps = (field) => ({
    id: field,
    value: values[field],
    label: t(`contact.${field}`),
    placeholder: t(`contact.${field}Placeholder`),
    error: errorText(field),
    onChange: handleChange,
    maxLength: CONTACT_LIMITS[field].max,
  })

  return (
    <Section id="contact" title={t('contact.title')} intro={t('contact.intro')}>
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
                  <Icon
                    size={20}
                    className="shrink-0 text-gold transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm text-muted">{social.name}</span>
                    <span className="block truncate text-paper transition-colors duration-200 group-hover:text-gold">
                      {social.handle}
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </Reveal>

        <Reveal as="form" delay={100} onSubmit={handleSubmit} noValidate className="relative space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField {...fieldProps('name')} autoComplete="name" />
            <FormField {...fieldProps('email')} type="email" inputMode="email" autoComplete="email" />
          </div>
          <FormField {...fieldProps('subject')} />
          <FormField {...fieldProps('message')} multiline showCounter />

          <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0" style={{ left: 0, top: 0 }}>
            <label htmlFor="website">{t('contact.honeypot')}</label>
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
            <button type="submit" disabled={isSending} className="btn-glass btn-glass--gold">
              {isSending ? (
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              ) : (
                <Send size={16} aria-hidden="true" />
              )}
              {isSending ? t('contact.sending') : t('contact.submit')}
            </button>
            {!isDirectSendEnabled && <p className="text-xs text-muted sm:max-w-64 sm:text-right">{t('contact.mailNote')}</p>}
          </div>

          <div aria-live="polite" role="status">
            {status.messageKey && (
              <p
                className={`fade-in flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
                  status.state === 'success'
                    ? 'border-gold/40 text-gold'
                    : 'border-red-500/50 text-red-700 dark:text-red-300'
                }`}
              >
                {status.state === 'success' ? (
                  <CheckCircle2 size={18} className="shrink-0" aria-hidden="true" />
                ) : (
                  <AlertCircle size={18} className="shrink-0" aria-hidden="true" />
                )}
                {t(status.messageKey)}
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
