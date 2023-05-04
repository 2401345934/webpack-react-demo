import {
  Fragment,
  forwardRef,
  useState,
  useImperativeHandle,
  memo,
} from 'react'
import { Tabs } from 'antd'
import React from 'react'
import { deepFlatRouter, RouterType, initTabItem } from '@/router'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './styles.module.less'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import utils from '@/utils'
import { DELETE_CATCH_TAB } from '../cacheTabHelper'
import { useGetState, useMount } from 'ahooks'
import withGreeting from '../WithComponent'

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
    const routerItem = deepFlatRouter.find(
      (route: RouterType) => `/${route.path}` === key,
    )
    if (!routerItem) return
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

  return (
    <Fragment>
      <div className={styles.warpComponent} {...rest}>
        <Tabs
          type="editable-card"
          hideAdd
          onChange={onChange}
          onEdit={onEdit}
          activeKey={activeKey}
          items={items.map(item => {
            return {
              ...item,
              children: item.children({}),
            }
          })}
        />
        {/* 全屏功能 */}
        <div
          className={styles.fullscreenOutlined}
          onClick={() => toggleFullScreen()}
        >
          {fullscreenFlag ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </div>
      </div>
    </Fragment>
  )
})

export default memo(WarpComponent)
