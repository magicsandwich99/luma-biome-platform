import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useTheme, themeColors } from '../context/ThemeContext'

const content = {
  en: {
    title: 'Privacy Policy',
    status: 'Status:',
    statusDate: '17. November 2024',
    back: '← Back',
    sections: [
      {
        heading: 'introduction',
        body: 'We, LUMA GmbH („we", „us", „our"), take the protection of your personal data very seriously. This privacy policy informs you how we collect, use and protect personal information when you visit our website and use our services.',
      },
      {
        heading: 'What data do we collect?',
        orderedList: [
          'Contact form: When you use our contact form, we collect your name, email address, and phone number to process your request.',
          'Cookies: Our website uses cookies to ensure functionality and perform statistical analysis.',
          'Google Maps: When you access Google Maps on our website, data such as your IP address and location information is transferred to Google.',
          'Images and content: Some images on our website were created with Midjourney; all other content is ours.',
        ],
      },
      {
        heading: 'How do we collect data?',
        list: [
          'Directly from you: Through your entries in the contact form.',
          'Automatic: Through cookies and similar technologies and through the use of Google Maps.',
        ],
      },
      {
        heading: 'Why do we collect this data?',
        list: [
          'Processing requests: To respond to your contact requests.',
          'Website Optimization: To analyze and improve our website.',
          'Provision of services: To display maps and visual content.',
        ],
      },
      {
        heading: 'Who do we share this data with?',
        list: [
          'Hosting: Our website is hosted at Strato in the EU; your data is stored on secure servers within the EU.',
          "Google Maps: When using Google Maps, data is transmitted to Google. Please refer to Google's privacy policy.",
        ],
      },
      {
        heading: 'Cookies and tracking technologies',
        body: 'We use cookies to provide you with an optimal usage experience. When you first visit our website, you can use a cookie banner to decide whether you only need cookies or also additional cookies (e.g. B. for analyses). For more information, please see our Cookies Policy.',
      },
      {
        heading: 'How long do we store your data?',
        list: [
          'Contact details: Are stored for a maximum of 6 months and then deleted.',
          'Cookies: Storage time varies by type; see our Cookies Policy for details.',
        ],
      },
      {
        heading: 'How do we protect your data?',
        list: [
          'SSL Encryption: Our website uses SSL to securely transfer your data.',
          'Hosting security: Strato meets high security standards to protect stored data.',
        ],
      },
      {
        heading: 'minors',
        body: 'Our website is not intended for persons under 18 years of age. We do not knowingly collect data from minors.\nUpdates or changes to the privacy policy\nWe may update this Statement of Privacy from time to time. The current version is available on our website.',
      },
      {
        heading: 'Contact us',
        body: 'If you have any questions about this privacy policy or the processing of your data, please contact us:',
        list: [
          'LUMA GbR Malte Larsen & Lukas Steingässer',
          'Address: Schillerstraße 15, 16225 Eberswalde',
          'Email: info[at]luma.earth',
        ],
      },
    ],
  },
  de: {
    title: 'Datenschutzerklärung',
    status: 'Stand:',
    statusDate: '17. November 2024',
    back: '← Zurück',
    sections: [
      {
        heading: 'Einleitung',
        body: 'Wir, die LUMA GmbH („wir", „uns", „unser/e"), nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung informiert Sie darüber, wie wir personenbezogene Daten erfassen, verwenden und schützen, wenn Sie unsere Website besuchen und unsere Dienste nutzen.',
      },
      {
        heading: 'Welche Daten erfassen wir?',
        orderedList: [
          'Kontaktformular: Wenn Sie unser Kontaktformular nutzen, erfassen wir Ihren Namen, Ihre E-Mail-Adresse und Ihre Telefonnummer, um Ihre Anfrage zu bearbeiten.',
          'Cookies: Unsere Website verwendet Cookies, um die Funktionalität sicherzustellen und statistische Analysen durchzuführen.',
          'Google Maps: Beim Aufrufen von Google Maps auf unserer Website werden Daten wie Ihre IP-Adresse und Standortinformationen an Google übertragen.',
          'Bilder und Inhalte: Einige Bilder auf unserer Website wurden mit Midjourney erstellt; alle anderen Inhalte stammen von uns.',
        ],
      },
      {
        heading: 'Wie sammeln wir Daten?',
        list: [
          'Direkt von Ihnen: Durch Ihre Eingaben im Kontaktformular.',
          'Automatisch: Durch Cookies und ähnliche Technologien sowie durch die Nutzung von Google Maps.',
        ],
      },
      {
        heading: 'Warum erfassen wir diese Daten?',
        list: [
          'Bearbeitung von Anfragen: Um auf Ihre Kontaktanfragen zu reagieren.',
          'Website-Optimierung: Zur Analyse und Verbesserung unserer Website.',
          'Bereitstellung von Diensten: Zur Anzeige von Kartenmaterial und visuellen Inhalten.',
        ],
      },
      {
        heading: 'An wen geben wir diese Daten weiter?',
        list: [
          'Hosting: Unsere Website wird bei Strato in der EU gehostet; Ihre Daten werden auf sicheren Servern innerhalb der EU gespeichert.',
          'Google Maps: Bei Nutzung von Google Maps werden Daten an Google übermittelt. Bitte beachten Sie die Datenschutzerklärung von Google.',
        ],
      },
      {
        heading: 'Cookies und Tracking-Technologien',
        body: 'Wir verwenden Cookies, um Ihnen ein optimales Nutzungserlebnis zu bieten. Beim ersten Besuch unserer Website können Sie über ein Cookie-Banner entscheiden, ob Sie nur notwendige Cookies oder auch zusätzliche Cookies (z.B. für Analysen) zulassen möchten. Weitere Informationen finden Sie in unserer Cookie-Richtlinie.',
      },
      {
        heading: 'Wie lange speichern wir Ihre Daten?',
        list: [
          'Kontaktdaten: Werden für maximal 6 Monate gespeichert und danach gelöscht.',
          'Cookies: Die Speicherdauer variiert je nach Typ; Details finden Sie in unserer Cookie-Richtlinie.',
        ],
      },
      {
        heading: 'Wie schützen wir Ihre Daten?',
        list: [
          'SSL-Verschlüsselung: Unsere Website nutzt SSL, um Ihre Daten sicher zu übertragen.',
          'Hosting-Sicherheit: Strato erfüllt hohe Sicherheitsstandards zum Schutz der gespeicherten Daten.',
        ],
      },
      {
        heading: 'Minderjährige',
        body: 'Unsere Website richtet sich nicht an Personen unter 18 Jahren. Wir erheben wissentlich keine Daten von Minderjährigen.\nAktualisierungen oder Änderungen der Datenschutzerklärung\nWir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Die jeweils aktuelle Version ist auf unserer Website verfügbar.',
      },
      {
        heading: 'Kontakt',
        body: 'Wenn Sie Fragen zu dieser Datenschutzerklärung oder zur Verarbeitung Ihrer Daten haben, kontaktieren Sie uns bitte:',
        list: [
          'LUMA GbR Malte Larsen & Lukas Steingässer',
          'Adresse: Schillerstraße 15, 16225 Eberswalde',
          'E-Mail: info[at]luma.earth',
        ],
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

  return (
    <div style={{ fontFamily: "'DM Mono', monospace", background: bg, color: fg, minHeight: '100vh', transition: 'background 0.3s, color 0.3s' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&display=swap');
      `}</style>

      {/* Hero band */}
      <div style={{ background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderBottom: `1px solid ${borderColor}`, padding: '60px 80px 48px', textAlign: 'center' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: accent, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 32, padding: 0, display: 'block', transition: 'opacity 0.2s', fontFamily: "'DM Mono', monospace", textAlign: 'left' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          {t.back}
        </button>
        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.05, color: fg, marginBottom: 24 }}>{t.title}</h1>
        <p style={{ fontSize: 14, color: fgMuted, letterSpacing: '0.02em' }}>
          {t.status} <strong style={{ color: fg }}>{t.statusDate}</strong>
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 40px 120px' }}>
        {t.sections.map((section, i) => (
          <div key={i} style={{ marginBottom: 32 }}>
            {/* Heading */}
            <p style={{ fontSize: 14, fontWeight: 700, color: fg, marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>{section.heading}</p>

            {/* Body text */}
            {section.body && (
              <p style={{ fontSize: 14, lineHeight: 1.8, color: fgMuted, fontWeight: 300, whiteSpace: 'pre-line', marginBottom: section.list || section.orderedList ? 12 : 0 }}>{section.body}</p>
            )}

            {/* Ordered list */}
            {section.orderedList && (
              <ol style={{ paddingLeft: 24, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {section.orderedList.map((item, j) => (
                  <li key={j} style={{ fontSize: 14, lineHeight: 1.8, color: fgMuted, fontWeight: 300, paddingLeft: 4 }}>{item}</li>
                ))}
              </ol>
            )}

            {/* Bullet list */}
            {section.list && (
              <ul style={{ paddingLeft: 24, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {section.list.map((item, j) => (
                  <li key={j} style={{ fontSize: 14, lineHeight: 1.8, color: fgMuted, fontWeight: 300, paddingLeft: 4 }}>{item}</li>
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
          <span style={{ fontSize: 12, color: fgMuted, letterSpacing: '0.05em' }}>LUMA Biome Platform</span>
        </div>
        <span style={{ fontSize: 11, color: fgSubtle, letterSpacing: '0.05em' }}>© 2025 LUMA Earth. All rights reserved.</span>
      </div>
    </div>
  )
}