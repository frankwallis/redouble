// Redux
import {createStore as reduxCreateStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../stores/index';

// Redux DevTools store enhancers and components
import {devTools} from 'redux-devtools';

export function createStore(initialState) {
	/* initialise redux */
	const reducer = combineReducers(reducers);
	const finalCreateStore = compose(
		applyMiddleware(thunk),
		devTools())(reduxCreateStore);
	const store = finalCreateStore(reducer, initialState);

	return store;
}
