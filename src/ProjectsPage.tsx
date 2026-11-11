import { PageLayout } from './components/PageLayout'
import { ProjectCard } from './components/ProjectCard'
import { projects } from './data/projects'

function ProjectsPage() {
  return (
    <PageLayout page="projects">
      <main id="main" className="projects-page section-wrap">
        <header className="projects-page__intro" aria-labelledby="projects-page-title">
          <span className="eyebrow">SELECTED ENGINEERING WORK</span>
          <h1 id="projects-page-title">Projects</h1>
          <p>Vehicle design, thermal analysis, prototyping, and robotics work I have completed or am actively developing.</p>
        </header>
        <div className="project-list">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </main>
    </PageLayout>
  )
}

export default ProjectsPage
