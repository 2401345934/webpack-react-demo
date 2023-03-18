import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Layout,
  Row,
  Space,
  Tag
} from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import styles from './styles.module.less'
import { routerList } from '@/router'
import { useNavigate } from 'react-router-dom'
import utils from '@/utils'
import { TypeObjStr } from '@/utils/utilsTypes.type'

const { Header } = Layout

type PropsType = {
  collapsed: boolean
  changeTheme: (value: string) => void
  updateTheme: () => void
  setCollapsed: (e: boolean) => void
  setDefaultOpenKeys: (e: string[]) => void
}
const initialValueList = [
  {
    key: 'mainColor',
    initColor: '#000000',
    label: '主题色'
  },
  {
    key: 'textMainColor',
    initColor: '#000000',
    label: '文字主题色'
  },
  {
    key: 'borderMainColor',
    initColor: '#ff0000',
    label: '边框主题色'
  },
  {
    key: 'headerBackground',
    initColor: '#ffffff',
    label: 'header 主题色'
  },
  {
    key: 'menuBackground',
    initColor: '#ffffff',
    label: 'menu 主题色'
  },
  {
    key: 'activeMenuBackgroundColor',
    initColor: '#e09a9a',
    label: 'menu 激活背景色'
  }
]

export default (props: PropsType): JSX.Element => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [open, setOpen] = useState<boolean>(false)
  const { changeTheme, setCollapsed, collapsed, setDefaultOpenKeys } = props
  useEffect(() => {
    const initValues: TypeObjStr = {}
    initialValueList.forEach(item => {
      initValues[item.key] = item.initColor
    })
    form.setFieldsValue(initValues)
  }, [])

  const handleRouter = (path: any) => {
    navigate(path)
    setDefaultOpenKeys(path)
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

  const itemRender = (route: any) => {
    return route.children ? (
      <Tag className={styles.hover} color="var(--mainColor)">
        {route.label}
      </Tag>
    ) : (
      <Tag
        className={styles.hover}
        onClick={() => handleRouter(route.path)}
        color="var(--mainColor)"
      >
        {route.label}
      </Tag>
    )
  }
  return (
    <div className="layout-warp-header">
      <Header className="site-layout-Header">
        <div className={styles.layoutHeaderWarp}>
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
                items={routerList}
              ></Breadcrumb>
            </div>
          </Space>
          <div className={styles.theme}>
            <Button onClick={() => handleOpen()}>切换主题</Button>
          </div>
        </div>
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
}
