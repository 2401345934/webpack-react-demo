type CSSVar = {
  [key: string]: string
}
const updateCustomCssVar = (cssVars: CSSVar) => {
  Object.keys(cssVars).forEach(key => {
    document.documentElement.style.setProperty(`--${key}`, cssVars[key])
  })
}
export default {
  updateCustomCssVar
}
