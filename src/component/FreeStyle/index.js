import React, { useEffect, useState } from 'react';
import { reducer, initialState, init } from './logger/withUseLogger';
import UseLogger from './logger/UseLogger';
import UsePromise from './promise/UsePromise';
import UseLoader from './loader';

const LIMIT = 5;

export default function () {
  let [counter1, setCounter1] = UseLogger(reducer, initialState, init);
  let [counter2, setCounter2] = UsePromise(reducer, initialState, init);
  let [users, setUsers] = UseLoader([]);
  let [offset, setOffset] = useState(0);

  useEffect(() => setUsers(offset, LIMIT), []);

  function loader() {
    setOffset(offset + LIMIT);
  }

  return (
    <>
      <p>UseLogger</p>
      <p>counter1: {counter1.number}</p>
      <p>counter2: {counter2.number}</p>
      <div>
        {users.map((item, index) => {
          return (
            <p key={`${item.id}${index}`}>
              id: {item.id}
              name: {item.name}
            </p>
          );
        })}
      </div>
      <button onClick={() => setCounter1({ type: 'increment' })}>+</button>
      <button
        onClick={() => {
          setCounter2(
            new Promise((resolve) => {
              setTimeout(() => {
                resolve({ type: 'increment' });
              }, 1000);
            })
          );
        }}
      >
        UsePromise
      </button>
      <button onClick={loader}>loader</button>
    </>
  );
}
