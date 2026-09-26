const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary: 'bg-gold text-ink hover:bg-gold-soft',
  secondary: 'border border-paper/30 text-paper hover:border-gold hover:text-gold-soft',
}

// Rend un lien <a> si « href » est fourni, sinon un <button>.
export default function Button({ href, variant = 'primary', className = '', children, ...props }) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
