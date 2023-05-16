const createReactTemplate = ({ template_name }) => {
  return `import PageWarp from '@/components/BusinessComponent/PageWarp'
  import styles from './index.module.less'
  
  const Component: React.FC = (): JSX.Element => {
    useMount(() => {
      console.log('mount-123')
    })
    return (
      <PageWarp>
        <div className={styles.wrap}></div>
      </PageWarp>
    )
  }
  
  export default Component
  `
}

// 正常查询列表模版
const createQueryTable = require('./queryTableTemplate.js')
const createUseHooks = require('./useHooks.js')
const createModuleLess = require('./createModuleLess.js')
const createComponent = require('./createComponent.js')

const exportsConfig = {
  createReactTemplate,
  createQueryTable,
  createUseHooks,
  createModuleLess,
  createComponent,
}

module.exports = exportsConfig
