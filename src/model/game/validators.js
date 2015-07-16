
import {Seat} from "../core/seat";
import {Bid, BidType, BidSuit} from "../core/bid";
import {Card, Pip, Suit} from "../core/card";
import {Board} from "./board-state";

/**
 * Tests if the bid is a valid one in board state and returns an error if not
 */
export function validateBid(bid: tower.IBid, board: Board) {
	if (board.biddingHasEnded)
		return new Error("The bidding has already ended");

	switch(bid.type) {
		case BidType.NoBid:
			return;

		case BidType.Double:
			if (!board.lastAction || (board.lastAction.type != BidType.Call))
				return new Error("Invalid double");
			else if (Seat.isPartner(board.lastCaller, board.nextPlayer))
				return new Error("You cannot double your partner!");
			else
				return;

		case BidType.Redouble:
			if (!board.lastAction || (board.lastAction.type != BidType.Double))
				return new Error("Invalid redouble");
			else if (Seat.isPartner(board.lastActor, board.nextPlayer))
				return new Error("You cannot redouble your partner's double");
			else
				return;

		case BidType.Call: {
			if ((!bid.level) || (!bid.suit))
				return new Error("You must say the level and the suit");
			else if ((bid.level < 1) || (bid.level > 7))
				return new Error("Invalid bid level");
			else if (board.lastCall) {
				if (Bid.compare(bid, board.lastCall) <= 0)
					return new Error("Bid must be higher than " + Bid.stringify(board.lastCall));
			}
			return;
		}
	}
}

/**
 * Tests if the card is a valid one given the current board state and returns an error if not
 */
export function validateCard(playedCard: tower.ICard, board: Board) {
	if (!board.biddingHasEnded)
		return new Error("The bidding has not ended yet");

	if (!board.hands[board.nextPlayer].some((card) => Card.equals(playedCard, card)))
		return new Error("That is not your card to play");
		
	if (board.hasBeenPlayed(playedCard))
	  return new Error("That card has already been played");

	let trick = board.currentTrick;
	
	if ((trick.length > 0) && (trick.length < 4)) {
		let lead = trick[0].card;
	 
		if (playedCard.suit != lead.suit) {
			var available = board.hands[board.nextPlayer].filter((card) => {
				return !board.hasBeenPlayed(card) && (card.suit == lead.suit);
			});
			
			if (available.length > 0)
				return new Error("You must follow suit when you can");
		}
	} 
}