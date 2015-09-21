import {Deck} from '../../../core/deck';
import {Seat} from '../../../core/seat';
import {GameBuilder} from '../../../game/game-builder';
import {Bid, BidSuit, BidType} from '../../../core/bid';
import * as strategy from "../bidding-strategy";

describe('Bidding Strategy', () => {
	it('should bid 1S', () => {
		let gameBuilder = GameBuilder.create().newBoard(
			Seat.North,
			Deck.fromPBN("N: AKQ63.A97.72.T92 J52.KJT2.J.AQ743 84.865.QT85.KJ86 T97.Q43.AK9643.5")
		);

		return strategy.getBid(gameBuilder.build())
			.then(bid => {
				expect(bid.level).to.equal(1);
				expect(bid.suit).to.equal(BidSuit.Spades);
			});
	});
});
