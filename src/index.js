import React from 'react';
import ReactDOM from 'react-dom';
import UseStateEg from './component/UseState';
import UseRefEg from './component/UseRef';
import UseEffectEg from './component/UseEffect';
import UseCallbackEg from './component/UseCallback';
import UseContextEg from './component/UseContext';
import UseReducerEg from './component/UseReducer';
import UseMemoEg from './component/UseMemo';
import UseImperativeHandleEg from './component/UseImperativeHandle';
import UseDebugValueEg from './component/UseDebugValue';
import FreeStyle from './component/FreeStyle';
import './index.css';

ReactDOM.render(
  <div className="content">
    {/* <div className="left">
      <UseStateEg></UseStateEg>
      <UseCallbackEg></UseCallbackEg>
      <UseMemoEg></UseMemoEg>
      <UseReducerEg></UseReducerEg>
      <UseContextEg></UseContextEg>
      <UseEffectEg></UseEffectEg>
      <UseRefEg></UseRefEg>
      <UseImperativeHandleEg></UseImperativeHandleEg>
      <UseDebugValueEg></UseDebugValueEg>
    </div> */}
    <div className="right">
      <h1>自定义Hooks</h1>
      <FreeStyle></FreeStyle>
    </div>
  </div>,
  document.getElementById('root')
);
