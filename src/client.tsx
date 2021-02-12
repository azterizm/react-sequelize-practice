import { hydrate } from 'react-dom'
import React from 'react'
import { jss, JssProvider, SheetsRegistry } from 'react-jss'
import { BrowserRouter } from 'react-router-dom'
import { App, globalSS } from './components/App'
import ExtendPlugin from 'jss-plugin-extend'
import { loadableReady } from '@loadable/component'
import 'regenerator-runtime/runtime'

if (typeof window !== 'undefined') console.log(window.APP_STATE)

const globalStyles = (): SheetsRegistry => {
  const sheetsRegistry = new SheetsRegistry()
  sheetsRegistry.add(globalSS)
  return sheetsRegistry
}

jss.use(ExtendPlugin())

loadableReady(() => {
  hydrate(
    <BrowserRouter>
      <JssProvider registry={globalStyles()} jss={jss}>
        <App />
      </JssProvider>
    </BrowserRouter>,
    document.getElementById('root'),
    () => {
      const styleSheet = document.getElementById('ssrStylesheet')
      styleSheet?.parentNode?.removeChild(styleSheet)
    }
  )
})
