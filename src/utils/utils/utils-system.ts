import { TypeObjStr } from '@/utils/utilsTypes.type'

type CSSVar = TypeObjStr
const updateCustomCssVar = (cssVars: CSSVar) => {
  Object.keys(cssVars).forEach(key => {
    document.documentElement.style.setProperty(`--${key}`, cssVars[key])
  })
}

// 切换为黑夜模式
function enableDarkMode() {
  document.documentElement.classList.add('dark')
}

// 切换为白天模式
function disableDarkMode() {
  document.documentElement.classList.remove('dark')
}

/**
 * Handles toggling between light and dark theme modes.
 *
 * @param {string} themeMode - The current theme mode to toggle from.
 * @return {void} This function does not return anything.
 */
const handleToggleTheme = (themeMode: string) => {
  if (themeMode === 'dark') {
    enableDarkMode()
  } else {
    disableDarkMode()
  }
}

const initSetTheme = () => {
  const mediaQueryDark = window.matchMedia('(prefers-color-scheme: dark)')
  if (mediaQueryDark.matches) {
    enableDarkMode()
  }
}
export default {
  updateCustomCssVar,
  handleToggleTheme,
  initSetTheme,
}
