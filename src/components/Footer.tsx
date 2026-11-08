import { sitePath } from '../sitePath'

export function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <div>
          <span className="eyebrow">HAVE A PROJECT IN MIND?</span>
          <h2>Let’s talk<br /><em>engineering.</em></h2>
          <p>I’m always glad to connect with people who like understanding how things work.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a className="contact-placeholder" href={sitePath('/')}>Home</a>
          <a className="contact-placeholder" href={sitePath('/projects')}>Projects</a>
          <a className="contact-placeholder" href={sitePath('/resume')}>Résumé</a>
          <a className="contact-placeholder" href={sitePath('/contact')}>Contact</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>Prakul Sherikar · Mechanical Engineering · UT Austin</span>
        <a href={sitePath('/#top')}>Back to top ↑</a>
      </div>
    </footer>
  )
}
