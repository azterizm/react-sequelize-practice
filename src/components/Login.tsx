import axios from "axios";
import { FC, useState } from "react";
import { createUseStyles } from "react-jss";
import { LoginResponse } from "../types/components/Login";

export const Login: FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [data, setData] = useState<LoginResponse | null>(null)
  const styles = useStyles()

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
    <div className={styles.account}>
      <h1 className={styles.head}>Sign into this great App</h1>
      <form id='login' onSubmit={handleSubmit}>

        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />

        <button type='submit'>Submit</button>
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
      background: 'url("https://www.flaticon.com/svg/vstatic/svg/1182/1182679.svg?token=exp=1613053705~hmac=61e2bdef488ff8b8bdfa41bb684fbc7f") no-repeat',
      float: 'left',
      margin: [3, 10, 10, 0],
      content: "''",
    }
  }
})
