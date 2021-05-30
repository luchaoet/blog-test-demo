const babylon = require('babylon')
const t = require('@babel/types')
const generate = require('@babel/generator').default
const traverse = require('@babel/traverse').default

const code = 'var a = 1;'
const ast = babylon.parse(code)
// manipulate ast
const output = generate(ast, {}, code)
// console.log('Input \n', code)
// console.log(output.code)
console.log(ast)
