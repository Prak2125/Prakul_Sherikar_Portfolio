import { PageLayout } from './components/PageLayout'
import { sitePath } from './sitePath'
import { Pill } from './components/Pill'
import { ProjectStatus } from './components/ProjectStatus'
import { projects } from './data/projects'
import { projectDetails } from './data/projectDetails'
import { ColdPlateCaseStudy } from './ColdPlateCaseStudy'
import { CncUprightContent } from './CncUprightContent'

interface ProjectDetailPageProps {
  projectId: string
}

function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const projectIndex = projects.findIndex((item) => item.id === projectId)
  const project = projects[projectIndex]
  const details = projectDetails[projectId]

  if (!project || !details) {
    return (
      <PageLayout page="projects">
        <main id="main" className="not-found-page section-wrap">
          <span className="eyebrow">PAGE NOT FOUND</span>
          <h1>Project not found</h1>
          <p>This project page is not available.</p>
          <a className="button button--dark" href={sitePath('/projects')}>Back to projects</a>
        </main>
      </PageLayout>
    )
  }

  const nextProject = projects[projectIndex + 1]

  return (
    <PageLayout page="case-study">
        <main id="main" className={`project-detail-page section-wrap${details.coldPlate ? ' project-detail-page--coldplate' : ''}`}>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href={sitePath('/')}>Home</a><span aria-hidden="true">/</span><a href={sitePath('/projects')}>Projects</a><span aria-hidden="true">/</span><span aria-current="page">{project.title}</span>
        </nav>

        <header className="project-detail-hero">
          <div className="project-detail-hero__meta">
            <span className="eyebrow">{project.category}</span>
            <ProjectStatus status={project.status} inline />
          </div>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          {details.coldPlate && <div className="coldplate-intro-meta">
            <div><span className="micro-label">ROLE</span><p>{project.role}</p></div>
            <div><span className="micro-label">TOOLS & DISCIPLINES</span><div className="project-tags">{project.disciplines.map((discipline) => <Pill key={discipline}>{discipline}</Pill>)}</div></div>
          </div>}
        </header>

        <div className={`project-detail-grid${details.coldPlate ? ' project-detail-grid--coldplate' : ''}`}>
          {!details.coldPlate && <aside className="project-detail-sidebar" aria-label="Project details">
            <div>
              <span className="micro-label">ROLE</span>
              <p>{project.role}</p>
            </div>
            <div>
              <span className="micro-label">TOOLS & DISCIPLINES</span>
              <div className="project-tags">
                {project.disciplines.map((discipline) => <Pill key={discipline}>{discipline}</Pill>)}
              </div>
            </div>
          </aside>}

          <div className="project-detail-content">
            <section aria-labelledby="project-problem-title">
              <span className="eyebrow">{details.coldPlate ? 'PROJECT CONTEXT' : '01 / CONTEXT'}</span>
              <h2 id="project-problem-title">Engineering problem</h2>
              <p>{details.problem}</p>
            </section>

            <section aria-labelledby="project-approach-title">
              <span className="eyebrow">{details.coldPlate ? 'PROJECT APPROACH' : '02 / METHOD'}</span>
              <h2 id="project-approach-title">Approach & design</h2>
              <p>{details.approach}</p>
              <ul className="detail-focus-list">
                {details.designFocus.map((focus) => <li key={focus}>{focus}</li>)}
              </ul>
            </section>

            {details.coldPlate && <ColdPlateCaseStudy data={details.coldPlate} />}

            {details.bajaUpright && (
              <nav className="baja-section-index" aria-label="Baja upright sections">
                <span className="micro-label">UPRIGHT DESIGN PATHS</span>
                <a href="#cnc-upright">01 <span>CNC-machined upright</span><span aria-hidden="true">↘</span></a>
                <a href="#welded-upright">02 <span>Welded upright</span><span aria-hidden="true">↘</span></a>
                <a href="#portal-upright">03 <span>Portal uprights</span><span aria-hidden="true">↘</span></a>
              </nav>
            )}

            {details.bajaUpright && (
              <section id="cnc-upright" className="baja-work-section" aria-labelledby="cnc-upright-title">
                <div className="baja-work-section__heading">
                  <div>
                    <span className="eyebrow">01 / CNC-MACHINED UPRIGHT</span>
                    <h2 id="cnc-upright-title">CNC design & FEA record</h2>
                  </div>
                  <span className="baja-state">Manufactured and installed · Baja SAE Ohio 2026</span>
                </div>
                <p className="baja-section-intro">I evaluated two distinct geometry concerns: the lower control-arm pickup under the selected combined design case and the brake-caliper mounting tabs.</p>

                <CncUprightContent />
              </section>
            )}

            {details.bajaUpright && (
              <section id="welded-upright" className="baja-work-section" aria-labelledby="welded-upright-title">
                <div className="baja-work-section__heading">
                  <div><span className="eyebrow">02 / WELDED UPRIGHT</span><h2 id="welded-upright-title">Bearing orientation & steering clearance</h2></div>
                  <span className="baja-state baja-state--ongoing">Calculations in progress</span>
                </div>
                <div className="baja-detail-grid">
                  {details.bajaUpright.welded.map((item) => <article key={item.heading}><h3>{item.heading}</h3><p>{item.text}</p></article>)}
                </div>
                <div className="baja-load-note"><span className="micro-label">PRELIMINARY VERTICAL LOAD</span><p>{details.bajaUpright.preliminaryLoad}</p><small>Load estimate only; structural and bearing-capacity checks are not complete.</small></div>
              </section>
            )}

            {project.workstreams && !details.bajaUpright && (
              <section aria-labelledby="project-workstreams-title">
                <span className="eyebrow">RELATED WORKSTREAMS</span>
                <h2 id="project-workstreams-title">Upright design paths</h2>
                <div className="detail-workstreams">
                  {project.workstreams.map((workstream) => (
                    <article key={workstream.title}>
                      <h3>{workstream.title}</h3>
                      <p>{workstream.summary}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {project.relatedWork && !details.bajaUpright && (
              <section className="planned-related" aria-labelledby="planned-related-title">
                <div className="related-project__heading">
                  <div>
                    <span className="eyebrow">FUTURE DIRECTION</span>
                    <h2 id="planned-related-title">{project.relatedWork.title}</h2>
                  </div>
                  <ProjectStatus status={project.relatedWork.status} inline />
                </div>
                <p>{project.relatedWork.summary}</p>
              </section>
            )}

            {project.relatedWork && details.bajaUpright && (
              <section id="portal-upright" className="planned-related" aria-labelledby="planned-related-title">
                <div className="related-project__heading">
                  <div><span className="eyebrow">03 / FUTURE DIRECTION</span><h2 id="planned-related-title">{project.relatedWork.title}</h2></div>
                  <ProjectStatus status={project.relatedWork.status} inline />
                </div>
                <p>{project.relatedWork.summary}</p>
              </section>
            )}

            {project.metrics && (
              <section aria-labelledby="project-metrics-title">
                <span className="eyebrow">{details.bajaUpright ? 'PROJECT FIGURES' : 'REPORTED FIGURES'}</span>
                <h2 id="project-metrics-title">Available metrics</h2>
                {project.metricContext && <p className="project-metrics__context">{project.metricContext}</p>}
                <div className="project-metrics">
                  {project.metrics.map((metric) => (
                    <div className="project-metric" key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>

        <nav className="project-detail-nav" aria-label="Project navigation">
          {nextProject ? <a className="text-link" href={sitePath(`/projects/${nextProject.id}`)}>Next: {nextProject.title} <span aria-hidden="true">→</span></a> : <a className="text-link" href={sitePath('/projects')}>Back to all projects <span aria-hidden="true">↗</span></a>}
          <a className="text-link" href={sitePath('/projects')}>All projects <span aria-hidden="true">↗</span></a>
        </nav>
      </main>
    </PageLayout>
  )
}

export default ProjectDetailPage
