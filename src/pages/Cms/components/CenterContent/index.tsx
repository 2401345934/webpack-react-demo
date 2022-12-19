import React, { useRef } from 'react'
import styles from './styles.module.less'

const Component: React.FC = (): JSX.Element => {
  const dropRef = useRef(null)
  const handleDrop = (event: any) => {
    const data = event.dataTransfer.getData('text/plain')
    console.log('data', JSON.parse(data))
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
      11231
    </div>
  )
}

export default Component
