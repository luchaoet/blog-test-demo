import './App.css'
import connect from './redux-test/connect';


function App(props) {
  console.log('App', props)
  return (
    <>
      <div>{props.number}</div>
      <button onClick={()=> {
        // props.dispatch({type: 'INCREMENT'})
        props.onSwitchColor()
      }}>+</button>
    </>
  );
}


//告诉connect如何获取、整合状态
const mapStateToProps = (state) => {
  // 类似于重命名了
  return {
    number: state.value
  }
};
//告诉connect如何触发 dispatch
const mapDispatchToProps = (dispatch) => {
  return {
      dispatch,
      onSwitchColor: () => {
          dispatch({ type: 'INCREMENT' });
      },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);