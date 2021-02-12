import axios from "axios";
import React from 'react'
import { FC } from "react";
import { createUseStyles } from "react-jss";
import { NavLink } from "react-router-dom";

export const Header: FC = () => {
  const styles = useStyles()
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
    </div>
  )
}

const useStyles = createUseStyles({
  navLink: {
    color: 'black',
    padding: '10px',
    margin: '0 10px',
    textDecoration: 'none',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  '@global': {
      '.active': {
          color: '#720087'
        }
    }
})
