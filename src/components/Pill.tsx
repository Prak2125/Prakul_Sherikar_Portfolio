interface PillProps {
  children: React.ReactNode
  tone?: 'default' | 'accent'
}

export function Pill({ children, tone = 'default' }: PillProps) {
  return <span className={`pill${tone === 'accent' ? ' pill--accent' : ''}`}>{children}</span>
}
