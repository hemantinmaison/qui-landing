import './QueryForm.css'

const textFields = [
  {
    className: 'field full-name',
    id: 'full-name',
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
  {
    className: 'field email',
    id: 'email',
    label: 'Email',
    placeholder: 'Enter Email Address',
    type: 'email',
  },
]

const phoneFields = [
  {
    className: 'field contact',
    id: 'contact',
    label: 'Contact Number',
  },
  {
    className: 'field alt-contact',
    id: 'alt-contact',
    label: 'Alt. Contact Number',
  },
]

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4L20 20M20 4L4 20" />
    </svg>
  )
}

function PhoneInput({ id }) {
  return (
    <div className="phone-input">
      <span className="country">+91</span>
      <span className="chevron" aria-hidden="true" />
      <input id={id} type="tel" placeholder="Enter Your Contact Number" />
    </div>
  )
}

function DesktopQueryForm() {
  return (
    <section className="query-shell" id="query" aria-label="Query form">
      <div className="query-panel">
        <h2>Query? Ask here..</h2>
        <form onSubmit={(event) => event.preventDefault()}>
          {textFields.map((field) => (
            <label className={field.className} htmlFor={field.id} key={field.id}>
              <span>{field.label}</span>
              <input
                id={field.id}
                type={field.type || 'text'}
                placeholder={field.placeholder}
              />
            </label>
          ))}

          {phoneFields.map((field) => (
            <label className={field.className} htmlFor={field.id} key={field.id}>
              <span>{field.label}</span>
              <PhoneInput id={field.id} />
            </label>
          ))}

          <label className="field message" htmlFor="message">
            <span>Message</span>
            <textarea id="message" placeholder="Type your query..." />
          </label>

          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}

function MobileQueryForm({ onClose }) {
  return (
    <section className="mobile-form-overlay" aria-label="Mobile query form">
      <div className="mobile-form-panel">
        <h2>Query? Ask here...</h2>
        <button
          className="overlay-close mobile-form-close"
          type="button"
          aria-label="Close query form"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <form onSubmit={(event) => event.preventDefault()}>
          <label className="mobile-form-field" htmlFor="mobile-full-name">
            <span>Full Name</span>
            <input
              id="mobile-full-name"
              type="text"
              placeholder="Enter your full name"
            />
          </label>
          <label className="mobile-form-field" htmlFor="mobile-email">
            <span>Email</span>
            <input
              id="mobile-email"
              type="email"
              placeholder="Enter Email Address"
            />
          </label>
          <label className="mobile-form-field" htmlFor="mobile-contact">
            <span>Contact Number</span>
            <div className="mobile-phone-input">
              <span>+91</span>
              <span className="chevron" aria-hidden="true" />
              <input
                id="mobile-contact"
                type="tel"
                placeholder="Enter Your Contact Number"
              />
            </div>
          </label>
          <label className="mobile-form-field mobile-message" htmlFor="mobile-message">
            <span>Message</span>
            <textarea id="mobile-message" placeholder="Type your query..." />
          </label>
          <button className="mobile-submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}

function QueryForm({ variant = 'desktop', onClose }) {
  if (variant === 'mobile') {
    return <MobileQueryForm onClose={onClose} />
  }

  return <DesktopQueryForm />
}

export default QueryForm
