import axios from "axios";
import color from "color";
import React from 'react'
import { FC, useState } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { Link } from "react-router-dom";

interface SignUpData {
  message: string
}

const SignUp: FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [data, setData] = useState<SignUpData | null>(null)
  const theme = useTheme()
  const styles = useStyles({ theme })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { data } = await axios.post('/signup', { username, password })
    return setData(data)
  }

  if (data) return (
    <div className={styles.account}>
      <h1>{data.message}</h1>
      <Link className={styles.navLink} to='/login'>Login</Link>
    </div>
  )

  return (
    <div className={styles.account}>
      <h1 className={styles.heading}>Join</h1>
      <form id='signup' onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          className={styles.input}
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          className={styles.input}
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

const useStyles = createUseStyles({
  navLink: {
    color: '#006800',
    textDecoration: 'none',
    '&:visited': {
      color: color('#006800').darken(0.5).hex()
    }
  },
  account: {
    width: 482,
    margin: '0 auto'
  },
  heading: {
    textAlign: 'center'
  },
  input: {
    background: ({ theme }) => theme.inputBackground,
    border: ({ theme }) => theme.inputBorder
  }
})

export default SignUp
