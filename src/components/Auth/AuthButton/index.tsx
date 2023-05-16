import styles from './index.module.less'

type propsType = {
  children: JSX.Element
  authCode: string
}
const Component = (props: propsType): JSX.Element => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const { children, authCode } = props
  useMount(() => {
    if (authCode === 'admin') {
      setIsAuth(true)
    }
  })
  return isAuth ? <div className={styles.wrap}>{children}</div> : <></>
}

export default Component
