import { deepFlatRouter } from '@/router'
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
}
type OptionsType = {
  label: string
  value: string
}
export default (props: PropsType) => {
  const { openSearch, setOpenSearch } = props
  const navigate = useNavigate()
  const [options, setOptions] = useState<OptionsType[]>([])
  const [value, setValue] = useState<string>('')
  const ref: any = useRef(null)

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
      ref?.current?.focus()
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
  }
  const onSelect = (option: OptionProps) => {
    setValue('')
    setOpenSearch(false)
    navigate(option.value as string)
  }

  const onChange = (text: string) => {
    setValue(text)
  }
  return (
    <>
      <Modal
        title="全局搜索"
        onCancel={handleToggleSetting}
        open={openSearch}
        footer={[]}
      >
        <Mentions
          value={value}
          ref={ref}
          placeholder="请通过@来换起可查询路由"
          onSelect={onSelect}
          onChange={onChange}
          options={options}
        ></Mentions>
      </Modal>
    </>
  )
}
