import { Fragment } from 'react'
import Sider from 'antd/lib/layout/Sider'
import { Menu } from 'antd'
import { routerList } from '@/router'

type PropsType = {
  collapsed: boolean
  currentPath: string
  defaultOpenKeys: string[]
  goRouter: (e: { key: string; keyPath: string[] }) => void
  setDefaultOpenKeys: (e: string[]) => void
  menuLayout: string
}
export default (props: PropsType): JSX.Element => {
  const {
    currentPath,
    goRouter,
    collapsed,
    defaultOpenKeys,
    setDefaultOpenKeys,
    menuLayout
  } = props
  const onOpenChange = (openKeys: string[]) => {
    setDefaultOpenKeys(openKeys)
  }
  return (
    <Fragment>
      <Sider
        className="layout-sider"
        trigger={null}
        collapsible
        collapsedWidth={70}
        collapsed={collapsed}
      >
        <div className="logo" />
        {menuLayout === 'slide' && (
          <Menu
            theme="light"
            openKeys={defaultOpenKeys}
            onOpenChange={onOpenChange}
            inlineCollapsed={collapsed}
            onClick={goRouter}
            mode="inline"
            defaultOpenKeys={defaultOpenKeys}
            selectedKeys={[currentPath]}
            items={routerList}
          />
        )}
      </Sider>
    </Fragment>
  )
}
