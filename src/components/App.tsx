import { FC } from "react"
import { Route, Switch } from "react-router-dom"
import { Counter } from "./Counter"
import { Header } from "./Header"
import { Login } from "./Login"
import { SignUp } from "./SignUp"

export const App: FC = () => {
  return (
    <div className='app'>
      <Header/>
      <Switch>
        <Route exact path='/' render={() => <h1>Home</h1>} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/counter' component={Counter} />
      </Switch>
    </div>
  )
}
