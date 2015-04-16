jest.autoMockOff()

import {GameStateHelper} from '../game-state';
import {Bid, BidType, BidSuit} from '../../core/bid';
import {Card, Pip, Suit} from '../../core/card';
import {Seat} from '../../core/seat';
import {validateBid, validateCard} from '../validators';

describe('Validators', () => {
   describe('validateBid', () => {
      it('checks the range', () => {
         let game = new GameStateHelper()
         	.newBoard();

         expect(validateBid(Bid.create("0S"), game)).toBeDefined();
         expect(validateBid(Bid.create("8H"), game)).toBeDefined();
      });

      it('allows only valid bids over no bids', () => {
         let game = new GameStateHelper()
         	.newBoard();

         expect(validateBid(Bid.create("1H"), game)).toBeUndefined();
         expect(validateBid(Bid.create("2H"), game)).toBeUndefined();
         expect(validateBid(Bid.create("no bid"), game)).toBeUndefined();
         expect(validateBid(Bid.create("double"), game)).toBeDefined();
         expect(validateBid(Bid.create("redouble"), game)).toBeDefined();
      });

      it('allows only valid bids over calls', () => {
         let game = new GameStateHelper()
         	.newBoard()
         	.makeBid(Bid.create("1H"));

         expect(validateBid(Bid.create("1D"), game)).toBeDefined();
         expect(validateBid(Bid.create("1H"), game)).toBeDefined();
         expect(validateBid(Bid.create("2H"), game)).toBeUndefined();
         expect(validateBid(Bid.create("double"), game)).toBeUndefined();
         expect(validateBid(Bid.create("redouble"), game)).toBeDefined();
      });

      it('allows only valid bids over doubles', () => {
         let game = new GameStateHelper()
         	.newBoard()
         	.makeBid(Bid.create("1H"))
         	.makeBid(Bid.create("no bid"))
         	.makeBid(Bid.create("no bid"))
         	.makeBid(Bid.create("double"));

         expect(validateBid(Bid.create("1D"), game)).toBeDefined();
         expect(validateBid(Bid.create("1H"), game)).toBeDefined();
         expect(validateBid(Bid.create("2H"), game)).toBeUndefined();
         expect(validateBid(Bid.create("double"), game)).toBeDefined();
         expect(validateBid(Bid.create("redouble"), game)).toBeUndefined();
      });

      it('allows only valid bids over redoubles', () => {
         let game = new GameStateHelper()
         	.newBoard()
         	.makeBid(Bid.create("1H"))
         	.makeBid(Bid.create("double"))
         	.makeBid(Bid.create("redouble"));

         expect(validateBid(Bid.create("1D"), game)).toBeDefined();
         expect(validateBid(Bid.create("1H"), game)).toBeDefined();
         expect(validateBid(Bid.create("2H"), game)).toBeUndefined();
         expect(validateBid(Bid.create("double"), game)).toBeDefined();
         expect(validateBid(Bid.create("redouble"), game)).toBeDefined();
      });

      it('disallows bids after the bidding has ended', () => {
         let game = new GameStateHelper()
         	.newBoard()
         	.makeBid(Bid.create("1H"))
         	.makeBid(Bid.create("no bid"))
         	.makeBid(Bid.create("no bid"))
         	.makeBid(Bid.create("no bid"));

         expect(validateBid(Bid.create("1D"), game)).toBeDefined();
         expect(validateBid(Bid.create("1H"), game)).toBeDefined();
         expect(validateBid(Bid.create("2H"), game)).toBeDefined();
         expect(validateBid(Bid.create("no bid"), game)).toBeDefined();
         expect(validateBid(Bid.create("double"), game)).toBeDefined();
         expect(validateBid(Bid.create("redouble"), game)).toBeDefined();
      });
   });

});
