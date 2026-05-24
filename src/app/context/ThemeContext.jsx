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

// LUMA brand palette: Nacht #001219, Kalkstein #F3E0A8, Smaragd #08AA56, Mint #22EAA7, Wald #2A6112
export const themeColors = {
  dark: {
    accent: '#08AA56',
    accentHover: '#22EAA7',
    accentMuted: 'rgba(8,170,86,0.1)',
    accentBorder: 'rgba(8,170,86,0.3)',
    bg: '#001219',
    fg: '#F3E0A8',
    fgMuted: 'rgba(243,224,168,0.6)',
    fgSubtle: 'rgba(243,224,168,0.35)',
    borderColor: 'rgba(243,224,168,0.08)',
    cardBg: 'rgba(243,224,168,0.03)',
    cardBorder: 'rgba(243,224,168,0.08)',
  },
  light: {
    accent: '#08AA56',
    accentHover: '#2A6112',
    accentMuted: 'rgba(8,170,86,0.08)',
    accentBorder: 'rgba(8,170,86,0.25)',
    bg: '#F3E0A8',
    fg: '#001219',
    fgMuted: 'rgba(0,18,25,0.55)',
    fgSubtle: 'rgba(0,18,25,0.35)',
    borderColor: 'rgba(0,18,25,0.1)',
    cardBg: 'rgba(0,18,25,0.03)',
    cardBorder: 'rgba(0,18,25,0.08)',
  },
}