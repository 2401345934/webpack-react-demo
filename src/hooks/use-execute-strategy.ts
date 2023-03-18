// 实现一个策略模 进行匹配
// 支持 value 是 function
// 支持 value 是 string
const executeStrategy = (value: Function | string, mapDict: any) => {
  if (!mapDict) return null
  if (value === null || value === undefined) return null
  for (const [predicate, result] of mapDict.entries()) {
    if (typeof predicate === 'function') {
      if (predicate(value)) {
        return result
      }
    } else {
      if (value === predicate) {
        return result
      }
    }
  }
  return null
}

export default executeStrategy
