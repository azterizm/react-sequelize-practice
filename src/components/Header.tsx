import axios from "axios";
import { FC } from "react";
import { NavLink } from "react-router-dom";

export const Header: FC = () => {
  const loggedIn: boolean =
    typeof window !== 'undefined' ? Boolean(window.APP_STATE.user) : false

  const handleLogout = () => {
    axios.post('/logout').then(() => {
      if (typeof window !== 'undefined') return window.location.href = '/login'
    })
  }

  return (
    <div id="header">
      <NavLink exact to='/'>Home</NavLink>
      <NavLink to='/counter'>Counter</NavLink>
      {loggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
          <>
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/signup'>SignUp</NavLink>
          </>
        )}
    </div>
  )
}
