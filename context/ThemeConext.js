import { createContext, useState } from 'react'

export const ThemeConext = createContext()

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem('isDarkMode'))
  )

  return (
    <ThemeConext.Provider value={[isDark, setIsDark]}>
      {children}
    </ThemeConext.Provider>
  )
}