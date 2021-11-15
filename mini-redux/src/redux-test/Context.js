import React from "react"

const Context = React.createContext()

const Provider = ({store, children}) => <Context.Provider value={{store}}>{children}</Context.Provider>;

const Consumer = ({children}) => {
    const { type, props } = children;
    return (
        <Context.Consumer>
            {({store}) => React.createElement(type, {...props, store})}
        </Context.Consumer>
    )
}

export {Provider, Consumer}