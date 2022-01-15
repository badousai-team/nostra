import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import { appRoot } from './utils/helper'
import { rootStore } from './stores'
import theme from './theme'
import App from './application'

const render = () => {
  ReactDOM.render((
    // https://next.material-ui.com/guides/interoperability/#css-injection-order
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  ), appRoot)
}

const main = async () => {
  try {
    render()
  } catch (err) {
    console.log(err)
  }
}

main()
