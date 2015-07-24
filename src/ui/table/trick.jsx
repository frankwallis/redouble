/* @flow */

import React, {PropTypes} from 'react';
import {PureComponent} from 'react-pure-render';

import {CardComponent} from '../components/card.jsx';
import {Seat} from '../../model/core/seat';
import './trick.css';

export class TrickComponent extends PureComponent {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		board: PropTypes.object.isRequired
	};

	getCard(seat: Seat) {
		let card;

		this.props.board.currentTrick.forEach((played) => {
			if (played.seat === seat)
				card = played.card;
		});

		return card;
	}

	render() {
		let cards = Seat.all().map((seat) => {
			return (
				<li key={seat} className={"trick-card-" + Seat.name(seat)}>
					<CardComponent card={this.getCard(seat)}/>
				</li>
			);
		});

		return (
			<ol className="trick-container">
				{cards}
			</ol>
		);
	}
}
