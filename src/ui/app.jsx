/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';

import {createRedux} from 'redux';
import {Provider} from 'redux/react';
import stores from '../stores/index';

import {Router, Route, Link} from 'react-router';
import {history} from 'react-router/lib/BrowserHistory';

import {Table} from './table/table.jsx';
import {AboutView} from './about/about.jsx';
import {SettingsView} from './settings/settings.jsx';
import {GrowlContainer} from './growl/growl.jsx';

/* these should probably be somewhere else */
import 'normalize.css';
import 'purecss';
import 'font-awesome/css/font-awesome.css';

import './app.css';
import './navbar/navbar.css';

export class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('rendering app');

		return (
			<div className="app-container">
				<nav role="navigation" className="app-navbar nav-main">
					<ul className="nav-site">
						<li key="table">
							<Link to="/">Table</Link>
						</li>
						<li key="settings">
							<Link to="/settings">Settings</Link>
						</li>
						<li key="about">
							<Link to="/about">About</Link>
						</li>
					</ul>
				</nav>
				<div className="app-content">
					{this.props.children}
				</div>
				<div className="app-growl">
					<GrowlContainer/>
				</div>
			</div>
		);
	}
}

let router = (
	<Router history={history}>
		<Route component={App}>
			<Route path="/" name="table" component={Table} />
			<Route path="/settings" name="settings" component={SettingsView} />
			<Route path="/about" name="about" component={AboutView} />
		</Route>
	</Router>
);

const redux = createRedux(stores);

ReactDOM.render(
	<Provider redux={redux}>
		{() => router}
	</Provider>,
	document.getElementById('main'));
