jest.autoMockOff()
jest.mock("../../../game/validators", {
   validateBid: () => {},
   validateCard: () => {}
})

import {CardplayStrategy} from '../mcts-strategy';
import {Game} from '../../../game/game-state';
import {Board} from '../../../game/board-state';
import {Bid, BidType, BidSuit} from '../../../core/bid';
import {Card, Pip, Suit} from '../../../core/card';
import {Seat} from '../../../core/seat';

import bluebird from "bluebird";
global.Promise = bluebird;

describe('Cardplay Strategy', () => {
   describe('getCard', () => {
      it('plays a suitable card', () => {
         let game = new Game().newBoard(Seat.West)
            .makeBid(Bid.create("1H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));

         let strategy = new CardplayStrategy();
			strategy.updateGameState(game.gameState);
			let card = strategy.getCard(game.gameState);
         expect(card).toBeDefined();
      });
      
      it('tries each card at least once', () => {
         let game = new Game().newBoard(Seat.West)
            .makeBid(Bid.create("1H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));

         let strategy = new CardplayStrategy();
			strategy.updateGameState(game.gameState);
			let card = strategy.getCard(game.gameState);
         
         var node = strategy.getRootNode(new Board(game.currentBoard)); 
         expect(node.children.length).toEqual(13);
         
         for(let i = 0; i < node.children.length; i ++)         
            expect(node.children[i].visits).toBeGreaterThan(0);
      });
   });

});
