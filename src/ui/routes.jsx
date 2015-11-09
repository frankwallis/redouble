import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Main from './main/main.jsx';
import Table from './table/table.jsx';
import AboutView from './about/about.jsx';
import SettingsView from './settings/settings.jsx';

let routes = (
	<Route path="/" component={Main}>
		<IndexRoute component={Table} />
		<Route path="ui/table" name="table" component={Table} />
		<Route path="ui/settings" name="settings" component={SettingsView} />
		<Route path="ui/about" name="about" component={AboutView} />
	</Route>
);

export default routes;
