const FS = require('fs')
const inquirer = require('inquirer')
const ReactTemplate = require('./ReactTemplate/index')
const ui = new inquirer.ui.BottomBar()

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
        name: 'template_name',
        type: 'input',
        message: '请输入要创建的模版名称?',
        default: 'default',
      },
      {
        type: 'list',
        name: 'type',
        message: '请选择React模版',
        choices: ['hooks', new inquirer.Separator(), 'QueryTable'],
        default: 'hooks',
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
  const { template_name } = options
  FS.readFile(`src/pages/${template_name}/index.tsx`, function (err, data) {
    if (data) {
      inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'iscover',
            message: '该文件夹已存在, 是否要覆盖该文件夹',
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
      FS.mkdirSync(`src/pages/${template_name}`)
      writeFs(options, 'writeFileSync')
      successLog()
    }
  })
}

// 创建 template 函数
const writeFs = (options, writeFileType) => {
  const { template_name, type, langType, cssLoader, axios } = options
  const addConfig = {
    cssLoader,
    langType,
    axios,
  }
  switch (type) {
    case 'QueryTable':
      FS[writeFileType](
        `src/pages/${template_name}/index.tsx`,
        ReactTemplate.createQueryTable(addConfig),
      )
      break
    default:
      FS[writeFileType](
        `src/pages/${template_name}/index.tsx`,
        ReactTemplate.createReactTemplate(addConfig),
      )
  }
  console.log(
    `点我进去新创建的页面 ------------------      ../src/pages/${template_name}/index.tsx`,
  )
}

create()
