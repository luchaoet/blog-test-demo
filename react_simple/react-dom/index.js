import { Component } from '../react'
/**
 * 所有节点最后挂载在根节点
 * @param {*} vnode
 * @param {*} container
 * @returns
 */
function render(vnode, container) {
  const dom = _render(vnode)
  return container.appendChild(dom)
}

/**
 *  虚拟节点转化为真实节点，处理属性（事件/style）
 * @param {*} vnode
 * @param {*} container
 * @returns
 */
function _render(vnode) {
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') vnode = ''
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  } else if (typeof vnode.tag === 'function') {
    // 1. 创建组件
    const com = createComponent(vnode.tag, vnode.attrs)
    // 2. 设置组件的属性
    setComponentProps(com, vnode.attrs)
    // 3. 返回组件渲染的节点对象
    return com.base
  }

  const { tag, attrs, childrens } = vnode
  const dom = document.createElement(tag)
  // 处理属性
  if (attrs) {
    Object.keys(attrs).forEach((k) => {
      setAttribute(dom, k, attrs[k])
    })
  }
  // 递归处理子节点
  if (childrens) {
    for (let k in childrens) {
      const child = childrens[k]
      if (typeof child === 'string') {
        const textDom = document.createTextNode(child)
        dom.appendChild(textDom)
      } else {
        render(child, dom)
      }
    }
  }
  return dom
}

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
  com.props = attrs
  renderComponent(com)
}
function renderComponent(com) {
  const renderer = com.render()
  com.base = _render(renderer)
}

function setAttribute(dom, key, value) {
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
      dom[key] = value || ''
    }
    if (value) {
      dom.setAttribute(key, value)
    } else {
      dom.removeAttribute(key)
    }
  }
}

// react属性名 -> js属性名
function dasherize(key) {
  const keys = {
    fontSize: 'font-size',
    zIndex: 'z-index',
  }
  return keys[key] || key
}

// 属性值可能需要添加 px
function maybeAddPx(key, value) {
  const cssNumber = {
    'column-count': 1,
    columns: 1,
    'font-weight': 1,
    'line-height': 1,
    opacity: 1,
    'z-index': 1,
    zoom: 1,
  }

  return typeof value === 'number' ? (cssNumber[dasherize(key)] ? value : value + 'px') : value
}

const ReactDOM = {
  render,
}
export default ReactDOM
