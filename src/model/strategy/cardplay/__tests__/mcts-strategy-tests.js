jest.autoMockOff()
jest.mock("../../../game/validators", {
   validateBid: () => {},
   validateCard: () => {}
})

import {CardplayStrategy} from '../mcts-strategy';
import {GameStateHelper} from '../../../game/game-state';
import {Bid, BidType, BidSuit} from '../../../core/bid';
import {Card, Pip, Suit} from '../../../core/card';
import {Seat} from '../../../core/seat';

describe('Cardplay Strategy', () => {
   describe('getCard', () => {
      it('plays a suitable card', () => {
         let gameState = new GameStateHelper().newBoard(Seat.West)
            .makeBid(Bid.create("1H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));

         let strategy = new CardplayStrategy();
			let card = strategy.getCard(gameState);
         expect(card).toBeDefined();
      });
      
      it('tries each card at least once', () => {
         let gameState = new GameStateHelper().newBoard(Seat.West)
            .makeBid(Bid.create("1H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));

         let strategy = new CardplayStrategy();
			let card = strategy.getCard(gameState);
         
         var node = strategy.getRootNode(gameState); 
         expect(node.children.length).toEqual(13);
         
         for(let i = 0; i < node.children.length; i ++)         
            expect(node.children[i].visits).toBeGreaterThan(0);
      });
   });

/*   describe('declarer', () => {
      it('returns the dealer when bidding starts', () => {
         let gameState = new GameStateHelper().newBoard(Seat.West);

         gameState = gameState
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("1H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("2H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))

         expect(gameState.declarer).toEqual(Seat.North);
      });

   });

   describe('nextPlayer', () => {
      it('returns the trick winner when playing', () => {
         let gameState = new GameStateHelper().newBoard(Seat.West);
         expect(gameState.nextPlayer).toEqual(Seat.West);

         gameState = gameState.makeBid(Bid.create("1H"));
         gameState = gameState.makeBid(Bid.create("no bid"));
         gameState = gameState.makeBid(Bid.create("no bid"));
         gameState = gameState.makeBid(Bid.create("no bid"));
         expect(gameState.nextPlayer).toEqual(Seat.North);

         gameState = gameState.playCard(Card.create("2H"));
         gameState = gameState.playCard(Card.create("3H"));
         gameState = gameState.playCard(Card.create("4H"));
         gameState = gameState.playCard(Card.create("5H"));

         expect(gameState.nextPlayer).toEqual(Seat.West);
         gameState = gameState.playCard(Card.create("6H"));
         expect(gameState.nextPlayer).toEqual(Seat.North);
      });

   });*/

});
