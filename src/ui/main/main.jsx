/* @flow */

import React from 'react';
//import persistStore from 'redux-persist-store';
import {Link} from 'react-router';
import {GrowlContainer} from '../growl/growl.jsx';

if (process.env.__BROWSER__) {
	require('./main.css');
	require('./navbar.css');
}

export class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {rehydrated: !false};
	}

	componentWillMount() {
		// persistStore(store, {blacklist: ["gameStore"]}, () => {
		// 	this.setState({rehydrated: true});
		// });
	}

	render() {
		console.log('rendering main');

		let content = this.state.rehydrated ? this.props.children : <div className="main-spinner"/>;

		return (
			<div className="main-container">
				<nav role="navigation" className="main-navbar nav-main">
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
				<div className="main-content">
					{content}
				</div>
				<div className="main-growl">
					<GrowlContainer/>
				</div>
			</div>
		);
	}
}

