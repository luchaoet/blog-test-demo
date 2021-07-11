import { Component } from '../react'
import { diff, diffNode } from './diff'
/**
 * 所有节点最后挂载在根节点
 * @param {*} vnode
 * @param {*} container
 * @returns
 */
function render(vnode, container) {
  return diff(undefined, vnode, container)
}

/**
 *  虚拟节点转化为真实节点，处理属性（事件/style）
 * @param {*} vnode
 * @param {*} container
 * @returns
 */
// function _render(vnode) {
//   if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = ''
//   if (typeof vnode === 'number') vnode = String(vnode)

//   if (typeof vnode === 'string') {
//     return document.createTextNode(vnode)
//   } else if (typeof vnode.tag === 'function') {
//     // 1. 创建组件
//     const com = createComponent(vnode.tag, vnode.attrs)
//     // 2. 设置组件的属性
//     setComponentProps(com, vnode.attrs)
//     // 3. 返回组件渲染的节点对象
//     return com.base
//   }

//   const { tag, attrs, childrens } = vnode
//   const dom = document.createElement(tag)
//   // 处理属性
//   if (attrs) {
//     Object.keys(attrs).forEach((k) => {
//       setAttribute(dom, k, attrs[k])
//     })
//   }
//   // 递归处理子节点
//   childrens &&
//     childrens.forEach((child) => {
//       render(child, dom)
//     })
//   return dom
// }

/**
 * 处理函数组件及类组件
 * @param {*} tag
 * @param {*} attrs
 * @returns
 */
function createComponent(tag, attrs) {
  let inst = null
  if (tag.prototype.isReactComponent) {
    // 类组件
    inst = new tag(attrs)
  } else {
    // 函数组件扩展为类组件
    inst = new Component(attrs)
    inst.constructor = tag
    // 定义render
    inst.render = function () {
      return this.constructor(attrs)
    }
  }
  return inst
}
function setComponentProps(com, attrs) {
  const { base, componentWillMount, componentWillReceiveProps } = com
  if (!base) {
    if (componentWillMount) componentWillMount.call(com)
  } else if (componentWillReceiveProps) {
    componentWillReceiveProps(attrs)
  }
  com.props = attrs
  renderComponent(com)
}

function renderComponent(comp) {
  let base
  const renderer = comp.render()

  // 更改
  // base = _render(renderer)
  base = diffNode(comp.base, renderer)
  if (comp.base && comp.componentWillUpdate) {
    comp.componentWillUpdate()
  }

  if (comp.base && comp.componentDidUpdate) {
    comp.componentDidUpdate()
  } else if (comp.componentDidMount) {
    comp.componentDidMount()
  }

  // 节点替换,在数据更新的时候
  // if (comp.base && comp.base.parentNode) {
  //   comp.base.parentNode.replaceChild(base, comp.base)
  // }
  comp.base = base
}

function setAttribute(dom, key, value) {
  if (key === 'className') key = 'class'
  if (/on\w+/.test(key)) {
    key = key.toLowerCase()
    dom[key] = value
  } else if (key === 'style') {
    if (!value || typeof value === 'string') {
      return (dom.style.cssText = value)
    } else if (value && typeof value === 'object') {
      let css = ''
      for (let k in value) {
        css += dasherize(k) + ':' + maybeAddPx(k, value[k]) + ';'
      }
      return (dom.style.cssText = css)
    }
  } else {
    if (key in dom) {
      return (dom[key] = value || '')
    }
    value ? dom.setAttribute(key, value) : dom.removeAttribute(key)
  }
}

// react属性名 -> js属性名
function dasherize(key) {
  // fontSize -> font-size
  return key.replace(/[A-Z]/g, (k) => '-' + k.toLocaleLowerCase())
}

// 属性值可能需要添加 px
function maybeAddPx(key, value) {
  const cssNumber = {
    'font-weight': true,
    orphans: true,
    'text-decoration': true,
    'fill-opacity': true,
    'column-count': true,
    columns: true,
    'font-weight': true,
    opacity: true,
    'z-index': true,
    zoom: true,
  }
  return typeof value === 'number' ? (cssNumber[dasherize(key)] ? value : value + 'px') : value
}

export default {
  render,
}
export { renderComponent, setAttribute, setComponentProps, createComponent }
