import { useEffect, useState } from 'react'

const network = () => {
  const [count, setCount] = useState<number>(0)
  const [pingList, setPingList] = useState<number[]>([])
  const [ping, setPing] = useState<number>(0)
  const [jitter, setJitter] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      const img = new Image()
      const startTime = new Date().getTime()
      // 此处选择加载 github 的 favicon，大小为2.2kB
      img.src = `https://github.com/favicon.ico?d=${startTime}`
      img.onload = () => {
        const endTime = new Date().getTime()
        const delta = endTime - startTime
        if ((count + 1) % 5 === 0) {
          const maxPing = Math.max(delta, ...pingList)
          const minPing = Math.min(delta, ...pingList)
          setJitter(maxPing - minPing)
          setPingList([])
        } else {
          setPingList(lastList => [...lastList, delta])
        }
        setCount(count + 1)
        setPing(delta)
      }
      img.onerror = err => {
        console.log('error', err)
      }
    }, 3000)
    return () => clearInterval(timer)
  }, [count, pingList])

  return {
    ping,
    jitter
  }
}

export default network
