/* @flow */

import React from 'react';
import Router from 'react-router';
const { Route, DefaultRoute, Redirect, RouteHandler, Link } = Router;

import {Table} from './table/table.jsx';
import {AboutView} from './about/about.jsx';
import {SettingsView} from './settings/settings.jsx';
import {GrowlContainer} from './growl/growl.jsx';

/* these should probably be somewhere else */
import 'normalize.css';
import 'purecss';
import 'font-awesome/css/font-awesome.css';
import './app.css';

export class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('rendering app');
		let routelinks = ["table", "settings", "about"].map((route) => {
			return (
				<li key={route}>
					<Link to={route}>{route}</Link>
				</li>
			);
		});

		return (
			<div className="app-container">
				<nav role="navigation" className="app-navbar nav-main">
					<ul className="nav-site">
						{routelinks}
					</ul>
				</nav>
				<div className="app-content">
					<RouteHandler/>
				</div>
				<div className="app-growl">
					<GrowlContainer/>
				</div>
			</div>
		);
	}
}

let routes = (
	<Route handler={App} path="/tower/">
		<DefaultRoute name="table" handler={Table} />
		<Route name="about" handler={AboutView} />
		<Route name="settings" handler={SettingsView} />
		<Redirect from="/" to="/tower/" />
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.body);
});
