import {GameBuilder} from '../../model/game/game-builder';
import {validateCard} from '../../model/game/validators';
import {Bid} from '../../model/core/bid';
import {Card} from '../../model/core/card';
import {Deck} from '../../model/core/deck';
import {Seat} from '../../model/core/seat';
import * as api from "../api";

let prev = undefined;

function playAll(gameBuilder) {
	return api.getNextCard(gameBuilder.currentBoard)
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

describe('API', () => {
	it('unblocks in 3 card ending', () => {
		let gameBuilder = GameBuilder.create().newBoard(
			Seat.West,
			Deck.rig(Seat.West, ["2S", "AC", "2C"], ["7S", "7H", "7C"], [ "AS", "AH", "3C"], ["4S", "5S", "6S"]),
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
			Deck.rig(Seat.South,
				["6S", "5S", "4S", "3S", "2S", "TH", "9H", "8H", "7H", "2H", "JD", "TD", "9D"],
				["TS", "9S", "8S", "7S", "6H", "5H", "4H", "3H", "7C", "6C", "5C", "3C", "2C"],
				["AS", "KS", "QS", "JS", "AH", "KH", "QH", "JH", "AD", "KD", "KC", "JC", "9C"],
				["QD", "8D", "7D", "6D", "5D", "4D", "3D", "2D", "AC", "QC", "TC", "8C", "4C"]),
			Bid.createAll("7C", "no bid", "no bid", "double", "redouble", "no bid", "no bid", "no bid")
		);

		return playAll(gameBuilder)
			.then((endgame) => {
				expect(endgame.declarerTricks).to.equal(13);
			});
	});

});
