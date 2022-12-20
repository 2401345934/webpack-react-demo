import { Context } from '@/pages/Cms'
import React, { useContext, useRef, useState } from 'react'
import { COMPONENTS_MAPPER } from '../../../helper/dict'
import styles from './styles.module.less'

const Component: React.FC = (): JSX.Element => {
  const { sourceData, setSourceData }: any = useContext(Context)
  const dropRef = useRef(null)
  const handleDrop = (event: any) => {
    const data = JSON.parse(event.dataTransfer.getData('text/plain'))
    setSourceData([{ type: data.type }, ...sourceData])
  }
  const handleDragOver = (event: any) => {
    event.preventDefault()
  }
  return (
    <div
      ref={dropRef}
      className={styles.warp}
      onDrop={event => handleDrop(event)}
      onDragOver={handleDragOver}
    >
      {sourceData.map((item: any, index: number) => (
        <div key={index} className={styles.item}>
          {COMPONENTS_MAPPER[item.type]}
        </div>
      ))}
    </div>
  )
}

export default Component
