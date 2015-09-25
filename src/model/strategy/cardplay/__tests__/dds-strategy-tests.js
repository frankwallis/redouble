import {GameBuilder} from '../../../game/game-builder';
import {validateCard} from '../../../game/validators';
import {Bid} from '../../../core/bid';
import {Card, Pip, Suit} from '../../../core/card';
import {Deck} from '../../../core/deck';
import {Seat} from '../../../core/seat';
import * as strategy from "../dds-strategy";

let prev = undefined;

function playAll(gameBuilder) {
	return strategy.getCard(gameBuilder.currentBoard)
		.then((card) => {
			let err = validateCard(card, gameBuilder.toQuery().currentBoard);
			if (err) throw err;
			gameBuilder = gameBuilder.playCard(card);

			if (gameBuilder.toQuery().currentBoard.playHasEnded)
				return gameBuilder.toQuery().currentBoard;
			else
				return playAll(gameBuilder);
		});
}

describe('strategy', () => {
	it('observes current trick', () => {
		let gameBuilder = GameBuilder.create().newBoard(
			Seat.North,
			Deck.fromPBN("N: KQ63.A72.764.T92 J52.JT9.J2.AQ743 84.865.QT85.KJ86 AT97.KQ43.AK93.5"),
			Bid.createAll("no bid", "no bid", "1H", "2S", "no bid", "no bid", "no bid")
		).playCard(Card.create("KS"));

		return strategy.getCard(gameBuilder.currentBoard)
			.then(card => {
				expect(card.suit).to.equal(Suit.Spades);
				expect(card.pip).to.equal(Pip.Two);
			});
	});

	it('unblocks in 3 card ending', () => {
		let gameBuilder = GameBuilder.create().newBoard(
			Seat.West,
			Deck.fromPBN("N: 2...A2 7.7..7 A.A..3 456..."),
			Bid.createAll("no bid", "no bid", "no bid", "1NT", "no bid", "no bid", "no bid")
		);

		return playAll(gameBuilder)
			.then((endgame) => {
				//console.log(JSON.stringify(endgame));
				expect(endgame.declarerTricks).to.equal(3);
			});
	});

	it('Bond beats Drax', () => {
		let gameBuilder = GameBuilder.create().newBoard(
			Seat.South,
			Deck.fromPBN("W: 65432.T9872.JT9. T987.6543..76532 AKQJ.AKQJ.AK.KJ9 ..Q8765432.AQT84"),
			Bid.createAll("7C", "no bid", "no bid", "double", "redouble", "no bid", "no bid", "no bid")
		);

		return playAll(gameBuilder)
			.then((endgame) => {
				expect(endgame.declarerTricks).to.equal(13);
			});
	});

});
