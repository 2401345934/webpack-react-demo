import Loading from '@/components/Loading'
import { Suspense } from 'react'

export default (): JSX.Element => {
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  )
}
