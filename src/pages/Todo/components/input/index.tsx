type propsHelper = {
  addCallback: Function
}
interface BaseSyntheticEvent<E = object, C = any, T = any> {
  nativeEvent: E
  currentTarget: C
  target: T
  bubbles: boolean
  keyCode?: number
  cancelable: boolean
  defaultPrevented: boolean
  eventPhase: number
  isTrusted: boolean
  preventDefault(): void
  isDefaultPrevented(): boolean
  stopPropagation(): void
  isPropagationStopped(): boolean
  persist(): void
  timeStamp: number
  type: string
}
const Component = (props: propsHelper): JSX.Element => {
  const { addCallback } = props
  const [value, setValue] = useState<string>('')
  const handleAdd = () => {
    if (!value) return
    parentCb()
  }

  const parentCb = (): void => {
    addCallback(value)
    setValue('')
  }
  const handleKeyDown = (e: BaseSyntheticEvent) => {
    if (e.keyCode! === 13) {
      parentCb()
    }
  }

  const handleChange = (e: BaseSyntheticEvent) => {
    setValue(e.target.value)
  }

  return (
    <>
      <Input
        value={value}
        placeholder="placeholder"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleAdd}>添加</Button>
    </>
  )
}

export default Component
