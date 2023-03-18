import Loading from '@/components/Loading'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export default (): JSX.Element => {
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  )
}
