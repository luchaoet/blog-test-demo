import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux-test/store';
import reportWebVitals from './reportWebVitals';

function listen() {
  ReactDOM.render(
      <React.StrictMode>
          <App store={store} />
      </React.StrictMode>,
      document.getElementById('root')
  );
}
listen();

store.subscribe(listen);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
