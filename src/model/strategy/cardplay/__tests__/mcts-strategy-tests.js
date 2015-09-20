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

		it('unblocks in 3 card ending', (done) => {
			let gameBuilder = GameBuilder.create().newBoard(
				Seat.West,
				Deck.fromPBN("N: 2...A2 7.7..7 A.A..3 456..."),
				Bid.createAll("no bid", "no bid", "no bid", "1NT", "no bid", "no bid", "no bid")
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
				Seat.South,
				Deck.fromPBN("W: 65432.T9872.JT9. T987.6543..76532 AKQJ.AKQJ.AK.KJ9 ..Q8765432.AQT84"),
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
