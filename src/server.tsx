import flash from 'connect-flash'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import passport from 'passport'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { App, globalSS } from './components/App'
import { Html } from './components/Html'
import passportConfig from './config/passport'
import accountRouter from './routes/account'
import SequelizeStoreSession from 'connect-session-sequelize'
import { sequelize } from './config/db'
import { JssProvider, SheetsRegistry } from 'react-jss'

dotenv.config()
passportConfig()

const app = express()
const SequelizeStore = SequelizeStoreSession(session.Store)

app.use(morgan('tiny'))
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(flash())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({ db: sequelize })
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(accountRouter)
app.get('*', (req, res) => {
  const state: AppState = { user: req.user, flash: req.flash() }
  const scripts: string[] = ['main.js']
  const sheets = new SheetsRegistry()
  sheets.add(globalSS)

  const appMarkup: string = renderToString(
    <StaticRouter location={req.url}>
      <JssProvider registry={sheets}>
        <App />
      </JssProvider>
    </StaticRouter>
  )

  const html: string = renderToStaticMarkup(
    <Html sheets={sheets.toString()} state={state} children={appMarkup} scripts={scripts} />
  )

  res.send(`<!DOCTYPE html> ${html}`)
})

app.listen(5000, () => console.log('server runnin at', 5000))
