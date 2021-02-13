import axios from "axios";
import React, { FC } from 'react';
import { createUseStyles, useTheme } from "react-jss";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  themeToggler: () => void,
  theme: string
}

export const Header: FC<HeaderProps> = ({ theme: themeName, themeToggler }) => {
  const theme = useTheme()
  const styles = useStyles({ theme })
  const loggedIn: boolean =
    typeof window !== 'undefined' ? Boolean(window.APP_STATE.user) : false

  const handleLogout = () => {
    axios.post('/logout').then(() => {
      if (typeof window !== 'undefined') return window.location.href = '/login'
    })
  }
  return (
    <div className={styles.header}>
      <NavLink exact to='/' className={styles.navLink}>Home</NavLink>
      <NavLink to='/counter' className={styles.navLink}>Counter</NavLink>
      {loggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
          <>
            <NavLink to='/login' className={styles.navLink}>Login</NavLink>
            <NavLink to='/signup' className={styles.navLink}>Sign Up</NavLink>
          </>
        )}
      <button onClick={themeToggler}>Theme: {themeName}</button>
    </div>
  )
}

const useStyles = createUseStyles({
  navLink: {
    color: ({ theme }) => theme.textColor,
    padding: '10px',
    margin: '0 10px',
    textDecoration: 'none',
    fontFamily: ['Montserrat', 'sans-serif'],
    '&.active': {
      color: ({theme}) => theme.header
    }
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
})
