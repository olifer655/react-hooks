import { useState } from 'react';

function getData(offset, limit) {
  return fetch(
    `http://localhost:8000/api/users?offset=${offset}&limit=${limit}`
  ).then((res) => res.json());
}

function UseLoader(initialState) {
  let [data, setData] = useState(initialState);
  console.log(data);
  async function loaderMore(offset, limit) {
    const response = await getData(offset, limit);

    setData([...data, ...response]);
    console.log(data);
  }

  return [data, loaderMore];
}

export default UseLoader;
