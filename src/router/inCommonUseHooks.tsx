import { Suspense } from 'react'
import Loading from '@/components/Loading'
import { RouterType } from './index'
import { AlertTwoTone, BuildTwoTone } from '@ant-design/icons'
import IncludesSubmenusWarp from '@/components/IncludesSubmenusWarp'
const NetWrok = lazy(() => import('@/pages/NetWrok'))

const initRouter: RouterType[] = [
  {
    path: 'hooks',
    icon: <AlertTwoTone />,
    label: '常用hooks',
    element: () => <IncludesSubmenusWarp />,
    children: [
      {
        path: 'network',
        label: 'network',
        icon: <BuildTwoTone />,
        element: props => (
          <Suspense fallback={<Loading />}>
            <NetWrok {...props} />
          </Suspense>
        ),
      },
    ],
  },
]

export default initRouter
