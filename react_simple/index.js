import React from './react'
import ReactDOM from './react-dom'

function FunctionComponent(props) {
  return <p>函数组件-{props.name}</p>
}

class ClassComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillMount() {
    console.log('组件即将加载')
  }
  componentDidMount() {
    console.log('组件加载完成')
  }
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {}
  componentWillUpdate() {
    console.log('组件将要更新')
  }
  componentDidUpdate() {
    console.log('组件完成更新')
  }
  componentWillUnmount() {
    console.log('组件将要卸载')
  }

  render() {
    const { style, name } = this.props
    return <div style={style}>类组件-{name}</div>
  }
}

const element = (
  <div className="title" style={{ color: 'red', fontSize: 20 }} onClick={() => console.log(1)}>
    hello <span>react</span>
    <FunctionComponent name="嘿嘿嘿" />
    <ClassComponent style={{ color: '#333' }} name="哟哟哟" />
  </div>
)
console.log('---element---')
console.log(element)
console.log('-----------')

ReactDOM.render(element, document.querySelector('#container'))
