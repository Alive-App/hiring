import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header';
import Routes from './routes';
import GlobalStyle from './styles/global';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
