import { TypeObjStr } from '@/utils/utilsTypes.type'

type CSSVar = TypeObjStr
const updateCustomCssVar = (cssVars: CSSVar) => {
  Object.keys(cssVars).forEach(key => {
    document.documentElement.style.setProperty(`--${key}`, cssVars[key])
  })
}
export default {
  updateCustomCssVar
}
