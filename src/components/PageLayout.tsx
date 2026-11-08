import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

interface PageLayoutProps {
  children: ReactNode
  page: 'home' | 'projects' | 'case-study' | 'resume' | 'contact'
}

export function PageLayout({ children, page }: PageLayoutProps) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header page={page} />
      {children}
      <Footer />
    </>
  )
}
