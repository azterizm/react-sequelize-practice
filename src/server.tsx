import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import React from 'react'
import flash from 'connect-flash'
import SequelizeStoreSession from 'connect-session-sequelize'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import passport from 'passport'
import path from 'path'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { JssProvider, SheetsRegistry } from 'react-jss'
import { StaticRouter } from 'react-router-dom'
import { App, globalSS } from './components/App'
import { Html } from './components/Html'
import { sequelize } from './config/db'
import passportConfig from './config/passport'
import accountRouter from './routes/account'

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
  const extractor = new ChunkExtractor({ statsFile: path.resolve('build/loadable-stats.json') })
  const sheets = new SheetsRegistry()

  sheets.add(globalSS)

  const appMarkup: string = renderToString(
    <ChunkExtractorManager extractor={extractor}>
      <StaticRouter location={req.url}>
        <JssProvider registry={sheets}>
          <App />
        </JssProvider>
      </StaticRouter>
    </ChunkExtractorManager>
  )

  const html: string = renderToStaticMarkup(
    <Html extractor={extractor} sheets={sheets.toString()} state={state} children={appMarkup} />
  )

  res.send(`<!DOCTYPE HTML> ${html}`)
})

app.listen(5000, () => console.log('server runnin at', 5000))
