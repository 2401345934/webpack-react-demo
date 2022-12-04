import { Fragment } from 'react'
import Sider from 'antd/lib/layout/Sider'
import { Menu } from 'antd'
import { routerList } from '@/router'

type PropsType = {
  collapsed: boolean
  currentPath: string
  defaultOpenKeys: string[]
  goRouter: (e: { key: string; keyPath: string[] }) => void
}
export default (props: PropsType) => {
  const { currentPath, goRouter, collapsed, defaultOpenKeys } = props
  return (
    <Fragment>
      <Sider
        className="layout-sider"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo" />
        <Menu
          theme="light"
          openKeys={defaultOpenKeys}
          onClick={goRouter}
          mode="inline"
          defaultOpenKeys={defaultOpenKeys}
          selectedKeys={[currentPath]}
          items={routerList}
        />
      </Sider>
    </Fragment>
  )
}
