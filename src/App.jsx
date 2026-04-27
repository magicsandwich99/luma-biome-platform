import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { DataProvider } from './app/context/DataContext'
import { LangProvider, useLang } from './app/context/LangContext'
import { ThemeProvider, useTheme, themeColors } from './app/context/ThemeContext'
import { translations } from './app/i18n/translations'
import MapPage from './app/pages/MapPage'
import RefinePage from './app/pages/RefinePage'
import ReportsPage from './app/pages/ReportsPage'
import HomePage from './app/pages/HomePage'
import AboutPage from './app/pages/AboutPage'
import ContactPage from './app/pages/ContactPage'
import PrivacyPage from './app/pages/PrivacyPage'
import ServicesPage from './app/pages/ServicesPage'
import ProjectsPage from './app/pages/ProjectsPage'
import { Home, Sun, Moon } from 'lucide-react'
import lumaLogoDark from './assets/LumaLogom.png'
import lumaLogoLight from './assets/PNGLogo.png'

const queryClient = new QueryClient()

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppInner() {
  const { lang, setLang } = useLang()
  const { theme, toggleTheme } = useTheme()
  const t = translations[lang].nav
  const isDark = theme === 'dark'
  const c = themeColors[theme]

  const headerStyle = {
    height: 64,
    background: isDark ? '#0a0a0a' : '#f0efe8',
    borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
    transition: 'background 0.3s',
  }

  const navLinkBase = `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors`
  const navLinkInactive = isDark
    ? 'text-white/60 hover:text-white hover:bg-white/10'
    : 'text-black/50 hover:text-black hover:bg-black/5'
  const langInactive = isDark
    ? 'text-white/50 hover:text-white hover:bg-white/10'
    : 'text-black/40 hover:text-black hover:bg-black/5'
  const langBorder = isDark ? 'border-white/10' : 'border-black/10'
  const langDivider = isDark ? 'bg-white/10' : 'bg-black/10'

  const activeStyle = { background: c.accent, color: '#ffffff', fontWeight: 500 }
  const langActiveStyle = { background: c.accent, color: '#ffffff' }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div style={{ minHeight: '100vh', background: c.bg, display: 'flex', flexDirection: 'column', transition: 'background 0.3s' }}>
        <header className="flex items-center justify-between px-6" style={headerStyle}>
          <div className="flex items-center">
            <img
              src={isDark ? lumaLogoDark : lumaLogoLight}
              alt="LUMA"
              style={{
                width: 120,
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                transition: 'opacity 0.3s',
              }}
            />
          </div>

          <nav className="flex items-center gap-2">
            <NavLink to="/" end className={({ isActive }) => `${navLinkBase} ${isActive ? '' : navLinkInactive}`} style={({ isActive }) => isActive ? activeStyle : {}}>
              <Home size={16} /> {t.home}
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => `${navLinkBase} ${isActive ? '' : navLinkInactive}`} style={({ isActive }) => isActive ? activeStyle : {}}>
              {t.services}
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => `${navLinkBase} ${isActive ? '' : navLinkInactive}`} style={({ isActive }) => isActive ? activeStyle : {}}>
              {t.projects}
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `${navLinkBase} ${isActive ? '' : navLinkInactive}`} style={({ isActive }) => isActive ? activeStyle : {}}>
              {t.about}
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${navLinkBase} ${isActive ? '' : navLinkInactive}`} style={({ isActive }) => isActive ? activeStyle : {}}>
              {t.contactNav}
            </NavLink>

            <div className={`flex items-center gap-1 ml-4 border rounded-lg overflow-hidden ${langBorder}`}>
              <button onClick={() => setLang('en')} className={`px-3 py-2 text-xs font-medium transition-colors ${lang === 'en' ? '' : langInactive}`} style={lang === 'en' ? langActiveStyle : {}}>EN</button>
              <div className={`w-px h-4 ${langDivider}`} />
              <button onClick={() => setLang('de')} className={`px-3 py-2 text-xs font-medium transition-colors ${lang === 'de' ? '' : langInactive}`} style={lang === 'de' ? langActiveStyle : {}}>DE</button>
            </div>
          </nav>
        </header>

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/record" element={<MapPage />} />
            <Route path="/refine" element={<RefinePage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </main>

        <button
          onClick={toggleTheme}
          style={{ position: 'fixed', bottom: 32, right: 32, width: 52, height: 52, borderRadius: '50%', background: isDark ? '#ffffff' : '#0a0a0a', color: isDark ? '#000000' : '#ffffff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isDark ? '0 4px 24px rgba(255,255,255,0.15)' : '0 4px 24px rgba(0,0,0,0.2)', zIndex: 9999, transition: 'background 0.3s, transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <QueryClientProvider client={queryClient}>
          <DataProvider>
            <AppInner />
          </DataProvider>
        </QueryClientProvider>
      </LangProvider>
    </ThemeProvider>
  )
}