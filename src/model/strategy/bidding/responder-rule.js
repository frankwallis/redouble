import {Bid, BidSuit, BidType} from "../../core/bid";
import {Suit} from "../../core/card";
import {Seat} from "../../core/seat";

import * as queries from "./bidding-queries";

export function filter(bid, board, vulnerability, context) {
	if (!queries.isResponder(board))
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
	else if(queries.isJumpBid(bid, board)) {
		return (pointCount >= 10) && (pointCount <= 12);
	}
	else if(queries.isSimpleBid(bid, board)) {
		return (pointCount >= 6) && (pointCount <= 9);
	}
	else {
		throw new Error("unhandled bid category " + JSON.stringify(bid));
	}
}

function suitFilterByLength(bid, board, vulnerability, context) {
	context.hand = context.hand || queries.suitMap(board.hands[board.nextPlayer]);
	let hand = context.hand;

	let openingSuit = board.bids[board.bids.length -2].suit;
	let longest = Suit.all().reduce((long, suit) => {
		if (hand[suit].length > long)
			long = hand[suit].length;
		return long;
	}, -1);

	if (bid.suit === openingSuit)
		return (hand[bid.suit].length >= 3);
	else
		return (hand[bid.suit].length >= longest);
}

function suitFilterByStrength(bid, board, vulnerability, context) {
	context.hand = context.hand || queries.suitMap(board.hands[board.nextPlayer]);
	context.pointCount = context.pointCount || queries.getPointCount(context.hand);
	let openingSuit = board.bids[board.bids.length -2].suit;
	let pointCount = context.pointCount;
	let hand = context.hand;

	if (queries.isSlamBid(bid)) {
		return false; // TODO
	}
	else if(queries.isGameBid(bid)) {
		return false; // TODO
	}
	else if(queries.isPreemptiveBid(bid, board)) {
		return false;
	}
	else if(queries.isJumpBid(bid, board)) {
		if (bid.suit === openingSuit) {
			return (hand[bid.suit].length >= 4) && (pointCount > 10);
		}
		else {
			return (hand[bid.suit].length >= 5) && (pointCount > 13);
		}
	}
	else if(queries.isSimpleBid(bid, board)) {
		if (bid.suit === openingSuit)
			return (hand[bid.suit].length >= 3) && (pointCount <= 11);
		else
			return (hand[bid.suit].length >= 4) && (pointCount > 12) && (pointCount <= 19);
	}
	else {
		throw new Error("unhandled bid category " + JSON.stringify(bid));
	}
}
