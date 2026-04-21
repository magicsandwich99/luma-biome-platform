import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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
import { Map, GitBranch, BarChart2, Home, Sun, Moon } from 'lucide-react'

const queryClient = new QueryClient()

function AppInner() {
  const { lang, setLang } = useLang()
  const { theme, toggleTheme } = useTheme()
  const t = translations[lang].nav
  const isDark = theme === 'dark'
  const c = themeColors[theme]

  const headerStyle = {
    background: isDark ? '#0f1117' : '#f0efe8',
    borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
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
      <div style={{ minHeight: '100vh', background: c.bg, display: 'flex', flexDirection: 'column', transition: 'background 0.3s' }}>
        <header className="flex items-center justify-between px-6 py-4" style={headerStyle}>
          <div className="flex items-center gap-3">
            <div style={{ width: 36, height: 36, borderRadius: 8, background: c.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#ffffff', fontSize: 13 }}>L</div>
            <div>
              <div className="font-semibold" style={{ color: c.fg }}>LUMA Biome Platform</div>
              <div className="text-xs" style={{ color: c.fgMuted }}>{t.tagline}</div>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) => `${navLinkBase} ${isActive ? '' : navLinkInactive}`}
              style={({ isActive }) => isActive ? activeStyle : {}}
            >
              <Home size={16} /> {t.home}
            </NavLink>
            <NavLink
              to="/record"
              className={({ isActive }) => `${navLinkBase} ${isActive ? '' : navLinkInactive}`}
              style={({ isActive }) => isActive ? activeStyle : {}}
            >
              <Map size={16} /> {t.record}
            </NavLink>
            <NavLink
              to="/refine"
              className={({ isActive }) => `${navLinkBase} ${isActive ? '' : navLinkInactive}`}
              style={({ isActive }) => isActive ? activeStyle : {}}
            >
              <GitBranch size={16} /> {t.refine}
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) => `${navLinkBase} ${isActive ? '' : navLinkInactive}`}
              style={({ isActive }) => isActive ? activeStyle : {}}
            >
              <BarChart2 size={16} /> {t.report}
            </NavLink>

            <div className={`flex items-center gap-1 ml-4 border rounded-lg overflow-hidden ${langBorder}`}>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-2 text-xs font-medium transition-colors ${lang === 'en' ? '' : langInactive}`}
                style={lang === 'en' ? langActiveStyle : {}}
              >EN</button>
              <div className={`w-px h-4 ${langDivider}`} />
              <button
                onClick={() => setLang('de')}
                className={`px-3 py-2 text-xs font-medium transition-colors ${lang === 'de' ? '' : langInactive}`}
                style={lang === 'de' ? langActiveStyle : {}}
              >DE</button>
            </div>
          </nav>
        </header>

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/record" element={<MapPage />} />
            <Route path="/refine" element={<RefinePage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Floating theme toggle */}
        <button
          onClick={toggleTheme}
          style={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: isDark ? '#ffffff' : '#0a0a0a',
            color: isDark ? '#000000' : '#ffffff',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isDark ? '0 4px 24px rgba(255,255,255,0.15)' : '0 4px 24px rgba(0,0,0,0.2)',
            zIndex: 9999,
            transition: 'background 0.3s, transform 0.2s',
          }}
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