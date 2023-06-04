import { Fragment } from 'react'
import { initTabItem } from '@/router'
import styles from './styles.module.less'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import utils from '@/utils'
import { CLEAR_CATCH_TAB, DELETE_CATCH_TAB } from '../cacheTabHelper'
import GLOBAL_CONFIG from '@globalConfig'
import { findCurrentRouter } from '@/router/helper'
import { isHavePermission } from '@/components/Auth/helperAuth'
import { Watermark } from 'antd'

type PropsType = {
  children?: React.ReactNode
  [key: string]: any
}
const WarpComponent = forwardRef((props: PropsType, ref): JSX.Element => {
  const { children, initItems, ...rest } = props
  const location = useLocation()
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useGetState<string>(initTabItem.path)
  const [items, setItems, getItems] = useGetState<any[]>(initItems)
  const [fullscreenFlag, setFullscreenFlag] = useState<boolean>(false)
  // 对外暴露 routerChange 方法
  useImperativeHandle(ref, () => ({
    routerChange,
    getItems,
  }))

  useMount(() => {
    if (initItems.length) {
      setItems(initItems)
      setActiveKey(initItems[initItems.length - 1].key)
    } else {
      setItems([initTabItem])
      setActiveKey(initTabItem.path)
    }
  })

  //  路由变化
  const routerChange = () => {
    const key = location.pathname
    const routerItem = findCurrentRouter(key)
    if (!routerItem) return
    // 判断是否拥有权限
    if (routerItem.authCode && !isHavePermission(routerItem.authCode)) return
    setActiveKey(routerItem.key)
    if (getItems().find(route => `/${route.key}` === key)) return
    setItems(val => {
      return [
        ...val,
        {
          key: routerItem.key,
          label: routerItem.menuLabel || routerItem.label,
          closable: true,
          children: routerItem.element,
        },
      ]
    })
  }

  // 标签页切换
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey)
    navigate(newActiveKey)
  }

  // 删除页签
  const onEdit = (e: React.MouseEvent | React.KeyboardEvent | string) => {
    const newItems = items.filter(item => item.key !== e)
    const lastkey: string = newItems[newItems.length - 1]?.key!
    setItems(newItems.length ? newItems : [initTabItem])
    setActiveKey(lastkey || initTabItem.path)
    navigate(lastkey || initTabItem.path)
    DELETE_CATCH_TAB(location.pathname + location.search)
  }

  // 切换全屏
  const toggleFullScreen = () => {
    utils.toggleFullscreen({
      fullscreenFlag,
      className: styles.warpComponent,
    })
    setFullscreenFlag(!fullscreenFlag)
  }

  const removeAll = () => {
    setItems([initTabItem])
    setActiveKey(initTabItem.path)
    navigate(initTabItem.path)
    CLEAR_CATCH_TAB()
  }

  return (
    <div className="globalComponent">
      <Watermark content="Alan Xiao">
        <div className={styles.warpComponent} {...rest}>
          {GLOBAL_CONFIG.IS_OPEN_TAB ? (
            <>
              {/* 标签页 */}
              <Tabs
                type="editable-card"
                hideAdd
                onChange={onChange}
                onEdit={onEdit}
                activeKey={activeKey}
                items={items.map(item => {
                  return {
                    ...item,
                    children: item.children({
                      onTabEdit: onEdit,
                      onTabChange: onChange,
                      onTabRemoveAll: removeAll,
                    }),
                  }
                })}
              />
              {/* 全屏功能 */}
              <div
                className={styles.fullscreenOutlined}
                onClick={() => toggleFullScreen()}
              >
                {fullscreenFlag ? (
                  <FullscreenExitOutlined />
                ) : (
                  <FullscreenOutlined />
                )}
              </div>
            </>
          ) : (
            <Outlet></Outlet>
          )}
        </div>
      </Watermark>
    </div>
  )
})

export default memo(WarpComponent)
