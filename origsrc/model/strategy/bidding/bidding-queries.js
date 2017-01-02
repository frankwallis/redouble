import {Bid, BidSuit, BidType} from "../../core/bid";
import {Suit, Pip} from "../../core/card";
import {Seat} from "../../core/seat";

export function isOpener(board) {
	return !board.bids.some((bid, idx) => {
		let bidder = Seat.rotate(board.dealer, idx);
		return (bid.type === BidType.Call) && ((bidder === board.nextPlayer) || Seat.isPartner(bidder, board.nextPlayer));
	});
}

export function isResponder(board) {
	let result = false;
	let pos = board.bids.length -2;

	if (pos >= 0)
		result = (board.bids[pos].type === BidType.Call);

	pos -= 2;
	while(pos >= 0) {
		result = result && (board.bids[pos].type !== BidType.Call);
		pos -= 2;
	}

	return result;
}

export function isSlamBid(bid) {
	return (bid.level >= 6);
}

export function isGameBid(bid) {
	switch (bid.suit) {
		case BidSuit.Diamonds: return (bid.level >= 5);
		case BidSuit.Clubs: return (bid.level >= 5);
		case BidSuit.Spades: return (bid.level >= 4);
		case BidSuit.Hearts: return (bid.level >= 4);
		case BidSuit.NoTrumps: return (bid.level >= 3);
		default: throw new Error("unhandled bid suit " + bid.suit);
	}
}

export function isPreemptiveBid(bid, board) {
	if (bid.type !== BidType.Call) return false;
	let lastCall = board.lastCall;

	if (!lastCall) {
		return (bid.level >= 3);
	}
	else {
		let minBid = { type: BidType.Call, level: lastCall.level +2, suit: lastCall.suit };
		return (Bid.compare(bid, minBid) > 0);
	}
}

export function isStrongBid(bid) {
	return (bid.level === 2);
}

export function isNoTrumpBid(bid) {
	return (bid.type === BidType.Call) && (bid.suit === BidSuit.NoTrumps);
}

export function isJumpBid(bid, board) {
	if (bid.type !== BidType.Call) return false;
	let lastCall = board.lastCall;

	if (!lastCall) {
		return (bid.level >= 2);
	}
	else {
		let minBid = { type: BidType.Call, level: lastCall.level +1, suit: lastCall.suit };
		return (Bid.compare(bid, minBid) > 0);
	}
}

export function isSimpleBid(bid, board) {
	if (bid.type !== BidType.Call) return false;

	let lastCall = board.lastCall;

	if (!lastCall) {
		return (bid.level <= 1);
	}
	else {
		let maxBid = { type: BidType.Call, level: lastCall.level +1, suit: lastCall.suit };
		return (Bid.compare(bid, maxBid) <= 0);
	}
}

export function isOvercall(bid, board) {
	return isOpener(board) && board.lastCall && !isJumpBid(bid, board);
}

export function suitMap(cards) {
	let result = Suit.all().reduce((hand, suit) => {
		hand[suit] = [];
		return hand;
	}, {});

	return cards.reduce((hand, card) => {
		hand[card.suit].push(card);
		return hand;
	}, result);
}

export function getPointCount(hand) {
	return Suit.all().reduce((points, suit) => {
		let suitPoints = hand[suit].reduce((total, card) => {
			if (card.pip < Pip.Jack)
				return total;
			else
				return total + card.pip - 10;
		}, 0);

		return points + suitPoints;
	}, 0);
}

export function isFlat(hand) {
	let points = Suit.all().reduce((result, suit) => {
		if (hand[suit].length > 2)
			return result;
		else
			return result + 3 - hand[suit].length;
	}, 0);

	return (points < 3);
}
