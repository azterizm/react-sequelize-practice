import axios from "axios";
import React, { FC, useState } from 'react';
import { createUseStyles, useTheme } from "react-jss";
import errorIcon from '../assets/error.png';
import { LoginResponse } from "../types/components/Login";

const Login: FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [data, setData] = useState<LoginResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const theme = useTheme()
  const styles = useStyles({ theme })

  console.log('errorIcon', errorIcon)

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
        <input className={styles.input} type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input className={styles.input} type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />

        <button type='submit' disabled={loading}>Submit</button>
      </form>

      { data && (data.additionalInfo.message === 'Incorrect username' && (
        <h3 className={styles.error}>
          <img className={styles.errorIcon} src={errorIcon} alt='' />
          Couldn't find the user, try rechecking the spell and continue.
        </h3>
      ) || (data.additionalInfo && (
        <h3 className={styles.error}>
          <img className={styles.errorIcon} src={errorIcon} alt='' />
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
  input: {
    background: ({ theme }) => theme.inputBackground,
    border: ({ theme }) => theme.inputBorder
  },
  account: {
    width: 482,
    margin: '0 auto'
  },
  error: {
    color: 'red',
  },
  errorIcon: {
    width: 18,
    height: 18,
    margin: [0, 8, -2, 0]
  }
})

export default Login
