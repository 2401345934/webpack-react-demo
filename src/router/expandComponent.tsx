import { Suspense } from 'react'
import Loading from '@/components/Loading'
import { RouterType } from './index'
import { AlertTwoTone } from '@ant-design/icons'
const FixedButtonPage = lazy(() => import('@/pages/FixedButtonPage'))
const BaseLayout = lazy(() => import('@/index'))

const initRouter: RouterType[] = [
  {
    path: 'expand',
    icon: <AlertTwoTone />,
    label: '拓展组件',
    element: () => (
      <Suspense fallback={<Loading />}>
        <BaseLayout />
      </Suspense>
    ),
    children: [
      {
        path: 'fixedButton',
        label: '固定底部操作栏',
        element: props => (
          <Suspense fallback={<Loading />}>
            <FixedButtonPage {...props} />
          </Suspense>
        ),
      },
    ],
  },
]

export default initRouter
