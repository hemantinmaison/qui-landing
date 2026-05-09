import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { isValidPhoneNumber } from 'libphonenumber-js'
import './QueryForm.css'

const WEB3FORMS_ACCESS_KEY = '6b72d351-35a3-41e6-845f-2da04f04fa23'

const querySchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  countryCode: z.string(),
  contactNumber: z.string()
    .min(7, 'Number too short')
    .max(15, 'Number too long')
    .regex(/^\d+$/, 'Only digits allowed'),
  altCountryCode: z.string().optional(),
  altContactNumber: z.string().optional()
    .refine((val) => !val || (val.length >= 7 && val.length <= 15 && /^\d+$/.test(val)), {
      message: 'Invalid alternate number (7-15 digits only)',
    }),
  message: z.string().min(5, 'Message must be at least 5 characters'),
}).superRefine((data, ctx) => {
  // Validate primary phone with country code
  const fullPhone = `${data.countryCode}${data.contactNumber}`
  if (!isValidPhoneNumber(fullPhone)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Invalid phone number for selected country',
      path: ['contactNumber'],
    })
  }

  // Validate alternate phone if provided
  if (data.altContactNumber) {
    const fullAltPhone = `${data.altCountryCode}${data.altContactNumber}`
    if (!isValidPhoneNumber(fullAltPhone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Invalid alternate phone number',
        path: ['altContactNumber'],
      })
    }
  }
})

const countryCodes = [
  { code: '+93', country: 'AF' },
  { code: '+355', country: 'AL' },
  { code: '+213', country: 'DZ' },
  { code: '+376', country: 'AD' },
  { code: '+244', country: 'AO' },
  { code: '+1', country: 'AI' },
  { code: '+1', country: 'AG' },
  { code: '+54', country: 'AR' },
  { code: '+374', country: 'AM' },
  { code: '+297', country: 'AW' },
  { code: '+61', country: 'AU' },
  { code: '+43', country: 'AT' },
  { code: '+994', country: 'AZ' },
  { code: '+1', country: 'BS' },
  { code: '+973', country: 'BH' },
  { code: '+880', country: 'BD' },
  { code: '+1', country: 'BB' },
  { code: '+375', country: 'BY' },
  { code: '+32', country: 'BE' },
  { code: '+501', country: 'BZ' },
  { code: '+229', country: 'BJ' },
  { code: '+1', country: 'BM' },
  { code: '+975', country: 'BT' },
  { code: '+591', country: 'BO' },
  { code: '+387', country: 'BA' },
  { code: '+267', country: 'BW' },
  { code: '+55', country: 'BR' },
  { code: '+1', country: 'VG' },
  { code: '+673', country: 'BN' },
  { code: '+359', country: 'BG' },
  { code: '+226', country: 'BF' },
  { code: '+257', country: 'BI' },
  { code: '+855', country: 'KH' },
  { code: '+237', country: 'CM' },
  { code: '+1', country: 'CA' },
  { code: '+238', country: 'CV' },
  { code: '+1', country: 'KY' },
  { code: '+236', country: 'CF' },
  { code: '+235', country: 'TD' },
  { code: '+56', country: 'CL' },
  { code: '+86', country: 'CN' },
  { code: '+57', country: 'CO' },
  { code: '+269', country: 'KM' },
  { code: '+682', country: 'CK' },
  { code: '+506', country: 'CR' },
  { code: '+385', country: 'HR' },
  { code: '+53', country: 'CU' },
  { code: '+357', country: 'CY' },
  { code: '+420', country: 'CZ' },
  { code: '+243', country: 'CD' },
  { code: '+45', country: 'DK' },
  { code: '+253', country: 'DJ' },
  { code: '+1', country: 'DM' },
  { code: '+1', country: 'DO' },
  { code: '+593', country: 'EC' },
  { code: '+20', country: 'EG' },
  { code: '+503', country: 'SV' },
  { code: '+240', country: 'GQ' },
  { code: '+291', country: 'ER' },
  { code: '+372', country: 'EE' },
  { code: '+251', country: 'ET' },
  { code: '+500', country: 'FK' },
  { code: '+298', country: 'FO' },
  { code: '+679', country: 'FJ' },
  { code: '+358', country: 'FI' },
  { code: '+33', country: 'FR' },
  { code: '+594', country: 'GF' },
  { code: '+689', country: 'PF' },
  { code: '+241', country: 'GA' },
  { code: '+220', country: 'GM' },
  { code: '+995', country: 'GE' },
  { code: '+49', country: 'DE' },
  { code: '+233', country: 'GH' },
  { code: '+350', country: 'GI' },
  { code: '+30', country: 'GR' },
  { code: '+299', country: 'GL' },
  { code: '+1', country: 'GD' },
  { code: '+590', country: 'GP' },
  { code: '+1', country: 'GU' },
  { code: '+502', country: 'GT' },
  { code: '+224', country: 'GN' },
  { code: '+245', country: 'GW' },
  { code: '+592', country: 'GY' },
  { code: '+509', country: 'HT' },
  { code: '+504', country: 'HN' },
  { code: '+852', country: 'HK' },
  { code: '+36', country: 'HU' },
  { code: '+354', country: 'IS' },
  { code: '+91', country: 'IN' },
  { code: '+62', country: 'ID' },
  { code: '+98', country: 'IR' },
  { code: '+964', country: 'IQ' },
  { code: '+353', country: 'IE' },
  { code: '+972', country: 'IL' },
  { code: '+39', country: 'IT' },
  { code: '+225', country: 'CI' },
  { code: '+1', country: 'JM' },
  { code: '+81', country: 'JP' },
  { code: '+962', country: 'JO' },
  { code: '+7', country: 'KZ' },
  { code: '+254', country: 'KE' },
  { code: '+686', country: 'KI' },
  { code: '+965', country: 'KW' },
  { code: '+996', country: 'KG' },
  { code: '+856', country: 'LA' },
  { code: '+371', country: 'LV' },
  { code: '+961', country: 'LB' },
  { code: '+266', country: 'LS' },
  { code: '+231', country: 'LR' },
  { code: '+218', country: 'LY' },
  { code: '+423', country: 'LI' },
  { code: '+370', country: 'LT' },
  { code: '+352', country: 'LU' },
  { code: '+853', country: 'MO' },
  { code: '+389', country: 'MK' },
  { code: '+261', country: 'MG' },
  { code: '+265', country: 'MW' },
  { code: '+60', country: 'MY' },
  { code: '+960', country: 'MV' },
  { code: '+223', country: 'ML' },
  { code: '+356', country: 'MT' },
  { code: '+692', country: 'MH' },
  { code: '+596', country: 'MQ' },
  { code: '+222', country: 'MR' },
  { code: '+230', country: 'MU' },
  { code: '+262', country: 'YT' },
  { code: '+52', country: 'MX' },
  { code: '+691', country: 'FM' },
  { code: '+373', country: 'MD' },
  { code: '+377', country: 'MC' },
  { code: '+976', country: 'MN' },
  { code: '+382', country: 'ME' },
  { code: '+1', country: 'MS' },
  { code: '+212', country: 'MA' },
  { code: '+258', country: 'MZ' },
  { code: '+95', country: 'MM' },
  { code: '+264', country: 'NA' },
  { code: '+674', country: 'NR' },
  { code: '+977', country: 'NP' },
  { code: '+31', country: 'NL' },
  { code: '+599', country: 'AN' },
  { code: '+687', country: 'NC' },
  { code: '+64', country: 'NZ' },
  { code: '+505', country: 'NI' },
  { code: '+227', country: 'NE' },
  { code: '+234', country: 'NG' },
  { code: '+683', country: 'NU' },
  { code: '+672', country: 'NF' },
  { code: '+850', country: 'KP' },
  { code: '+1', country: 'MP' },
  { code: '+47', country: 'NO' },
  { code: '+968', country: 'OM' },
  { code: '+92', country: 'PK' },
  { code: '+680', country: 'PW' },
  { code: '+970', country: 'PS' },
  { code: '+507', country: 'PA' },
  { code: '+675', country: 'PG' },
  { code: '+595', country: 'PY' },
  { code: '+51', country: 'PE' },
  { code: '+63', country: 'PH' },
  { code: '+48', country: 'PL' },
  { code: '+351', country: 'PT' },
  { code: '+1', country: 'PR' },
  { code: '+974', country: 'QA' },
  { code: '+242', country: 'CG' },
  { code: '+262', country: 'RE' },
  { code: '+40', country: 'RO' },
  { code: '+7', country: 'RU' },
  { code: '+250', country: 'RW' },
  { code: '+290', country: 'SH' },
  { code: '+1', country: 'KN' },
  { code: '+1', country: 'LC' },
  { code: '+508', country: 'PM' },
  { code: '+1', country: 'VC' },
  { code: '+685', country: 'WS' },
  { code: '+378', country: 'SM' },
  { code: '+239', country: 'ST' },
  { code: '+966', country: 'SA' },
  { code: '+221', country: 'SN' },
  { code: '+381', country: 'RS' },
  { code: '+248', country: 'SC' },
  { code: '+232', country: 'SL' },
  { code: '+65', country: 'SG' },
  { code: '+421', country: 'SK' },
  { code: '+386', country: 'SI' },
  { code: '+677', country: 'SB' },
  { code: '+252', country: 'SO' },
  { code: '+27', country: 'ZA' },
  { code: '+82', country: 'KR' },
  { code: '+34', country: 'ES' },
  { code: '+94', country: 'LK' },
  { code: '+249', country: 'SD' },
  { code: '+597', country: 'SR' },
  { code: '+268', country: 'SZ' },
  { code: '+46', country: 'SE' },
  { code: '+41', country: 'CH' },
  { code: '+963', country: 'SY' },
  { code: '+886', country: 'TW' },
  { code: '+992', country: 'TJ' },
  { code: '+255', country: 'TZ' },
  { code: '+66', country: 'TH' },
  { code: '+228', country: 'TG' },
  { code: '+690', country: 'TK' },
  { code: '+676', country: 'TO' },
  { code: '+1', country: 'TT' },
  { code: '+216', country: 'TN' },
  { code: '+90', country: 'TR' },
  { code: '+993', country: 'TM' },
  { code: '+1', country: 'TC' },
  { code: '+688', country: 'TV' },
  { code: '+256', country: 'UG' },
  { code: '+380', country: 'UA' },
  { code: '+971', country: 'AE' },
  { code: '+44', country: 'GB' },
  { code: '+1', country: 'US' },
  { code: '+598', country: 'UY' },
  { code: '+998', country: 'UZ' },
  { code: '+678', country: 'VU' },
  { code: '+379', country: 'VA' },
  { code: '+58', country: 'VE' },
  { code: '+84', country: 'VN' },
  { code: '+1', country: 'VI' },
  { code: '+681', country: 'WF' },
  { code: '+967', country: 'YE' },
  { code: '+260', country: 'ZM' },
  { code: '+263', country: 'ZW' },
]

const textFields = [
  {
    className: 'field full-name',
    id: 'full-name',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
  {
    className: 'field email',
    id: 'email',
    label: 'Email',
    placeholder: 'Enter Email Address',
    type: 'email',
    required: true,
  },
]

const phoneFields = [
  {
    className: 'field contact',
    id: 'contact',
    label: 'Contact Number',
    required: true,
  },
  {
    className: 'field alt-contact',
    id: 'alt-contact',
    label: 'Alt. Contact Number',
    required: false,
  },
]

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4L20 20M20 4L4 20" />
    </svg>
  )
}

function PhoneInput({ id, register, selectName, inputName, error }) {
  return (
    <div className={`phone-input-wrapper ${error ? 'has-error' : ''}`}>
      <div className="phone-input">
        <select className="country-select" defaultValue="+91" {...register(selectName)}>
          {countryCodes.map((country, index) => (
            <option key={`${country.country}-${index}`} value={country.code}>
              {country.country} ({country.code})
            </option>
          ))}
        </select>
        <span className="chevron" aria-hidden="true" />
        <input
          id={id}
          type="tel"
          placeholder="Enter Your Contact Number"
          {...register(inputName)}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault()
            }
          }}
        />
      </div>
      {error && <span className="error-text">{error.message}</span>}
    </div>
  )
}

function DesktopQueryForm() {
  const [status, setStatus] = useState(null) // 'loading', 'success', 'error'

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(querySchema),
    defaultValues: {
      countryCode: '+91',
      altCountryCode: '+91',
    },
  })

  const onSubmit = async (data) => {
    setStatus('loading')
    try {
      const formData = new FormData()
      formData.append('access_key', WEB3FORMS_ACCESS_KEY)
      formData.append('from_name', 'QUI Landing Page')
      formData.append('subject', `New Query from ${data.fullName}`)

      // Combine phone numbers for the email content
      const fullContact = `${data.countryCode} ${data.contactNumber}`
      const fullAltContact = data.altContactNumber ? `${data.altCountryCode} ${data.altContactNumber}` : 'N/A'

      formData.append('Full Name', data.fullName)
      formData.append('Email', data.email)
      formData.append('Contact Number', fullContact)
      formData.append('Alt. Contact Number', fullAltContact)
      formData.append('Message', data.message)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        reset()
        setTimeout(() => setStatus(null), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus(null), 5000)
      }
    } catch (error) {
      console.error('Submission error:', error)
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <section className="query-shell" id="query" aria-label="Query form">
      <div className="query-panel">
        <h2>Query? Ask here..</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="field full-name" htmlFor="full-name">
            <span>
              Full Name
              <span className="required-star"> *</span>
            </span>
            <input
              id="full-name"
              type="text"
              placeholder="Enter your full name"
              {...register('fullName')}
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && <span className="error-text">{errors.fullName.message}</span>}
          </label>

          <label className="field email" htmlFor="email">
            <span>
              Email
              <span className="required-star"> *</span>
            </span>
            <input
              id="email"
              type="email"
              placeholder="Enter Email Address"
              {...register('email')}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email.message}</span>}
          </label>

          <label className="field contact" htmlFor="contact">
            <span>
              Contact Number
              <span className="required-star"> *</span>
            </span>
            <PhoneInput
              id="contact"
              register={register}
              selectName="countryCode"
              inputName="contactNumber"
              error={errors.contactNumber}
            />
          </label>

          <label className="field alt-contact" htmlFor="alt-contact">
            <span>Alt. Contact Number</span>
            <PhoneInput
              id="alt-contact"
              register={register}
              selectName="altCountryCode"
              inputName="altContactNumber"
              error={errors.altContactNumber}
            />
          </label>

          <label className="field message" htmlFor="message">
            <span>
              Message
              <span className="required-star"> *</span>
            </span>
            <textarea
              id="message"
              placeholder="Type your query..."
              {...register('message')}
              className={errors.message ? 'input-error' : ''}
            />
            {errors.message && <span className="error-text">{errors.message.message}</span>}
          </label>

          <div className="submit-container">
            <button className="submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
            {status === 'success' && <p className="status-message success">Message sent successfully!</p>}
            {status === 'error' && <p className="status-message error">Something went wrong. Please try again.</p>}
          </div>
        </form>
      </div>
    </section>
  )
}

function MobileQueryForm({ onClose }) {
  const [status, setStatus] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(querySchema),
    defaultValues: {
      countryCode: '+91',
      altCountryCode: '+91',
    },
  })

  const onSubmit = async (data) => {
    setStatus('loading')
    try {
      const formData = new FormData()
      formData.append('access_key', WEB3FORMS_ACCESS_KEY)
      formData.append('from_name', 'QUI Landing Page (Mobile)')
      formData.append('subject', `New Mobile Query from ${data.fullName}`)

      const fullContact = `${data.countryCode} ${data.contactNumber}`
      const fullAltContact = data.altContactNumber ? `${data.altCountryCode} ${data.altContactNumber}` : 'N/A'

      formData.append('Full Name', data.fullName)
      formData.append('Email', data.email)
      formData.append('Contact Number', fullContact)
      formData.append('Alt. Contact Number', fullAltContact)
      formData.append('Message', data.message)

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        reset()
        setTimeout(() => {
          setStatus(null)
          onClose()
        }, 3000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus(null), 5000)
      }
    } catch (error) {
      console.error('Submission error:', error)
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
    }
  }

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="mobile-form-field" htmlFor="mobile-full-name">
            <span>
              Full Name
              <span className="required-star"> *</span>
            </span>
            <input
              id="mobile-full-name"
              type="text"
              placeholder="Enter your full name"
              {...register('fullName')}
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && <span className="error-text">{errors.fullName.message}</span>}
          </label>
          <label className="mobile-form-field" htmlFor="mobile-email">
            <span>
              Email
              <span className="required-star"> *</span>
            </span>
            <input
              id="mobile-email"
              type="email"
              placeholder="Enter Email Address"
              {...register('email')}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email.message}</span>}
          </label>
          <label className="mobile-form-field" htmlFor="mobile-contact">
            <span>
              Contact Number
              <span className="required-star"> *</span>
            </span>
            <div className={`mobile-phone-input-wrapper ${errors.contactNumber ? 'has-error' : ''}`}>
              <div className="mobile-phone-input">
                <select className="mobile-country-select" defaultValue="+91" {...register('countryCode')}>
                  {countryCodes.map((country, index) => (
                    <option key={`mobile-${country.country}-${index}`} value={country.code}>
                      {country.country} ({country.code})
                    </option>
                  ))}
                </select>
                <span className="chevron" aria-hidden="true" />
                <input
                  id="mobile-contact"
                  type="tel"
                  placeholder="Enter Your Contact Number"
                  {...register('contactNumber')}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault()
                    }
                  }}
                />
              </div>
              {errors.contactNumber && <span className="error-text">{errors.contactNumber.message}</span>}
            </div>
          </label>
          <label className="mobile-form-field mobile-message" htmlFor="mobile-message">
            <span>
              Message
              <span className="required-star"> *</span>
            </span>
            <textarea
              id="mobile-message"
              placeholder="Type your query..."
              {...register('message')}
              className={errors.message ? 'input-error' : ''}
            />
            {errors.message && <span className="error-text">{errors.message.message}</span>}
          </label>
          <div className="mobile-submit-container">
            <button className="mobile-submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
            {status === 'success' && <p className="status-message success">Message sent successfully!</p>}
            {status === 'error' && <p className="status-message error">Something went wrong. Please try again.</p>}
          </div>
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
