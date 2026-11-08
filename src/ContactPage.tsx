import { PageLayout } from './components/PageLayout'
import { sitePath } from './sitePath'

const email = 'Prakulsherikar@utexas.edu'
const phone = '512-704-2855'
const phoneLink = '+15127042855'
const linkedInUrl = 'https://www.linkedin.com/in/prakul-sherikar'
const linkedInDisplay = 'www.linkedin.com/in/prakul-sherikar'

function ContactPage() {
  return (
    <PageLayout page="contact">
      <main id="main" className="contact-page section-wrap">
        <header className="contact-page__intro" aria-labelledby="contact-page-title">
          <span className="eyebrow">GET IN TOUCH</span>
          <h1 id="contact-page-title">Contact</h1>
          <p>I’m interested in mechanical engineering internships and opportunities to contribute to design, analysis, and manufacturing. Feel free to get in touch.</p>
        </header>

        <dl className="contact-details">
          <div>
            <dt>Email</dt>
            <dd><a href={`mailto:${email}`}>{email}</a></dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd><a href={`tel:${phoneLink}`}>{phone}</a></dd>
          </div>
          <div>
            <dt>LinkedIn</dt>
            <dd>
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <span className="contact-details__copyable">{linkedInDisplay}</span>
            </dd>
          </div>
          <div>
            <dt>Résumé</dt>
            <dd><a href={sitePath('/resume')}>View résumé <span aria-hidden="true">↗</span></a></dd>
          </div>
        </dl>
      </main>
    </PageLayout>
  )
}

export default ContactPage
