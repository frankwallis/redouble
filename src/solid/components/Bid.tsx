import { Component, Match, Switch } from 'solid-js'
import { Bid, BidType } from '../../model/core/bid';
import "./Bid.css"
import "./Suit.css"

export interface BidProps {
	bid: Bid;
}

export const BidComponent: Component<BidProps> = ({
	bid
}) => {
	return (
		<Switch>
			<Match when={bid.type === BidType.NoBid}>
				<div class="bid-container">No Bid</div>;
			</Match>
			<Match when={bid.type === BidType.Call && bid}>
				{(bid) => <div class="bid-container">
					<span class="bid-level">{bid.level}</span>
					<span class={"bid-suit suit-" + Bid.suitName(bid.suit)}></span>
				</div>}
			</Match>
			<Match when={bid.type === BidType.Double}>
				<div class="bid-container">Double</div>;
			</Match>
			<Match when={bid.type === BidType.Redouble}>
				<div class="bid-container">Redouble</div>;
			</Match>
		</Switch>
	)
}
