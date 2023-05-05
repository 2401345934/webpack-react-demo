import styles from './styles.module.less'

type FixedButtonType = {
  children: any
}
export default function FixedButton(props: FixedButtonType) {
  return <div className={styles.wrap}>{props.children}</div>
}
