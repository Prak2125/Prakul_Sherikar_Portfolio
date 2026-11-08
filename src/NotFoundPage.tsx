import { PageLayout } from './components/PageLayout'
import { sitePath } from './sitePath'

function NotFoundPage() {
  return (
    <PageLayout page="home">
      <main id="main" className="not-found-page section-wrap">
        <span className="eyebrow">404 · NOT FOUND</span>
        <h1>That page isn’t here.</h1>
        <p>Use the links below to return to the portfolio.</p>
        <div className="not-found-actions">
          <a className="button button--dark" href={sitePath('/')}>Home</a>
          <a className="text-link" href={sitePath('/projects')}>Browse projects <span aria-hidden="true">↗</span></a>
        </div>
      </main>
    </PageLayout>
  )
}

export default NotFoundPage
