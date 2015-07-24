/* @flow */

import React, {PropTypes} from 'react';
import {PureComponent} from 'react-pure-render';

import {CardComponent} from '../components/card.jsx';
import {Card} from '../../model/core/card';
import './hand.css';

export class HandComponent extends PureComponent {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		playCard: PropTypes.func.isRequired,
		board: PropTypes.object.isRequired,
		seat: PropTypes.number.isRequired
	};

	getAvailableCards() {
		return this.props.board.hands[this.props.seat]
			.filter((card) => !this.props.board.hasBeenPlayed(card))
			.sort((c1, c2) => Card.compare(c1, c2, this.props.board.trumpSuit));
	}

	render() {
		let cards = this.getAvailableCards().map((card) => {
			return (
				<li className="hand-card" key={CardComponent.key(card)}>
					<button className="hand-card-button"
								onClick={() => this.props.playCard(card)}>
						<CardComponent card={card}/>
					</button>
				</li>
			);
		});

		return (<div className="hand-container"><ol className="container">{cards}</ol></div>);
	}
}
