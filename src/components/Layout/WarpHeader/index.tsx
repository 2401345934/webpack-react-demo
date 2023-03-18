import React, { useEffect, useState } from 'react'
import { Button, Col, Drawer, Form, Input, Layout, Row, Space, Tag } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import styles from './styles.module.less'
import utils from '@/utils'
import { TypeObjStr } from '@/utils/utilsTypes.type'
import { initialValueList } from './dict'

const { Header } = Layout

type PropsType = {
  collapsed: boolean
  changeTheme: (value: string) => void
  updateTheme: () => void
  setCollapsed: (e: boolean) => void
  setDefaultOpenKeys: (e: string[]) => void
  goRouter: (e: { key: string; keyPath: string[] }) => void
}

export default (props: PropsType): JSX.Element => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState<boolean>(false)
  const { changeTheme, setCollapsed, collapsed, goRouter } = props
  useEffect(() => {
    const initValues: TypeObjStr = {}
    initialValueList.forEach(item => {
      initValues[item.key] = item.initColor
    })
    form.setFieldsValue(initValues)
  }, [])

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
