import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../stores/index';

// Redux DevTools store enhancers and components
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

// React Router
import {Router} from 'react-router';

import {createHistory} from 'history';
import routes from "./routes";

import 'normalize.css';
import 'purecss';
import 'font-awesome/css/font-awesome.css';

console.log("Received state " + JSON.stringify(global.__ISOMORPHIC_STATE__));

const reducer = combineReducers(reducers);
const finalCreateStore = compose(applyMiddleware(thunk),
	devTools(),
	// Lets you write ?debug_session=<name> in address bar to persist debug sessions
	persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)))(createStore);
const store = finalCreateStore(reducer, global.__ISOMORPHIC_STATE__);

const history = createHistory();

ReactDOM.render(
	<div>
		<Provider store={store}>
			<Router history={history}>
				{routes}
			</Router>
		</Provider>
		<DebugPanel top right bottom>
			<DevTools store={store} monitor={LogMonitor} />
		</DebugPanel>
	</div>,
	document.getElementById('main'));
