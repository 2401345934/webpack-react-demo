import { formItemTypes } from './types'

const { RangePicker } = DatePicker
const { TextArea } = Input

const ANTD_TYPE_MAP = new Map([
  [
    'input',
    (item: formItemTypes) => (
      <Form.Item label={item.label} name={item.name} rules={item.rules}>
        <Input {...item.props} />
      </Form.Item>
    ),
  ],
  [
    'textarea',
    (item: formItemTypes) => (
      <Form.Item label={item.label} name={item.name} rules={item.rules}>
        <TextArea {...item.props} />
      </Form.Item>
    ),
  ],
  [
    'inputnumber',
    (item: formItemTypes) => (
      <Form.Item label={item.label} name={item.name} rules={item.rules}>
        <InputNumber style={{ width: '100%' }} {...item.props} />
      </Form.Item>
    ),
  ],
  [
    'select',
    (item: formItemTypes) => (
      <Form.Item label={item.label} name={item.name} rules={item.rules}>
        <Select allowClear {...item.props}>
          {typeof item.source === 'function' &&
            item.source().map((s: any, i: number) => (
              <Select.Option key={i} value={s.value}>
                {s.label}
              </Select.Option>
            ))}
          {Array.isArray(item.source) &&
            item.source.map((s: any, i: number) => (
              <Select.Option key={i} value={s.value}>
                {s.label}
              </Select.Option>
            ))}
        </Select>
      </Form.Item>
    ),
  ],
  [
    'radio',
    (item: formItemTypes) => (
      <Form.Item label={item.label} name={item.name} rules={item.rules}>
        <Radio.Group {...item.props}>
          {typeof item.source === 'function' &&
            item.source().map((s: any, i: number) => (
              <Radio key={i} value={s.value}>
                {s.label}
              </Radio>
            ))}
          {Array.isArray(item.source) &&
            item.source.map((s: any, i: number) => (
              <Radio key={i} value={s.value}>
                {s.label}
              </Radio>
            ))}
        </Radio.Group>
      </Form.Item>
    ),
  ],
  [
    'checkbox',
    (item: formItemTypes) => (
      <Form.Item label={item.label} name={item.name} rules={item.rules}>
        <Checkbox.Group {...item.props}>
          {typeof item.source === 'function' &&
            item.source().map((s: any, i: number) => (
              <Checkbox key={i} value={s.value}>
                {s.label}
              </Checkbox>
            ))}
          {Array.isArray(item.source) &&
            item.source.map((s: any, i: number) => (
              <Checkbox key={i} value={s.value}>
                {s.label}
              </Checkbox>
            ))}
        </Checkbox.Group>
      </Form.Item>
    ),
  ],
  [
    'datepicker',
    (item: formItemTypes) => (
      <Form.Item label={item.label} name={item.name} rules={item.rules}>
        <DatePicker style={{ width: '100%' }} {...item.props} />
      </Form.Item>
    ),
  ],
  [
    'rangepicker',
    (item: formItemTypes) => (
      <Form.Item label={item.label} name={item.name} rules={item.rules}>
        <RangePicker style={{ width: '100%' }} {...item.props} />
      </Form.Item>
    ),
  ],
])

const createAntdComponent = (item: formItemTypes) => {
  // 是否能匹配到对应组件
  const comp = ANTD_TYPE_MAP.get(item.type)
  if (!comp) {
    throw new Error('not component')
  }
  return comp(item)
}

const helperAntdComponet = (item: formItemTypes) => {
  return <>{createAntdComponent(item)}</>
}

export default helperAntdComponet
