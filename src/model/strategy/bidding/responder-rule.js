import {Bid, BidSuit, BidType} from "../../core/bid";
import {Suit} from "../../core/card";
import {Seat} from "../../core/seat";

import * as queries from "./bidding-queries";

export function filter(candidates, board, vulnerability) {
	if (queries.isResponder(board)) {
		candidates = filterByLength(candidates, board, vulnerability);
		candidates = filterByPoints(candidates, board, vulnerability);
	}

	return candidates;
}

function filterByLength(candidates, board, vulnerability) {
	let hand = queries.suitMap(board.hands[board.nextPlayer]);
	let longest = Suit.all().reduce((long, suit) => {
		if (hand[suit].length > long)
			long = hand[suit].length;
		return long;
	}, -1);

	return candidates
		.filter(bid => {
			if (bid.suit === BidSuit.NoTrumps)
				return true;
			else if (bid.suit === openingSuit)
				return (hand[bid.suit].length >= 3);
			else
				return (hand[bid.suit].length >= longest);
		});
}

function filterByPoints(candidates, board, vulnerability) {
	let hand = queries.suitMap(board.hands[board.nextPlayer]);
	let pointCount = queries.getPointCount(hand);
	let openingSuit = board.bids[board.bids.length -2];

	return candidates
		.filter(bid => {
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
				if (bid.suit === openingSuit)
					return (hand[bid.suit].length >= 4) && (pointCount > 10);
				else
					return (hand[bid.suit].length >= 5) && (pointCount > 13);
			}
			else if(queries.isSimpleBid(bid, board)) {
				if(queries.isNoTrumpBid(bid))
					return queries.isFlat(hand) && (pointCount >= 15) && (pointCount <= 18);
				else
					return (hand[bid.suit].length >= 4) && (pointCount > 12) && (pointCount <= 19);
			}
			else {
				return true;
				//throw new Error("unhandled bid category " + JSON.stringify(bid));
			}
		});
}
