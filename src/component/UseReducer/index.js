import React, { useReducer } from 'react';

const initialState = 0;

function UseState(initialState) {
  function render(state, action) {
    return { ...action.payload };
  }
  let [state, dispatch] = useReducer(reducer, initialState);

  function setState(newState) {
    dispatch({ type: 'SET_STATE', payload: newState });
  }

  return [state, setState];
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { number: state.number + 1 };
    case 'decrement':
      return { number: state.number - 1 };
    default:
      return state;
  }
}

function init(initialState) {
  return { number: initialState };
}

export default function Counter(props) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  return (
    <>
      <h2>4. UseReducer</h2>
      <p>Count: {state.number}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
