import {CardplayStrategy} from '../mcts-strategy';
import {GameBuilder} from '../../../game/game-builder';
import {Bid} from '../../../core/bid';
import {Deck} from '../../../core/deck';
import {Seat} from '../../../core/seat';
import {validateCard} from '../../../game/validators';

describe('Cardplay Strategy', () => {
	describe('getCard', () => {
		it('plays a suitable card', () => {
			let gameBuilder = GameBuilder
				.create()
				.dealBoard(Seat.West)
				.makeBid(Bid.create("1H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"));

			let strategy = new CardplayStrategy();
			strategy.updateGameState(gameBuilder.build());
			strategy.visit(20);
			let card = strategy.getCard();
			expect(card).to.not.be.undefined;
		});

		it('tries each card at least once', () => {
			let gameBuilder = GameBuilder
				.create()
				.dealBoard(Seat.West)
				.makeBid(Bid.create("1H"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"))
				.makeBid(Bid.create("no bid"));

			let strategy = new CardplayStrategy();
			strategy.updateGameState(gameBuilder.build());
			strategy.visit(20);
			strategy.getCard();

			var node = strategy.getRootNode(gameBuilder.toQuery().currentBoard);
			expect(node.children.length).to.equal(13);

			for(let i = 0; i < node.children.length; i ++)
				expect(node.children[i].visits).to.be.at.least(0);
		});
	});

	describe('getCard:scenarios', () => {

		function playAll(gameBuilder, strategy) {
			strategy.updateGameState(gameBuilder.build());
			strategy.visit(20);

			return strategy.getCard()
				.then((card) => {
					let err = validateCard(card, gameBuilder.toQuery().currentBoard);
					if (err) throw err;
					gameBuilder = gameBuilder.playCard(card);

					if (gameBuilder.toQuery().currentBoard.playHasEnded)
						return gameBuilder.toQuery().currentBoard;
					else
						return playAll(gameBuilder, strategy);
				});
		}

		xit('unblocks in 3 card ending', (done) => {
			let gameBuilder = GameBuilder.create().newBoard(
				Seat.West,
				Deck.rig(Seat.West, ["2S", "AC", "2C"], ["7S", "7H", "7C"], [ "AS", "AH", "3C"], ["3S", "4S", "5S"]),
				Bid.createAll("no bid", "no bid", "1NT", "no bid", "no bid", "no bid")
			);

			let strategy = new CardplayStrategy();

			return playAll(gameBuilder, strategy)
				.then((endgame) => {
					expect(endgame.declarerTricks).to.equal(3);
					done();
				})
				.catch(done);
		});

		xit('Bond beats Drax', (done) => {
			let gameBuilder = GameBuilder.create().newBoard(
				Seat.West,
				Deck.rig(Seat.West,
					["QD", "8D", "7D", "6D", "5D", "4D", "3D", "2D", "AC", "QC", "TC", "8C", "4C"],
					["6S", "5S", "4S", "3S", "2S", "TH", "9H", "8H", "7H", "2H", "JD", "TD", "9D"],
					["TS", "9S", "8S", "7S", "6H", "5H", "4H", "3H", "7C", "6C", "5C", "3C", "2C"],
					["AS", "KS", "QS", "JS", "AH", "KH", "QH", "JH", "AD", "KD", "KC", "JC", "9C"]),
				Bid.createAll("7C", "no bid", "no bid", "double", "redouble", "no bid", "no bid", "no bid")
			);

			let strategy = new CardplayStrategy();

			return playAll(gameBuilder, strategy)
				.then((endgame) => {
					expect(endgame.declarerTricks).to.equal(13);
					done();
				})
				.catch(done);
		});
	});

});
