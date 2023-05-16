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
        choices: ['hooks', 'page', 'components'],
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
        choices: ['hooks', new inquirer.Separator(), 'QueryTable'],
        default: 'hooks',
        when: function (answers) {
          return answers.types === 'page'
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
  console.log('types', types)

  if (types === 'hooks') {
    FS.readFile(`src/hooks/${template_name}.ts`, function (err, data) {
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
        writeFs(options, 'writeFileSync')
        successLog()
      }
    })
  } else if (types === 'components') {
    FS.readFile(
      `src/components/${template_name}/index.tsx`,
      function (err, data) {
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
          FS.mkdirSync(`src/components/${template_name}`)
          writeFs(options, 'writeFileSync')
          successLog()
        }
      },
    )
  } else {
    FS.readFile(`src/pages/${template_name}/index.tsx`, function (err, data) {
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
        FS.mkdirSync(`src/pages/${template_name}`)
        writeFs(options, 'writeFileSync')
        successLog()
      }
    })
  }
}

// 检验文件目标目录是否存在
const checkDirExist = dir => {
  try {
    FS.accessSync(dir, FS.constants.F_OK)
  } catch (e) {
    return false
  }
  return true
}

// 创建 template 函数
const writeFs = (options, writeFileType) => {
  const { template_name, type, types } = options
  const addConfig = {
    template_name,
    type,
    types,
  }
  if (types === 'hooks') {
    FS[writeFileType](
      `src/hooks/${template_name}.ts`,
      ReactTemplate.createUseHooks(addConfig),
    )

    console.log(
      `点我进去新创建的页面 ------------------      ../src/hooks/${template_name}.ts`,
    )
    return
  }
  switch (type) {
    case 'QueryTable':
      FS[writeFileType](
        `src/pages/${template_name}/index.tsx`,
        ReactTemplate.createQueryTable(addConfig),
      )
      FS[writeFileType](
        `src/pages/${template_name}/index.module.less`,
        ReactTemplate.createModuleLess(addConfig),
      )
      break
    default:
      FS[writeFileType](
        `src/pages/${template_name}/index.tsx`,
        ReactTemplate.createReactTemplate(addConfig),
      )
      FS[writeFileType](
        `src/pages/${template_name}/index.module.less`,
        ReactTemplate.createModuleLess(addConfig),
      )
  }
  console.log(
    `点我进去新创建的页面 ------------------      ../src/pages/${template_name}/index.tsx`,
  )
}

create()
