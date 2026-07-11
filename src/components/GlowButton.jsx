import { Link } from 'react-router-dom'

const styles = {
  primary:
    'bg-accent text-white glow hover:bg-accent-soft focus-visible:outline-accent',
  ghost:
    'border border-line text-text hover:border-accent hover:text-accent focus-visible:outline-accent',
}

export default function GlowButton({ variant = 'primary', to, href, children, className = '', ...rest }) {
  const cls = `inline-flex items-center gap-2 rounded-lg px-6 py-3 font-display font-medium transition-colors duration-200 ${styles[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
