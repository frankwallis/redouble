/* @flow */

import React from 'react';
import {PureComponent} from 'react-pure-render';
import {Card} from '../../model/core/card';

if (process.env.__BROWSER__) {
	require('./card.css');
}

class CardComponent extends PureComponent {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		card: React.PropTypes.object
	};

	static key(card) {
		return Card.suitName(card.suit) + Card.pipName(card.pip);
	}

	render() {
		if (!this.props.card)
			return <div className="card-container empty-container"/>;

		return (
			<div className="card-container">
				<div className="card-edge-left">
					<div className="card-pip-small">{Card.pipName(this.props.card.pip)}</div>
					<div className={"card-suit suit-" + Card.suitName(this.props.card.suit)}></div>
				</div>

				<div className="card-pip">{Card.pipName(this.props.card.pip)}</div>

				<div className="card-edge-right">
					<div className="card-pip-small">{Card.pipName(this.props.card.pip)}</div>
					<div className={"card-suit suit-" + Card.suitName(this.props.card.suit)}></div>
				</div>
			</div>
		);
	}
}

export default CardComponent;
