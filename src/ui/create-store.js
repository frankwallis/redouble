// Redux
import {createStore as reduxCreateStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../stores/index';

export function createStore(initialState) {
	/* initialise redux */
	const reducer = combineReducers(reducers);
	const finalCreateStore = compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f // support chrome extension
	)(reduxCreateStore);
	const store = finalCreateStore(reducer, initialState);

	return store;
}
