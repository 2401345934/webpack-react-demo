import { Fragment, forwardRef, useState, useImperativeHandle } from 'react'
import { Tabs } from 'antd'
import React from 'react'
import { deepFlatRouter, RouterType, initRoute, InitRouteType } from '@/router'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './styles.module.less'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import utils from '@/utils'
type PropsType = {
  children?: React.ReactNode
  [key: string]: any
}

export default forwardRef((props: PropsType, ref): JSX.Element => {
  const { children, ...rest } = props
  const location = useLocation()
  const navigate = useNavigate()
  const [activeKey, setActiveKey] = useState<string>(initRoute[0].key)
  const [items, setItems] = useState<InitRouteType[]>(initRoute)
  const [fullscreenFlag, setFullscreenFlag] = useState<boolean>(false)

  // 对外暴露 routerChange 方法
  useImperativeHandle(ref, () => ({
    routerChange
  }))

  const routerChange = () => {
    const key = location.pathname
    const routerItem = deepFlatRouter.find(
      (route: RouterType) => `/${route.path}` === key
    )
    if (!routerItem) return
    setActiveKey(routerItem.key)
    if (items.find(route => `/${route.key}` === key)) return
    setItems([
      ...items,
      {
        key: routerItem.key,
        label: routerItem.menuLabel || routerItem.label,
        closable: true,
        children: routerItem.element
      }
    ])
  }

  // 标签页切换
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey)
    navigate(newActiveKey)
  }

  // 删除页签
  const onEdit = (e: React.MouseEvent | React.KeyboardEvent | string) => {
    const newItems = items.filter(item => item.key !== e)
    const lastkey = newItems[newItems.length - 1].key
    setItems(newItems)
    setActiveKey(lastkey)
    navigate(lastkey)
  }

  // 切换全屏
  const toggleFullScreen = () => {
    utils.toggleFullscreen({
      fullscreenFlag,
      className: styles.warpComponent
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
          items={items}
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
