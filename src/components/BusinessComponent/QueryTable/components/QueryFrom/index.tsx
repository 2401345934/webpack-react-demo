import { forwardRef, useImperativeHandle, useState } from 'react'
import { Form, Button, Col, Row, Space } from 'antd'
import styles from './styles.module.less'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import helperAntdComponet from './helper'
import { formPropsType, formItemTypes } from './types'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}

function QueryFrom(props: formPropsType, ref: any): JSX.Element {
  const { formItems, resetCallback, searchCallback } = props
  const [form] = Form.useForm()
  const [expand, setExpand] = useState<boolean>(false)
  useImperativeHandle(ref, () => ({
    formRef: form,
  }))
  // 查询
  const handleSearch = (): void => {
    form
      .validateFields()
      .then(values => {
        // search values
        console.log('values', values)
        searchCallback && searchCallback(values)
      })
      .catch(e => {
        console.log('e', e)
        searchCallback && searchCallback(e)
      })
  }
  // 重置
  const handleReset = (): void => {
    form.resetFields()
    resetCallback && resetCallback()
  }
  // 展开收起
  const toggleExpand = (): void => {
    setExpand(!expand)
  }
  console.log('formItems', formItems)
  return (
    <div>
      <Row>
        <Form {...layout} form={form} layout="inline" style={{ width: '100%' }}>
          {formItems &&
            formItems
              .slice(0, expand ? 4 : formItems.length)
              .map((item: formItemTypes, index: number) => {
                return (
                  <Col
                    className={styles.colWarp}
                    span={item.span || 6}
                    key={index}
                  >
                    {/* 辅助函数 */}
                    {helperAntdComponet(item)}
                  </Col>
                )
              })}
        </Form>
      </Row>
      <Row className={styles.actions}>
        <Col span={6} offset={21}>
          <Space>
            <Button type="primary" onClick={() => handleSearch()}>
              查询
            </Button>
            <Button onClick={() => handleReset()}>重置</Button>
            <div>
              <a onClick={toggleExpand}>
                {expand ? '展开' : '收起'}
                {expand ? <DownOutlined /> : <UpOutlined />}
              </a>
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default forwardRef(QueryFrom)
