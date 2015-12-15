import React from 'react';
import ReactDOM from 'react-dom/server';

import {createStore} from "./create-store";
import {createMemoryHistory} from 'history';
import App from "./app";

global.process.env.__BROWSER__ = false;

function generateMarkupAndState(path, query) {
	/* initialise redux */
	const store = createStore({});

	/* run the router */
	const history = createMemoryHistory();
	history.pushState({ id: 1 }, path);

	console.log('path is ' + path);
	let markup = ReactDOM.renderToString(<App store={store} history={history} />);

	// TODO - how to handle pending async actions?
	let state = store.getState();
	return Promise.resolve({markup, state});
}

export default generateMarkupAndState;
