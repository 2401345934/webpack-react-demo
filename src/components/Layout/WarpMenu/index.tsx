import { Fragment } from 'react'
import Sider from 'antd/lib/layout/Sider'
import { routerList } from '@/router'
import { filterRoutesByAuthCode } from '@/components/Auth/helperAuth'

type PropsType = {
  collapsed: boolean
  currentPath: string
  defaultOpenKeys: string[]
  goRouter: (e: { key: string; keyPath: string[] }) => void
  setDefaultOpenKeys: (e: string[]) => void
  menuLayout: string
  childrenRouterList: any[]
}

const WarpMenu = (props: PropsType): JSX.Element => {
  const {
    currentPath,
    goRouter,
    collapsed,
    defaultOpenKeys,
    setDefaultOpenKeys,
    menuLayout,
    childrenRouterList,
  } = props
  const [routerLists, setRouterLists] = useState<any>([])
  useMount(() => {
    setRouterLists(filterRoutesByAuthCode(routerList))
  })
  //  路由跳转
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
            items={routerLists}
          />
        )}
        {menuLayout === 'slideAndHeader' && (
          <Menu
            theme="light"
            openKeys={defaultOpenKeys}
            onOpenChange={onOpenChange}
            inlineCollapsed={collapsed}
            onClick={goRouter}
            mode="inline"
            defaultOpenKeys={defaultOpenKeys}
            selectedKeys={[currentPath]}
            items={childrenRouterList}
          />
        )}
      </Sider>
    </Fragment>
  )
}

export default memo(WarpMenu)
