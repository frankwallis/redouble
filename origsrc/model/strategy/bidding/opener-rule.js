import {Bid, BidSuit, BidType} from "../../core/bid";
import {Suit} from "../../core/card";
import {Seat} from "../../core/seat";

import * as queries from "./bidding-queries";

export function filter(bid, board, vulnerability, context) {
	if (!queries.isOpener(board))
		return true;
	else if (bid.suit === BidSuit.NoTrumps)
		return noTrumpFilter(bid, board, vulnerability, context);
	else
		return suitFilterByLength(bid, board, vulnerability, context) && suitFilterByStrength(bid, board, vulnerability, context);
}

function noTrumpFilter(bid, board, vulnerability, context) {
	context.hand = context.hand || queries.suitMap(board.hands[board.nextPlayer]);
	context.pointCount = context.pointCount || queries.getPointCount(context.hand);

	let pointCount = context.pointCount;
	let hand = context.hand;

	if(!queries.isFlat(hand))
		return false;

	if (queries.isSlamBid(bid)) {
		return false; // TODO
	}
	else if(queries.isGameBid(bid)) {
		return false; // TODO
	}
	else if(queries.isPreemptiveBid(bid, board)) {
		return false;
	}
	else if(queries.isStrongBid(bid, board)) {
		return (pointCount >= 20) && (pointCount <= 22);
	}
	else if(queries.isSimpleBid(bid, board)) {
		return (pointCount >= 15) && (pointCount <= 18);
	}
	else {
		throw new Error("unhandled bid category " + JSON.stringify(bid));
	}
}

function suitFilterByLength(bid, board, vulnerability, context) {
	// TODO
	let hand = queries.suitMap(board.hands[board.nextPlayer]);
	let longest = Suit.all().reduce((long, suit) => {
		if (hand[suit].length > long)
			long = hand[suit].length;
		return long;
	}, -1);

	return (hand[bid.suit].length >= longest);
}

function suitFilterByStrength(bid, board, vulnerability) {
	let hand = queries.suitMap(board.hands[board.nextPlayer]);
	let pointCount = queries.getPointCount(hand);

	if (queries.isSlamBid(bid)) {
		return false; // TODO
	}
	else if(queries.isGameBid(bid)) {
		return false; // TODO
	}
	else if(queries.isPreemptiveBid(bid, board)) {
		let suitLength = hand[bid.suit].length;
		return (suitLength >= 7) && (pointCount > 6);
	}
	else if(queries.isStrongBid(bid, board)) {
		return (pointCount > 18) && (hand[bid.suit].length >= 5);
	}
	else if(queries.isJumpBid(bid, board)) {
		return (hand[bid.suit].length >= 5) && (pointCount > 15);
	}
	else if(queries.isOvercall(bid, board)) {
		return (hand[bid.suit].length >= 5) && (pointCount > 13);
	}
	else if(queries.isSimpleBid(bid, board)) {
		return (hand[bid.suit].length >= 4) && (pointCount > 12) && (pointCount <= 19);
	}
	else {
		throw new Error("unhandled bid category " + JSON.stringify(bid));
	}
}
