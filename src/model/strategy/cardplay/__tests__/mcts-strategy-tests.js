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
         let game = new Game().dealBoard(Seat.West)
            .makeBid(Bid.create("1H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));

         let strategy = new CardplayStrategy();
			strategy.updateGameState(game.gameState.toJS());
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
			let card = strategy.getCard(game.gameState);
         
         var node = strategy.getRootNode(new Board(game.currentBoard)); 
         expect(node.children.length).toEqual(13);
         
         for(let i = 0; i < node.children.length; i ++)         
            expect(node.children[i].visits).toBeGreaterThan(0);
      });
   });

   describe('getCard:scenarios', () => {

      function playAll(game, strategy) {
         strategy.updateGameState(game.gameState);
         return strategy.getCard()
            .then((card) => {
               let nextgame = game.playCard(card);
               
               if (nextgame.currentBoard.playHasEnded)
                  return nextgame;
               else
                  return playAll(nextgame, strategy);
            });
      }

      xit('unblocks in 3 card ending', () => {
         let game = new Game().newBoard(
            Seat.West,
            Card.createAll(["2S", "AC", "2C"], ["7S", "7H", "7C"], [ "AS", "AH", "3C"], ["3S", "4S", "5S"]),
            Bid.createAll("no bid", "no bid", "1NT", "no bid", "no bid", "no bid")
         );

         let strategy = new CardplayStrategy();            

         return playAll(game, strategy)
            .then((endgame) => {
               //console.log(JSON.stringify(endgame.gameState));
               expect(endgame.declarerTricks).toBe(3);      
            })   
      });

   });

});
