class Element {
  constructor(tagName, props, children) {
    this.tagName = tagName
    this.props = props || {}
    this.children = children || []
    this.key = props ? props.key : undefined
  }

  render() {
    const el = document.createElement(this.tagName)
    const props = this.props
    for (const key in props) {
      this.setAttr(el, key, props[key])
    }
    this.children.forEach((child) => {
      const childEl = child instanceof Element ? child.render() : document.createTextNode(child)
      el.appendChild(childEl)
    })
    return el
  }

  setAttr(el, key, value) {
    switch (key) {
      case 'style':
        el.style.cssText = value
        break
      case 'value': {
        const tagName = el.tagName.toLowerCase() || ''
        if (tagName === 'input' || tagName === 'textarea') {
          el.value = value
        } else {
          el.setAttribute(key, value)
        }
        break
      }
      default:
        el.setAttribute(key, value)
        break
    }
  }
}

var tree = new Element(
  'div',
  { id: 'vdom', style: 'width: 100%' }, //
  [
    new Element('div', {}, ['vdom-div']), //
    new Element('img', { src: 'https://cdn.nlark.com/yuque/0/2018/png/115449/1524801282228-avatar/3ff199cf-0f42-4ceb-839a-88cc22ffb06a.png' }, ['']),
    new Element('ul', {}, [
      new Element('li', { class: 'item' }, ['li-01']), //
      new Element('li', { class: 'item' }, ['li-02']),
      new Element('li', { class: 'item' }, ['li-03']),
    ]),
  ]
)

var root = tree.render()
document.getElementById('app').appendChild(root)
