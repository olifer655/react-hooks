import React, { useState, useMemo } from 'react';

export default function (props) {
  console.log('render child');
  return (
    <>
      <p>{props.number}</p>
      <button onClick={props.onButtonClick}>+</button>
    </>
  );
}
