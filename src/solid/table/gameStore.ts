import { createStore } from "solid-js/store";
import { Bid } from "../../model/core/bid";
import { Card } from "../../model/core/card";
import { Deck, Hand } from "../../model/core/deck";
import { Seat } from "../../model/core/seat";

export interface BoardState {
	hands: Record<Seat, Hand>
	dealer: Seat;
	bids: Array<Bid>;
	cards: Array<Card>;
}

export interface GameState {
	boards: Array<BoardState>
}

const [gameState, setGameState] = createStore<GameState>({ boards: [createBoard()] });

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
	setGameState(gameState => {
		const board = gameState.boards[gameState.boards.length -1]
		board.bids = board.bids.concat(bid);
		return gameState

	})
}

export { gameState }
