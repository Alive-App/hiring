import React from 'react';

import './App.scss';
import { Provider } from 'react-redux';
import store from './config/store';
import Navigation from './pages';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Navigation />
      </Provider>
    </div>
  );
}

export default App;
