// Redux
import {createStore as reduxCreateStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../stores/index';

const devToolsExtension = typeof(window) !== 'undefined' ? window.devToolsExtension : null;

export function createStore(initialState) {
	/* initialise redux */
	const reducer = combineReducers(reducers);
	const finalCreateStore = compose(
		applyMiddleware(thunk),
		devToolsExtension ? devToolsExtension() : f => f // support chrome extension
	)(reduxCreateStore);

	return finalCreateStore(reducer, initialState);
}
