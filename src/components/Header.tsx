import { sitePath } from '../sitePath'

interface HeaderProps {
  page?: 'home' | 'projects' | 'case-study' | 'resume' | 'contact'
}

export function Header({ page = 'home' }: HeaderProps) {
  const links = [
    { href: '/', label: 'Home', current: page === 'home' },
    { href: '/projects', label: 'Projects', current: page === 'projects' || page === 'case-study' },
    { href: '/resume', label: 'Résumé', current: page === 'resume' },
    { href: '/contact', label: 'Contact', current: page === 'contact' },
  ]

  return (
    <header className="site-header">
      <a className="wordmark" href={sitePath('/')} aria-label="Prakul Sherikar home">
        <span className="wordmark__monogram">PS</span>
        <span>Prakul Sherikar</span>
      </a>
      <nav id="primary-navigation" className="primary-nav" aria-label="Main navigation">
        {links.map((link) => (
          <a key={link.label} href={sitePath(link.href)} aria-current={link.current ? 'page' : undefined}>{link.label}</a>
        ))}
      </nav>
    </header>
  )
}

