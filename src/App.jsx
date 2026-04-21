import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DataProvider } from './app/context/DataContext'
import { LangProvider, useLang } from './app/context/LangContext'
import { ThemeProvider, useTheme } from './app/context/ThemeContext'
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

  const headerStyle = {
    background: isDark ? '#0f1117' : '#ffffff',
    borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)',
  }

  const logoTextStyle = {
    color: isDark ? '#ffffff' : '#000000',
  }

  const taglineStyle = {
    color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
  }

  const navLinkBase = `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors`
  const navLinkInactive = isDark
    ? 'text-white/60 hover:text-white hover:bg-white/10'
    : 'text-black/50 hover:text-black hover:bg-black/05'
  const navLinkActive = 'bg-green-500 text-black font-medium'

  const langToggleBorder = isDark ? 'border-white/10' : 'border-black/10'
  const langInactive = isDark
    ? 'text-white/50 hover:text-white hover:bg-white/10'
    : 'text-black/40 hover:text-black hover:bg-black/05'

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: isDark ? '#0f1117' : '#f5f5f0', display: 'flex', flexDirection: 'column' }}>
        <header className="flex items-center justify-between px-6 py-4" style={headerStyle}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center font-bold text-black text-sm">L</div>
            <div>
              <div className="font-semibold" style={logoTextStyle}>LUMA Biome Platform</div>
              <div className="text-xs" style={taglineStyle}>{t.tagline}</div>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <NavLink to="/" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`}>
              <Home size={16} /> {t.home}
            </NavLink>
            <NavLink to="/record" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`}>
              <Map size={16} /> {t.record}
            </NavLink>
            <NavLink to="/refine" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`}>
              <GitBranch size={16} /> {t.refine}
            </NavLink>
            <NavLink to="/reports" className={({ isActive }) => `${navLinkBase} ${isActive ? navLinkActive : navLinkInactive}`}>
              <BarChart2 size={16} /> {t.report}
            </NavLink>

            {/* Language toggle */}
            <div className={`flex items-center gap-1 ml-4 border rounded-lg overflow-hidden ${langToggleBorder}`}>
              <button onClick={() => setLang('en')} className={`px-3 py-2 text-xs font-medium transition-colors ${lang === 'en' ? 'bg-green-500 text-black' : langInactive}`}>EN</button>
              <div className={`w-px h-4 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
              <button onClick={() => setLang('de')} className={`px-3 py-2 text-xs font-medium transition-colors ${lang === 'de' ? 'bg-green-500 text-black' : langInactive}`}>DE</button>
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
            background: isDark ? '#ffffff' : '#000000',
            color: isDark ? '#000000' : '#ffffff',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isDark ? '0 4px 24px rgba(255,255,255,0.15)' : '0 4px 24px rgba(0,0,0,0.2)',
            zIndex: 9999,
            transition: 'background 0.3s, transform 0.2s, box-shadow 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
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