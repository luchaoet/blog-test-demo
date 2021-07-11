import Component from './component'
function createElement(tag, attrs, ...childrens) {
  const _attrs = attrs || {}
  return {
    tag,
    attrs: _attrs,
    childrens,
    key: _attrs.key || null,
  }
}

export default {
  createElement,
  Component,
}
export { Component }
