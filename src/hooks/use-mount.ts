import { useEffect } from 'react'

const mount = (callback: Function) => {
  useEffect(() => {
    callback && callback()
  }, [])
}

export default mount
