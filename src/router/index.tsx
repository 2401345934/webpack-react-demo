import { ReactNode, Suspense } from 'react'
import { createHashRouter } from 'react-router-dom'
import Loading from '@/components/Loading'
import IncludesSubmenusWarp from '@/components/IncludesSubmenusWarp'
import { generateRouterItemKey, flattenRouter } from './helper'
import {
  AlertTwoTone,
  BuildTwoTone,
  SafetyCertificateTwoTone,
  SoundTwoTone,
  TagsTwoTone,
} from '@ant-design/icons'
import resultPage from './resultPage'
import expandComponent from './expandComponent'
const BaseLayout = lazy(() => import('@/index'))
const Wecome = lazy(() => import('@/pages/Wecome'))
const NotPage = lazy(() => import('@/pages/404'))
const Todo = lazy(() => import('@/pages/Todo'))
const AntdTable = lazy(() => import('@/pages/AntdTable'))
const Cms = lazy(() => import('@/pages/Cms'))
const QueryTable = lazy(() => import('@/pages/QueryTable'))
const Tree = lazy(() => import('@/pages/Tree'))
const NetWrok = lazy(() => import('@/pages/NetWrok'))

const initRoute: RouterType = {
  path: 'wecome',
  key: 'wecome',
  label: '首页',
  icon: <AlertTwoTone />,
  element: (props: any) => (
    <Suspense fallback={<Loading />}>
      <Wecome {...props} />
    </Suspense>
  ),
}
const initTabItem = {
  path: 'wecome',
  key: 'wecome',
  label: '首页',
  icon: <AlertTwoTone />,
  children: (props: any) => (
    <Suspense fallback={<Loading />}>
      <Wecome {...props} />
    </Suspense>
  ),
}

export type RouterType = {
  path: string
  label?: string
  redirect?: string
  key?: string
  menuLabel?: string
  element?: (props: any) => JSX.Element
  icon?: ReactNode
  children?: RouterType[]
}
const initRouter: RouterType[] = [
  {
    path: '/',
    element: props => (
      <Suspense fallback={<Loading />}>
        <BaseLayout {...props} />
      </Suspense>
    ),
    children: [
      {
        path: 'wecome',
        label: '首页',
        icon: <AlertTwoTone />,
        element: props => (
          <Suspense fallback={<Loading />}>
            <Wecome {...props} />
          </Suspense>
        ),
      },
      {
        path: 'todo',
        label: '代办事项',
        icon: <TagsTwoTone />,
        element: () => <IncludesSubmenusWarp />,
        children: [
          {
            path: 'wecome2',
            label: '代办事项',
            icon: <TagsTwoTone />,
            element: props => (
              <Suspense fallback={<Loading />}>
                <Todo {...props} />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'antdTable',
        label: '表格',
        icon: <SafetyCertificateTwoTone />,
        element: props => (
          <Suspense fallback={<Loading />}>
            <AntdTable {...props} />
          </Suspense>
        ),
      },
      {
        path: 'cms',
        label: 'CMS内容中心',
        icon: <SoundTwoTone />,
        element: props => (
          <Suspense fallback={<Loading />}>
            <Cms {...props} />
          </Suspense>
        ),
      },
      {
        path: 'queryTable',
        label: 'QueryTable',
        icon: <SafetyCertificateTwoTone />,
        element: props => (
          <Suspense fallback={<Loading />}>
            <QueryTable {...props} />
          </Suspense>
        ),
      },
      {
        path: 'tree',
        label: 'Tree',
        icon: <BuildTwoTone />,
        element: props => (
          <Suspense fallback={<Loading />}>
            <Tree {...props} />
          </Suspense>
        ),
      },
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
      ...resultPage,
      ...expandComponent,
    ],
  },
  {
    path: '*',
    element: (props: any) => <NotPage {...props} />,
  },
]

// 生成路由
const router = createHashRouter(
  initRouter.map((route: any) => ({
    ...route,
    element: route.element(),
  })),
)
// 生成路由key段列表
const routerList: any[] = generateRouterItemKey(initRouter[0].children || [])
// 扁平化路由
const deepFlatRouter: any[] = flattenRouter(routerList)
// 一级路由
const firstRouterList: any[] =
  routerList.map((route: RouterType) => ({
    ...route,
    children: [],
  })) || []

export {
  router,
  routerList,
  initRoute,
  deepFlatRouter,
  firstRouterList,
  initTabItem,
}
