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
import localDataManagement from '@/utils/localDataManagement'
// import request from '@/request'
import { RouterType, deepFlatRouter } from '@/router'
const Component: React.FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const ref = useRef<{
    routerChange: () => void
  }>(null)
  const key: string = location.pathname.slice(1, location.pathname.length) || ''
  const keyList: string[] = key.split('/')
  const assembleKey: string = keyList[keyList.length - 1]
  const [locale] = useState<Locale>(zhCN)
  const [menuLayout, setMenuLayout] = useState<string>('slide')
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [currentPath, setCurrentPath] = useState<string>(assembleKey)
  const [themeColor, setThemeColor] = useState<string>('')
  const [selectColor, setSelectColor] = useState<string>('')
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>(
    keyList.filter((key: string) => key !== assembleKey)
  )
  const [initItems, setInitItems] = useState<any>(false)

  useEffect(() => {
    setCurrentPath(location.pathname.slice(1))
    const uuid = location.pathname + location.search
    const routerItem = deepFlatRouter.find(
      (route: RouterType) => `/${route.path}` === location.pathname
    )
    let routerList: any = localDataManagement.getItem('routerList') || '[]'
    routerList = JSON.parse(routerList)
    if (!routerList.find((item: any) => item.uuid === uuid) && routerItem) {
      routerList.push({
        key: routerItem.key,
        label: routerItem.menuLabel || routerItem.label,
        closable: true,
        children: routerItem.element,
        uuid
      })
      localDataManagement.setItem('routerList', JSON.stringify(routerList))
    }
    if (ref?.current) {
      ref?.current?.routerChange()
    }
  }, [location])
  // 处理刷新页面重定向 menu key
  useEffect(() => {
    navigate(`/${key}`)
  }, [])
  useEffect(() => {
    let routerList: any = localDataManagement.getItem('routerList') || '[]'
    routerList = JSON.parse(routerList)
    let originItems: any = []
    if (routerList.length) {
      routerList.forEach((item: any) => {
        const routerItem = deepFlatRouter.find(
          (route: RouterType) => route.path === item.key
        )
        originItems.push({
          key: routerItem.key,
          label: routerItem.menuLabel || routerItem.label,
          closable: true,
          children: routerItem.element
        })
      })
      setInitItems([...originItems])
    } else {
      setInitItems([])
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
          {menuLayout === 'slide' && (
            <WarpMenu
              goRouter={goRouter}
              defaultOpenKeys={defaultOpenKeys}
              setDefaultOpenKeys={setDefaultOpenKeys}
              currentPath={currentPath}
              menuLayout={menuLayout}
              collapsed={collapsed}
            ></WarpMenu>
          )}

          <Layout className="site-layout">
            {/* headers */}
            <WarpHeader
              changeTheme={changeTheme}
              goRouter={goRouter}
              updateTheme={updateTheme}
              setDefaultOpenKeys={setDefaultOpenKeys}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              defaultOpenKeys={defaultOpenKeys}
              menuLayout={menuLayout}
              currentPath={currentPath}
            ></WarpHeader>
            {/* content */}
            {Array.isArray(initItems) && (
              <WarpComponent ref={ref} initItems={initItems}></WarpComponent>
            )}
          </Layout>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Component
