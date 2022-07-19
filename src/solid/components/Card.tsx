import { Component, Match, Switch } from 'solid-js'
import { Card } from '../../model/core/card';
import "./Card.css"
import "./Suit.css"

export interface CardProps {
	card: Card;
}

export const CardComponent: Component<CardProps> = ({
	card
}) => {
	if (!card)
		return <div class="card-container empty-container"/>;

	return (
		<div class="card-container">
			<div class="card-edge-left">
				<div class="card-pip-small">{Card.pipName(card.pip)}</div>
				<div class={"card-suit suit-" + Card.suitName(card.suit)}></div>
			</div>

			<div class="card-pip">{Card.pipName(card.pip)}</div>

			<div class="card-edge-right">
				<div class="card-pip-small">{Card.pipName(card.pip)}</div>
				<div class={"card-suit suit-" + Card.suitName(card.suit)}></div>
			</div>
		</div>
	);
}
