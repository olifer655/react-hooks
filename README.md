Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性

# Hook API 索引

[API](https://zh-hans.reactjs.org/docs/hooks-reference.html)

## 1. useState

```js
const [number, setNumber] = useState(0);

function AsyncButton() {
  setTimeout(() => {
    setNumber(number + 1);
  }, 1000);
}

return (
  <>
    <p>{number}</p>
    <button onClick={() => setNumber(number + 1)}>button1</button>
    <button onClick={AsyncButton}>AsyncButton</button>
  </>
);
```

### 1.1 函数式更新

```js
<button onClick={() => setNumber((number) => number + 1)}>+</button>
```

点击 AsyncButton 可以实现 1 秒后更新，但是在点击 button1 时，是异步更新，两个 button 引用的值不是同样的值

> 总结：如果 setNumber 的时候传递的是一个函数，state 的值始终是最新的值

### 1.2 惰性初始化

useState 除了可以是一个具体的值外，还可以是一个函数，初始化函数只会在初始化的时候执行一次，以后不会再执行。

```js
const [count, setCount] = useState(() => ({ count: 0 }));

function sum() {
  return 1 + 1;
}
const [count, setCount] = useState(sum());
```

第二种方式每次都会执行，但是执行后没有任何意义，因为只要第一次会赋值。

### 1.3 性能优化

#### 1.3.1 利用 useCallback 减少对象和函数的创建

```js
let add = useCallback(() => {
  setCount({ ...count, number: count.number + 1 });
});
...
<p>
  {count.name}:{count.number}
</p>
<button onClick={add}>+</button>
```

#### 1.3.2 利用 useMemo

见 useMemo 例子

## 2. useCallback

useCallback 本意是对函数进行本地缓存，一共接受两个参数，第二个参数是依赖的变量数组，当数组中的变量发生变化的时候，就会重写生成新的函数。

```js
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
```

## 3. useMemo

memo 在缓存中记住老组件，返回新组件。如果组件的属性不改变，则不刷新。

```js
import React, { useState, useMemo, memo, useCallback } from 'react';

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

function Child(props) {
  console.log('render child');
  return (
    <>
      <p>{props.number}</p>
      <button onClick={props.onButtonClick}>+</button>
    </>
  );
}
```

## 4. useReducer

useState 是 useReducer 的语法糖

### 1. 基本用法

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

看着上面的写法，有没有发现非常类似 redux，没错 Facebook 把 redux 的作者挖去了，专门来写 hooks，以便于干掉 redux！哈哈哈。

当我们的 state 特别复杂的时候，我们就可以用 useReducer 自己来计算 state 了，其他情况还是用 useState 比较简单。

UseState 原理：

```js
function UseState(initialState) {
  function render(state, action) {
    return { ...action.payload };
  }
  let [state, dispatch] = useReducer(reducer, initialState);

  function setState(newState) {
    dispatch({ type: 'SET_STATE', payload: newState });
  }

  return [state, setState];
}
```

## 5. useContext

上下文（更加类似 redux 了。。。）

## 6. useEffect

useEffect = componentDidMount + componentDidUpdate + componentWillUnmount;

### 6.1 useEffect 的销毁

useEffect 可以有返回一个函数，函数里一般执行清理动作。

```js
useEffect(() => {
  let $timer = setInterval(() => {
    setCount((number) => {
      number: count.number + 1;
    });
  }, 1000);
  return () => {
    clearInterval($timer);
  };
});
```

## 7. useRef

- useRef() 每次执行都会返回同一个对象，而 React.
- createRef()每次执行都会返回不同的对象。

如果给类组件加 ref 我们同样可以用 forwardRef(child)

函数可以接受两个参数（props, ref）

useImperativeHandle 经常和 forwardRef 连用，用来限制父组件对子组件的 dom 过度操作，其原理就是代理。

## 8. useLayoutEffect

useLayoutEffect 和 useEffect 类似。但是 useLayoutEffect 会在 dom 更新后，同步调用 Effect，读取 dom 更新后，同步渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

> 尽可能使用标准的 useEffect 以避免阻塞视觉更新。

## 9. useImperativeHandle

### 1. 基本用法

```js
useImperativeHandle(ref, createHandle, [deps]);
```

useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用：

```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

# 自定义 Hooks

```js
```

```js
```

```js
```
