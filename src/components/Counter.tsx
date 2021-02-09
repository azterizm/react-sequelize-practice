import { FC, useState } from "react";

export const Counter: FC = () => {
  const [count, setCounter] = useState<number>(0)
    return (
      <div id="counter">
        <h3>{count}</h3>
        <button onClick={() => setCounter(e => e + 1)}>Add</button>
      </div>
    )
  }
