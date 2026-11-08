import { PageLayout } from './components/PageLayout'
import { sitePath } from './sitePath'

const resumePdfPath = sitePath('/Resume_A1_Prakul_PC.pdf')

function ResumePage() {
  return (
    <PageLayout page="resume">
      <main id="main" className="resume-page section-wrap">
        <section className="resume-intro" aria-labelledby="resume-title">
          <span className="eyebrow">EXPERIENCE · EDUCATION · SELECTED WORK</span>
          <h1 id="resume-title">Résumé</h1>
          <p>A concise overview of my mechanical engineering education, experience, and project work.</p>
        </section>

        <div className="resume-actions" aria-label="Résumé PDF actions">
          <a className="button button--dark" href={resumePdfPath} download>Download Résumé</a>
          <a className="text-link" href={resumePdfPath} target="_blank" rel="noreferrer">Open PDF in New Tab <span aria-hidden="true">↗</span></a>
        </div>

        <div className="resume-preview">
          <iframe title="Prakul Sherikar résumé PDF preview" src={resumePdfPath}>
            <p>Your browser may not support the embedded PDF. Use the Download Résumé or Open PDF in New Tab links above.</p>
          </iframe>
        </div>
        <p className="resume-fallback">If the preview does not appear in your browser, use the download or new-tab link above.</p>
      </main>
    </PageLayout>
  )
}

export default ResumePage
