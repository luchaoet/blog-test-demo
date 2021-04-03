const inquirer = require('inquirer')
const { program, Option } = require('commander')

// program
//   .version('0.0.1', '-v, --version') // 定义版本
//   .option('-d, --debug', 'output extra debugging') // debug参数
//   .option('-s, --small', 'small pizza size') // small参数
//   .option('-p, --pizza-type <tyqqqpe>', 'flavour of pizza', 'defalultValue') // pizzaType参数
//   .option('-c, --cheese [type]', 'Add cheese with optional type') // 可选参数
//   .requiredOption('-a, --about <type>', 'what about pizza', 'hei') // 必填选项 命令行中输入或设置默认值
//   .option('-n, --number <numbers...>', 'specify numbers')
//   .option('-l, --letter [letters...]', 'specify letters')
// program.parse(process.argv)

// const options = program.opts()
// console.log(options)
// console.log(program.args)

// program
//   .addOption(new Option('-s, --secret').hideHelp())
//   .addOption(new Option('-t, --timeout <delay>', 'timeout in seconds').default(60, '60s'))
//   .addOption(new Option('-d, --drink <size>', 'drink size').choices(['small', 'medium', 'large']))
//   .parse()

const commander = require('commander')
program.option('-i, --integer <number>', 'integer argument', myParseInt, 90)
program.parse()
const options = program.opts()
console.log(options)

function myParseInt(value, dummyPrevious) {
  console.log(value, dummyPrevious)
  const parsedValue = parseInt(value, 10)
  console.log(parsedValue)
  if (isNaN(parsedValue)) {
    throw new commander.InvalidOptionArgumentError('Not a number.')
  }
  return parsedValue
}
