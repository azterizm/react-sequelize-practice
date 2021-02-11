import axios from "axios";
import { FC, useState } from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

interface SignUpData {
  message: string
}

export const SignUp: FC = () => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [data, setData] = useState<SignUpData | null>(null)
  const styles = useStyles()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { data } = await axios.post('/signup', { username, password })
    return setData(data)
  }

  if (data) return (
    <div className={styles.account}>
      <h1>{data.message}</h1>
      <Link className='link' to='/login'>Login</Link>
    </div>
  )

  return (
    <div className={styles.account}>
      <h1 className={styles.heading}>Join</h1>
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
    </div>
  )
}

const useStyles = createUseStyles({
  account: {
    width: 482,
    margin: '0 auto'
  },
  heading: {
    textAlign: 'center'
  }
})
