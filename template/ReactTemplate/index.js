const createReactTemplate = ({ template_name }) => {
  return `import PageWarp from '@/components/BusinessComponent/PageWarp'

const Component: React.FC = (): JSX.Element => {
  useMount(() => {
    console.log('mount-${template_name}')
  })
  return <PageWarp>${template_name}</PageWarp>
}

export default Component
  `
}

// 正常查询列表模版
const createQueryTable = require('./queryTableTemplate.js')

const exportsConfig = {
  createReactTemplate,
  createQueryTable,
}

module.exports = exportsConfig
