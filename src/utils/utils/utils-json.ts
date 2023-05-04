// safeJsonParse JSON 转换
const JSONPase = (str: string) => {
  if (!str || typeof str != 'string') {
    return str
  }
  let result: string | any = str

  try {
    result = JSON.parse(str)
  } catch {
    result = {}
  }
  return result
}

const JSONStringify = (str: any) => {
  return JSON.stringify(str)
}
export default {
  JSONPase,
  JSONStringify,
}
