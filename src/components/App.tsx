import { FC } from "react"
import { jss } from "react-jss"
import { Route, Switch } from "react-router-dom"
import { Counter } from "./Counter"
import { Header } from "./Header"
import { Login } from "./Login"
import { SignUp } from "./SignUp"

export const App: FC = () => {
  return (
    <div className='app'>
      <Header />
      <Switch>
        <Route exact path='/' render={() => <h1>Home</h1>} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/counter' component={Counter} />
      </Switch>
    </div>
  )
}

export const globalSS = jss.createStyleSheet({
  '@global': {
    body: {
      fontFamily: "'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      width: '80%',
      margin: '0 auto',
      padding: 0
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
      }
    },
    'a.link': {
      extend: 'button',
      textDecoration: 'none',
      '&:visited': {
        color: '#006800'
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
