import { renderComponent } from '../react-dom'
class Component {
  constructor(props = {}) {
    this.props = props
    this.state = {}
  }
  setState(state) {
    Object.assign(this.state, state)
    renderComponent(this)
  }
}
Component.prototype.isReactComponent = {}
export default Component
