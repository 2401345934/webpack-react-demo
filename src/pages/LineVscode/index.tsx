import PageWarp from '@/components/BusinessComponent/PageWarp'
import { useMount } from '@/hooks'

const Component: React.FC = (): JSX.Element => {
  useMount(() => {})
  return (
    <PageWarp>
      <div className="hello">111</div>
    </PageWarp>
  )
}

export default Component
