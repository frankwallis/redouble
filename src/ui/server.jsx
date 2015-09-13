import React from 'react';
import ReactDOM from 'react-dom/server';

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../stores/index';

import {Router} from 'react-router';
import {createMemoryHistory, createLocation} from 'history';
import routes from "./routes";

// Redux DevTools store enhancers and components
import { devTools } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

global.process.env.__BROWSER__ = false;

function generateMarkupAndState(path, query) {
	/* initialise redux */
	const reducer = combineReducers(reducers);
	const finalCreateStore = compose(applyMiddleware(thunk),
		devTools())(createStore);
	const store = finalCreateStore(reducer, global.__ISOMORPHIC_STATE__);

	/* run the router */
	const history = createMemoryHistory();
	history.pushState({ id: 1 }, path);

	console.log('path is ' + path);
	let markup = ReactDOM.renderToString(
		<div>
			<Provider store={store}>
				<Router history={history}>
					{routes}
				</Router>
			</Provider>
			<DebugPanel top right bottom>
				<DevTools store={store} monitor={LogMonitor} />
			</DebugPanel>
		</div>
	);

	// TODO - how to handle pending async actions?
	let state = store.getState();
	return Promise.resolve({markup, state});
}

export default generateMarkupAndState;
