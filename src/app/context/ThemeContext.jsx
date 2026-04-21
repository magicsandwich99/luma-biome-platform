import { createContext, useContext, useState } from 'react'

export const ThemeContext = createContext('dark')

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

export const themeColors = {
  dark: {
    accent: '#10b981',
    accentHover: '#34d399',
    accentMuted: 'rgba(16,185,129,0.1)',
    accentBorder: 'rgba(16,185,129,0.3)',
    bg: '#080c0a',
    fg: '#e8ede9',
    fgMuted: 'rgba(255,255,255,0.5)',
    fgSubtle: 'rgba(255,255,255,0.3)',
    borderColor: 'rgba(255,255,255,0.06)',
    cardBg: 'rgba(255,255,255,0.03)',
    cardBorder: 'rgba(255,255,255,0.07)',
  },
  light: {
    accent: '0A7652',
    accentHover: '#6d28d9',
    accentMuted: 'rgba(124,58,237,0.08)',
    accentBorder: 'rgba(124,58,237,0.25)',
    bg: '#f0efe8',
    fg: '#0a0a0a',
    fgMuted: 'rgba(0,0,0,0.5)',
    fgSubtle: 'rgba(0,0,0,0.3)',
    borderColor: 'rgba(0,0,0,0.08)',
    cardBg: 'rgba(0,0,0,0.02)',
    cardBorder: 'rgba(0,0,0,0.08)',
  },
}