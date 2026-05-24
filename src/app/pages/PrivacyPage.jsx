import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useTheme, themeColors } from '../context/ThemeContext'

const content = {
  en: {
    title: 'Legal Notice & Privacy Policy',
    status: 'Last updated:',
    statusDate: '24 May 2026',
    back: '← Back',
    impressumTitle: 'Legal Notice (Impressum)',
    privacyTitle: 'Privacy Policy',
    sections: [
      {
        heading: 'Information according to § 5 TMG',
        isImpressum: true,
        body: 'LUMA GbR\nMalte Larsen & Lukas Steingässer\nSchillerstraße 15\n16225 Eberswalde\nGermany\n\nPhone: +49 152 2622 0865\nEmail: info@luma.earth\n\nResponsible for content according to § 55 Abs. 2 RStV:\nMalte Larsen & Lukas Steingässer\nSchillerstraße 15, 16225 Eberswalde\n\nVAT: We are a small business (Kleinunternehmen) within the meaning of § 19 UStG. VAT is not charged and no VAT identification number is stated.',
      },
      {
        heading: '1. Data Controller',
        body: 'LUMA GbR — Malte Larsen & Lukas Steingässer, Schillerstraße 15, 16225 Eberswalde, Germany. Email: info@luma.earth',
      },
      {
        heading: '2. What data we collect',
        list: [
          'Contact form: Name, email address, subject, and message — to process your inquiry.',
          'Server log files: Our hosting provider automatically collects standard log data (browser type, referring URL, date/time of access, IP address). This data is not linked to any personal identity.',
        ],
      },
      {
        heading: '3. Legal basis (Art. 6 GDPR)',
        list: [
          'Contact form data: Art. 6(1)(b) GDPR — processing is necessary for taking steps at your request prior to entering into a contract, or Art. 6(1)(f) GDPR — legitimate interest in responding to inquiries.',
          'Server logs: Art. 6(1)(f) GDPR — legitimate interest in ensuring website security and stability.',
        ],
      },
      {
        heading: '4. Third-party services',
        list: [
          'Hosting — GitHub Pages (GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA). Data transfer to the USA is based on the EU-US Data Privacy Framework adequacy decision. GitHub Privacy Statement: github.com/privacy',
          'Contact form — Formspree (Formspree Inc., USA). When you submit the contact form, your data is transmitted to Formspree for delivery. Their privacy policy is at formspree.io/legal/privacy-policy',
        ],
      },
      {
        heading: '5. Data retention',
        list: [
          'Contact inquiries: Retained for up to 6 months, then deleted, unless legal retention obligations require longer storage.',
          'Server logs: Typically deleted after 7–30 days by the hosting provider.',
        ],
      },
      {
        heading: '6. Your rights (Art. 15–22 GDPR)',
        body: 'You have the right to: access your personal data, correct inaccurate data, request deletion, restrict processing, data portability, and object to processing. To exercise these rights, contact us at info@luma.earth.',
      },
      {
        heading: '7. Right to lodge a complaint',
        body: 'You have the right to lodge a complaint with a supervisory authority. The competent authority for LUMA is: Die Landesbeauftragte für den Datenschutz und für das Recht auf Akteneinsicht Brandenburg (LDA Brandenburg), Stahnsdorfer Damm 77, 14532 Kleinmachnow, Germany.',
      },
      {
        heading: '8. Cookies',
        body: 'This website uses only technically necessary session data (e.g., your theme preference stored in localStorage). No tracking cookies, advertising cookies, or analytics tools are currently in use. No cookie consent banner is required for technically necessary cookies only.',
      },
      {
        heading: '9. Changes to this policy',
        body: 'We may update this policy from time to time. The current version is always available at luma.earth/privacy.',
      },
    ],
  },
  de: {
    title: 'Impressum & Datenschutzerklärung',
    status: 'Stand:',
    statusDate: '24. Mai 2026',
    back: '← Zurück',
    impressumTitle: 'Impressum',
    privacyTitle: 'Datenschutzerklärung',
    sections: [
      {
        heading: 'Angaben gemäß § 5 TMG',
        isImpressum: true,
        body: 'LUMA GbR\nMalte Larsen & Lukas Steingässer\nSchillerstraße 15\n16225 Eberswalde\nDeutschland\n\nTelefon: +49 152 2622 0865\nE-Mail: info@luma.earth\n\nVerantwortlich für den Inhalt nach § 55 Abs. 2 RStV:\nMalte Larsen & Lukas Steingässer\nSchillerstraße 15, 16225 Eberswalde\n\nUmsatzsteuer: Wir sind Kleinunternehmen im Sinne von § 19 UStG. Es wird keine Umsatzsteuer berechnet und keine Umsatzsteueridentifikationsnummer angegeben.',
      },
      {
        heading: '1. Verantwortlicher',
        body: 'LUMA GbR — Malte Larsen & Lukas Steingässer, Schillerstraße 15, 16225 Eberswalde. E-Mail: info@luma.earth',
      },
      {
        heading: '2. Welche Daten wir erheben',
        list: [
          'Kontaktformular: Name, E-Mail-Adresse, Betreff und Nachricht — zur Bearbeitung Ihrer Anfrage.',
          'Server-Logdateien: Unser Hosting-Anbieter erhebt automatisch Standard-Protokolldaten (Browser-Typ, Referrer-URL, Datum/Uhrzeit des Zugriffs, IP-Adresse). Diese Daten werden keiner Person zugeordnet.',
        ],
      },
      {
        heading: '3. Rechtsgrundlagen (Art. 6 DSGVO)',
        list: [
          'Kontaktformular-Daten: Art. 6 Abs. 1 lit. b DSGVO — Verarbeitung zur Durchführung vorvertraglicher Maßnahmen auf Ihre Anfrage hin, oder Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse an der Beantwortung von Anfragen.',
          'Server-Logs: Art. 6 Abs. 1 lit. f DSGVO — berechtigtes Interesse an der Sicherheit und Stabilität der Website.',
        ],
      },
      {
        heading: '4. Drittanbieter',
        list: [
          'Hosting — GitHub Pages (GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA). Die Datenübertragung in die USA basiert auf dem Angemessenheitsbeschluss zum EU-US Data Privacy Framework. Datenschutzerklärung GitHub: github.com/privacy',
          'Kontaktformular — Formspree (Formspree Inc., USA). Beim Absenden des Kontaktformulars werden Ihre Daten zur Zustellung an Formspree übermittelt. Deren Datenschutzerklärung: formspree.io/legal/privacy-policy',
        ],
      },
      {
        heading: '5. Speicherdauer',
        list: [
          'Kontaktanfragen: Werden für maximal 6 Monate gespeichert und anschließend gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten eine längere Speicherung erfordern.',
          'Server-Logs: Werden vom Hosting-Anbieter in der Regel nach 7–30 Tagen gelöscht.',
        ],
      },
      {
        heading: '6. Ihre Rechte (Art. 15–22 DSGVO)',
        body: 'Sie haben das Recht auf: Auskunft über Ihre gespeicherten Daten, Berichtigung unrichtiger Daten, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung. Zur Ausübung dieser Rechte wenden Sie sich an info@luma.earth.',
      },
      {
        heading: '7. Beschwerderecht',
        body: 'Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren. Die zuständige Behörde für LUMA ist: Die Landesbeauftragte für den Datenschutz und für das Recht auf Akteneinsicht Brandenburg (LDA Brandenburg), Stahnsdorfer Damm 77, 14532 Kleinmachnow.',
      },
      {
        heading: '8. Cookies',
        body: 'Diese Website verwendet ausschließlich technisch notwendige Daten (z.B. Ihre Theme-Einstellung im localStorage). Es werden keine Tracking-Cookies, Werbe-Cookies oder Analyse-Tools eingesetzt. Für rein technisch notwendige Cookies ist kein Cookie-Einwilligungsbanner erforderlich.',
      },
      {
        heading: '9. Änderungen dieser Erklärung',
        body: 'Wir können diese Erklärung von Zeit zu Zeit aktualisieren. Die jeweils aktuelle Version ist unter luma.earth/privacy abrufbar.',
      },
    ],
  },
}

export default function PrivacyPage() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const c = themeColors[theme]
  const { accent, bg, fg, fgMuted, fgSubtle, borderColor } = c
  const t = content[lang]

  const impressumSections = t.sections.filter(s => s.isImpressum)
  const privacySections = t.sections.filter(s => !s.isImpressum)

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: bg, color: fg, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`.mono { font-family: 'Space Mono', monospace; }`}</style>

      {/* Hero band */}
      <div style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderBottom: `1px solid ${borderColor}`, padding: '60px 80px 48px' }}>
        <button
          onClick={() => navigate(-1)}
          className="mono"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: accent, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 32, padding: 0, display: 'block', transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          {t.back}
        </button>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: fg, marginBottom: 16 }}>{t.title}</h1>
        <p className="mono" style={{ fontSize: 13, color: fgSubtle, letterSpacing: '0.02em' }}>
          {t.status} <strong style={{ color: fg }}>{t.statusDate}</strong>
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '80px 80px 120px' }}>

        {/* Impressum block */}
        <div style={{ marginBottom: 80, padding: '40px 48px', border: `1px solid ${borderColor}`, background: isDark ? 'rgba(243,224,168,0.02)' : 'rgba(0,18,25,0.02)' }}>
          <div className="mono" style={{ fontSize: 11, color: accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20 }}>{t.impressumTitle}</div>
          {impressumSections.map((section, i) => (
            <div key={i}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 12, color: fg }}>{section.heading}</h2>
              {section.body && (
                <p className="mono" style={{ fontSize: 13, lineHeight: 1.9, color: fgMuted, fontWeight: 300, whiteSpace: 'pre-line' }}>{section.body}</p>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 64 }}>
          <div style={{ height: 1, flex: 1, background: borderColor }} />
          <div className="mono" style={{ fontSize: 11, color: fgSubtle, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{t.privacyTitle}</div>
          <div style={{ height: 1, flex: 1, background: borderColor }} />
        </div>

        {/* Privacy sections */}
        {privacySections.map((section, i) => (
          <div key={i} style={{ marginBottom: 48, paddingBottom: 48, borderBottom: i < privacySections.length - 1 ? `1px solid ${borderColor}` : 'none' }}>
            <h2 className="mono" style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: fg }}>{section.heading}</h2>
            {section.body && (
              <p className="mono" style={{ fontSize: 13, lineHeight: 1.9, color: fgMuted, fontWeight: 300, whiteSpace: 'pre-line' }}>{section.body}</p>
            )}
            {section.list && (
              <ul style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {section.list.map((item, j) => (
                  <li key={j}>
                    <span className="mono" style={{ fontSize: 13, lineHeight: 1.8, color: fgMuted, fontWeight: 300 }}>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Footer bar */}
      <div style={{ borderTop: `1px solid ${borderColor}`, padding: '32px 80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 28, height: 28, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#ffffff', fontSize: 12 }}>L</div>
          <span className="mono" style={{ fontSize: 12, color: fgMuted, letterSpacing: '0.05em' }}>LUMA GbR</span>
        </div>
        <span className="mono" style={{ fontSize: 11, color: fgSubtle, letterSpacing: '0.05em' }}>© 2026 LUMA GbR. Alle Rechte vorbehalten.</span>
      </div>
    </div>
  )
}
