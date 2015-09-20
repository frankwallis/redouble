import React from 'react';

import routes from "./routes";
import {Router} from 'react-router';
import {Provider} from 'react-redux';
import {DevTools, DebugPanel, LogMonitor} from 'redux-devtools/lib/react';

export function createApp(store, history) {
	return (
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
}
