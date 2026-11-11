import { lazy, Suspense, useRef, type ReactNode } from 'react'
import { OnThisPage, type PageSectionLink } from './components/OnThisPage'
import { projectDetails } from './data/projectDetails'
import { sitePath } from './sitePath'

const CadModelViewer = lazy(() => import('./components/CadModelViewer').then(({ CadModelViewer }) => ({ default: CadModelViewer })))

const detail = projectDetails['baja-upright'].bajaUpright!

const cncSections: PageSectionLink[] = [
  { id: 'cnc-overview', label: 'Overview & constraints' },
  { id: 'cnc-load-section', label: 'Establishing the loads' },
  { id: 'cnc-geometry-section', label: 'Developing the geometry' },
  { id: 'cnc-fea-decisions', label: 'FEA & design decisions' },
  { id: 'cnc-manufacturing-interfaces', label: 'Manufacturing & interfaces' },
  { id: 'cnc-competition-takeaways', label: 'Competition & takeaways' },
]

interface EditorialProps {
  id: string
  eyebrow: string
  title: string
  caption?: string
  figure?: ReactNode
  reverse?: boolean
  featured?: boolean
  children: ReactNode
}

function Editorial({ id, eyebrow, title, caption, figure, reverse = false, featured = false, children }: EditorialProps) {
  return <section className={`baja-editorial-section${reverse ? ' baja-editorial-section--reverse' : ''}${featured ? ' baja-editorial-section--featured' : ''}`} aria-labelledby={id}><div className={`baja-editorial-row${figure ? '' : ' baja-editorial-row--text-only'}`}>{figure && <figure className="baja-editorial-figure">{figure}{caption && <figcaption>{caption}</figcaption>}</figure>}<div className="baja-editorial-copy"><span className="eyebrow">{eyebrow}</span><h3 id={id}>{title}</h3>{children}</div></div></section>
}

const controlArmFigures = {
  concentration: sitePath('/assets/projects/baja-cnc/control-arm-stress-closeup-max-470-37.png'),
  thickerWallCad: sitePath('/assets/projects/baja-cnc/control-arm-thicker-wall-cad.png'),
  thickerWallFea: sitePath('/assets/projects/baja-cnc/control-arm-thicker-wall-fea-317-61-max.png'),
  stress274: sitePath('/assets/projects/baja-cnc/control-arm-von-mises-274-05-mpa.png'),
  filletedCad: sitePath('/assets/projects/baja-cnc/control-arm-filleted-geometry-context.png'),
}

function CncEvidenceFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return <figure className="cnc-fea-evidence-figure">
    <button className="cnc-fea-evidence-figure__trigger" type="button" aria-label={`Enlarge image: ${caption}`} onClick={() => dialogRef.current?.showModal()}>
      <img src={src} alt={alt} loading="lazy" />
      <span>Click to enlarge</span>
    </button>
    <figcaption>{caption}<span>Click image to enlarge</span></figcaption>
    <dialog ref={dialogRef} className="cnc-fea-image-dialog" aria-label={`Enlarged figure: ${caption}`}>
      <div className="cnc-fea-image-dialog__bar"><strong>{caption}</strong><button type="button" onClick={() => dialogRef.current?.close()}>Close image</button></div>
      <img src={src} alt={alt} />
    </dialog>
  </figure>
}

const uprightCallouts = [
  'Upper control-arm pickup',
  'Lower control-arm pickup',
  'Bearing bore and retention',
  'Brake-caliper mounting tabs',
  'Steering tie-rod connection',
]

function AnnotatedUprightIllustration() {
  return <figure className="annotated-upright">
    <div className="annotated-upright__canvas" role="img" aria-label="Original isometric CAD image annotated at the upper control-arm hole, lower control-arm pickup region, bearing bore, brake-caliper tabs, and steering tie-rod ears">
      <svg viewBox="0 0 900 650" aria-hidden="true">
        <image href={sitePath('/Upright%20CAD%20Isometric%20Image.jpg')} x="182.5" y="0" width="535" height="650" preserveAspectRatio="none" />
        <g className="annotated-upright__leaders">
          <path d="M392.5 101 L350 74 H200" /><circle cx="392.5" cy="101" r="4" />
          <path d="M442.5 520 L405 570 H190" /><circle cx="442.5" cy="520" r="4" />
          <path d="M464.5 347 L500 380 H650" /><circle cx="464.5" cy="347" r="4" />
          <path d="M529.5 270 L560 320" /><circle cx="529.5" cy="270" r="4" />
          <path d="M527.5 368 L560 320" /><circle cx="527.5" cy="368" r="4" />
          <path d="M560 320 L690 242 H714" />
          <path d="M324.5 374 L300 410" /><circle cx="324.5" cy="374" r="4" />
          <path d="M324.5 445 L300 410" /><circle cx="324.5" cy="445" r="4" />
          <path d="M300 410 H140" />
        </g>
        <g className="annotated-upright__labels">
          <text x="20" y="74" dominantBaseline="middle">Upper control-arm pickup</text>
          <text x="20" y="410" dominantBaseline="middle">Steering tie-rod</text>
          <text x="730" y="242" dominantBaseline="middle">Brake-caliper tabs</text>
          <text x="670" y="380" dominantBaseline="middle">Bearing bore &amp; retention</text>
          <text x="20" y="570" dominantBaseline="middle">Lower control-arm pickup</text>
        </g>
      </svg>
      <div className="annotated-upright__mobile-markers" aria-hidden="true">
        <span style={{ left: '43.6%', top: '15.5%' }}>1</span>
        <span style={{ left: '49.2%', top: '80%' }}>2</span>
        <span style={{ left: '51.6%', top: '53.4%' }}>3</span>
        <span style={{ left: '58.8%', top: '41.5%' }}>4</span><span style={{ left: '58.6%', top: '56.6%' }}>4</span>
        <span style={{ left: '36.1%', top: '57.5%' }}>5</span><span style={{ left: '35.9%', top: '68.5%' }}>5</span>
      </div>
    </div>
    <ol className="annotated-upright__key">{uprightCallouts.map((label) => <li key={label}>{label}</li>)}</ol>
    <figcaption>Original isometric CAD image with all five callouts. The lower leader marks the bottom C-bracket region because its hole is obscured here; the two side ears are one steering connection. The hub is a separate component.</figcaption>
  </figure>
}

function CncControlArmEvidence() {
  return <section id="carm-title" className="baja-detail-section cnc-control-arm-evidence" aria-labelledby="carm-heading">
    <div className="cnc-control-arm-evidence__heading"><span className="eyebrow">04A / LOWER CONTROL-ARM PICKUP</span><h3 id="carm-heading">Reinforcing the load path</h3><p className="baja-detail-copy">The lower control-arm pickup transfers suspension loads into the upright. I used FEA to assess this region, revise its geometry, and select the retained design.</p></div>

    <div className="cnc-control-arm-summary" aria-label="Lower control-arm design revision summary">
      <div><span>Initial geometry</span><strong>≈470 MPa</strong><small>Reinforcement required</small></div>
      <div><span>Reinforced geometry</span><strong>274.05 MPa</strong><small>Selected design</small></div>
      <div><span>Thicker-wall attempt</span><strong>317.61 MPa</strong><small>Rejected</small></div>
    </div>

    <div className="cnc-control-arm-stages">
      <article className="cnc-control-arm-stage">
        <div className="cnc-control-arm-stage__copy"><span className="micro-label">01 / INITIAL DESIGN</span><h4>Initial geometry — reinforcement required</h4><p>The initial FEA showed approximately 470 MPa peak stress at the lower control-arm pickup, above the 6061-T6 yield criterion used in the analysis. That finding led me to explore reinforcement in the pickup’s load path.</p></div>
        <div className="cnc-control-arm-stage__figures">
          <CncEvidenceFigure src={sitePath('/assets/projects/baja-cnc/initial-cnc-upright-before-fea.png')} alt="Original CNC upright CAD geometry before FEA-driven revisions" caption="Initial CNC upright geometry before FEA-driven reinforcement" />
          <CncEvidenceFigure src={controlArmFigures.concentration} alt="Initial stress-concentration close-up with a 470.37 maximum marker; the source result title and units are cropped" caption="Initial FEA close-up · approximately 470 MPa; title and units cropped in source" />
        </div>
      </article>

      <article className="cnc-control-arm-stage">
        <div className="cnc-control-arm-stage__copy"><span className="micro-label">02 / REINFORCED GEOMETRY — SELECTED</span><h4>Retain the reinforced pickup</h4><p>The reinforced geometry reported 274.05 MPa peak von Mises stress, below the 276 MPa yield criterion used in my analysis. I selected the deliberately severe combined case to prioritize survivability during endurance, rather than represent normal driving. I stopped pursuing further stress reduction because the changes I explored added mass. This comparison does not establish safety, fatigue life, or endurance reliability.</p></div>
        <div className="cnc-control-arm-stage__figures">
          <CncEvidenceFigure src={controlArmFigures.filletedCad} alt="CAD context of the reinforced lower control-arm pickup geometry selected for the CNC upright" caption="CAD · reinforced geometry" />
          <CncEvidenceFigure src={controlArmFigures.stress274} alt="Equivalent von Mises stress plot for the reinforced lower control-arm pickup showing a 274.05 MPa maximum" caption="Selected geometry · 274.05 MPa equivalent von Mises stress" />
        </div>
      </article>

      <article className="cnc-control-arm-stage">
        <div className="cnc-control-arm-stage__copy"><span className="micro-label">03 / THICKER-WALL REVISION — REJECTED</span><h4>Reject the thicker-wall attempt</h4><p>For a further revision, I thickened the lower portions of both vertical walls of the lower pickup’s C-shaped bracket. Peak stress increased to 317.61 MPa. I locally refined the mesh around that concentration, and the peak remained approximately similar. This did not establish convergence or the physical cause of the increase. I rejected this attempt and reverted to the reinforced 274.05 MPa geometry shown above.</p></div>
        <div className="cnc-control-arm-stage__figures">
          <CncEvidenceFigure src={controlArmFigures.thickerWallCad} alt="CAD close-up of the thicker-wall revision with thicker lower portions of both vertical walls on the lower pickup’s C-shaped bracket" caption="CAD · thicker lower bracket walls" />
          <CncEvidenceFigure src={controlArmFigures.thickerWallFea} alt="Stress plot showing a 317.61 maximum and contour legend; the source result title is cropped" caption="317.61 MPa · source result title cropped" />
        </div>
      </article>
    </div>

  </section>
}

export function CncUprightContent() {
  return <div className="case-study-with-nav cnc-case-study">
    <OnThisPage sections={cncSections} />
    <article className="cnc-case-study__article">
    <section id="cnc-overview" data-cnc-section className="cnc-overview" aria-labelledby="cnc-overview-title">
      <div className="cnc-overview__copy"><span className="eyebrow">01 / CNC-MACHINED UPRIGHT</span><h2 id="cnc-overview-title">01 — Overview & constraints</h2></div>
      <div className="cnc-overview__narrative">
        <section><h3>What the upright does</h3><p>The upright is the non-rotating structure at the front wheel end. It holds the wheel bearing and links the wheel end to the suspension, steering tie rod, and brake caliper. The hub and wheel rotate within the bearing; the upright transfers loads between that rotating assembly and the vehicle.</p></section>
        <section><h3>The design task</h3><p>I developed a front upright that brought those interfaces together while carrying suspension, lateral, and braking loads. The design had to balance strength, stiffness, and mass with bearing integration, wheel packaging, and external 3-axis machining.</p></section>
        <section className="cnc-overview__contribution"><h3>My contribution as Unsprung Lead</h3><ul>
          <li>Designed the front-upright CAD and developed conservative load assumptions.</li>
          <li>Used ANSYS FEA to guide separate lower control-arm and brake-tab revisions.</li>
          <li>Selected the bearing arrangement and incorporated machinist and assembly feedback.</li>
          <li>Reduced front-upright mass by 15% relative to the original design.</li>
          <li>My scope was the upright; the hub was a separate component.</li>
        </ul></section>
        <section className="cnc-overview__constraints"><h3>Constraints & design consequences</h3><dl>
          <div><dt>Wheel size and brake caliper</dt><dd>Established early; the upright had to fit the wheel-end envelope.</dd></div>
          <div><dt>Suspension hardpoints</dt><dd>Evolved during development, requiring coordination and repeated packaging checks.</dd></div>
          <div><dt>Steering tie-rod connection</dt><dd>Established later, after much of the upright geometry existed.</dd></div>
          <div><dt>Bearing bore and retention</dt><dd>Defined interfaces for supporting and retaining the rotating wheel end.</dd></div>
          <div><dt>6061-T6 and external 3-axis machining</dt><dd>Geometry had to accommodate machinist access and manufacturing requirements.</dd></div>
        </dl></section>
      </div>
      <div className="cnc-overview__model">
        <div className="cnc-overview__model-heading"><span className="eyebrow">INTERACTIVE CAD</span><span>Drag to rotate · Scroll to zoom</span></div>
        <Suspense fallback={<div className="cad-viewer cad-viewer--loading" role="status">Preparing interactive model…</div>}><CadModelViewer /></Suspense>
        <AnnotatedUprightIllustration />
      </div>
    </section>

    <section id="cnc-load-section" data-cnc-section className="baja-detail-section cnc-load-section" aria-labelledby="cnc-load-title">
      <div className="cnc-load-section__intro"><span className="eyebrow">DESIGN LOAD DEVELOPMENT</span><h2 id="cnc-load-title">02 — Establishing the loads</h2><p className="baja-detail-copy">{detail.loadCaseRationale}</p></div>
      <div className="baja-load-cases">{detail.loadCases.map((load) => <div key={load.label}><span>{load.label}</span><strong>{load.value}</strong></div>)}</div>
      <div className="baja-ansys-note"><span className="micro-label">ANALYSIS SCOPE</span><p>{detail.ansysLoadApplication}</p></div>
      <p className="cnc-load-context">The CNC load case remains its own design assumption. Later hand calculations and ongoing bearing assessment support the welded backup; Cornell benchmarking informed that separate reconsideration. <a href={sitePath('/projects/baja-upright/welded-upright#welded-bearing-analysis')}>Revisiting the loading assumptions for the welded backup</a>.</p>
    </section>

    <div id="cnc-geometry-section" data-cnc-section className="cnc-case-study__group">
    <header className="case-study-chapter"><span className="eyebrow">03 / CNC UPRIGHT</span><h2>03 — Developing the geometry</h2><p>This chapter follows the starting CAD through wheel-envelope coordination and into the structural evaluation that follows.</p></header>
    <Editorial id="cnc-initial-geometry-title" eyebrow="STARTING GEOMETRY / BEFORE FEA" title="Place the wheel-end interfaces in the starting design" caption="Initial CNC upright geometry before FEA-driven reinforcement." figure={<img className="baja-editorial-image baja-editorial-image--initial-cad" src={sitePath('/assets/projects/baja-cnc/initial-cnc-upright-before-fea.png')} alt="Original CNC upright CAD geometry before FEA-driven revisions, shown in a clean front view" loading="eager" />}>
      <p className="baja-detail-copy">I began with this front-upright layout around the bearing bore, suspension pickups, and brake mounts. The wheel size and brake caliper were established early; suspension hardpoints evolved with the team’s design, and the steering tie-rod connection came later, after much of the upright geometry existed.</p>
    </Editorial>
    <Editorial id="cnc-wheel-envelope-title" eyebrow="HARDPOINT COORDINATION / CAD CHECK" title="Fit the evolving points within the wheel envelope">
      <p className="baja-detail-copy">The brake caliper and wheel size were established early, while suspension hardpoints continued to evolve. I coordinated with the suspension team and checked proposed points against the wheel envelope. One arrangement placed the upper C-shaped upright bracket inside that envelope, so it needed reconsideration.</p>
      <p className="baja-detail-copy">I used a 5 mm minimum-clearance target. The CAD configuration checked showed approximately 7 mm minimum clearance, meeting the target in that model. This was not a physical measurement or a check across the complete steering and suspension-travel envelope.</p>
    </Editorial>
    </div>

    <div id="cnc-fea-decisions" data-cnc-section className="cnc-case-study__group">
    <header className="case-study-chapter"><span className="eyebrow">04 / CNC UPRIGHT</span><h2>04 — FEA & design decisions</h2><p>The lower control-arm pickup and brake-caliper mounting tabs were separate concerns, so I evaluated and revised them independently.</p></header>
    <CncControlArmEvidence />

    <Editorial id="caliper-title" eyebrow="04B / BRAKE-CALIPER MOUNTING TABS" title="Adding material around the pockets">
      <p className="baja-detail-copy">The initial ANSYS analysis identified a concern at the upright’s brake-caliper mounting tabs, not the caliper body. The original design had pockets around the tabs, so I added material within those pockets while keeping this issue separate from lower control-arm reinforcement.</p>
      <p className="baja-detail-copy">The updated FEA showed qualitatively lower peak stress and smaller displacement. This comparison is qualitative and does not establish that the revised tabs passed validation.</p>
    </Editorial>
    </div>

    <div id="cnc-manufacturing-interfaces" data-cnc-section className="cnc-case-study__group">
    <header className="case-study-chapter"><span className="eyebrow">05 / CNC UPRIGHT</span><h2>05 — Manufacturing & interfaces</h2><p>Bearing integration and machinist feedback shaped how the upright was detailed for assembly and external 3-axis machining.</p></header>
    <Editorial id="bearing-interface-title" eyebrow="BEARING INTERFACE" title="Simplify the bearing arrangement and define retention">
      <div className="baja-bearing-facts"><div><span className="micro-label">BEARING</span><strong>Double-row angular-contact</strong><span>SKF, sourced through McMaster-Carr</span></div><div><span className="micro-label">BORE</span><strong>H7 tolerance specification</strong><span>Specified at the bearing interface</span></div><div><span className="micro-label">RETENTION</span><strong>Internal retaining ring</strong><span>Separate axial stop</span></div></div>
      <p className="baja-detail-copy">I selected a double-row angular-contact bearing to simplify the arrangement and assembly for that design cycle, compared with developing two tapered roller bearings or two single-row angular-contact bearings.</p>
      <p className="baja-detail-copy">The H7 callout specifies the bore tolerance; by itself it does not establish interference. The internal retaining ring serves a separate purpose by limiting axial movement.</p>
    </Editorial>

    <Editorial id="cnc-machined-geometry-title" eyebrow="MACHINED PART / FRONT AND REAR" title="Translate the design into machined geometry" caption="Combined front-facing and rear-facing views of the CNC-machined upright." figure={<img className="baja-editorial-image baja-editorial-image--combined" src={sitePath('/Baja%20Upright%20Picture%20(Machined).jpeg')} alt="Combined front-facing and rear-facing views of the CNC-machined front upright" loading="lazy" />}>
      <p className="baja-detail-copy">These paired views show the completed upright from both sides, including its bearing opening, suspension connections, and brake-mount region.</p>
    </Editorial>

    <Editorial id="wheel-end-context-title" eyebrow="WHEEL-END INTERFACE / SEPARATE ASSET" title="Upright and hub assembly context" caption="Separate hub assembly shown to illustrate the wheel-end interface." figure={<img className="baja-editorial-image baja-editorial-image--assembly" src={sitePath('/Upright%20and%20Hub%20Assembly%20Picture.jpeg')} alt="Front upright shown with the separate hub assembly to illustrate the wheel-end interface" loading="lazy" />}>
      <p className="baja-detail-copy">This assembly view shows how the upright interfaces with the separate hub and wheel-end components.</p>
    </Editorial>

    <section className="baja-detail-section cnc-manufacturing" aria-labelledby="cnc-manufacturing-title"><span className="eyebrow">MANUFACTURING FEEDBACK</span><h3 id="cnc-manufacturing-title">Adapt features to 3-axis machining access</h3><p className="baja-detail-copy">The upright uses 6061-T6 aluminum and an external 3-axis CNC process. Following the machinist’s feedback, I revised pocket angles and orientations relative to the machining setup, increased several fillet radii, and removed one pocket that was difficult to manufacture.</p></section>
    </div>

    <div id="cnc-competition-takeaways" data-cnc-section className="cnc-case-study__group">
    <header className="case-study-chapter"><span className="eyebrow">06 / CNC UPRIGHT</span><h2>06 — Competition & takeaways</h2><p>The installed view shows the upright in vehicle context. The observed hub failure is documented separately from upright design and FEA.</p></header>
    <Editorial id="installed-hardware-title" eyebrow="06 / INSTALLED HARDWARE" title="Upright in the vehicle" caption="Machined front upright installed within the suspension, brake, and wheel assembly." figure={<img className="baja-editorial-image baja-editorial-image--installed" src={sitePath('/assets/projects/baja/installed-upright-wheel-end-workshop.jpg')} alt="Machined front upright installed inside the wheel envelope, connected to the control arms, brake, and tire" width={1200} height={992} loading="lazy" />} reverse>
      <p className="baja-detail-copy">The installed view shows how the front upright sits within the vehicle’s wheel-end and suspension packaging. The pictured hub is a separate component; I designed the upright, not the hub.</p>
    </Editorial>

    <Editorial id="cnc-assembly-feedback-title" eyebrow="PROTOTYPE ASSEMBLY / BEFORE FINAL MACHINING" title="Resolve fit issues on printed prototypes" caption="Connecting the 3D-printed front upright prototype to the control arms during wheels-down assembly." figure={<img className="baja-editorial-image baja-editorial-image--assembly-photo" src={sitePath('/assets/projects/baja/prototype-upright-assembly.jpg')} alt="Team members connecting the white 3D-printed front upright prototype to the vehicle’s control arms" width={1200} height={939} loading="lazy" />}>
      <p className="baja-detail-copy">Before final machining, I 3D printed both front uprights and checked assembly with bolts, misalignment spacers, and the tie rod. I enlarged a difficult-to-access nut pocket, resized the tie-rod arm hole, and confirmed the weld-cup clearance cutout on the prototypes. These fit corrections were made before the final machined parts.</p>
      <p className="baja-detail-copy">Separately, the weld-cup, spherical bearing, and misalignment spacer interfered at suspension droop, leaving only a few degrees of steering in that position. Sanding the spacer helped only partly. With the car supported on a table, we raised the front control arms approximately two inches from their hanging position and fitted limit straps to restrict suspension extension. Steering clearance improved within that restricted travel envelope; the straps did not correct dimensional tolerances, and the approximate arm movement is not an exact wheel-travel reduction.</p>
    </Editorial>

    <section id="competition-feedback" className="baja-detail-section baja-failure-note" aria-labelledby="competition-feedback-title">
      <div className="baja-editorial-row">
        <figure className="baja-editorial-figure"><img className="baja-editorial-image baja-editorial-image--competition" src={sitePath('/assets/projects/baja/competition-vehicle-thumbs-up.jpg')} alt="Baja vehicle at competition with a driver inside giving a thumbs-up; the CNC-machined front uprights are installed" width={1600} height={998} loading="lazy" /><figcaption>The Baja vehicle at competition with my CNC-machined front uprights installed.</figcaption></figure>
        <div className="baja-editorial-copy"><span className="eyebrow">COMPETITION EXPERIENCE / SEPARATE COMPONENT</span><h3 id="competition-feedback-title" className="baja-failure-note__title">Front-left hub failure</h3><p className="baja-detail-copy">Following a collision, the rotor began contacting the caliper, and the driver reported increased resistance to rotation at the left wheel. The hub subsequently fractured and was reported to be very hot. Our team suspects fatigue contributed to the fracture, but the failure mechanism and the collision’s contribution have not been confirmed.</p><p className="baja-comparison__note">I designed the front upright, not the hub. This failure account is separate from the upright’s structural FEA.</p></div>
      </div>
    </section>
    </div>
    </article>
  </div>
}
