import ReactDOM from 'react-dom/server';

import {createStore} from "./create-store";
import {createApp} from "./create-app";
import {createMemoryHistory} from 'history';

global.process.env.__BROWSER__ = false;

function generateMarkupAndState(path, query) {
	/* initialise redux */
	const store = createStore({});

	/* run the router */
	const history = createMemoryHistory();
	history.pushState({ id: 1 }, path);

	console.log('path is ' + path);
	let app = createApp(store, history);
	let markup = ReactDOM.renderToString(app);

	// TODO - how to handle pending async actions?
	let state = store.getState();
	return Promise.resolve({markup, state});
}

export default generateMarkupAndState;
