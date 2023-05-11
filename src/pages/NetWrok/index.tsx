import PageWarp from '@/components/BusinessComponent/PageWarp'
import { useNetwork } from '@/hooks'

const NetWrok = memo(() => {
  const { ping, jitter } = useNetwork()

  return (
    <PageWarp>
      <div className="text-center">
        <h1>欢迎使用 alan</h1>
        <h1>PING: {ping}ms</h1>
        <h1>抖动: {jitter}ms</h1>
      </div>
    </PageWarp>
  )
})

export default NetWrok
