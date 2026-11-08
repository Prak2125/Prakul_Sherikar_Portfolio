import { useEffect, useState, type KeyboardEvent } from 'react'
import { PageLayout } from './components/PageLayout'
import { Pill } from './components/Pill'
import { ProjectCard } from './components/ProjectCard'
import { projects } from './data/projects'
import { sitePath } from './sitePath'

const skills = ['Automotive engineering', 'Motorsports', 'Thermal systems', 'Robotics', 'Mechanical design']
const featuredProjects = projects.slice(0, 3)

function App() {
  const [activeProject, setActiveProject] = useState(0)
  const [isPaused, setIsPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (isPaused) return
    const timer = window.setInterval(() => setActiveProject((current) => (current + 1) % featuredProjects.length), 7000)
    return () => window.clearInterval(timer)
  }, [isPaused])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pauseForReducedMotion = (event: MediaQueryListEvent) => {
      if (event.matches) setIsPaused(true)
    }
    preference.addEventListener('change', pauseForReducedMotion)
    return () => preference.removeEventListener('change', pauseForReducedMotion)
  }, [])

  function moveCarousel(direction: -1 | 1) {
    setIsPaused(true)
    setActiveProject((current) => (current + direction + featuredProjects.length) % featuredProjects.length)
  }

  function handleCarouselKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    if (event.target !== event.currentTarget) return
    event.preventDefault()
    moveCarousel(event.key === 'ArrowRight' ? 1 : -1)
  }

  return (
    <PageLayout page="home">
      <main id="main">
        <section className="hero section-wrap" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="status-dot" /> Mechanical Engineering · UT Austin · Class of 2028</div>
            <h1 id="hero-title">Figuring out why things work <span>—</span> and making them work better.</h1>
            <p className="hero-intro">I’m Prakul, a mechanical engineering student drawn to vehicles, thermal systems, and the mechanisms that make ideas move. I like working from first principles, building in CAD, and learning from each design iteration.</p>
            <div className="hero-actions">
              <a className="button button--dark" href="#projects">Explore projects <span aria-hidden="true">↘</span></a>
              <a className="text-link" href={sitePath('/resume')}>Résumé <span aria-hidden="true">↗</span></a>
              <a className="text-link hero-contact-link" href={sitePath('/contact')}>Contact me</a>
            </div>
            <div className="hero-interests" aria-label="Engineering interests">
              {skills.map((skill) => <Pill key={skill}>{skill}</Pill>)}
            </div>
          </div>
          <div className="hero-aside" aria-label="Engineering sketch motif">
            <div className="hero-figure">
              <div className="orbit orbit--one" />
              <div className="orbit orbit--two" />
              <div className="orbit orbit--three" />
              <div className="figure-core"><span>PS</span></div>
              <span className="figure-label figure-label--top">DESIGN / ITERATE</span>
              <span className="figure-label figure-label--side">UT · ME 2028</span>
              <span className="figure-coordinate">30°17′ N<br />97°44′ W</span>
            </div>
            <p className="aside-note"><span>01 / 05</span> A little curiosity goes a long way.</p>
          </div>
          <a className="scroll-cue" href="#projects"><span>SCROLL TO EXPLORE</span><span aria-hidden="true">↓</span></a>
        </section>

        <section className="personal-section section-wrap" id="about" aria-labelledby="personal-title">
          <div className="personal-number">A LITTLE<br />OFF TRACK <span>↘</span></div>
          <div className="personal-copy">
            <span className="eyebrow">WHEN I’M NOT IN CAD</span>
            <h2 id="personal-title">Always finding ways<br />to engineer things<br /><em>into my life.</em></h2>
            <p>Sim racing is the hobby I come back to most. It led me to design and 3D print a steering wheel inspired by the Porsche 963. A fit check showed that V1 needs better thumb reach, which is guiding V2. I also enjoy tennis and pickleball, and hiking.</p>
          </div>
          <div className="personal-stamp" aria-hidden="true"><span>DRIVE<br />DESIGN<br />REPEAT</span><span className="stamp-arrow">↻</span></div>
        </section>

        <section className="projects-section section-wrap" id="projects" aria-labelledby="projects-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SELECTED WORK · 2025—NOW</span>
              <h2 id="projects-title">A few things<br /><em>I’ve worked on.</em></h2>
            </div>
            <p>Different problems, same instinct: get curious, make a model, and find out what the next version needs.</p>
          </div>
          <div className="project-carousel" role="region" aria-roledescription="carousel" aria-label="Selected projects" onFocusCapture={() => setIsPaused(true)} onPointerDown={(event) => { if (!(event.target as HTMLElement).closest('.project-carousel__play')) setIsPaused(true) }}>
            <div className="project-carousel__controls">
              <button type="button" aria-label="Previous project" onClick={() => moveCarousel(-1)}>←</button>
              <button type="button" aria-label="Next project" onClick={() => moveCarousel(1)}>→</button>
              <button type="button" className="project-carousel__play" aria-label={isPaused ? 'Play automatic project carousel' : 'Pause automatic project carousel'} onClick={() => setIsPaused(!isPaused)}>
                <span aria-hidden="true">{isPaused ? '▶' : 'Ⅱ'}</span>{isPaused ? 'Play' : 'Pause'}
              </button>
            </div>
            <div className="project-carousel__frame" tabIndex={0} aria-label="Project slide. Use left and right arrow keys to change projects." onKeyDown={handleCarouselKeyDown} aria-live={isPaused ? 'polite' : 'off'}>
              <div className="project-carousel__slide" key={featuredProjects[activeProject].id} aria-roledescription="slide" aria-label={`${activeProject + 1} of ${featuredProjects.length}`}>
                <ProjectCard project={featuredProjects[activeProject]} compact />
              </div>
            </div>
            <div className="project-carousel__pagination" role="group" aria-label="Choose a project">
              {featuredProjects.map((project, index) => <button type="button" key={project.id} aria-label={`Show project ${index + 1}: ${project.title}`} aria-current={activeProject === index ? 'true' : undefined} onClick={() => { setIsPaused(true); setActiveProject(index) }} />)}
            </div>
          </div>
          <a className="button button--dark all-projects-link" href={sitePath('/projects')}>View All Projects <span aria-hidden="true">↗</span></a>
        </section>
        <section className="closing-strip section-wrap" aria-label="Engineering interests">
          <span>Good design lives somewhere between the model and the real thing.</span>
          <span className="closing-mark">PS<span>·</span></span>
        </section>
      </main>
    </PageLayout>
  )
}

export default App
