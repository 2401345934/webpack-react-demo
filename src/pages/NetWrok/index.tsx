import { useNetwork } from '@/hooks'
import React from 'react'

const NetWrok = React.memo(() => {
  const { ping, jitter } = useNetwork()

  return (
    <div className="text-center">
      <h1>欢迎使用 alan</h1>
      <h1>PING: {ping}ms</h1>
      <h1>抖动: {jitter}ms</h1>
    </div>
  )
})

export default NetWrok
