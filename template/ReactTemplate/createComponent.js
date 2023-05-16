module.exports = ({ template_name }) => {
  return `
  import styles from './index.module.less'
  
  const Component: React.FC = (): JSX.Element => {
    useMount(() => {
      console.log('mount-123')
    })
    return (
        <div className={styles.wrap}></div>
    )
  }
  
  export default Component
  `
}
