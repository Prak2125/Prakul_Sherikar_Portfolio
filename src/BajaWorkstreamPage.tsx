import { useRef } from 'react'
import { PageLayout } from './components/PageLayout'
import { ProjectStatus } from './components/ProjectStatus'
import { projectDetails } from './data/projectDetails'
import { CncUprightContent } from './CncUprightContent'
import { sitePath } from './sitePath'

const links = [
  { label: 'CNC-Machined Upright', href: '/projects/baja-upright/cnc-upright' },
  { label: 'Welded Upright', href: '/projects/baja-upright/welded-upright' },
  { label: 'Portal Upright Research', href: '/projects/baja-upright/portal-upright' },
]

interface BajaWorkstreamPageProps {
  workstream: 'cnc-upright' | 'welded-upright' | 'portal-upright'
}

function WorkstreamNavigation({ current }: { current: BajaWorkstreamPageProps['workstream'] }) {
  return (
    <nav className="baja-workstream-nav" aria-label="Baja project pages">
      {links.map((link) => <a href={sitePath(link.href)} aria-current={link.href.endsWith(current) ? 'page' : undefined} key={link.href}>{link.label}</a>)}
    </nav>
  )
}

function CalculationFigure({ src, alt, title }: { src: string; alt: string; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  return (
    <figure className="welded-calculation-figure">
      <button className="welded-calculation-figure__image-button" type="button" aria-label={`Enlarge calculation: ${title}`} onClick={() => dialogRef.current?.showModal()}>
        <img src={src} alt={alt} loading="lazy" />
        <span>Click to enlarge</span>
      </button>
      <figcaption>{title}</figcaption>
      <dialog ref={dialogRef} className="welded-calculation-dialog" aria-label={`Enlarged calculation: ${title}`}>
        <div className="welded-calculation-dialog__bar"><strong>{title}</strong><button type="button" onClick={() => dialogRef.current?.close()}>Close image</button></div>
        <img src={src} alt={alt} />
      </dialog>
    </figure>
  )
}

function WeldedUprightContent() {
  const detail = projectDetails['baja-upright'].bajaUpright!
  return (
    <>
      <section className="baja-detail-section" aria-labelledby="welded-summary-title">
        <span className="eyebrow">BACKUP UPRIGHT / IN DEVELOPMENT</span><h2 id="welded-summary-title">Changing the bearing orientation</h2>
        <p className="baja-detail-copy">This is a spindle-based welded backup concept with the same basic job as the CNC upright: carry the wheel bearing and connect the rotating wheel-end to suspension, steering, and brake interfaces. The current design work responds to the previous season’s steering-clearance limitation while fitting the team’s fabrication approach.</p>
        <div className="baja-detail-grid">{detail.welded.map((item) => <article key={item.heading}><h3>{item.heading}</h3><p>{item.text}</p></article>)}</div>
      </section>
      <section id="welded-bearing-analysis" className="baja-detail-section welded-bearing-assessment" aria-labelledby="welded-load-title">
        <span className="eyebrow">WELDED UPRIGHT / BEARING ANALYSIS IN PROGRESS</span><h2 id="welded-load-title">Cornering loads & bearing-life assessment</h2>
        <p className="welded-bearing-assessment__lead">What tire load and bearing reactions should the outside-front wheel see during steady-state cornering on flat ground? These handwritten calculations set up a simplified case before the ongoing bearing assessment.</p>
        <p className="welded-bearing-assessment__status">Hand calculations completed for the simplified cornering case; SKF SimPro Quick assessment in progress.</p>

        <div className="welded-calculation-row">
          <CalculationFigure src={sitePath('/assets/projects/baja-welded/cornering-assumptions-tire-loads.png')} alt="Original handwritten steady-state cornering calculations, including lateral acceleration, lateral load transfer, outside-front vertical tire load, axial tire load, and a free-body diagram." title="Cornering assumptions and tire loads" />
          <div className="welded-calculation-copy">
            <h3>Cornering assumptions and tire loads</h3>
            <p>The sheet estimates outside-front tire loading from a steady-state flat-ground case. Its inputs are grouped here so the assumptions stay visible beside the source arithmetic.</p>
            <table className="welded-assumption-table"><tbody>
              <tr><th scope="row">Road / maneuver</th><td>Flat ground; steady-state cornering</td></tr>
              <tr><th scope="row">Lateral acceleration</th><td>0.75g</td></tr>
              <tr><th scope="row">Front / rear static split</th><td>40 / 60</td></tr>
              <tr><th scope="row">Front share of lateral transfer</th><td>40%</td></tr>
              <tr><th scope="row">Total vehicle weight</th><td>2,670 N</td></tr>
              <tr><th scope="row">CG height / track</th><td>0.74631 m / 1.1335 m</td></tr>
            </tbody></table>
          </div>
        </div>

        <div className="welded-calculation-row welded-calculation-row--bearing">
          <CalculationFigure src={sitePath('/assets/projects/baja-welded/bearing-reactions-life-requirement.png')} alt="Original handwritten bearing-load equations with pressure-center geometry, calculated inner and outer row radial reactions, service-life requirement arithmetic, and a note that row-level axial loading and life verification are pending." title="Bearing reactions and life requirement" />
          <div className="welded-bearing-assessment__results welded-bearing-assessment__results-copy">
            <h3>Bearing reactions and life requirement</h3>
            <p>The hand sheet carries these geometry values: <strong>R<sub>s</sub> = 0.2921 m, a = b = 0.018 m, and l = 0.036 m.</strong> NTN’s <em>Hub Bearings</em> guide (pp. 08–09) defines the effective-radius and pressure-cone symbols; that diagram alone does not establish the numeric dimensions for the selected bearing. The calculation sheet does not identify the bearing model or tie each value to a catalog page.</p>
            <div className="welded-bearing-assessment__hand-results" aria-label="Hand-calculated row reactions and handwritten life requirement">
              <div><span>Outer-row radial reaction, F<sub>ro</sub></span><strong>5,928.29 N</strong></div>
              <div><span>Inner-row radial reaction, F<sub>ri</sub></span><strong>6,989.68 N</strong></div>
              <div><span>Handwritten life requirement</span><strong>51 h</strong></div>
            </div>
            <p>The reactions and requirement are transcribed from the sheet; they are not a predicted bearing life. SKF SimPro Quick evaluation and comparison with the hand method remain in progress.</p>
            <p className="welded-calculation-workflow"><strong>Next:</strong> evaluate bearing loading and rating life in SimPro Quick, then compare the software output with this simplified hand calculation.</p>
          </div>
        </div>

        <p className="welded-bearing-assessment__limit">The hand calculation checks arithmetic for the stated assumptions; it does not validate the physical load model. <a href={sitePath('/Baja%20Calculations%20(2).pdf')} target="_blank" rel="noreferrer">Open the original handwritten calculation PDF</a>.</p>
        <div className="baja-load-note welded-bearing-assessment__vertical-load"><span className="micro-label">SEPARATE PRELIMINARY VERTICAL-LOAD ESTIMATE</span><p>{detail.preliminaryLoad}</p><small>This welded-design estimate is separate from the steady-state cornering case above.</small></div>
        <p className="baja-detail-copy">The available hand calculations are for this welded design. Informal benchmarking against Cornell informed reconsideration of the original loading assumptions; no revised numerical loads are stated here.</p>
      </section>
    </>
  )
}

function PortalUprightContent() {
  return <p className="baja-detail-copy">A separate portal-upright research track.</p>
}

function BajaWorkstreamPage({ workstream }: BajaWorkstreamPageProps) {
  const isCnc = workstream === 'cnc-upright'
  const isWelded = workstream === 'welded-upright'
  const title = isCnc ? 'CNC-Machined Upright' : isWelded ? 'Welded Upright' : 'Portal Upright Research'
  const summary = isCnc
    ? 'I designed and delivered CNC hardware installed on the vehicle, incorporating separate lower control-arm and brake-caliper FEA iterations and manufacturing feedback.'
    : isWelded
      ? 'I am developing a spindle-based welded backup with vertical spherical-bearing mounting.'
      : 'A separate portal-upright research track.'

  return (
    <PageLayout page="projects">
      <main id="main" className={`baja-workstream-page section-wrap${isCnc ? ' baja-workstream-page--cnc' : ''}`}>
        <nav className="breadcrumbs" aria-label="Breadcrumb"><a href={sitePath('/')}>Home</a><span aria-hidden="true">/</span><a href={sitePath('/projects')}>Projects</a><span aria-hidden="true">/</span><a href={sitePath('/projects/baja-upright')}>Longhorn Baja SAE</a><span aria-hidden="true">/</span><span aria-current="page">{title}</span></nav>
        <header className="baja-workstream-hero">
          <div className="baja-workstream-hero__meta"><span className="eyebrow">LONGHORN BAJA SAE / PROJECT 0{isCnc ? '1' : isWelded ? '2' : '3'}</span>{isCnc ? <span className="baja-state">Manufactured and installed · Baja SAE Ohio 2026</span> : <ProjectStatus status={isWelded ? 'In progress' : 'Upcoming'} inline />}</div>
          <h1>{title}</h1><p>{summary}</p>
        </header>
        <WorkstreamNavigation current={workstream} />
        <div className="baja-workstream-content">
          {isCnc ? <CncUprightContent /> : isWelded ? <WeldedUprightContent /> : <PortalUprightContent />}
        </div>
        <nav className="project-detail-nav" aria-label="Project navigation"><a className="text-link" href={sitePath('/projects/baja-upright')}>Back to Baja project hub <span aria-hidden="true">↗</span></a><a className="text-link" href={sitePath('/projects')}>All projects <span aria-hidden="true">↗</span></a></nav>
      </main>
    </PageLayout>
  )
}

export default BajaWorkstreamPage
