import type { listType } from '../../index'
import ReadonlyList from '../ReadonlyList'

type propsHelper = {
  list: Array<listType>
  deleteCallback: (index: string) => void
  checkCallback: (index: string, type?: string | undefined) => void
}

const Component = (props: propsHelper): JSX.Element => {
  const { list, deleteCallback, checkCallback }: propsHelper = props
  const startList: Array<listType> = list.filter(item => item.check)
  const noStartList: Array<listType> = list.filter(item => !item.check)
  const handleDelete = (id: string) => {
    deleteCallback(id)
  }
  const handleCheck = (id: string, type?: string | undefined) => {
    checkCallback(id, type)
  }
  return (
    <div>
      <h2>未开始</h2>
      {noStartList.map((item: listType) => {
        return (
          <ReadonlyList
            key={item.id}
            checkCallback={handleCheck}
            deleteCallback={handleDelete}
            item={item}
          ></ReadonlyList>
        )
      })}
      <h2> 已经结束</h2>
      {startList.map((item: listType) => {
        return (
          <ReadonlyList
            key={item.id}
            checkCallback={handleCheck}
            deleteCallback={handleDelete}
            item={item}
            type="cancel"
          ></ReadonlyList>
        )
      })}
    </div>
  )
}

export default Component
