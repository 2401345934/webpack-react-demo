import { Suspense, lazy } from 'react'
import { createHashRouter } from 'react-router-dom'
import Loading from '@/components/Loading'
import IncludesSubmenusWarp from '@/components/IncludesSubmenusWarp'
import { generateRouterItemKey, flattenRouter } from './helper'
import LineVscode from '@/pages/LineVscode'
const BaseLayout = lazy(() => import('@/index'))
const Wecome = lazy(() => import('@/pages/Wecome'))
const NotPage = lazy(() => import('@/pages/404'))
const Todo = lazy(() => import('@/pages/Todo'))
const AntdTable = lazy(() => import('@/pages/AntdTable'))
const Cms = lazy(() => import('@/pages/Cms'))
const QueryTable = lazy(() => import('@/pages/QueryTable'))

export type RouterType = {
  path?: string
  label?: string
  redirect?: string
  key?: string
  menuLabel?: string
  element?: JSX.Element
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
      {
        path: 'wecome',
        label: '首页',
        element: (
          <Suspense fallback={<Loading />}>
            <Wecome />
          </Suspense>
        )
      },
      {
        path: 'todo',
        label: '代办事项',
        element: <IncludesSubmenusWarp />,
        children: [
          {
            path: 'wecome1',
            label: '首页',
            element: (
              <Suspense fallback={<Loading />}>
                <Wecome />
              </Suspense>
            )
          },
          {
            path: 'wecome2',
            label: '代办事项',
            element: (
              <Suspense fallback={<Loading />}>
                <Todo />
              </Suspense>
            )
          },
          {
            path: 'wecome3',
            label: '表格',
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
        element: (
          <Suspense fallback={<Loading />}>
            <AntdTable />
          </Suspense>
        )
      },
      {
        path: 'cms',
        label: 'CMS内容中心',
        element: (
          <Suspense fallback={<Loading />}>
            <Cms />
          </Suspense>
        )
      },
      {
        path: 'queryTable',
        label: 'QueryTable',
        element: (
          <Suspense fallback={<Loading />}>
            <QueryTable />
          </Suspense>
        )
      },
      {
        path: 'lineVscode',
        label: '线上 vscode',
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

export type InitRouteType = {
  key: string
  label: string
  closable: boolean
  children: JSX.Element
}
const initRoute: InitRouteType[] = [
  {
    key: 'wecome',
    label: '首页',
    closable: false,
    children: (
      <Suspense fallback={<Loading />}>
        <Wecome />
      </Suspense>
    )
  }
]

export { router, routerList, initRoute, deepFlatRouter }
