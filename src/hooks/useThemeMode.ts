import { useEffect, useState } from 'react'
import utils from '@/utils'
const getInitialThemeMode = () => {
  const isDarkModePreferred = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches
  return isDarkModePreferred ? 'dark' : 'light'
}
const useThemeMode = (callback?: Function) => {
  const [themeMode, setThemeMode] = useState(getInitialThemeMode())

  useEffect(() => {
    const handleChange = (event: any) => {
      const newThemeMode = event.matches ? 'dark' : 'light'
      setThemeMode(newThemeMode)
      if (callback) {
        callback(newThemeMode)
      }
    }
    const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQueryDark.addListener(handleChange)

    return () => {
      mediaQueryDark.removeListener(handleChange)
    }
  }, [])
  useEffect(() => {
    utils.handleToggleTheme(themeMode)
  }, [themeMode])

  const toggleThemeMode = () => {
    setThemeMode(prevMode => (prevMode === 'dark' ? 'light' : 'dark'))

    if (callback) {
      callback(themeMode === 'dark' ? 'light' : 'dark')
    }
  }

  return { themeMode, toggleThemeMode }
}

export default useThemeMode
