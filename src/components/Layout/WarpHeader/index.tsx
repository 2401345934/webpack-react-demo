import React from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import styles from './styles.module.less'
import utils from '@/utils'
import { TypeObjStr } from '@/utils/utilsTypes.type'
import { MENU_MODE, initialThemeValueList } from '@/dictionary/layoutDict'
import { RouterType, firstRouterList, routerList } from '@/router'
import UpdateTheme from '../UpdateTheme'
import GLOBAL_CONFIG from '@globalConfig'

const { Header } = Layout

type PropsType = {
  collapsed: boolean
  defaultOpenKeys: string[]
  currentPath: string
  menuLayout: string
  changeTheme: (value: string) => void
  updateTheme: () => void
  setCollapsed: (e: boolean) => void
  setDefaultOpenKeys: (e: string[]) => void
  setChildrenRouterList: (e: any[]) => void
  setOpenSearch: (e: boolean) => void
  goRouter: (e: { key: string; keyPath: string[] }) => void
}

const WarpHeader = forwardRef((props: PropsType, ref): JSX.Element => {
  const {
    changeTheme,
    setChildrenRouterList,
    setCollapsed,
    currentPath,
    goRouter,
    collapsed,
    defaultOpenKeys,
    setDefaultOpenKeys,
    menuLayout,
    setOpenSearch,
  } = props
  const navigate = useNavigate()
  const location = useLocation()

  const updateThemeRef = useRef<{
    form: any
  }>(null)
  //  是否展开全局设置
  const [open, setOpen] = useState<boolean>(false)
  //  当前选中的 key
  const [key, setKey] = useState<string[]>([`wecome`])
  //  默认选中的 path
  const initTabPath = currentPath ? currentPath.split('/')[0] : ''
  const [fullscreenFlag, setFullscreenFlag] = useState<boolean>(false)

  // 对外暴露 routerChange 方法
  useImperativeHandle(ref, () => ({
    findRouterPath,
  }))

  useMount(() => {
    const initValues: TypeObjStr = {}
    initialThemeValueList.forEach(item => {
      initValues[item.key] = item.initColor
    })
    if (updateThemeRef?.current) {
      updateThemeRef.current.form.setFieldsValue(initValues)
    }
  })

  //  根据当前路由找到对应的菜单
  const findRouterPath = () => {
    const key: string =
      location.pathname.slice(1, location.pathname.length) || ''
    const keyList: string[] = key.split('/')
    const itemRouter: RouterType = routerList.find(
      (item: RouterType) => item.key === keyList[0],
    )!
    setKey([keyList[0]])
    if (itemRouter?.children) {
      setChildrenRouterList(itemRouter.children)
    } else {
      setChildrenRouterList([])
    }
  }

  //  菜单展开收起
  const onOpenChange = (openKeys: string[]) => {
    setDefaultOpenKeys(openKeys)
  }
  //  关闭全局设置
  const onClose = () => {
    setOpen(false)
  }
  //  打开全局设置
  const handleOpen = () => {
    setOpen(true)
  }
  //  切换主题色
  const handleSubmit = () => {
    if (updateThemeRef?.current) {
      const values = updateThemeRef.current.form.getFieldsValue()
      changeTheme(values.mainColor)
      utils.updateCustomCssVar(values)
    }
  }

  // 搜索
  const handleOpenSearch = () => {
    setOpenSearch(true)
  }

  //  切换菜单
  const handleChangeMenu = (strArr: string[]) => {
    if (!strArr.length) return
    setKey(strArr)
    const itemRouter: RouterType = routerList.find(
      (item: RouterType) => item.key === strArr[0],
    )!
    if (itemRouter) {
      if (itemRouter.children) {
        if (itemRouter.children[0]) {
          navigate(`/${itemRouter.children[0].path}`)
        }
        setChildrenRouterList(itemRouter.children)
      } else {
        navigate(`/${strArr[0]}`)
        setChildrenRouterList([])
      }
    }
  }

  return (
    <div className="layout-warp-header">
      <Header className="site-layout-Header">
        {menuLayout === MENU_MODE.SLIDEANDHEADER && (
          <>
            <Menu
              theme="light"
              inlineCollapsed={collapsed}
              onOpenChange={handleChangeMenu}
              mode="horizontal"
              triggerSubMenuAction="click"
              selectedKeys={key.length ? key : [initTabPath]}
              items={firstRouterList}
            />
          </>
        )}
        {menuLayout === MENU_MODE.HEADER && (
          <>
            <div className="logo"></div>
            <Menu
              theme="light"
              openKeys={defaultOpenKeys}
              onOpenChange={onOpenChange}
              inlineCollapsed={collapsed}
              onClick={goRouter}
              mode="horizontal"
              defaultOpenKeys={defaultOpenKeys}
              selectedKeys={[currentPath]}
              items={routerList}
            />
          </>
        )}
        {menuLayout === MENU_MODE.SLIDE && (
          <div className={styles.layoutHeaderWarp}>
            <Space>
              {GLOBAL_CONFIG.IS_OPEN_MENU_TOGGLE_ACTIVE && (
                <>
                  {React.createElement(
                    collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                    {
                      className: 'trigger',
                      onClick: () => setCollapsed(!collapsed),
                    },
                  )}
                </>
              )}
            </Space>
          </div>
        )}
        <Space className={styles.actionsWrap}>
          {GLOBAL_CONFIG.IS_OPEN_GLOBAL_SEARCH && (
            <>
              {/* 搜索 */}
              <div className={styles.search}>
                <SearchOutlined onClick={handleOpenSearch} />
              </div>
            </>
          )}
          {/* 切换主题色 */}
          <div className={styles.theme}>
            <Button onClick={() => handleOpen()}>切换主题</Button>
          </div>
        </Space>
      </Header>
      {/* 修改主题色 */}
      {GLOBAL_CONFIG.UPDATE_THEME_OPEN && (
        <UpdateTheme
          open={open}
          onClose={onClose}
          handleSubmit={handleSubmit}
          ref={updateThemeRef}
          initialValueList={initialThemeValueList}
        ></UpdateTheme>
      )}
    </div>
  )
})
export default memo(WarpHeader)
