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