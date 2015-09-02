import React from 'react';
import ReactDOM from 'react-dom/server';

import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../stores/index';

import {Router} from 'react-router';
import Location from 'react-router/lib/Location';
import routes from "./routes";

global.process.env.__BROWSER__ = false;

class Deferred {
	constructor() {
		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}
}

function generateMarkupAndState(path, query) {
	const result = new Deferred();

	/* initialise redux */
	const reducer = combineReducers(reducers);
	const finalCreateStore = applyMiddleware(thunk)(createStore);
	const store = finalCreateStore(reducer);

	/* run the router */
	const location = new Location(path, query);

	Router.run(routes, location, (error, initialState) => {
		let markup = ReactDOM.renderToString(
			<Provider store={store}>
				<Router {...initialState}>
					{routes}
				</Router>
			</Provider>
		);

		// TODO - how to handle pending async actions?
		let state = store.getState();
		result.resolve({markup, state});
	});

	return result.promise;
}

export default generateMarkupAndState;
