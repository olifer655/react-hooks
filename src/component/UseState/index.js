import React, { useState, useCallback } from 'react';

export default function (props) {
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState({ number: 0, name: '计数器' });

  function AsyncButton() {
    setTimeout(() => {
      setNumber(number + 1);
    }, 1000);
  }

  let add = useCallback(() => {
    setCount({ ...count, number: count.number + 1 });
  });

  return (
    <>
      <h2>1. useState</h2>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>button1</button>
      <button onClick={AsyncButton}>AsyncButton</button>

      <button onClick={() => setNumber((number) => number + 1)}>+</button>

      <p>
        {count.name}:{count.number}
      </p>
      <button onClick={add}>+</button>
    </>
  );
}
