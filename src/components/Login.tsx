import axios from "axios";
import React, { FC, useState } from 'react';
import { createUseStyles } from "react-jss";
import { LoginResponse } from "../types/components/Login";

const Login: FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [data, setData] = useState<LoginResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const styles = useStyles()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    try {
      const { data }: { data: LoginResponse } = await axios.post('/login', { username, password })
      console.log('data', data)
      if (data?.code === 200) return window.location.href = '/'
      setLoading(false)
      return setData(data)
    } catch (error) {
      setLoading(false)
      return setError(error)
    }
  }

  return (
    <div className={styles.account}>
      <h1 className={styles.head}>Sign into this great App</h1>
      <form id='login' onSubmit={handleSubmit}>

        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />

        <button type='submit' disabled={loading}>Submit</button>
      </form>

      { data && (data.additionalInfo.message === 'Incorrect username' && (
        <h3 className={styles.error}>
          Couldn't find the user, try rechecking the spell and continue.
        </h3>
      ) || (data.additionalInfo && (
        <h3 className={styles.error}>
          {data.additionalInfo.message}
        </h3>
      )))}

      { error && <h1 className={styles.error}>Something went wrong. Please try again.</h1>}

    </div>
  )
}

const useStyles = createUseStyles({
  head: {
    textAlign: 'center',
  },
  account: {
    width: 482,
    margin: '0 auto'
  },
  error: {
    color: 'red',
    '&:before': {
      display: 'block',
      width: 20,
      height: 20,
      background: 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDUxLjc0IDQ1MS43NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDUxLjc0IDQ1MS43NDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0UyNEM0QjsiIGQ9Ik00NDYuMzI0LDM2Ny4zODFMMjYyLjg1Nyw0MS42OTJjLTE1LjY0NC0yOC40NDQtNTguMzExLTI4LjQ0NC03My45NTYsMEw1LjQzNSwzNjcuMzgxDQoJYy0xNS42NDQsMjguNDQ0LDQuMjY3LDY0LDM2Ljk3OCw2NGgzNjUuNTExQzQ0Mi4wNTcsNDI5Ljk1OSw0NjEuOTY4LDM5NS44MjUsNDQ2LjMyNCwzNjcuMzgxeiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0yMjUuODc5LDYzLjAyNWwxODMuNDY3LDMyNS42ODlINDIuNDEzTDIyNS44NzksNjMuMDI1TDIyNS44NzksNjMuMDI1eiIvPg0KPGc+DQoJPHBhdGggc3R5bGU9ImZpbGw6IzNGNDQ0ODsiIGQ9Ik0xOTYuMDEzLDIxMi4zNTlsMTEuMzc4LDc1LjM3OGMxLjQyMiw4LjUzMyw4LjUzMywxNS42NDQsMTguNDg5LDE1LjY0NGwwLDANCgkJYzguNTMzLDAsMTcuMDY3LTcuMTExLDE4LjQ4OS0xNS42NDRsMTEuMzc4LTc1LjM3OGMyLjg0NC0xOC40ODktMTEuMzc4LTM0LjEzMy0yOS44NjctMzQuMTMzbDAsMA0KCQlDMjA3LjM5LDE3OC4yMjUsMTk0LjU5LDE5My44NywxOTYuMDEzLDIxMi4zNTl6Ii8+DQoJPGNpcmNsZSBzdHlsZT0iZmlsbDojM0Y0NDQ4OyIgY3g9IjIyNS44NzkiIGN5PSIzMzYuMDkyIiByPSIxNy4wNjciLz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K)',
      float: 'left',
      margin: [4, 10, 0, 0],
      content: "''",
    }
  }
})

export default Login
