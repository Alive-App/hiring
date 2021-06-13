import { GlobalStyle } from './global-styles'
import { Router } from './router'
import { Providers } from './providers'

export const App = () => (
  <Providers>
    <Router />
    <GlobalStyle />
  </Providers>
)
