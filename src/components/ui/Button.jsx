import { Link } from 'react-router'

const variants = {
  glass: 'btn-glass',
  gold: 'btn-glass btn-glass--gold',
  icon: 'btn-glass btn-glass--icon',
}

/*
  Bouton en verre, utilisé partout sur le site.
  - to    : lien interne (React Router, avec transition de page)
  - href  : lien externe ou ancre
  - sinon : <button>
*/
export default function Button({ to, href, variant = 'glass', className = '', children, ...props }) {
  const classes = `${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} viewTransition className={classes} {...props}>
        {children}
      </Link>
    )
  }

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
