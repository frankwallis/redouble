import { createMutable, createStore, produce } from "solid-js/store";
import { Bid } from "../../model/core/bid";
import { Card } from "../../model/core/card";
import { Deck, Hand } from "../../model/core/deck";
import { Seat } from "../../model/core/seat";
import { addGrowl } from "../growl/growlStore";

export interface BoardState {
	hands: Record<Seat, Hand>
	dealer: Seat;
	bids: Array<Bid>;
	cards: Array<Card>;
}

const gameStore = createMutable<BoardState>(createBoard());

function createBoard() {
	const deck = new Deck();
	deck.shuffle();

	return {
		hands: deck.deal(Seat.North),
		dealer: Seat.North,
		bids: [],
		cards: []
	}
}

export function makeBid(bid: Bid) {
	const lastBid = gameStore.bids[gameStore.bids.length -1]
	if (lastBid && Bid.compare(bid, lastBid) <= 0) {
		addGrowl({ type: 'error', message: 'Your bid must be higher than the previous bid', title: 'Invalid bid', timeout: 0 })
	} else {
		gameStore.bids.push(bid)
	}
}

export { gameStore }
