import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './config/store';
function App() {
	return (
		<div className='App'>
			<Provider store={store}>
				<h1>ok</h1>
			</Provider>
		</div>
	);
}

export default App;
