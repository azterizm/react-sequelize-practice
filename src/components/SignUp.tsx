import axios from "axios";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

interface SignUpData {
  message: string
}

export const SignUp: FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [data, setData] = useState<SignUpData | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { data } = await axios.post('/signup', { username, password })
    return setData(data)
  }

  return (
    <div id="account">
      <h1>Join into this great App.</h1>
      <form id='signup' onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
      {data && (
        <>
          <h1>{data.message}</h1>
          <Link to='/login'>Login</Link>
        </>
      )}
    </div>
  )
}
