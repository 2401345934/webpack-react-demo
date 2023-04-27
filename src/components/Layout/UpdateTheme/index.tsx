import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd'

type UpdateThemeType = {
  open: boolean
  onClose: () => void
  handleSubmit: () => void
  form: any
  initialValueList: any[]
}
export default function UpdateTheme(props: UpdateThemeType) {
  const { open, onClose, handleSubmit, form, initialValueList } = props
  //  表单
  return (
    <>
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
            {initialValueList.map((item: any) => (
              <Col span={24} key={item.key}>
                <Form.Item name={item.key} label={item.label}>
                  <Input type="color" />
                </Form.Item>
              </Col>
            ))}
          </Row>
        </Form>
      </Drawer>
    </>
  )
}
