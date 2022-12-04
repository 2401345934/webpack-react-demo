import React from 'react'
import { Breadcrumb, Button, Layout, Space, Tag } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import styles from './styles.module.less'
import { routerList } from '@/router'
import { useNavigate } from 'react-router-dom'

const { Header } = Layout

type PropsType = {
  collapsed: boolean
  changeTheme: (e: { target: { value: string } }) => void
  updateTheme: () => void
  setCollapsed: (e: boolean) => void
  setDefaultOpenKeys: (e: string[]) => void
}
export default (props: PropsType) => {
  const navigate = useNavigate()

  const {
    changeTheme,
    setCollapsed,
    collapsed,
    updateTheme,
    setDefaultOpenKeys
  } = props

  const handleRouter = (path: any) => {
    navigate(path)
    setDefaultOpenKeys(path)
  }
  function itemRender(route: any, params: any, routes: any, paths: any) {
    return route.children ? (
      <Tag className={styles.hover} color="default">
        {route.label}
      </Tag>
    ) : (
      <Tag
        className={styles.hover}
        onClick={() => handleRouter(route.path)}
        color="success"
      >
        {route.label}
      </Tag>
    )
  }
  return (
    <div className="layout-warp-header">
      <Header className="site-layout-Header">
        <Space>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed)
            }
          )}
          <div>
            <Breadcrumb
              itemRender={itemRender}
              routes={routerList}
            ></Breadcrumb>
          </div>
          <div className={styles.theme}>
            选择主题颜色
            <input
              onChange={changeTheme}
              type="color"
              placeholder="placeholder"
            />
            <Button onClick={() => updateTheme()}>切换主题</Button>
          </div>
        </Space>
      </Header>
    </div>
  )
}
