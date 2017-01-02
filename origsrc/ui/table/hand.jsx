/* @flow */

import React, {PropTypes} from 'react';
import {PureComponent} from 'react-pure-render';

import CardComponent from '../components/card.jsx';
import {Card} from '../../model/core/card';

import {DragSource} from 'react-dnd';

if (process.env.__BROWSER__) {
	require('./hand.css');
}

class HandComponent extends PureComponent {

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
		let cards = this.getAvailableCards()
			.map((card) => <DraggableCard key={CardComponent.key(card)} card={card} playCard={this.props.playCard} />);

		return (<div className="hand-container"><ol className="container">{cards}</ol></div>);
	}
}

export const PlayingCard = ({card, playCard, isDragging, connectDragSource}) => {
	let className = "hand-card";

	if (isDragging)
		className = className + " dragging";

	return connectDragSource(
		<li className={className}>
			<button className="hand-card-button"
				onClick={() => playCard(card)}>
				<CardComponent card={card}/>
			</button>
		</li>
	);
}

const cardSource = {
	beginDrag: (props) => props.card
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

export const DraggableCard = DragSource("card", cardSource, collect)(PlayingCard);

export default HandComponent;
