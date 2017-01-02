import {Deck} from '../../../core/deck';
import {Seat} from '../../../core/seat';
import {Bid} from '../../../core/bid';
import {BoardBuilder} from '../../../game/board-builder';
import {BidSuit, BidType} from '../../../core/bid';

import * as responderRule from "../responder-rule";

describe('Responder Rule', () => {
	describe('over 1S', () => {
		it('should no-bid', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.North,
				Deck.fromPBN("N:KQ63.A72.764.T92 J52.JT9.J2.AQ743 84.865.QT85.J865 AT97.KQ43.AK93.K"),
				Bid.createAll("1S", "no bid")
			);
			let board = boardBuilder.toQuery();
			let allBids = board.getLegalBids().filter(bid => bid.type === BidType.Call);
			let context = {};
			let bids = allBids.filter(bid => responderRule.filter(bid, board, 0, context));
			expect(bids).to.have.length.of(0);
		});

		it('should respond 2S', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.North,
				Deck.fromPBN("N:AKQ63.A97.72.T92 2.KJT52.J8.AQ743 J854.86.QT5.KJ86 T97.Q43.AK9643.5"),
				Bid.createAll("1S", "no bid")
			);
			let board = boardBuilder.toQuery();
			let allBids = board.getLegalBids().filter(bid => bid.type === BidType.Call);
			let context = {};
			let bids = allBids.filter(bid => responderRule.filter(bid, board, 0, context));

			expect(bids).to.have.length.of(2);
			expect(bids).to.deep.contain(Bid.create("2S"));
		});

		it('should respond 3S', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.North,
				Deck.fromPBN("N:KQ63.A97.72.AT92 84.865.QT85.KJ86 AJT52.KJT2.J.Q43 97.Q43.AK9643.75"),
				Bid.createAll("1S", "no bid")
			);
			let board = boardBuilder.toQuery();
			let allBids = board.getLegalBids().filter(bid => bid.type === BidType.Call);
			let context = {};
			let bids = allBids.filter(bid => responderRule.filter(bid, board, 0, context));

			expect(bids).to.have.length.of(2);
			expect(bids).to.deep.contain(Bid.create("3S"));
		});

		it('should respond 1NT', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.North,
				Deck.fromPBN("N:AKQ63.A97.72.T92 J52.KJT2.J.AQ743 84.865.QT85.KJ86 T97.Q43.AK9643.5"),
				Bid.createAll("1S", "no bid")
			);
			let board = boardBuilder.toQuery();
			let allBids = board.getLegalBids().filter(bid => bid.type === BidType.Call);
			let context = {};
			let bids = allBids.filter(bid => responderRule.filter(bid, board, 0, context));

			expect(bids).to.have.length.of(1);
			expect(bids[0]).to.deep.equal(Bid.create("1NT"));
		});

		it('should respond 2NT', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.North,
				Deck.fromPBN("N:AKQ63.A97.72.T92 J52.JT62.J.AQ743 84.KQ5.QT85.KJ86 T97.843.AK9643.5"),
				Bid.createAll("1S", "no bid")
			);
			let board = boardBuilder.toQuery();
			let allBids = board.getLegalBids().filter(bid => bid.type === BidType.Call);
			let context = {};
			let bids = allBids.filter(bid => responderRule.filter(bid, board, 0, context));

			expect(bids).to.have.length.of(1);
			expect(bids[0]).to.deep.equal(Bid.create("2NT"));
		});

	});
});
