import { useState, useEffect } from 'react'

function useDark() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(isDark)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode)
  }

  return { isDarkMode, toggleTheme }
}

export default useDark
