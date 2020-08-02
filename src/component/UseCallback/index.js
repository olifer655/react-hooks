import React, { useState, useCallback } from 'react';

export default function (props) {
  const [count, setCount] = useState({ number: 0, name: '计数器' });

  let add = useCallback(() => {
    setCount({ ...count, number: count.number + 1 });
  });

  return (
    <>
      <h2>2. useCallback</h2>
      <p>
        {count.name}:{count.number}
      </p>
      <button onClick={add}>+</button>
    </>
  );
}
