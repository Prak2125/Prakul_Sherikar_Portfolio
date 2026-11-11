import type { ProjectStatus as ProjectStatusValue } from '../data/projects'

const statusDisplay: Record<ProjectStatusValue, { label: string; className: string }> = {
  Current: { label: 'In Progress', className: 'project-status--active' },
  'Analysis study': { label: 'Analysis Study', className: 'project-status--study' },
  Completed: { label: 'Completed', className: 'project-status--completed' },
  'In progress': { label: 'In Progress', className: 'project-status--active' },
  Upcoming: { label: 'Not started', className: 'project-status--planned' },
}

interface ProjectStatusProps {
  status: ProjectStatusValue
  inline?: boolean
}

export function ProjectStatus({ status, inline = false }: ProjectStatusProps) {
  const display = statusDisplay[status]
  return <span className={`project-status ${display.className}${inline ? ' project-status--inline' : ''}`}>{display.label}</span>
}
