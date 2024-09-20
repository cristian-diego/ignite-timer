import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { CycleContextProvider } from './contexts/CycleContext'
import { CultureContextProvider } from './contexts/CultureContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CultureContextProvider>
        <BrowserRouter>
          <CycleContextProvider>
            <Router />
          </CycleContextProvider>
        </BrowserRouter>
      </CultureContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
