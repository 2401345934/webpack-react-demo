import utils from '@/utils'
class localDataManagement {
  static #prefix: string = `${process.env.NODE_ENV}-minghui`
  static #timeSign: string = `|${localDataManagement.#prefix}|`
  static initExpirationTime: number
  public initTime: number = 24 * 60 * 60 * 31 * 1000
  constructor(props: { initExpirationTime?: number }) {
    const { initExpirationTime } = props
    localDataManagement.initExpirationTime = initExpirationTime || this.initTime
  }
  getItem(key: string) {
    key = `${localDataManagement.#prefix}${key}`
    let value = localStorage.getItem(key)

    if (value) {
      let index = value.indexOf(localDataManagement.#timeSign)
      let time = +value.slice(0, index)
      // 判断时间是否已过期
      if (time > Date.now()) {
        value = utils.JSONPase(
          value.slice(index + localDataManagement.#timeSign.length)
        )
      } else {
        value = null
        localStorage.removeItem(key)
      }
    }

    return value
  }

  setItem(key: string, value: any, time?: number) {
    // 做一个key的保护
    key = `${localDataManagement.#prefix}${key}`
    // 没有传入时间，默认过期时间是一个月，当然也可以是其他时间或者不设置
    time = time
      ? new Date(time).getTime()
      : Date.now() + localDataManagement.initExpirationTime
    localStorage.setItem(
      key,
      `${time}${localDataManagement.#timeSign}${utils.JSONStringify(value)}`
    )
  }

  removeItem(key: string) {
    key = `${localDataManagement.#prefix}${key}`
    localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
  }
}

export default new localDataManagement({})
