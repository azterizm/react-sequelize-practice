import loadable from '@loadable/component'
import color from "color"
import React, { FC, useEffect, useState } from 'react'
import { jss, ThemeProvider } from "react-jss"
import { Redirect, Route, Switch } from "react-router-dom"
import { Post } from '../components/Post'
import { Header } from "./Header"
import { PostCreation } from './PostCreation'
import { PostList } from './PostList'
import { PostUpdate } from './PostUpdate'
import { ProtectedRoute } from './ProtectedRoute'

const Login = loadable(() => import('./Login'))
const SignUp = loadable(() => import('./SignUp'))

export const App: FC = () => {
  const [theme, setTheme] = useState<string>("light")

  useEffect(() => {
    document.body.style.background =
      theme === 'light' ? lightTheme.background : darkTheme.background
    document.body.style.color =
      theme === 'light' ? lightTheme.textColor : darkTheme.textColor
  }, [theme])

  const toggleTheme = (): void => theme === 'light' ? setTheme('dark') : setTheme('light')
  const loggedIn = typeof window !== 'undefined' ? Boolean(window.APP_STATE.user) : false

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Header themeToggler={toggleTheme} theme={theme} />
      <Switch>
        <Route exact path='/' render={() => !loggedIn ? <h1>This is the information of this app</h1> : <PostList />} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <ProtectedRoute path='/post/:postId' component={Post} />
        <ProtectedRoute path='/new' component={PostCreation} />
        <ProtectedRoute path='/update/:postId' component={PostUpdate} />
        <Route render={() => <h1>404 Not Found</h1>} />
      </Switch>
    </ThemeProvider>
  )
}

export const darkTheme = {
  background: '#171717',
  textColor: 'white',
  textWeight: 600,
  header: '#e769ff',
  inputBorder: '0.5px solid #ffffff00',
  inputBackground: '#202020',
  filter: ['invert(1)'],
  postBackground: '#47474742'
}

export const lightTheme = {
  background: 'white',
  textColor: 'black',
  textWeight: 300,
  header: '#720087',
  inputBorder: '0.5px solid #bababa',
  inputBackground: 'white',
  filter: ['invert(0)'],
  postBackground: '#ececec60'
}

export const globalSS = jss.createStyleSheet({
  '@global': {
    body: {
      fontFamily: "'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      width: '80%',
      margin: '0 auto',
      padding: 0,
    },
    h1: {
      fontFamily: 'Montserrat, sans-serf',
    },
    button: {
      background: 'none',
      fontFamily: 'Montserrat, sans-serf',
      fontWeight: 500,
      fontSize: 'medium',
      border: 'none',
      color: '#006800',
      cursor: 'pointer',
      '&:focus': {
        outline: 'none'
      },
      '&:disabled': {
        color: color('#006800').rgb().fade(0.5).string(),
        cursor: 'auto'
      }
    },
    input: {
      width: '100%',
      borderRadius: 8,
      marginBottom: 20,
      padding: 5
    },
  }
}).attach()

