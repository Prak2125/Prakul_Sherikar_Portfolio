import { PageLayout } from './components/PageLayout'
import { Pill } from './components/Pill'
import { sitePath } from './sitePath'

const heroImage = sitePath('/assets/projects/baja/vehicle-golden-trees.jpg')
const cncCadImage = sitePath('/Upright%20CAD%20Isometric%20Image.jpg')

const frontUprightProjects = [
  {
    title: 'CNC-Machined Upright',
    status: 'Manufactured and installed · Baja SAE Ohio 2026',
    href: '/projects/baja-upright/cnc-upright',
    image: cncCadImage,
    imageAlt: 'Isometric CAD rendering of the complete CNC-machined front upright',
    description: 'I designed the 6061-T6 upright, incorporated FEA and manufacturing feedback, and delivered it for installation.',
  },
  {
    title: 'Welded Upright',
    href: '/projects/baja-upright/welded-upright',
    status: 'In development',
    description: 'I am developing a spindle-based backup with vertical spherical-bearing mounting; the manufacturing split is not finalized.',
  },
]

const portalResearch = {
  title: 'Portal Upright Research',
  status: 'Not started',
  href: '/projects/baja-upright/portal-upright',
  description: 'Separate portal-upright study.',
}

function ProjectCard({ item, index }: { item: (typeof frontUprightProjects)[number] | typeof portalResearch; index: number }) {
  const image = 'image' in item ? item.image : undefined
  const imageAlt = 'imageAlt' in item ? item.imageAlt : undefined
  return (
    <a className={`baja-project-card${image ? ' baja-project-card--cnc' : ''}`} href={sitePath(item.href)}>
      {image && imageAlt && <span className="baja-project-card__visual"><img src={image} alt={imageAlt} /><span className="baja-project-card__index">BAJA / 0{index + 1}</span></span>}
      <span className="baja-project-card__body">
        <span className="baja-project-card__meta">{!image && <span className="baja-project-card__meta-index">BAJA / 0{index + 1}</span>}<span className={`baja-project-card__status${item.status === 'Not started' ? ' baja-project-card__status--planned' : ''}`}>{item.status}</span><span className="baja-project-card__arrow" aria-hidden="true">↗</span></span>
        <strong>{item.title}</strong>
        <span>{item.description}</span>
        <span className="baja-project-card__action">View project details <span aria-hidden="true">→</span></span>
      </span>
    </a>
  )
}

const workflow = [
  ['Hand calculations & force/load calculations', 'cnc-upright'],
  ['Initial CAD, starting with a blocky form', 'cnc-upright'],
  ['FEA: stress and relevant outputs', 'cnc-upright'],
  ['Add, remove, or redistribute material', 'cnc-upright'],
  ['Manufacturability review for CNC', 'cnc-upright'],
  ['Critical dimensions & interface tolerances', 'cnc-upright'],
]

function BajaHubPage() {
  return (
    <PageLayout page="projects">
      <main id="main" className="baja-hub section-wrap">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <a href={sitePath('/')}>Home</a><span aria-hidden="true">/</span><a href={sitePath('/projects')}>Projects</a><span aria-hidden="true">/</span><span aria-current="page">Longhorn Baja SAE</span>
        </nav>

        <header className="baja-hub__hero">
          <div>
            <span className="eyebrow">PROJECT HUB / VEHICLE SYSTEMS</span>
            <h1>Longhorn Baja SAE</h1>
            <p>I designed the front upright for Longhorn Baja SAE, balancing structural loading, steering clearance, wheel-end interfaces, and manufacturability for the off-road vehicle.</p>
            <div className="baja-hub__role"><span className="micro-label">MY ROLE</span><strong>Unsprung Lead</strong><span>I incorporated FEA and manufacturing feedback into the CNC design and delivered hardware installed on the vehicle. The welded backup remains in development. I did not design the hub.</span></div>
          </div>
          <figure className="baja-hub__figure baja-hub__figure--scenic">
            <img src={heroImage} alt="Longhorn Baja vehicle in a grassy clearing with golden autumn trees behind it" width={1600} height={1017} loading="eager" />
            <figcaption>Longhorn Baja vehicle in a scenic setting</figcaption>
          </figure>
        </header>

        <section className="baja-snapshot" aria-label="Longhorn Baja project overview">
          <div className="baja-snapshot__context">
            <span className="eyebrow">PROJECT OVERVIEW</span>
            <h2>Front upright design & development</h2>
            <p>My contribution centers on the front upright: CAD geometry, load assumptions, FEA-guided iterations, bearing interfaces, and manufacturability.</p>
          </div>
          <dl className="baja-snapshot__facts">
            <div><dt>MY ROLE</dt><dd>Unsprung Lead · Front Upright Design</dd></div>
            <div><dt>CNC MATERIAL</dt><dd>6061-T6 aluminum</dd></div>
            <div><dt>ENGINEERING TOOLS</dt><dd>SolidWorks · Ansys FEA</dd></div>
            <div><dt>COMPETITION</dt><dd>2026 Baja SAE Ohio</dd></div>
          </dl>
          <div className="baja-snapshot__loads" aria-label="Upright design load assumptions">
            <span className="micro-label">DESIGN LOAD ASSUMPTIONS</span>
            <div><strong>7.15g</strong><span>Vertical</span></div>
            <div><strong>4g</strong><span>Lateral</span></div>
            <div><strong>2g</strong><span>Braking</span></div>
            <p>Engineering inputs developed for analysis; not presented as measured or externally prescribed loads.</p>
          </div>
        </section>

        <section className="baja-competition-summary" aria-labelledby="baja-competition-title">
          <div><span className="eyebrow">2026 BAJA SAE OHIO</span><h2 id="baja-competition-title">Competition feedback</h2></div>
          <p>Our team passed technical inspection and completed laps in endurance with the CNC front uprights installed. A collision and a subsequent front-left hub fracture were reported during the event; their relationship and the failure mechanism remain unconfirmed. <a href={sitePath('/projects/baja-upright/cnc-upright#competition-feedback')}>Read the account</a>.</p>
        </section>

        <section className="baja-projects" aria-labelledby="baja-projects-title">
          <div className="baja-hub__section-heading">
            <div><span className="eyebrow">FRONT UPRIGHT DEVELOPMENT</span><h2 id="baja-projects-title">Design & analysis paths</h2></div>
            <p>The CNC design and welded concept address the same front-upright role with different maturity and manufacturing constraints.</p>
          </div>
          <div className="baja-project-grid baja-project-grid--front">
            {frontUprightProjects.map((item, index) => <ProjectCard item={item} index={index} key={item.title} />)}
          </div>
        </section>

        <section className="baja-portal-research" aria-labelledby="portal-research-title">
          <div className="baja-hub__section-heading">
            <div><span className="eyebrow">SEPARATE RESEARCH TRACK</span><h2 id="portal-research-title">Portal upright research</h2></div>
            <p>A separate research track from the CNC and welded front-upright work.</p>
          </div>
          <div className="baja-project-grid baja-project-grid--research"><ProjectCard item={portalResearch} index={2} /></div>
        </section>

        <section className="baja-workflow" aria-labelledby="baja-workflow-title">
          <div className="baja-hub__section-heading">
            <div><span className="eyebrow">HOW I APPROACH THE WORK</span><h2 id="baja-workflow-title">Engineering workflow</h2></div>
            <p>This sequence summarizes the CNC design process; the welded backup follows a separate development path.</p>
          </div>
          <ol className="baja-workflow__steps">
            {workflow.map(([label, destination], index) => <li key={label}><a href={sitePath(`/projects/baja-upright/${destination}`)}><span>0{index + 1}</span><strong>{label}</strong><span aria-hidden="true">↗</span></a></li>)}
          </ol>
          <p className="baja-workflow__sequence">CNC path: calculations <span>→</span> initial CAD <span>→</span> FEA <span>→</span> geometry iteration <span>→</span> manufacturability <span>→</span> critical dimensions and tolerance checks</p>
        </section>
        <p className="baja-workflow__welded-note"><strong>Welded upright:</strong> active work on weld joints, spindle integration, bearing arrangement, fabrication, and clearance.</p>
        <nav className="project-detail-nav" aria-label="Project navigation"><a className="text-link" href={sitePath('/projects')}>All projects <span aria-hidden="true">↗</span></a><Pill tone="accent">Longhorn Baja SAE</Pill></nav>
      </main>
    </PageLayout>
  )
}

export default BajaHubPage
