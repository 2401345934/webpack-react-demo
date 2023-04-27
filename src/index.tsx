import { ConfigProvider, Layout } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import WarpComponent from '@/components/Layout/WarpComponent'
import WarpMenu from '@/components/Layout/WarpMenu'
import WarpHeader from '@/components/Layout/WarpHeader'
import utils from '@/utils'
import zhCN from 'antd/locale/zh_CN'
import { Locale } from 'antd/es/locale'
import GlobalSetting from './components/GlobalSetting'
// import request from '@/request'
import {
  ADD_CATCH_TAB,
  GET_CATCH_TAB
} from './components/Layout/cacheTabHelper'
import { RouterType, deepFlatRouter, initTabItem } from './router'
const Component: React.FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const componentRef = useRef<{
    routerChange: () => void
  }>(null)
  const headerRef = useRef<{
    findRouterPath: () => void
  }>(null)
  const key: string = location.pathname.slice(1, location.pathname.length) || ''
  const keyList: string[] = key.split('/')
  const assembleKey: string = keyList[keyList.length - 1]
  const [locale] = useState<Locale>(zhCN)
  const [menuLayout, setMenuLayout] = useState<string>('slideAndHeader')
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [currentPath, setCurrentPath] = useState<string>(assembleKey)
  const [themeColor, setThemeColor] = useState<string>('')
  const [selectColor, setSelectColor] = useState<string>('')
  const [childrenRouterList, setChildrenRouterList] = useState<any[]>([])
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>(
    keyList.filter((key: string) => key !== assembleKey)
  )
  const [initItems, setInitItems] = useState<any>(false)

  useEffect(() => {
    setCurrentPath(location.pathname.slice(1))
    ADD_CATCH_TAB(location)
    // component 触发 header 切换
    if (componentRef?.current) {
      componentRef?.current?.routerChange()
    }
    if (headerRef?.current) {
      headerRef?.current?.findRouterPath()
    }
  }, [location])

  // 处理刷新页面重定向 menu key
  useEffect(() => {
    navigate(`${location.pathname}`)
    const initRouter = GET_CATCH_TAB()
    if (!initRouter.length) {
      const routerItem = deepFlatRouter.find(
        (route: RouterType) => `/${route.path}` === location.pathname
      )
      if (!routerItem) {
        setInitItems([initTabItem])
        return
      }
      setInitItems([
        {
          key: routerItem.key,
          label: routerItem.menuLabel || routerItem.label,
          closable: true,
          children: routerItem.element
        }
      ])
    } else {
      setInitItems(initRouter)
    }
  }, [])

  // 路由跳转
  const goRouter = (e: { key: string; keyPath: string[] }): void => {
    if (e.key === currentPath) return
    setCurrentPath(e.key)
    navigate(e.key)
    setDefaultOpenKeys(e.keyPath)
  }

  // 选择的颜色
  const changeTheme = (value: string) => {
    setSelectColor(value)
    setThemeColor(value)
  }

  // 改变主题
  const updateTheme = () => {
    if (selectColor === themeColor) return
    setThemeColor(selectColor)
    utils.updateCustomCssVar({
      mainColor: selectColor
    })
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: themeColor
        }
      }}
      locale={locale}
      csp={{ nonce: 'YourNonceCode' }}
    >
      {/* global setting */}
      <div className="global-setting">
        <GlobalSetting
          setMenuLayout={setMenuLayout}
          menuLayout={menuLayout}
        ></GlobalSetting>
      </div>
      {/* layout */}
      <div className="layout-warp">
        <div className="warp">
          {/* menu */}
          {(menuLayout === 'slide' || menuLayout === 'slideAndHeader') && (
            <WarpMenu
              goRouter={goRouter}
              defaultOpenKeys={defaultOpenKeys}
              setDefaultOpenKeys={setDefaultOpenKeys}
              currentPath={currentPath}
              menuLayout={menuLayout}
              collapsed={collapsed}
              childrenRouterList={childrenRouterList}
            ></WarpMenu>
          )}

          <Layout className="site-layout">
            {/* headers */}
            <WarpHeader
              changeTheme={changeTheme}
              goRouter={goRouter}
              ref={headerRef}
              updateTheme={updateTheme}
              setDefaultOpenKeys={setDefaultOpenKeys}
              setChildrenRouterList={setChildrenRouterList}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              defaultOpenKeys={defaultOpenKeys}
              menuLayout={menuLayout}
              currentPath={currentPath}
            ></WarpHeader>
            {/* content */}
            {Array.isArray(initItems) && (
              <WarpComponent
                ref={componentRef}
                initItems={initItems}
              ></WarpComponent>
            )}
          </Layout>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Component
