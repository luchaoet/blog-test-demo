// import React, { Component } from 'react';
// import PropTypes from 'prop-types';

// export default function connect(mapStateToProps, mapDispatchToProps) {
//     return (WrappedComponent) => {
//         class Connect extends Component {
//             static contextTypes = {
//                 store: PropTypes.object,
//             }

//             constructor() {
//                 super();
//                 this.state = { allProps: {} };
//             }
          
//             componentWillMount() {
//                 const { store } = this.context;
//                 this._updateProps();
//                 store.subscribe(() => this._updateProps());
//             }
          
//             _updateProps () {
//                 const { store } = this.context;
//                 let stateProps = mapStateToProps
//                     ? mapStateToProps(store.getState(), this.props)// 额外传入 props，让获取数据更加灵活方便
//                     : {}; // 防止 mapStateToProps 没有传入
//                 let dispatchProps = mapDispatchToProps
//                     ? mapDispatchToProps(store.dispatch, this.props)
//                     : {};
                    
//                 this.setState({
//                     allProps: { // 整合普通的 props 和从 state 生成的 props
//                         ...stateProps,
//                         ...dispatchProps,
//                         ...this.props
//                     }
//                 });
//             }
          
//             render () {
//                 return <WrappedComponent {...this.state.allProps} />
//             }
//         }
//         return Connect;
//     }
// }

import React, { Component } from 'react';
import { Consumer } from './Context'

export default function connect(mapStateToProps, mapDispatchToProps) {
    return (WrappedComponent) => {
        return class Connect extends Component {
            render() {
                return (
                    <Consumer>
                        <Content {...this.props} mapStateToProps={mapStateToProps} mapDispatchToProps={mapDispatchToProps} WrappedComponent={WrappedComponent} />
                    </Consumer>
                )
            }
        }
    }
}

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            store: props.store.getState()
        }
    }
    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() => {
            this.setState({
                store: this.props.store.getState()
            })
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }



    render() {
        const { WrappedComponent, mapStateToProps, mapDispatchToProps, store, ...other } = this.props;
        return <WrappedComponent {...this.state.store} {...mapStateToProps(store.getState())} {...mapDispatchToProps(store.dispatch)} {...other} />
    }
}