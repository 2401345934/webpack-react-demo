import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Layout,
  Menu,
  Row,
  Space
} from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import styles from './styles.module.less'
import utils from '@/utils'
import { TypeObjStr } from '@/utils/utilsTypes.type'
import { initialValueList } from './dict'
import { RouterType, firstRouterList, routerList } from '@/router'
import { useLocation, useNavigate } from 'react-router-dom'

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
  goRouter: (e: { key: string; keyPath: string[] }) => void
}

const WarpHeader = forwardRef((props: PropsType, ref): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm()
  const [open, setOpen] = useState<boolean>(false)
  const [key, setKey] = useState<string[]>([])
  const {
    changeTheme,
    setChildrenRouterList,
    setCollapsed,
    currentPath,
    goRouter,
    collapsed,
    defaultOpenKeys,
    setDefaultOpenKeys,
    menuLayout
  } = props
  const initTabPath = currentPath ? currentPath.split('/')[0] : ''
  // 对外暴露 routerChange 方法
  useImperativeHandle(ref, () => ({
    findRouterPath
  }))

  useEffect(() => {
    const initValues: TypeObjStr = {}
    initialValueList.forEach(item => {
      initValues[item.key] = item.initColor
    })
    form.setFieldsValue(initValues)
  }, [])

  const findRouterPath = () => {
    const key: string =
      location.pathname.slice(1, location.pathname.length) || ''
    const keyList: string[] = key.split('/')
    const itemRouter: RouterType = routerList.find(
      (item: RouterType) => item.key === keyList[0]
    )!
    setKey([keyList[0]])
    if (itemRouter.children) {
      setChildrenRouterList(itemRouter.children)
    } else {
      setChildrenRouterList([])
    }
  }

  const onOpenChange = (openKeys: string[]) => {
    setDefaultOpenKeys(openKeys)
  }
  const onClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleSubmit = () => {
    const values = form.getFieldsValue()
    changeTheme(values.mainColor)
    utils.updateCustomCssVar(values)
  }

  const handleChangeMenu = (strArr: string[]) => {
    if (!strArr.length) return
    setKey(strArr)
    const itemRouter: RouterType = routerList.find(
      (item: RouterType) => item.key === strArr[0]
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
        {menuLayout === 'slideAndHeader' && (
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
        {menuLayout === 'header' && (
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
        {menuLayout === 'slide' && (
          <div className={styles.layoutHeaderWarp}>
            <Space>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: () => setCollapsed(!collapsed)
                }
              )}
            </Space>
            <div className={styles.theme}>
              <Button onClick={() => handleOpen()}>切换主题</Button>
            </div>
          </div>
        )}
      </Header>
      <Drawer
        title="修改主题"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>关闭</Button>
            <Button onClick={handleSubmit} type="primary">
              变更
            </Button>
          </Space>
        }
      >
        <Form form={form}>
          <Row gutter={16}>
            {initialValueList.map(item => (
              <Col span={24} key={item.key}>
                <Form.Item name={item.key} label={item.label}>
                  <Input type="color" />
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Form>
      </Drawer>
    </div>
  )
})
export default memo(WarpHeader)
