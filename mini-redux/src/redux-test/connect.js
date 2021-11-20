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