import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './components/App'

if (typeof window !== 'undefined') console.log(window.APP_STATE)

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  , document.getElementById('root'))
