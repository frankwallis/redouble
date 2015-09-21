import {Deck} from '../../../core/deck';
import {Seat} from '../../../core/seat';
import {BoardBuilder} from '../../../game/board-builder';
import {Bid, BidSuit, BidType} from '../../../core/bid';
import * as openerRule from "../opener-rule";

describe('Opener Rule', () => {
	describe('filter', () => {
		it('should bid 1S', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.North,
				Deck.fromPBN("N: AKQ63.A97.72.T92 J52.KJT2.J.AQ743 84.865.QT85.KJ86 T97.Q43.AK9643.5")
			);
			let allBids = boardBuilder.toQuery().getLegalBids().filter(bid => bid.type == BidType.Call);
			let board = boardBuilder.toQuery();
			let context = {};
			let bids = allBids.filter(bid => openerRule.filter(bid, board, 0, context));

			expect(bids).to.have.length.of(1);
			expect(bids[0].level).to.equal(1);
			expect(bids[0].suit).to.equal(BidSuit.Spades);
		});

		it('should no-bid', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.North,
				Deck.fromPBN("N: KQ63.A72.764.T92 J52.JT9.J2.AQ743 84.865.QT85.KJ86 AT97.KQ43.AK93.5")
			);
			let allBids = boardBuilder.toQuery().getLegalBids().filter(bid => bid.type == BidType.Call);
			let board = boardBuilder.toQuery();
			let context = {};
			let bids = allBids.filter(bid => openerRule.filter(bid, board, 0, context));
			expect(bids).to.have.length.of(0);
		});

		it('should preempt', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.North,
				Deck.fromPBN("N: AKQT963..764.T92 J52.JT9.J2.AQ743 84.865.QT85.KJ86 7.AKQ7432.AK93.5")
			);
			let allBids = boardBuilder.toQuery().getLegalBids().filter(bid => bid.type == BidType.Call);
			let board = boardBuilder.toQuery();
			let context = {};
			let bids = allBids.filter(bid => openerRule.filter(bid, board, 0, context));

			expect(bids).to.have.length.of(1);
			expect(bids[0].level).to.equal(3);
			expect(bids[0].suit).to.equal(BidSuit.Spades);
		});

		it('should bid two no-trumps', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.North,
				Deck.fromPBN("N: KQ63.A72.AK7.AT9 J52.JT9.J2.Q7432 84.865.QT85.KJ86 AT97.KQ43.9643.5")
			);
			let allBids = boardBuilder.toQuery().getLegalBids().filter(bid => bid.type == BidType.Call);
			let board = boardBuilder.toQuery();
			let context = {};
			let bids = allBids.filter(bid => openerRule.filter(bid, board, 0, context));

			expect(bids).to.have.length.of(1);
			expect(bids[0].level).to.equal(2);
			expect(bids[0].suit).to.equal(BidSuit.NoTrumps);
		});

		it('should bid strong no-trump', () => {
			let boardBuilder = BoardBuilder.create(
				Seat.North,
				Deck.fromPBN("N: KQ6.A72.K64.AT92 J532.JT9.J2.Q743 84.865.QT85.KJ86 AT97.KQ43.A973.5")
			);
			let allBids = boardBuilder.toQuery().getLegalBids().filter(bid => bid.type == BidType.Call);
			let board = boardBuilder.toQuery();
			let context = {};
			let bids = allBids.filter(bid => openerRule.filter(bid, board, 0, context));

			expect(bids).to.have.length.of(2);
			expect(bids[0].level).to.equal(1);
			expect(bids[0].suit).to.equal(BidSuit.Clubs);
			expect(bids[1].level).to.equal(1);
			expect(bids[1].suit).to.equal(BidSuit.NoTrumps);
		});
	});
});
