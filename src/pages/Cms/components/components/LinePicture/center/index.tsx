import styles from './styles.module.less'

const Component: React.FC = (props: any): JSX.Element => {
  const { config, uuid } = props
  return (
    <div>
      <img
        id={uuid}
        className={styles.warp}
        style={config.styles}
        title="一行一图"
        src={config?.src}
      ></img>
    </div>
  )
}

export default Component
