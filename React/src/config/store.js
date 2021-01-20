import { createStore, applyMiddleware, compose } from 'redux';

// middlewares
import thunkMiddleware from 'redux-thunk';

// Import custom components
import rootReducer, {/*  StoreState */ } from '../reducers';

/* declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
} */

/* function saveToLocalStorage(state: StoreState) {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (e) {
		console.log(e);
	}
} */

function loadFromLocalStorage() {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) return {};
		return JSON.parse(serializedState);
	} catch (e) {
		console.log(e);
		return undefined;
	}
}

const persistedState = loadFromLocalStorage();

/**
 * Create a Redux store that holds the app state.
 */
const store = createStore(
	rootReducer,
	persistedState,
	compose(
		applyMiddleware(thunkMiddleware),

		//For working redux dev tools in chrome (https://github.com/zalmoxisus/redux-devtools-extension)
		// window.__REDUX_DEVTOOLS_EXTENSION__!
		// 	? window.__REDUX_DEVTOOLS_EXTENSION__()
		// 	: function (f: any) {
		// 			return f;
		// 	  },
	),
);

// const unsubscribe = store.subscribe(() => {
// 	const state = store.getState();
// 	saveToLocalStorage(state);
// });

export default store;
