import { Context } from '@/pages/Cms'
import React, { useContext, useRef } from 'react'
import utils from '@/utils'
import { COMPONENTS_MAPPER, INIT_PARAMS } from '../../../helper/dict'
import styles from './styles.module.less'

const Component: React.FC = (): JSX.Element => {
  const { sourceData, setSourceData, currentIndex, setCurrentIndx }: any =
    useContext(Context)
  const dropRef = useRef(null)
  const handleDrop = (event: any) => {
    const data = utils.JSONPase(event.dataTransfer.getData('text/plain'))
    if (!data.type) return
    setSourceData([...sourceData, { ...INIT_PARAMS, type: data.type }])
  }
  const handleDragOver = (event: any) => {
    event.preventDefault()
  }
  const updateCurrentIndex = (index: number) => {
    setCurrentIndx(index)
  }
  return (
    <div
      ref={dropRef}
      className={styles.warp}
      onDrop={event => handleDrop(event)}
      onDragOver={handleDragOver}
    >
      {sourceData.map((item: any, index: number) => (
        <div
          key={index}
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
