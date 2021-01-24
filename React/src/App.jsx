import React from 'react';

import './App.scss';
import { Provider } from 'react-redux';
import store from './config/store';
import Navigation from './pages';
import { Toast } from 'primereact/toast';
import { toasterRef } from './utils/toaster';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Navigation />
      </Provider>
      <Toast ref={toasterRef} />
    </div>
  );
}

export default App;
