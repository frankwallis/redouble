/* @flow */

import React, {PropTypes} from 'react';
import {PureComponent} from 'react-pure-render';

import {connect} from 'react-redux';
import {dismissNotification} from "../../stores/notification-actions";

if (process.env.__BROWSER__) {
	require('./growl.css');
}

/**
 * Component for displaying notifications from the
 * NotificationStore as growls
 */
@connect(state => {
	return {
		notifications: state.notificationStore
	};
})
export class GrowlContainer extends PureComponent {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		notifications: PropTypes.array.isRequired
	};

	handleResponse(id, response) {
		let action = dismissNotification(id, response);
		this.props.dispatch(action);
	}

	render() {
		console.log('rendering growls');

		let growls = this.props.notifications.map((notification) => {
			let buttons = notification.buttons.map((button) => {
				return <a onClick={() => this.handleResponse(notification.id, button)}>{button}</a>;
			});

			return (
				<li className={"growl-item growl-" + notification.type}
						onClick={() => this.handleResponse(notification.id, notification.defaultButton)}
						key={notification.id}>
					<h3 className="growl-title">{notification.title}</h3>
					<p className="growl-message">{notification.message}</p>
					<div className="growl-buttons">{buttons}</div>
				</li>
			);
		});

		return (
			<ol className="growl-list">
				{growls}
			</ol>
		);
	}
}
