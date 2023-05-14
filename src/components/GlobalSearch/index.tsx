import { deepFlatRouter } from '@/router'
import { RadioChangeEvent } from 'antd'
export interface OptionProps {
  value?: string
  key?: string
  disabled?: boolean
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}
type PropsType = {
  openSearch: boolean
  setOpenSearch: (e: boolean) => void
  componentRef: any
}
type OptionsType = {
  label: string
  value: string
}
export default (props: PropsType) => {
  const { openSearch, setOpenSearch, componentRef } = props
  const navigate = useNavigate()
  const [options, setOptions] = useState<OptionsType[]>([])
  const [value, setValue] = useState<string>('')
  const ref: any = useRef(null)
  const [radioValue, setRadioValue] = useState<string>('1')
  // 监听键盘 @
  useKeyPress('shift.2', () => {
    ref?.current?.focus()
  })
  const handleToggleSetting = (): void => {
    setOpenSearch(!openSearch)
  }
  useEffect(() => {
    if (openSearch) {
      resetStates()
    }
  }, [openSearch])

  useMount(() => {
    setOptions(
      deepFlatRouter.map((item: any) => ({
        label: item.label,
        value: item.path,
      })),
    )
  })
  const resetStates = () => {
    setValue('')
    ref?.current?.focus()
  }
  const onSelect = (option: OptionProps) => {
    setValue('')
    setOpenSearch(false)
    navigate(option.value as string)
  }

  const onChange = (text: string) => {
    setValue(text)
  }

  const handleChangeRadio = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value)
    resetStates()
  }
  return (
    <>
      <Modal
        title="全局搜索"
        onCancel={handleToggleSetting}
        open={openSearch}
        footer={[]}
      >
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Radio.Group
            value={radioValue}
            onChange={handleChangeRadio}
            buttonStyle="solid"
          >
            <Radio.Button value="1">全部页面</Radio.Button>
            <Radio.Button value="2">已打开页面</Radio.Button>
          </Radio.Group>
          <div>
            <Tag bordered={false} color="orange">
              请通过@开头来查找{radioValue === '1' ? '全部页面' : '已打开页面'}
            </Tag>
          </div>
          <Mentions
            value={value}
            ref={ref}
            placeholder="请输入 @ 来输入"
            onSelect={onSelect}
            onChange={onChange}
            options={
              radioValue === '1'
                ? options
                : componentRef?.current?.getItems()?.map((item: any) => ({
                    value: item.key,
                    label: item.label,
                  }))
            }
          ></Mentions>
        </Space>
      </Modal>
    </>
  )
}
