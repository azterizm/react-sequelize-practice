import React, { FC, useState } from 'react';

const Counter: FC = () => {
  const [count, setCounter] = useState<number>(0)
  return (
    <div id="counter">
      <h1>{count}</h1>
      <button onClick={() => setCounter(e => e + 1)}>Add</button>
    </div>
  )
}

export default Counter
