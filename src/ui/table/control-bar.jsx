/* @flow */

import React from 'react';
import {GameActions} from '../../stores/game-store';

export class ControlBar extends React.Component {

	constructor(props) {
		super(props);
	}

	barButton(action, className, enabled) {
		className = "control-bar-button " + className;

		if (!enabled)
			className = className + " disabled";

		return (
			<button className={className}
					  disabled={!enabled}
					  onClick={action}>
			</button>
		);
	}

	render() {
		console.log('rendering control-bar');
		let buttons = [
			this.barButton(GameActions.jumpBack, "btn-jump-back", this.props.actions.canJumpBack),
			this.barButton(GameActions.back, "btn-back", this.props.actions.canBack),
			this.barButton(GameActions.resume, "btn-resume", this.props.actions.canResume),
			this.barButton(GameActions.pause, "btn-pause", this.props.actions.canPause),
			this.barButton(GameActions.forward, "btn-forward", this.props.actions.canForward)
		];

		let buttonItems = buttons.map((button, idx) => <li className="control-bar-item" key={idx}>{button}</li>);

		return (
			<ul className="control-bar-container">
				{buttonItems}
			</ul>
		);
	}
}

ControlBar.propTypes = {
	actions: React.PropTypes.object.isRequired
}
