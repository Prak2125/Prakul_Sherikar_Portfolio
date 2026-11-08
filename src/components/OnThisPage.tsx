import { useEffect, useState } from 'react'

export interface PageSectionLink {
  id: string
  label: string
}

export function OnThisPage({ sections }: { sections: PageSectionLink[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter((target): target is HTMLElement => target instanceof HTMLElement)
    if (!targets.length) return

    const updateActiveSection = () => {
      const readingLine = window.scrollY + 120
      let current = targets[0].id
      for (const target of targets) {
        if (target.getBoundingClientRect().top + window.scrollY <= readingLine) current = target.id
      }
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      if (atPageEnd) current = targets[targets.length - 1].id
      setActive((previous) => previous === current ? previous : current)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [sections])

  const links = sections.map(({ id, label }, index) => (
    <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setMobileOpen(false)}>
      <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{label}
    </a>
  ))

  return (
    <>
      <aside className="on-this-page" aria-label="On this page">
        <span className="micro-label">ON THIS PAGE</span>
        <nav aria-label="Project sections">{links}</nav>
      </aside>
      <details className="on-this-page-mobile" open={mobileOpen} onToggle={(event) => setMobileOpen(event.currentTarget.open)}>
        <summary>On this page <span aria-hidden="true">{mobileOpen ? '−' : '+'}</span></summary>
        <nav aria-label="Project sections">{links}</nav>
      </details>
    </>
  )
}
