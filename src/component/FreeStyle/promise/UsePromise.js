import React, { useEffect, useReducer } from 'react';

function UsePromise(reducer, initialState, init) {
  let [state, dispatch] = useReducer(reducer, initialState, init);

  let dispatchWithPromise = (action) => {
    if (action.then && typeof action.then === 'function') {
      action.then((result) => {
        dispatch(result);
      });
    } else {
      dispatch(action);
    }
  };

  return [state, dispatchWithPromise];
}

export default UsePromise;
