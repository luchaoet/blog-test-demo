// const acron = require('acorn')
// const traverse = require('ast-traverse')
const escodegen = require('escodegen')
// const code = `const test = 123`
// let ast = acron.parse(code)

// traverse(ast, {
//   pre: function (node, parent, prop, idx) {
//     if (node.kind == 'const') {
//       node.kind = 'var'
//     }
//   },
// })
// let esCode = escodegen.generate(ast)
// console.log(esCode)

const esprima = require('esprima')
const estraverse = require('estraverse')
const code = `function getUser() {}`
// 生成 AST
const ast = esprima.parseScript(code)
// console.log(ast)
// 转换 AST，只会遍历 type 属性
// traverse 方法中有进入和离开两个钩子函数
estraverse.traverse(ast, {
  enter(node) {
    // console.log('enter -> node.type', node.type)
    if (node.type === 'FunctionDeclaration') {
      node.async = true
    }
  },
  leave(node) {
    // console.log('leave -> node.type', node.type)
  },
})
const result = escodegen.generate(ast)
console.log(result)
