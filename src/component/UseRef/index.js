import React, { useRef, forwardRef, useImperativeHandle } from 'react';

export default function (props, ref) {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  return (
    <>
      <h2>7. useRef</h2>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
