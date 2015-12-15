import React from 'react';

import routes from "./routes";
import {Router} from 'react-router';
import {Provider} from 'react-redux';

export function createApp(store, history) {
	return (
		<Provider store={store}>
			<Router history={history}>
				{routes}
			</Router>
		</Provider>
	);
}
