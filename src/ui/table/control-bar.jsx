/* @flow */

import React, {PropTypes} from 'react';
import {PureComponent} from 'react-pure-render';

import './control-bar.css';

export class ControlBar extends PureComponent {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		back: PropTypes.func.isRequired,
		forward: PropTypes.func.isRequired,
		jumpBack: PropTypes.func.isRequired,
		pause: PropTypes.func.isRequired,
		resume: PropTypes.func.isRequired,
		canBack: PropTypes.bool.isRequired,
		canForward: PropTypes.bool.isRequired,
		canJumpBack: PropTypes.bool.isRequired,
		canPause: PropTypes.bool.isRequired,
		canResume: PropTypes.bool.isRequired
	};

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
			this.barButton(this.props.jumpBack, "btn-jump-back", this.props.canJumpBack),
			this.barButton(this.props.back, "btn-back", this.props.canBack),
			this.barButton(this.props.resume, "btn-resume", this.props.canResume),
			this.barButton(this.props.pause, "btn-pause", this.props.canPause),
			this.barButton(this.props.forward, "btn-forward", this.props.canForward)
		];

		let buttonItems = buttons.map((button, idx) => <li className="control-bar-item" key={idx}>{button}</li>);

		return (
			<ul className="control-bar-container">
				{buttonItems}
			</ul>
		);
	}
}
