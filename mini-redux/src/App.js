import './App.css'

function App({ store }) {
  return (
      <div className="App">
          <span>{store.getState().value}</span>
          <button
              onClick={() => {
                  store.dispatch({ type: 'INCREMENT' });
              }}
          >
              +
          </button>
          <button
              onClick={() => {
                  store.dispatch({ type: 'DECREMENT' });
              }}
          >
              -
          </button>
      </div>
  );
}

export default App;