import {Deck} from '../../../core/deck';
import {Seat} from '../../../core/seat';
import {BoardBuilder} from '../../../game/board-builder';
import {Bid} from '../../../core/bid';
import * as queries from "../bidding-queries";

describe('Bidding Queries', () => {
	describe('isOpener', () => {
		let boardBuilder;

		beforeEach(() => {
			boardBuilder = BoardBuilder.create(
				Seat.North,
				Deck.fromPBN("N: KQ63.A72.764.T92 J52.JT9.J2.AQ743 84.865.QT85.KJ86 AT97.KQ43.AK93.5")
			);
		});

		it('is true if that side has not opened the bidding yet', () => {
			expect(queries.isOpener(boardBuilder.toQuery())).to.be.true;
			boardBuilder.makeBid("no bid");
			expect(queries.isOpener(boardBuilder.toQuery())).to.be.true;
			boardBuilder.makeBid("1H");
			expect(queries.isOpener(boardBuilder.toQuery())).to.be.true;
			boardBuilder.makeBid("1S");
			expect(queries.isOpener(boardBuilder.toQuery())).to.be.false;
			boardBuilder.makeBid("1NT");
			expect(queries.isOpener(boardBuilder.toQuery())).to.be.false;
			boardBuilder.makeBid("2C");
			expect(queries.isOpener(boardBuilder.toQuery())).to.be.false;
		});
	});

	describe('isResponder', () => {
		let boardBuilder;

		beforeEach(() => {
			boardBuilder = BoardBuilder.create(
				Seat.North,
				Deck.fromPBN("N: KQ63.A72.764.T92 J52.JT9.J2.AQ743 84.865.QT85.KJ86 AT97.KQ43.AK93.5")
			);
		});

		it('is true if partner has opened the bidding', () => {
			expect(queries.isResponder(boardBuilder.toQuery())).to.be.false;
			boardBuilder.makeBid("no bid");
			expect(queries.isResponder(boardBuilder.toQuery())).to.be.false;
			boardBuilder.makeBid("1H");
			expect(queries.isResponder(boardBuilder.toQuery())).to.be.false;
			boardBuilder.makeBid("no bid");
			expect(queries.isResponder(boardBuilder.toQuery())).to.be.true;
			boardBuilder.makeBid("1NT");
			expect(queries.isResponder(boardBuilder.toQuery())).to.be.false;
			boardBuilder.makeBid("2C");
			expect(queries.isResponder(boardBuilder.toQuery())).to.be.false;
			boardBuilder.makeBid("2D");
			expect(queries.isResponder(boardBuilder.toQuery())).to.be.true;
		});
	});

	describe('isSlamBid', () => {
		it('is true only for small slams and grand slams', () => {
			let bid = Bid.create("5S");
			expect(queries.isSlamBid(bid)).to.be.false;
			bid = Bid.create("6NT");
			expect(queries.isSlamBid(bid)).to.be.true;
			bid = Bid.create("7C");
			expect(queries.isSlamBid(bid)).to.be.true;
		});
	});

	describe('isSimpleBid', () => {
		let boardBuilder;

		beforeEach(() => {
			boardBuilder = BoardBuilder.create(
				Seat.North,
				Deck.fromPBN("N: KQ63.A72.764.T92 J52.JT9.J2.AQ743 84.865.QT85.KJ86 AT97.KQ43.AK93.5")
			);
		});

		it('is true for openers at the one-level', () => {
			let board = boardBuilder
				.toQuery();

			let bid = Bid.create("1S");
			expect(queries.isSimpleBid(bid, board)).to.be.true;
			bid = Bid.create("2C");
			expect(queries.isSimpleBid(bid, board)).to.be.false;
			bid = Bid.create("no bid");
			expect(queries.isSimpleBid(bid, board)).to.be.false;
		});

		it('is true for non-jump overcalls', () => {
			let board = boardBuilder
				.makeBid("1H")
				.makeBid("no bid")
				.toQuery();

			let bid = Bid.create("1S");
			expect(queries.isSimpleBid(bid, board)).to.be.true;
			bid = Bid.create("2C");
			expect(queries.isSimpleBid(bid, board)).to.be.true;
			bid = Bid.create("no bid");
			expect(queries.isSimpleBid(bid, board)).to.be.false;
			bid = Bid.create("2H");
			expect(queries.isSimpleBid(bid, board)).to.be.true;
			bid = Bid.create("2NT");
			expect(queries.isSimpleBid(bid, board)).to.be.false;
		});

		it('is true for non-jump responses', () => {
			let board = boardBuilder
				.makeBid("1H")
				.makeBid("no bid")
				.toQuery();

			let bid = Bid.create("1S");
			expect(queries.isSimpleBid(bid, board)).to.be.true;
			bid = Bid.create("2C");
			expect(queries.isSimpleBid(bid, board)).to.be.true;
			bid = Bid.create("no bid");
			expect(queries.isSimpleBid(bid, board)).to.be.false;
			bid = Bid.create("2H");
			expect(queries.isSimpleBid(bid, board)).to.be.true;
			bid = Bid.create("2NT");
			expect(queries.isSimpleBid(bid, board)).to.be.false;
		});
	});
});
