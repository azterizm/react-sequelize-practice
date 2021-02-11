import axios from "axios";
import { FC, useState } from "react";
import { LoginResponse } from "../types/components/Login";

export const Login: FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [data, setData] = useState<LoginResponse | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { data }: { data: LoginResponse } = await axios.post('/login', { username, password })
      console.log('data', data)
      if (data?.code === 200) return window.location.href = '/'
      return setData(data)
    } catch (error) {
      return setError(error)
    }
  }

  return (
    <div id="account">
      <h1>Sign into this great App.</h1>
      <form id='login' onSubmit={handleSubmit}>

        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />

        <button type='submit'>Submit</button>
      </form>

      { data && (data.additionalInfo.message === 'Incorrect username' && (
        <h3 className="flash" style={{ color: 'red' }}>
          Couldn't find the user, try rechecking the spell and continue.
        </h3>
      ) || (data.additionalInfo && (
        <h3 className="flash" style={{ color: 'red' }}>
          {data.additionalInfo.message}
        </h3>
      )))}

      { error && <h1 style={{ color: 'red' }}>Something went wrong. Please try again.</h1>}

    </div>
  )
}
