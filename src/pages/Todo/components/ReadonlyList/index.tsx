import type { listType } from '../../index'

type propsHelper = {
  item: listType
  type?: string
  key: string
  deleteCallback: (index: string) => void
  checkCallback: (index: string, type?: string | undefined) => void
}
const ReadonlyList = (props: propsHelper): JSX.Element => {
  const { item, deleteCallback, checkCallback, type }: propsHelper = props
  const handleDelete = (id: string) => {
    deleteCallback(id)
  }
  const handleCheck = (id: string) => {
    checkCallback(id, type)
  }
  return (
    <div key={item.id}>
      <Checkbox
        checked={!!item.check}
        onChange={() => handleCheck(item.id)}
        type="checkbox"
      ></Checkbox>
      {item.title}
      <Button onClick={() => handleDelete(item.id)}>x</Button>
    </div>
  )
}

export default ReadonlyList
