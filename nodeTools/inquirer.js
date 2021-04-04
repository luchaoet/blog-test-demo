const inquirer = require('inquirer')

const promptList = [
  //   { type: 'confirm', name: 'age', message: '输入年龄' },
  //   { type: 'input', name: 'description', message: '请输入项目描述', default: 'a vue`s project' },
  //   { type: 'confirm', name: 'update', message: '是否强制刷新？', default: false },
  //   { type: 'list', name: 'update', message: '是否强制刷新？' },
  //   { type: 'list', name: 'fruit', choices: ['Apple', 'Pear', 'Banana'], message: '请选择一种水果', default: 'Banana' },
  //   { type: 'rawlist', name: 'fruit', choices: ['Apple', 'Pear', 'Banana'], message: '请选择一种水果', default: 'Banana' },
  //   {
  //     type: 'expand',
  //     name: 'fruit',
  //     choices: [
  //       {
  //         key: 'a',
  //         name: 'Apple',
  //         value: 'apple',
  //       },
  //       {
  //         key: 'O',
  //         name: 'Orange',
  //         value: 'orange',
  //       },
  //       {
  //         key: 'p',
  //         name: 'Pear',
  //         value: 'pear',
  //       },
  //     ],
  //     message: '请选择一种水果',
  //     default: 'Banana',
  //   },
  {
    type: 'checkbox',
    message: '选择颜色:',
    name: 'color',
    choices: [
      {
        name: 'red',
      },
      new inquirer.Separator(), // 添加分隔符
      {
        name: 'blur',
        checked: true, // 默认选中
      },
      {
        name: 'green',
      },
      new inquirer.Separator('--- 分隔符 ---'), // 自定义分隔符
      {
        name: 'yellow',
      },
    ],
  },
]
inquirer.prompt(promptList).then((answers) => {
  console.log(answers)
})
