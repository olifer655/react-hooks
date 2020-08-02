import React, { useState, useMemo, memo, useCallback } from 'react';
import Child from './child';

let MemoChild = memo(Child);

export default function (props) {
  const [number, setNumber] = useState(0);
  const [value, setValue] = useState(0);

  console.log('Memo');

  let onButtonClick = useCallback(() => {
    setNumber(number + 1);
  }, [number]);

  let data = useMemo(() => number, [number]);

  return (
    <>
      <h2>3. useMemo</h2>
      <p>value: {value}</p>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <MemoChild onButtonClick={onButtonClick} number={data}></MemoChild>
    </>
  );
}
