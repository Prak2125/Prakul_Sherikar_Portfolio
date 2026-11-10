import type { Project } from '../data/projects'
import { Pill } from './Pill'
import { ProjectStatus as ProjectStatusBadge } from './ProjectStatus'
import { sitePath } from '../sitePath'

interface ProjectCardProps {
  project: Project
  compact?: boolean
}

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const projectHref = sitePath(`/projects/${project.id}`)

  return (
    <article className={`project-card${project.featured ? ' project-card--featured' : ''}${project.status === 'Upcoming' ? ' project-card--upcoming' : ''}${compact ? ' project-card--compact' : ''}`} id={project.id}>
      {compact && (
        <div className={`project-card__thumbnail${project.visualImage ? ' project-card__thumbnail--image' : ''}`} role="img" aria-label={project.visualImage?.alt ?? project.visualNote}>
          {project.visualImage ? <img src={project.visualImage.src} alt="" aria-hidden="true" width={project.visualImage.width ?? 1200} height={project.visualImage.height ?? 800} loading="lazy" /> : <>
            <div className="visual-grid" aria-hidden="true" />
            <span className="project-card__thumbnail-label">PROJECT / {project.number}</span>
            <span className="project-card__thumbnail-note">{project.visualNote}</span>
          </>}
        </div>
      )}
      {!compact && (
        <div className="project-card__visual-wrap">
          <div className={`project-card__visual${project.visualImage ? ' project-card__visual--image' : ''}`} aria-label={project.visualImage?.alt ?? project.visualNote} role="img">
            {project.visualImage && <img src={project.visualImage.src} alt="" aria-hidden="true" width={project.visualImage.width ?? 1200} height={project.visualImage.height ?? 800} loading="lazy" />}
            <div className="visual-grid" aria-hidden="true" />
            <span className="visual-index">PROJECT / {project.number}</span>
            <span className="visual-mark" aria-hidden="true">{project.status === 'Upcoming' ? '↗' : '✳'}</span>
            <span className="visual-caption">{project.visualNote}</span>
          </div>
          <ProjectStatusBadge status={project.status} />
        </div>
      )}
      <div className="project-card__body">
        <div className="project-card__topline">
          <span className="eyebrow">{project.category}</span>
          {compact && <ProjectStatusBadge status={project.status} inline />}
        </div>
        <h3><a href={projectHref}>{project.title}</a></h3>
        <p className="project-summary">{project.summary}</p>
        {!compact && project.workstreams && (
          <div className="project-workstreams" aria-label="Related upright workstreams">
            {project.workstreams.map((workstream) => (
              <section className="project-workstream" key={workstream.title}>
                <h4>{workstream.title}</h4>
                <p>{workstream.summary}</p>
              </section>
            ))}
          </div>
        )}
        {!compact && project.relatedWork && (
          <section className="related-project" aria-label="Planned related project">
            <div className="related-project__heading">
              <h4>{project.relatedWork.title}</h4>
              <ProjectStatusBadge status={project.relatedWork.status} inline />
            </div>
            <p>{project.relatedWork.summary}</p>
          </section>
        )}
        {!compact && project.metrics && (
          <div className="project-metrics-block">
            {project.metricContext && <p className="project-metrics__context">{project.metricContext}</p>}
            <div className="project-metrics">
              {project.metrics.map((metric) => (
                <div className="project-metric" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="project-card__bottom">
          {!compact && <div>
            <span className="micro-label">ROLE</span>
            <p className="project-role">{project.role}</p>
          </div>}
          <div className="project-tags">
            {project.disciplines.map((discipline) => <Pill key={discipline}>{discipline}</Pill>)}
          </div>
          <a className="project-card__action" href={projectHref}>View project <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  )
}
