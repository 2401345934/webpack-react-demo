// safeJsonParse JSON 转换
const JSONPase = (str: string) => {
  if (!str || typeof str != 'string') {
    return str
  }
  return JSON.parse(str)
}

const JSONStringify = (str: any) => {
  return JSON.stringify(str)
}
export default {
  JSONPase,
  JSONStringify
}
