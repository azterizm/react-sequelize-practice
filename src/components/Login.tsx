import { FC } from "react";

export const Login: FC = () => {
  let flash: AppState['flash'] = {};
  if (typeof window !== 'undefined') flash = window.APP_STATE.flash
  return (
    <div id="account">
      <h1>Sign into this great App.</h1>
      <form id='login' action='/login' method='post'>

        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />

        <button type='submit'>Submit</button>
      </form>

      {flash && (flash.error && (
        <h3 className="flash" style={{ color: 'red' }}>
          {flash.error[0] as string}
        </h3>
      ) || (flash.success && (
        <h3 className="flash" style={{ color: 'green' }}>
          {flash.success[0] as string}
        </h3>
      )))}

    </div>
  )
}
