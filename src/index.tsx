import WarpComponent from '@/Layout/WarpComponent'
import WarpMenu from '@/Layout/WarpMenu'
import WarpHeader from '@/Layout/WarpHeader'
import utils from '@/utils'
import zhCN from 'antd/locale/zh_CN'
import { Locale } from 'antd/es/locale'
import GlobalSetting from './components/GlobalSetting'
import GLOBAL_CONFIG from '@globalConfig'
// import request from '@/request'
import { ADD_CATCH_TAB, GET_CATCH_TAB } from './Layout/cacheTabHelper'
import { initRoute, initTabItem } from './router'
import { MENU_MODE } from './dictionary/layoutDict'
import GlobalSearch from './components/GlobalSearch'
import { isHavePermission } from './components/Auth/helperAuth'
import { findCurrentRouter } from './router/helper'

const Component: React.FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const componentRef = useRef<{
    routerChange: () => void
  }>(null)
  const headerRef = useRef<{
    findRouterPath: () => void
  }>(null)
  // 路由 key
  const key: string = location.pathname.slice(1, location.pathname.length) || ''
  // 路由 key 列表
  const keyList: string[] = key.split('/')
  // 路由最后一个 key
  const assembleKey: string = keyList[keyList.length - 1]
  //  国际化 语言
  const [locale] = useState<Locale>(zhCN)
  // 导航栏布局
  const [menuLayout, setMenuLayout] = useState<string>(
    GLOBAL_CONFIG.MENU_LAYOUT_LIST[0].value,
  )
  //  侧边栏收起状态
  const [collapsed, setCollapsed] = useState<boolean>(false)
  //  全局搜索
  const [openSearch, setOpenSearch] = useState<boolean>(false)
  // header 当前 path
  const [currentPath, setCurrentPath] = useState<string>(assembleKey)
  // 主题色
  const [themeColor, setThemeColor] = useState<string>('')
  //  选择的颜色
  const [selectColor, setSelectColor] = useState<string>('')
  //  左侧子菜单列表
  const [childrenRouterList, setChildrenRouterList] = useState<any[]>([])
  //  默认展开的菜单
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>(
    keyList.filter((key: string) => key !== assembleKey),
  )
  //  是否展开全局设置
  const [initItems, setInitItems] = useState<any>(false)

  useEffect(() => {
    // 获取当前路由信息
    const currentRouter = findCurrentRouter(location.pathname)
    // 判断是否拥有权限
    if (
      currentRouter &&
      currentRouter.authCode &&
      !isHavePermission(currentRouter.authCode)
    ) {
      navigate(`/result/403`)
    }
    setDefaultOpenKeys(currentRouter?.pathList)
    setCurrentPath(location.pathname.slice(1) || initRoute.path)
    ADD_CATCH_TAB(location)
    // component 触发 header 切换
    if (componentRef?.current) {
      componentRef?.current?.routerChange()
    }
    if (headerRef?.current) {
      headerRef?.current?.findRouterPath()
    }
  }, [location])

  // 监听键盘 ctal + f  苹果的 cintrola + f
  useKeyPress('ctrl.f', () => {
    if (!GLOBAL_CONFIG.IS_OPEN_GLOBAL_SEARCH) return
    setOpenSearch(!openSearch)
  })

  // 处理刷新页面重定向 menu key
  useMount(() => {
    // 开启了自动切换才切换
    if (GLOBAL_CONFIG.IS_DARK_AUDO_CHANGE) {
      utils.initSetTheme()
    }
    navigate(`${location.pathname}`)
    const initRouter = GET_CATCH_TAB()
    if (!initRouter.length) {
      const routerItem = findCurrentRouter(location.pathname)
      if (!routerItem) {
        setInitItems([initTabItem])
        return
      }
      setInitItems([
        {
          key: routerItem.key,
          label: routerItem.menuLabel || routerItem.label,
          closable: true,
          children: routerItem.element,
        },
      ])
    } else {
      setInitItems(initRouter)
    }
  })

  // 路由跳转
  const goRouter = (e: { key: string; keyPath: string[] }): void => {
    const routerItem = findCurrentRouter(`/${e.key}`)
    // 判断是否拥有权限
    if (e.key === currentPath) return
    if (routerItem.authCode && !isHavePermission(routerItem.authCode)) {
      navigate(`/result/403`)
      return
    }
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
      mainColor: selectColor,
    })
  }

  return (
    <div className="root-wrap">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: themeColor,
          },
        }}
        locale={locale}
        csp={{ nonce: 'YourNonceCode' }}
      >
        {/* global setting */}
        {/* 全局配置 */}
        {GLOBAL_CONFIG.UPDATE_SETTING_OPEN && (
          <div className="global-setting">
            <GlobalSetting
              setMenuLayout={setMenuLayout}
              menuLayout={menuLayout}
            ></GlobalSetting>
          </div>
        )}

        {GLOBAL_CONFIG.IS_OPEN_GLOBAL_SEARCH && (
          <>
            {/* 搜索模块 */}
            <GlobalSearch
              componentRef={componentRef}
              openSearch={openSearch}
              setOpenSearch={setOpenSearch}
            ></GlobalSearch>
          </>
        )}

        {/* layout */}
        <div className="layout-warp">
          <div className="warp">
            {/* menu */}
            {(menuLayout === MENU_MODE.SLIDE ||
              menuLayout === MENU_MODE.SLIDEANDHEADER) && (
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
                setOpenSearch={setOpenSearch}
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
    </div>
  )
}

export default Component
