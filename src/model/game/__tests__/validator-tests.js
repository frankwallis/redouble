jest.autoMockOff()

import {Game} from '../game-state';
import {Bid, BidType, BidSuit} from '../../core/bid';
import {Card, Pip, Suit} from '../../core/card';
import {Seat} from '../../core/seat';
import {validateBid, validateCard} from '../validators';

describe('Validators', () => {
   describe('validateBid', () => {
      it('checks the range', () => {
         let game = new Game()
         	.newBoard();

         expect(validateBid(Bid.create("0S"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("8H"), game.currentBoard)).toBeDefined();
      });

      it('allows only valid bids over no bids', () => {
         let game = new Game()
         	.newBoard();

         expect(validateBid(Bid.create("1H"), game.currentBoard)).toBeUndefined();
         expect(validateBid(Bid.create("2H"), game.currentBoard)).toBeUndefined();
         expect(validateBid(Bid.create("no bid"), game.currentBoard)).toBeUndefined();
         expect(validateBid(Bid.create("double"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("redouble"), game.currentBoard)).toBeDefined();
      });

      it('allows only valid bids over calls', () => {
         let game = new Game()
         	.newBoard()
         	.makeBid(Bid.create("1H"));

         expect(validateBid(Bid.create("1D"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("1H"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("2H"), game.currentBoard)).toBeUndefined();
         expect(validateBid(Bid.create("double"), game.currentBoard)).toBeUndefined();
         expect(validateBid(Bid.create("redouble"), game.currentBoard)).toBeDefined();
      });

      it('allows only valid bids over doubles', () => {
         let game = new Game()
         	.newBoard()
         	.makeBid(Bid.create("1H"))
         	.makeBid(Bid.create("no bid"))
         	.makeBid(Bid.create("no bid"))
         	.makeBid(Bid.create("double"));

         expect(validateBid(Bid.create("1D"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("1H"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("2H"), game.currentBoard)).toBeUndefined();
         expect(validateBid(Bid.create("double"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("redouble"), game.currentBoard)).toBeUndefined();
      });

      it('allows only valid bids over redoubles', () => {
         let game = new Game()
         	.newBoard()
         	.makeBid(Bid.create("1H"))
         	.makeBid(Bid.create("double"))
         	.makeBid(Bid.create("redouble"));

         expect(validateBid(Bid.create("1D"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("1H"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("2H"), game.currentBoard)).toBeUndefined();
         expect(validateBid(Bid.create("double"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("redouble"), game.currentBoard)).toBeDefined();
      });

      it('disallows bids after the bidding has ended', () => {
         let game = new Game()
         	.newBoard()
         	.makeBid(Bid.create("1H"))
         	.makeBid(Bid.create("no bid"))
         	.makeBid(Bid.create("no bid"))
         	.makeBid(Bid.create("no bid"));

         expect(validateBid(Bid.create("1D"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("1H"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("2H"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("no bid"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("double"), game.currentBoard)).toBeDefined();
         expect(validateBid(Bid.create("redouble"), game.currentBoard)).toBeDefined();
      });
   });

   describe('validateCard', () => {
      let game = undefined;
      
      beforeEach(() => {
         game = new Game()
         	.newBoard(Seat.South)
         	.makeBid(Bid.create("1H"))
         	.makeBid(Bid.create("no bid"))
         	.makeBid(Bid.create("no bid"))
         	.makeBid(Bid.create("no bid"));
      });
      
      it('checks the card is from the right hand', () => {
         expect(validateCard(game.currentBoard.hands[Seat.West][0], game.currentBoard)).toBeUndefined();
         expect(validateCard(game.currentBoard.hands[Seat.East][0], game.currentBoard)).toBeDefined();
                  
         game = game.playCard(game.currentBoard.hands[Seat.West][0]);
         
         /* play from wrong hand but correct suit */
         let nextCard = game.currentBoard.hands[Seat.East].filter((card) => card.suit == game.currentBoard.hands[Seat.West][0].suit)[0];
         
         if (!nextCard)
            nextCard = game.currentBoard.hands[Seat.South].filter((card) => card.suit == game.currentBoard.hands[Seat.West][0].suit)[0];
            
         expect(validateCard(nextCard, game.currentBoard)).toBeDefined();
         
         /* play from right hand and correct suit */
         nextCard = game.currentBoard.hands[Seat.North].filter((card) => card.suit == game.currentBoard.hands[Seat.West][0].suit)[0];         

         if (nextCard) {
            expect(validateCard(nextCard, game.currentBoard)).toBeUndefined();
         }
      });

      function followSuit(aboard, orAny) {
         let hand = aboard.hands[aboard.nextPlayer];
         let available = hand.filter((card) => !aboard.hasBeenPlayed(card));

         let trick = aboard.currentTrick;

         if ((trick.length > 0) && (trick.length < 4)) {
            let lead = trick[0].card;
            let followers = available.filter((card) => (card.suit == lead.suit));
         
            if (followers.length > 0)
               return followers[0];
         }
         
         if (orAny)
            return available[0];
         else
            return undefined;
      }
      
      it('checks the card has not already been played', () => {
         /* play a trick */
         let trick = {};

         trick[Seat.West] = followSuit(game.currentBoard, true);
         game = game.playCard(trick[Seat.West]);
         
         trick[Seat.North] = followSuit(game.currentBoard, true);
         game = game.playCard(trick[Seat.North]);

         trick[Seat.East] = followSuit(game.currentBoard, true);
         game = game.playCard(trick[Seat.East]);

         trick[Seat.South] = followSuit(game.currentBoard, true);
         game = game.playCard(trick[Seat.South]);
         
         /* have the winner play the same card */
         expect(validateCard(trick[game.currentBoard.nextPlayer], game.currentBoard)).toBeDefined();
         
         /* have the winner play a different card */
         expect(validateCard(followSuit(game.currentBoard, true), game.currentBoard)).toBeUndefined();
         expect(validateCard(trick[game.currentBoard.nextPlayer], game.currentBoard)).toBeDefined();
      });
      
      it('checks the card is following the suit lead', () => {
         /* lead a card */
         let lead = game.currentBoard.hands[Seat.West][0];
         
         /* try and play wrong suit */
         let nextCard = game.currentBoard.hands[Seat.North].filter((card) => card.suit != lead.suit)[0];
         expect(validateCard(nextCard, game.currentBoard)).toBeDefined();
      });
      
      it('allows another suit when player is void', () => {
         /* just play a board */
         while(!game.currentBoard.playHasEnded) {
            let nextCard = followSuit(game.currentBoard);
            
            if (!nextCard)
               nextCard = game.currentBoard.hands[game.currentBoard.nextPlayer].filter((card) => !game.currentBoard.hasBeenPlayed(card))[0];

            expect(validateCard(nextCard, game.currentBoard)).toBeUndefined();
            game = game.playCard(nextCard);
         }
      });
   });
});
