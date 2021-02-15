import React, { ComponentType, FC } from 'react';
import { Redirect, Route } from "react-router-dom";

interface ProtectedRouteProps {
  component: ComponentType,
  path: string,
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ component: Comp, path,  ...rest }) => {
  const loggedIn = typeof window !== 'undefined' ? Boolean(window.APP_STATE.user) : false
  return (
    <Route
      path={path}
      render={() => loggedIn ? <Comp /> : <Redirect to='/login'/>}
      {...rest}
    />
  )
}
