/* @flow */

import React from 'react';
//import persistStore from 'redux-persist-store';
import {Link} from 'react-router';
import IndexLink from 'react-router/lib/IndexLink';
import GrowlContainer from '../growl/growl.jsx';

if (process.env.__BROWSER__) {
	require('./main.css');
	require('./navbar.css');
}

class Main extends React.Component {
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
							<IndexLink activeClassName="active" to="/">Table</IndexLink>
						</li>
						<li key="settings">
							<Link activeClassName="active" to="/ui/settings">Settings</Link>
						</li>
						<li key="about">
							<Link activeClassName="active" to="/ui/about">About</Link>
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

export default Main;
