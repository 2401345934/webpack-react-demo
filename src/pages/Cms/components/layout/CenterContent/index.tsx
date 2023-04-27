import { Context } from '@/pages/Cms'
import React, { useContext, useRef } from 'react'
import utils from '@/utils'
import { COMPONENTS_MAPPER, INIT_PARAMS } from '../../../helper/dict'
import styles from './styles.module.less'

const Component: React.FC = (): JSX.Element => {
  const { sourceData, setSourceData, currentIndex, setCurrentIndx }: any =
    useContext(Context)
  const dropRef = useRef(null)
  const handleDropParent = (event: any) => {
    const data = utils.JSONPase(event.dataTransfer.getData('text/plain'))
    if (!data.type) return
    setSourceData([
      ...sourceData,
      { ...INIT_PARAMS, type: data.type, uuid: data.uuid }
    ])
  }
  const handleDragOverParent = (event: any) => {
    event.preventDefault()
    event.target.style.opacity = '1'
  }
  const updateCurrentIndex = (index: number) => {
    setCurrentIndx(index)
  }
  function handleDragStart(e: any) {
    e.target.style.opacity = '0.5'
    // 设置数据
    e.dataTransfer.setData('text/plain', e.target.id)
  }

  function handleDragOver(e: any) {
    e.preventDefault()
    e.target.style.opacity = '1'
    // 设置拖拽时的光标样式
    e.dataTransfer.dropEffect = 'move'
  }

  function handleDrop(e: any) {
    e.preventDefault()
    // 获取数据
    const sourceId = e.dataTransfer.getData('text/plain')
    const sourceEl = document.getElementById(sourceId)
    const targetEl = e.target
    // 在拖拽源元素和目标元素之间交换位置
    if (sourceEl && targetEl) {
      const sourceIndex = sourceData.findIndex(
        (d: { uuid: string }) => d.uuid === sourceEl.id
      )
      const targetIndex = sourceData.findIndex(
        (d: { uuid: string }) => d.uuid === targetEl.id
      )
      let temp = sourceData[sourceIndex]
      sourceData[sourceIndex] = sourceData[targetIndex]
      sourceData[targetIndex] = temp
      setSourceData([...sourceData])
      setCurrentIndx(targetIndex)
    }
  }
  return (
    <div
      ref={dropRef}
      className={styles.warp}
      onDrop={event => handleDropParent(event)}
      onDragOver={handleDragOverParent}
    >
      {sourceData.map((item: any, index: number) => (
        <div
          key={index}
          draggable="true"
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          id={item.uuid}
          onDrop={handleDrop}
          onClick={() => updateCurrentIndex(index)}
          className={index === currentIndex ? styles.current : ''}
        >
          <div className={styles.item}>
            {COMPONENTS_MAPPER[item.type](item)}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Component
