import styles from './styles.module.less'

const Component: React.FC = (props: any): JSX.Element => {
  const { config, uuid } = props
  return (
    <div>
      一行一视频
      <video id={uuid} className={styles.warp} title="一行一视频"></video>
    </div>
  )
}

export default Component
