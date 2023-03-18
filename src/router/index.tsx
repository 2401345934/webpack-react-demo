import { ReactNode, Suspense, lazy } from 'react'
import { createHashRouter } from 'react-router-dom'
import Loading from '@/components/Loading'
import IncludesSubmenusWarp from '@/components/IncludesSubmenusWarp'
import { generateRouterItemKey, flattenRouter } from './helper'
import LineVscode from '@/pages/LineVscode'
import {
  AlertTwoTone,
  BuildTwoTone,
  SafetyCertificateTwoTone,
  SoundTwoTone,
  TabletTwoTone,
  TagsTwoTone
} from '@ant-design/icons'
const BaseLayout = lazy(() => import('@/index'))
const Wecome = lazy(() => import('@/pages/Wecome'))
const NotPage = lazy(() => import('@/pages/404'))
const Todo = lazy(() => import('@/pages/Todo'))
const AntdTable = lazy(() => import('@/pages/AntdTable'))
const Cms = lazy(() => import('@/pages/Cms'))
const QueryTable = lazy(() => import('@/pages/QueryTable'))

const initRoute: RouterType = {
  path: 'wecome',
  label: '首页',
  icon: <AlertTwoTone />,
  element: (
    <Suspense fallback={<Loading />}>
      <Wecome />
    </Suspense>
  )
}
export type RouterType = {
  path: string
  label?: string
  redirect?: string
  key?: string
  menuLabel?: string
  element?: JSX.Element
  icon?: ReactNode
  children?: RouterType[]
}
const initRouter: RouterType[] = [
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <BaseLayout />
      </Suspense>
    ),
    children: [
      initRoute,
      {
        path: 'todo',
        label: '代办事项',
        icon: <TagsTwoTone />,
        element: <IncludesSubmenusWarp />,
        children: [
          {
            path: 'wecome2',
            label: '代办事项',
            icon: <TagsTwoTone />,
            element: (
              <Suspense fallback={<Loading />}>
                <Todo />
              </Suspense>
            )
          },
          {
            path: 'wecome3',
            label: '表格',
            icon: <TabletTwoTone />,
            element: (
              <Suspense fallback={<Loading />}>
                <AntdTable />
              </Suspense>
            )
          }
        ]
      },
      {
        path: 'antd-table',
        label: '表格',
        icon: <SafetyCertificateTwoTone />,
        element: (
          <Suspense fallback={<Loading />}>
            <AntdTable />
          </Suspense>
        )
      },
      {
        path: 'cms',
        label: 'CMS内容中心',
        icon: <SoundTwoTone />,
        element: (
          <Suspense fallback={<Loading />}>
            <Cms />
          </Suspense>
        )
      },
      {
        path: 'queryTable',
        label: 'QueryTable',
        icon: <SafetyCertificateTwoTone />,
        element: (
          <Suspense fallback={<Loading />}>
            <QueryTable />
          </Suspense>
        )
      },
      {
        path: 'lineVscode',
        label: '线上 vscode',
        icon: <BuildTwoTone />,
        element: (
          <Suspense fallback={<Loading />}>
            <LineVscode />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '*',
    element: <NotPage />
  }
]

const router = createHashRouter(initRouter)
const routerList: any[] = generateRouterItemKey(initRouter[0].children || [])
const deepFlatRouter: any[] = flattenRouter(routerList)

export { router, routerList, initRoute, deepFlatRouter }
