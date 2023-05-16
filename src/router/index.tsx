import { ReactNode, Suspense } from 'react'
import { createHashRouter } from 'react-router-dom'
import Loading from '@/components/Loading'
import IncludesSubmenusWarp from '@/components/IncludesSubmenusWarp'
import {
  generateRouterItemKey,
  flattenRouter,
  generateRouterItemFnc,
} from './helper'
import { AlertTwoTone, SoundTwoTone, TagsTwoTone } from '@ant-design/icons'
import resultPage from './resultPage'
import expandComponent from './expandComponent'
import inCommonUseHooks from './inCommonUseHooks'
import utils from '@/utils'
const BaseLayout = lazy(() => import('@/index'))
const Wecome = lazy(() => import('@/pages/Wecome'))
const NotPage = lazy(() => import('@/pages/404'))
const Todo = lazy(() => import('@/pages/Todo'))
const Cms = lazy(() => import('@/pages/Cms'))

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
  authCode?: string
  redirect?: string
  labelList?: string[]
  pathList?: string[]
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
        authCode: '0001',
        label: '代办事项',
        icon: <TagsTwoTone />,
        element: () => <IncludesSubmenusWarp />,
        children: [
          {
            path: 'wecome2',
            label: '代办事项',
            authCode: '0002',
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
        path: 'cms',
        authCode: '0003',
        label: 'CMS内容中心',
        icon: <SoundTwoTone />,
        element: props => (
          <Suspense fallback={<Loading />}>
            <Cms {...props} />
          </Suspense>
        ),
      },
      // 常用反馈页面
      ...resultPage,
      // 常用组件
      ...expandComponent,
      // 常用  hooks
      ...inCommonUseHooks,
    ],
  },
  {
    path: '*',
    element: (props: any) => <NotPage {...props} />,
  },
]

// 生成路由key段列表
const routerList: any[] = generateRouterItemKey(initRouter[0].children || [], {
  isAuthCode: false,
})
// 扁平化路由
const deepFlatRouter: any[] = flattenRouter(
  generateRouterItemKey(initRouter[0].children || [], {
    isBacktrackParanet: true,
  }),
)
// 生成的路由 map
const routesMap = generateRouterItemFnc(initRouter)
// 生成路由
const router = createHashRouter(routesMap)
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
