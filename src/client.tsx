import { loadableReady } from '@loadable/component'
import ExtendPlugin from 'jss-plugin-extend'
import React from 'react'
import { hydrate, render } from 'react-dom'
import { jss, JssProvider, SheetsRegistry } from 'react-jss'
import { BrowserRouter } from 'react-router-dom'
import 'regenerator-runtime/runtime'
import { App, globalSS } from './components/App'

const globalStyles = (): SheetsRegistry => {
  const sheetsRegistry = new SheetsRegistry()
  sheetsRegistry.add(globalSS)
  return sheetsRegistry
}

const renderElems =
  <BrowserRouter>
    <JssProvider registry={globalStyles()} jss={jss}>
      <App />
    </JssProvider>
  </BrowserRouter>

const rootElem = document.getElementById('root')

jss.use(ExtendPlugin())

loadableReady(() => {
  if (rootElem?.hasChildNodes())
    hydrate(
      renderElems,
      rootElem,
      () => {
        const styleSheet = document.getElementById('ssrStylesheet')
        styleSheet?.parentNode?.removeChild(styleSheet)
      }
    )
  else
    render(
      renderElems,
      rootElem
    )
})
