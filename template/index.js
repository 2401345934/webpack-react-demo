const FS = require('fs')
const inquirer = require('inquirer')
const ReactTemplate = require('./ReactTemplate/index')

// 创建成功提示
const successLog = () => {
  console.log(
    'success ----------------------------------------------------------------------------------',
  )
}

// 创建失败提示
const errorLog = error => {
  console.log(
    `error -------------------------------------------------------------------${
      error || '该命名文件已存在'
    }`,
  )
}

// 默认执行函数
const create = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'types',
        message: '请选择要创建模版类型',
        choices: ['hooks', 'pages', 'components'],
        default: 'hooks',
      },
      {
        name: 'template_name',
        type: 'input',
        message: '请输入要创建的模版名称?',
        default: 'default',
      },
      {
        type: 'list',
        name: 'type',
        message: '请选择React模版',
        choices: ['hooksPage', new inquirer.Separator(), 'QueryTable'],
        default: 'hooksPage',
        when: function (answers) {
          return answers.types === 'pages'
        },
      },
    ])
    .then(options => {
      createTemplate(options)
    })
    .catch(error => {
      errorLog(error)
    })
}

// 创建模版处理函数
const createTemplate = options => {
  const { template_name, types } = options
  helperFile(`src/${types}/${template_name}.ts`, () => {
    if (types !== 'hooks') {
      FS.mkdirSync(`src/${types}/${template_name}`)
    }
    writeFs(options, 'writeFileSync')
    successLog()
  })
}

// 创建菜单
const helperFile = (url, cb) => {
  FS.readFile(url, function (err, data) {
    if (data) {
      inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'iscover',
            message: '该文件已存在, 是否要覆盖该文件',
          },
        ])
        .then(({ iscover }) => {
          if (iscover) {
            writeFs(options, 'writeFile')
            successLog()
          } else {
            errorLog('请重新创建')
          }
        })
        .catch(error => {
          errorLog(error)
        })
    } else {
      cb && cb()
    }
  })
}

const helperTypeMap = {
  QueryTable: ReactTemplate.createQueryTable,
  hooksPage: ReactTemplate.createReactTemplate,
  components: ReactTemplate.createComponent,
  hooks: ReactTemplate.createUseHooks,
  less: ReactTemplate.createModuleLess,
}

// 辅助生成模版
const helperCreateTemplate = ({
  url,
  type,
  writeFileType,
  addConfig,
  lessUrl,
}) => {
  // 生成页面组件
  FS[writeFileType](url, helperTypeMap[type](addConfig))
  // 如果需要就生成对应 less
  if (lessUrl) {
    FS[writeFileType](lessUrl, helperTypeMap['less'](addConfig))
  }
  console.log(`点我进去新创建的页面 ------------------      ../${url}`)
}

// 创建 template 函数
const writeFs = (options, writeFileType) => {
  const { template_name, type, types } = options
  const addConfig = {
    template_name,
    type,
    types,
  }
  // 创建 自定义 hooks
  if (types === 'hooks') {
    helperCreateTemplate({
      url: `src/${types}/${template_name}.ts`,
      type: types,
      writeFileType,
      addConfig,
    })
    return
  }
  // 创建组件
  if (types === 'components') {
    helperCreateTemplate({
      url: `src/${types}/${template_name}/index.tsx`,
      lessUrl: `src/${types}/${template_name}/index.module.less`,
      type: types,
      writeFileType,
      addConfig,
    })
    return
  }

  // 创建页面
  if (type) {
    helperCreateTemplate({
      url: `src/${types}/${template_name}/index.tsx`,
      lessUrl: `src/${types}/${template_name}/index.module.less`,
      type,
      writeFileType,
      addConfig,
    })
  }
}

create()
