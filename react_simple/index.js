import React from './react';
import ReactDOM from './react-dom';

function FunctionComponent(props) {
    return <p>函数组件-{props.name}</p>;
}

const element = (
    <div className="title" style={{ color: 'red', fontSize: 20 }} onClick={() => console.log(1)}>
        hello <span>react</span>
        <FunctionComponent name="嘿嘿嘿" />
    </div>
);
console.log('---element---');
console.log(element);
console.log('-----------');

ReactDOM.render(element, document.querySelector('#container'));
