function addCSSVar(name: string, value: string) {
  const style = document.createElement('style')
  style.innerHTML = `:root { --${name}: ${value}; }`
  document.head.appendChild(style)
}
function deleteCSSVar(name: string) {
  const style = document.createElement('style')
  style.innerHTML = `:root { --${name}: unset; }`
  document.head.appendChild(style)
}

function updateCSSVar(name: string, value: string) {
  document.documentElement.style.setProperty(`--${name}`, value)
}

function getCSSVar(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim()
}

export default {
  addCSSVar,
  deleteCSSVar,
  updateCSSVar,
  getCSSVar,
}
