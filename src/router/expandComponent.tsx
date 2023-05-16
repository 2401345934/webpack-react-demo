import { Suspense } from 'react'
import Loading from '@/components/Loading'
import { RouterType } from './index'
import { AlertTwoTone } from '@ant-design/icons'
import IncludesSubmenusWarp from '@/components/IncludesSubmenusWarp'
const FixedButtonPage = lazy(() => import('@/pages/FixedButtonPage'))
const AntdTable = lazy(() => import('@/pages/AntdTable'))
const QueryTable = lazy(() => import('@/pages/QueryTable'))
const Tree = lazy(() => import('@/pages/Tree'))

const initRouter: RouterType[] = [
  {
    path: 'expand',
    authCode: '0004',
    icon: <AlertTwoTone />,
    label: '拓展组件',
    element: () => <IncludesSubmenusWarp />,
    children: [
      {
        path: 'fixedButton',
        authCode: '0005',
        label: '固定底部操作栏',
        element: props => (
          <Suspense fallback={<Loading />}>
            <FixedButtonPage {...props} />
          </Suspense>
        ),
      },
      {
        path: 'antdTable',
        authCode: '0006',
        label: '支持拖拽表格',
        element: props => (
          <Suspense fallback={<Loading />}>
            <AntdTable {...props} />
          </Suspense>
        ),
      },
      {
        path: 'queryTable',
        authCode: '0007',
        label: 'QueryTable（快速crud）',
        element: props => (
          <Suspense fallback={<Loading />}>
            <QueryTable {...props} />
          </Suspense>
        ),
      },
      {
        path: 'tree',
        authCode: '0008',
        label: '虚拟列表Tree（支持百万数据）',
        element: props => (
          <Suspense fallback={<Loading />}>
            <Tree {...props} />
          </Suspense>
        ),
      },
    ],
  },
]

export default initRouter
