import React from './react'
import ReactDOM from './react-dom'

function FunctionComponent(props) {
  return <p>函数组件-{props.name}</p>
}

class ClassComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 0,
    }
  }
  componentWillMount() {
    console.log('componentWillMount')
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
  }
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  handleClick() {
    this.setState({
      num: this.state.num + 1,
    })
  }

  render() {
    const { style, name } = this.props
    const { num } = this.state
    return (
      <div style={style}>
        <div className={num}>类组件-{name}</div>
        <p style={{ display: 'flex', alignItems: 'center' }}>
          <span>num-{num}</span>
          <button style={{ marginLeft: 10, cursor: 'pointer' }} onClick={this.handleClick.bind(this)}>
            按钮
          </button>
        </p>
      </div>
    )
  }
}

const element = (
  <div className="title" style={{ color: 'red', fontSize: 20 }}>
    hello <span>react</span>
    <div onClick={() => console.log(1)}>点击事件</div>
    <FunctionComponent name="嘿嘿嘿" />
    <ClassComponent style={{ color: '#333' }} name="哟哟哟" />
  </div>
)
console.log('---element---')
console.log(element)
console.log('-----------')

ReactDOM.render(element, document.querySelector('#container'))
