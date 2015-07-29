import React from 'react';
import {Route} from 'react-router';

import {Main} from './main/main.jsx';
import {Table} from './table/table.jsx';
import {AboutView} from './about/about.jsx';
import {SettingsView} from './settings/settings.jsx';

let routes = (
	<Route component={Main}>
		<Route path="/" name="table" component={Table} />
		<Route path="/settings" name="settings" component={SettingsView} />
		<Route path="/about" name="about" component={AboutView} />
		<Route path="*" name="table" component={Table} />
	</Route>
);

export default routes;
