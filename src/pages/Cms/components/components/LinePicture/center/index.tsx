import React from 'react'
import styles from './styles.module.less'

const Component: React.FC = (props: any): JSX.Element => {
  const { config } = props
  return (
    <img
      className={styles.warp}
      style={config.styles}
      title="一行一图"
      src={config?.src}
    ></img>
  )
}

export default Component
