import type { ReactNode } from 'react'
import type { ProjectDetailContent } from './data/projectDetails'
import { OnThisPage, type PageSectionLink } from './components/OnThisPage'

type ColdPlateData = NonNullable<ProjectDetailContent['coldPlate']>

const coldPlateSections: PageSectionLink[] = [
  { id: 'coldplate-requirements-title', label: 'Requirements & operating conditions' },
  { id: 'coldplate-method-title', label: 'Model setup & mesh check' },
  { id: 'coldplate-flow-title', label: 'Flow-rate study' },
  { id: 'coldplate-geometry-title', label: 'Geometry comparison' },
  { id: 'coldplate-heat-balance-title', label: 'Heat-balance check' },
]

function ResultsTable({ children, label }: { children: ReactNode; label: string }) {
  return <div className="coldplate-table-scroll" role="region" aria-label={label} tabIndex={0}><table>{children}</table></div>
}

export function ColdPlateCaseStudy({ data }: { data: ColdPlateData }) {
  const [flowFigure, ...temperatureFigures] = data.images

  return (
    <div className="case-study-with-nav coldplate-case-study">
      <OnThisPage sections={coldPlateSections} />
      <article className="coldplate-study" aria-label="Cold plate CFD case study">
      <section className="coldplate-study__section" aria-labelledby="coldplate-requirements-title">
        <div className="coldplate-study__heading"><span className="eyebrow">DESIGN BRIEF</span><h2 id="coldplate-requirements-title">01 — Requirements & operating conditions</h2></div>
        <div className="coldplate-spec-grid">
          {data.requirements.map((item) => <article key={item.label}><span className="micro-label">{item.label}</span><strong>{item.value}</strong></article>)}
        </div>
        <p className="coldplate-study__note">The report treats pressure drop as a secondary target because the acceptable budget depends on the application.</p>
      </section>

      <section className="coldplate-study__section" aria-labelledby="coldplate-method-title">
        <div className="coldplate-study__heading"><span className="eyebrow">METHOD</span><h2 id="coldplate-method-title">02 — Model setup & mesh check</h2></div>
        <ul className="coldplate-method-list">{data.method.map((item) => <li key={item}>{item}</li>)}</ul>
        <h3>Mesh-independence comparison</h3>
        <ResultsTable label="Mesh-independence results">
          <thead><tr><th scope="col">Mesh</th><th scope="col">Global size</th><th scope="col">Elements</th><th scope="col">Peak temperature</th><th scope="col">ΔP</th><th scope="col">Thermal resistance (°C/W)</th><th scope="col">Reported change</th></tr></thead>
          <tbody>{data.meshStudy.map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{row.globalSize}</td><td>{row.elementCount}</td><td>{row.maxTemperature}</td><td>{row.pressureDrop}</td><td>{row.thermalResistance}</td><td>{row.change}</td></tr>)}</tbody>
        </ResultsTable>
        <p className="coldplate-study__note">The report lists 1 mm local refinement at the heat source and four inflation layers for the extra-fine case.</p>
      </section>

      <section className="coldplate-study__section" aria-labelledby="coldplate-flow-title">
        <div className="coldplate-study__heading"><span className="eyebrow">FLOW-RATE STUDY</span><h2 id="coldplate-flow-title">03 — Flow-rate study</h2></div>
        <h3 className="coldplate-study__subheading">Thermal performance rises with flow</h3>
        <div className="coldplate-editorial-row">
          <figure className="coldplate-figure coldplate-figure--chart"><img src={flowFigure.src} alt={flowFigure.alt} loading="lazy" /><figcaption>{flowFigure.caption}</figcaption></figure>
          <div className="coldplate-flow-copy"><p>The reported sweep shows lower peak source temperature and thermal resistance at higher flow rates, alongside increasing pressure drop.</p><ResultsTable label="Flow-rate sweep results">
            <thead><tr><th scope="col">Flow</th><th scope="col">Peak source temp.</th><th scope="col">ΔP</th><th scope="col">Thermal resistance (°C/W)</th></tr></thead>
            <tbody>{data.flowSweep.map((row) => <tr key={row.flow}><th scope="row">{row.flow}</th><td>{row.maxTemperature}</td><td>{row.pressureDrop}</td><td>{row.thermalResistance}</td></tr>)}</tbody>
          </ResultsTable></div>
        </div>
        <p className="coldplate-study__note">The selected setup used 0.75 L/min and six channels based on diminishing returns. This is the chosen operating point for this study, not a universal optimum.</p>
      </section>

      <section className="coldplate-study__section" aria-labelledby="coldplate-geometry-title">
        <div className="coldplate-study__heading"><span className="eyebrow">GEOMETRY COMPARISON</span><h2 id="coldplate-geometry-title">04 — Geometry comparison</h2></div>
        <h3 className="coldplate-study__subheading">Pin-fin trade-off against straight and serpentine channels</h3>
        <div className="coldplate-comparison-notes" aria-label="Separate optimization comparisons">
          <article><span className="micro-label">THERMAL RESISTANCE / FLOW BASELINE</span><p>From the original 0.3 L/min baseline to the optimized straight-channel design, thermal resistance fell 21%: <strong>0.1275 → 0.1009 °C/W</strong>.</p></article>
          <article><span className="micro-label">PRESSURE DROP / 0.75 L/MIN</span><p>Straight-channel and manifold optimization reduced pressure drop 11%: <strong>63.3 → 56.3 Pa</strong>.</p></article>
        </div>
        <ResultsTable label="Cold-plate geometry comparison results">
          <thead><tr><th scope="col">Reported design</th><th scope="col">Peak source temp.</th><th scope="col">ΔP</th><th scope="col">Thermal resistance (°C/W)</th><th scope="col">Report comparison</th></tr></thead>
          <tbody>{data.geometryComparison.map((row) => <tr key={row.design}><th scope="row">{row.design}</th><td>{row.maxTemperature}</td><td>{row.pressureDrop}</td><td>{row.thermalResistance}</td><td>{row.reportedTradeoff}</td></tr>)}</tbody>
        </ResultsTable>
        <p className="coldplate-study__selection">{data.selectionNote}</p>
        <div className="coldplate-figure-grid">{temperatureFigures.map((figure) => <figure className="coldplate-figure" key={figure.src}><img src={figure.src} alt={figure.alt} loading="lazy" /><figcaption>{figure.caption}</figcaption></figure>)}</div>
      </section>

      <section className="coldplate-study__section" aria-labelledby="coldplate-heat-balance-title">
        <div className="coldplate-study__heading"><span className="eyebrow">HEAT BALANCE</span><h2 id="coldplate-heat-balance-title">05 — Heat-balance check</h2></div>
        <p className="coldplate-balance-note">{data.heatBalanceNote}</p>
      </section>
      </article>
    </div>
  )
}
