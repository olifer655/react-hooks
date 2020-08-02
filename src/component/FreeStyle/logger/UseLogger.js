import { useEffect, useReducer } from 'react';

function UseLogger(reducer, initialState, init) {
  let [state, dispatch] = useReducer(reducer, initialState, init);
  let dispatchWithLogger = (action) => {
    console.log('pre state', state);
    dispatch(action);
  };
  useEffect(() => {
    console.log('next state', state);
  }, [state]);
  return [state, dispatchWithLogger];
}

export default UseLogger;
