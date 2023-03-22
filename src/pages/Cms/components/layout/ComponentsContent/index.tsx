import React from 'react'
import { COMPONENTS_TYPE } from '../../../helper/dict'
import utils from '@/utils'
import styles from './styles.module.less'

const Component: React.FC = (): JSX.Element => {
  const handleDragStart = (event: any): any => {
    // 获取被放置的元素
    const droppedElement = event.target
    // 获取被放置元素的类型
    const type = droppedElement.getAttribute('data-type')
    const data = {
      type,
      uuid: utils.uuid()
    }
    event.dataTransfer.setData('text/plain', utils.JSONStringify(data))
  }
  return (
    <div className={styles.warp}>
      {Object.values(COMPONENTS_TYPE).map((item: string, index: number) => {
        return (
          <div
            onDragStart={handleDragStart}
            draggable
            data-type={Object.keys(COMPONENTS_TYPE)[index]}
            className={styles.item}
            key={index}
          >
            {item}
          </div>
        )
      })}
    </div>
  )
}

export default Component
