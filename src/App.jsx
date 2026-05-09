import { useState } from 'react'
import backgroundArt from './assets/figma-bg.png'
import decorativeBottom from './assets/decorative-bottom.png'
import decorativeTop from './assets/decorative-top.png'
import quiLogo from './assets/qui-logo.png'
import QueryForm from './components/QueryForm'
import './App.css'

const menuItems = [
  'Branding',
  'Web Development',
  'Social Media Management',
  'Photography & Creative Direction',
  'Public Relation',
  'Events',
]

const scrollToTopOnMobile = () => {
  if (window.matchMedia('(max-width: 760px)').matches) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4L20 20M20 4L4 20" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.2" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 8H17V4h-3c-3.1 0-5 1.9-5 5v2H6v4h3v5h4v-5h3.1l.6-4H13V9.2c0-.8.5-1.2 1.5-1.2Z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 9h4v11H5V9Zm.2-4.2A2.2 2.2 0 1 1 9.6 5a2.2 2.2 0 0 1-4.4-.2ZM11 9h3.8v1.5h.1c.5-.9 1.8-1.8 3.7-1.8 4 0 4.4 2.6 4.4 6V20h-4v-4.8c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V20H11V9Z" />
    </svg>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false)

  const closeOverlays = () => {
    setIsMenuOpen(false)
    setIsMobileFormOpen(false)
  }

  return (
    <main className="landing-stage" aria-label="QUI Creatives landing page">
      <img className="gradient-art" src={backgroundArt} alt="" />
      <img className="decorative decorative-top" src={decorativeTop} alt="" />
      <img
        className="decorative decorative-mobile-top"
        src={decorativeTop}
        alt=""
      />
      <img
        className="decorative decorative-bottom"
        src={decorativeBottom}
        alt=""
      />

      <header className="site-header">
        <a className="wordmark" href="/" aria-label="QUI Creatives">
          QUI Creatives
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          onClick={() => {
            scrollToTopOnMobile()
            setIsMenuOpen(true)
            setIsMobileFormOpen(false)
          }}
        >
          <span />
          <span />
        </button>
      </header>

      <div className="logo-crop" aria-hidden="true">
        <img src={quiLogo} alt="" />
      </div>

      <section className="hero-copy" aria-label="Intro">
        <div className="headline-mask headline-mask-crafting" aria-hidden="true">
          <p>Crafting</p>
          <span />
        </div>
        <div className="headline-mask headline-mask-hypnotic" aria-hidden="true">
          <p>Hypnotic Brands!</p>
          <span />
        </div>
        <h1>
          <span>Crafting</span>
          <span>Hypnotic Brands!</span>
        </h1>
        <p>
          We are India’s first French-inspired creative atelier, a bridge
          between the élégance of Paris and the dynamism of India.
        </p>
      </section>

      <a className="portfolio-button" href="#query">
        Request Portfolio
      </a>

      <button
        className="mobile-query-button"
        type="button"
        onClick={() => {
          scrollToTopOnMobile()
          setIsMobileFormOpen(true)
          setIsMenuOpen(false)
        }}
      >
        <span>Query</span>
        <span className="mobile-query-chevron" aria-hidden="true" />
      </button>

      <QueryForm />

      {isMenuOpen && (
        <section className="menu-overlay" aria-label="Services menu">
          <button
            className="overlay-close menu-close"
            type="button"
            aria-label="Close menu"
            onClick={closeOverlays}
          >
            <CloseIcon />
          </button>
          <div className="menu-mobile-logo" aria-hidden="true">
            <img src={quiLogo} alt="" />
          </div>
          <img
            className="menu-mobile-top"
            src={decorativeTop}
            alt=""
            aria-hidden="true"
          />
          <ul className="menu-list">
            {menuItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="menu-socials" aria-label="Social links">
            <a href="/" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="/" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="/" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
          </div>
          <img
            className="menu-decoration"
            src={decorativeBottom}
            alt=""
            aria-hidden="true"
          />
        </section>
      )}

      {isMobileFormOpen && <QueryForm variant="mobile" onClose={closeOverlays} />}
    </main>
  )
}

export default App
