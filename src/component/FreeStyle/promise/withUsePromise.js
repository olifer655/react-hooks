import React from 'react';

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

const initialState = 0;

function init(initialState) {
  return { number: initialState };
}

export { reducer, initialState, init };
