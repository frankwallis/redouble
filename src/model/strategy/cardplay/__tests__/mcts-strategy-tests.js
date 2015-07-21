import {CardplayStrategy} from '../mcts-strategy';
import {Game} from '../../../game/game-state';
import {Board} from '../../../game/board-state';
import {Bid, BidType, BidSuit} from '../../../core/bid';
import {Card, Pip, Suit} from '../../../core/card';
import {Deck} from '../../../core/deck';
import {Seat} from '../../../core/seat';

import bluebird from "bluebird";
global.Promise = bluebird;

describe('Cardplay Strategy', () => {
	describe('getCard', () => {
		it('plays a suitable card', () => {
			let game = new Game().dealBoard(Seat.West)
				.makeBid(Bid.create("1H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"));

			let strategy = new CardplayStrategy();
			strategy.updateGameState(game.gameState);
			strategy.visit(20);
			let card = strategy.getCard();
			expect(card).toBeDefined();
		});

		it('tries each card at least once', () => {
			let game = new Game().dealBoard(Seat.West)
				.makeBid(Bid.create("1H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"));

			let strategy = new CardplayStrategy();
			strategy.updateGameState(game.gameState);
			strategy.visit(20);
			let card = strategy.getCard();

			var node = strategy.getRootNode(new Board(game.currentBoard));
			expect(node.children.length).toEqual(13);

			for(let i = 0; i < node.children.length; i ++)
				expect(node.children[i].visits).toBeGreaterThan(0);
		});
	});

	describe('getCard:scenarios', () => {

		function playAll(game, strategy) {
			strategy.updateGameState(game.gameState);
			strategy.visit(20);

			return strategy.getCard()
				.then((card) => {
					let nextgame = game.playCard(card);

					if (nextgame.currentBoard.playHasEnded)
						return nextgame;
					else
						return playAll(nextgame, strategy);
				});
		}

		it('unblocks in 3 card ending', () => {
			let game = new Game().newBoard(
				Seat.West,
				Deck.rig(Seat.West, ["2S", "AC", "2C"], ["7S", "7H", "7C"], [ "AS", "AH", "3C"], ["3S", "4S", "5S"]),
				Bid.createAll("no bid", "no bid", "1NT", "no bid", "no bid", "no bid")
			);

			let strategy = new CardplayStrategy();

			return playAll(game, strategy)
				.then((endgame) => {
					expect(endgame.declarerTricks).toBe(3);
				});
		});

		it('Bond beats Drax', () => {
			let game = new Game().newBoard(
				Seat.West,
				Deck.rig(Seat.West, ["QD", "8D", "7D", "6D", "5D", "4D", "3D", "2D", "AC", "QC", "TC", "8C", "4C"],
										  ["6S", "5S", "4S", "3S", "2S", "TH", "9H", "8H", "7H", "2H", "JD", "TD", "9D"],
										  ["TS", "9S", "8S", "7S", "6H", "5H", "4H", "3H", "7C", "6C", "5C", "3C", "2C"],
										  ["AS", "KS", "QS", "JS", "AH", "KH", "QH", "JH", "AD", "KD", "KC", "JC", "9C"]),
				Bid.createAll("7C", "no bid", "no bid", "double", "redouble", "no bid", "no bid", "no bid")
			);

			let strategy = new CardplayStrategy();

			return playAll(game, strategy)
				.then((endgame) => {
					expect(endgame.declarerTricks).toBe(13);
				});
		});
	});

});
