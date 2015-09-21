import {Deck} from '../../../core/deck';
import {Seat} from '../../../core/seat';
import {BoardBuilder} from '../../../game/board-builder';
import {Bid, BidSuit, BidType} from '../../../core/bid';
import * as parContractRule from "../par-contract-rule";

describe('Par Contract Rule', () => {
	it('filter higher bids', () => {
		let boardBuilder = BoardBuilder.create(
			Seat.North,
			Deck.fromPBN("N: AKQ63.A97.72.T92 J52.KJT2.J.AQ743 84.865.QT85.KJ86 T97.Q43.AK9643.5")
		);
		let board = boardBuilder.toQuery();
		let vulnerability = 0;
		let context = {};

		return parContractRule.filter(Bid.create("1S"), board, vulnerability, context)
			.then(result => {
				expect(result).to.be.true;
				return parContractRule.filter(Bid.create("2C"), board, vulnerability, context);
			})
			.then(result => {
				expect(result).to.be.false;
			});
	});
});
