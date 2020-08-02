import React, { useEffect, useState } from 'react';

export default function (props) {
  const [count, setCount] = useState({ number: 0 });
  useEffect(() => {
    document.title = `您点击了${count.number}次`;
  }, [count]);

  // useEffect(() => {
  //   let $timer = setInterval(() => {
  //     setCount((number) => { number: count.number + 1 });
  //   }, 1000);
  //   return () => {
  //     clearInterval($timer);
  //   };
  // });

  return (
    <>
      <h2>6. useEffect</h2>
      <p>count: {count.number}</p>
      <button
        onClick={() => {
          setCount({ number: count.number + 1 });
        }}
      >
        +
      </button>
    </>
  );
}
