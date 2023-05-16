// 递归处理输入的函数
function continous(reducer: Function) {
  return function (...args: any[]) {
    return args.reduce((a, b) => reducer(a, b))
  }
}

// 批量处理函数
function batch(fn: Function) {
  return function (subject: Function[], ...args: any[]) {
    if (Array.isArray(subject)) {
      return subject.map(s => {
        // @ts-ignore
        return fn.call(this, s, ...args)
      })
    }
    // @ts-ignore
    return fn.call(this, subject, ...args)
  }
}

// 两个日期之间的日差
const daysBetween = (date1: number, date2: number) =>
  Math.ceil(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24))

// 随机数范围
function random(min: number, max: number) {
  if (arguments.length === 2) {
    return Math.floor(min + Math.random() * (max + 1 - min))
  }
  return null
}

// 判断是不是一个函数
function isFunction(value: any): boolean {
  return typeof value === 'function'
}

export default {
  continous,
  batch,
  daysBetween,
  random,
  isFunction,
}
