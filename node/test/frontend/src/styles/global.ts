import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 10px;
  }

  body, html, #__next {
    min-height: 100vh;
  }

  body {
    font-family: 'Poppins', ---apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1.6rem;
    background: #f8fafd;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #222531;
  }

  .form-error {
    background: #f9c8cb;
    padding: 1rem;
    font-size: 1.4rem;
    border-radius: 1rem;
    margin-top: 1rem;
  }
`
