jest.autoMockOff()
jest.mock("../validators", {
   validateBid: () => {},
   validateCard: () => {}
})

import {Board} from '../board-state';
import {Bid, BidType, BidSuit} from '../../core/bid';
import {Card, Pip, Suit} from '../../core/card';
import {Seat} from '../../core/seat';

describe('Game State Helper', () => {
   describe('lastBid', () => {
      it('returns the last bid of any type', () => {
         let board = new Board();
         expect(board.lastBid).toBeUndefined();

         board = board.makeBid(Bid.create("2H"));
         expect(board.lastBid).toEqual({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

         board = board.makeBid(Bid.create("double"));
         expect(board.lastBid).toEqual({ type: BidType.Double });

         board = board.makeBid(Bid.create("no bid"));
         expect(board.lastBid).toEqual({ type: BidType.NoBid });
      });
   });

   describe('lastCall', () => {
      it('returns the last call of a suit', () => {
         let board = new Board();
         expect(board.lastCall).toBeUndefined();

         board = board.makeBid(Bid.create("no bid"));
         expect(board.lastCall).toBeUndefined();

         board = board.makeBid(Bid.create("2H"));
         expect(board.lastCall).toEqual({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

         board = board.makeBid(Bid.create("double"));
         expect(board.lastCall).toEqual({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

         board = board.makeBid(Bid.create("3S"));
         expect(board.lastCall).toEqual({ type: BidType.Call, suit: BidSuit.Spades, level: 3 });
      });
   });

   describe('lastAction', () => {
      it('returns the last bid which was not a no-bid', () => {
         let board = new Board();
         expect(board.lastAction).toBeUndefined();

         board = board.makeBid(Bid.create("2H"));
         expect(board.lastAction).toEqual({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

         board = board.makeBid(Bid.create("double"));
         expect(board.lastAction).toEqual({ type: BidType.Double });

         board = board.makeBid(Bid.create("no bid"));
         expect(board.lastAction).toEqual({ type: BidType.Double });
      });
   });

   describe('trumpSuit', () => {
      it('returns undefined if the bidding has not ended', () => {
         let board = new Board();
         expect(board.trumpBid).toBeUndefined();
      });

      it('returns the suit of the bid contract', () => {
         let board = new Board();

         board = board
            .makeBid(Bid.create("4H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));
         expect(board.trumpSuit).toBe(BidSuit.Hearts);
      });

      it('returns the suit of the bid contract for doubled no-trumps', () => {
         let board = new Board();

         board = board
            .makeBid(Bid.create("4NT"))
            .makeBid(Bid.create("double"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));
         expect(board.trumpSuit).toBe(BidSuit.NoTrumps);
      });
   });

   describe('biddingHasEnded', () => {
      it('returns false if there have not been three passes', () => {
         let board = new Board();
         expect(board.biddingHasEnded).toBeFalsy();

         board = board.makeBid(Bid.create("4NT"));
         expect(board.biddingHasEnded).toBeFalsy();

         board = board.makeBid(Bid.create("double"));
         expect(board.biddingHasEnded).toBeFalsy();

         board = board.makeBid(Bid.create("no bid"));
         expect(board.biddingHasEnded).toBeFalsy();

         board = board.makeBid(Bid.create("no bid"));
         expect(board.biddingHasEnded).toBeFalsy();

         board = board.makeBid(Bid.create("no bid"));
         expect(board.biddingHasEnded).toBeTruthy();
      });

      it('requires four no bids to throw in a hand', () => {
         let board = new Board();

         board = board.makeBid(Bid.create("no bid"));
         expect(board.biddingHasEnded).toBeFalsy();

         board = board.makeBid(Bid.create("no bid"));
         expect(board.biddingHasEnded).toBeFalsy();

         board = board.makeBid(Bid.create("no bid"));
         expect(board.biddingHasEnded).toBeFalsy();

         board = board.makeBid(Bid.create("no bid"));
         expect(board.biddingHasEnded).toBeTruthy();
      });
   });

   describe('currentTrick', () => {
      it('returns the current trick', () => {
         let board = new Board();
         expect(board.currentTrick).toEqual([]);

         board = board.playCard(Card.create("2H"));
         expect(board.currentTrick.length).toBe(1);

         board = board.playCard(Card.create("3H"));
         expect(board.currentTrick.length).toBe(2);
         expect(board.currentTrick[0].card).toEqual({ suit: Suit.Hearts, pip: Pip.Two });
         expect(board.currentTrick[1].card).toEqual({ suit: Suit.Hearts, pip: Pip.Three });

         board = board
            .playCard(Card.create("4H"))
            .playCard(Card.create("5H"));
         expect(board.currentTrick.length).toBe(4);

         board = board.playCard(Card.create("AS"));
         expect(board.currentTrick.length).toBe(1);
         expect(board.currentTrick[0].card).toEqual({ suit: Suit.Spades, pip: Pip.Ace });
      });
   });

   describe('playHasEnded', () => {

   });

   describe('declarer', () => {
      it('returns the dealer when bidding starts', () => {
         let board = new Board({ dealer: Seat.West, bids: [], cards: [] });

         board = board
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("1H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("2H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))

         expect(board.declarer).toEqual(Seat.North);
      });

   });

   describe('nextPlayer', () => {
      it('returns the dealer when bidding starts', () => {
         let board = new Board({ dealer: Seat.West, bids: [], cards: [] });
         expect(board.nextPlayer).toEqual(Seat.West);
      });

      it('returns the next player when bidding', () => {
         let board = new Board({ dealer: Seat.West, bids: [], cards: [] });
         expect(board.nextPlayer).toEqual(Seat.West);

         board = board.makeBid(Bid.create("4NT"));
         expect(board.nextPlayer).toEqual(Seat.North);

         board = board.makeBid(Bid.create("double"));
         expect(board.nextPlayer).toEqual(Seat.East);
      });

      it('returns the leader when bidding ends', () => {
         let board = new Board({ dealer: Seat.West, bids: [], cards: [] });
         expect(board.nextPlayer).toEqual(Seat.West);

         board = board.makeBid(Bid.create("1H"));
         board = board.makeBid(Bid.create("no bid"));
         board = board.makeBid(Bid.create("no bid"));
         board = board.makeBid(Bid.create("no bid"));
         expect(board.nextPlayer).toEqual(Seat.North);
      });

      it('returns the trick winner when playing', () => {
         let board = new Board({ dealer: Seat.West, bids: [], cards: [] });
         expect(board.nextPlayer).toEqual(Seat.West);

         board = board.makeBid(Bid.create("1H"));
         board = board.makeBid(Bid.create("no bid"));
         board = board.makeBid(Bid.create("no bid"));
         board = board.makeBid(Bid.create("no bid"));
         expect(board.nextPlayer).toEqual(Seat.North);

         board = board.playCard(Card.create("2H"));
         board = board.playCard(Card.create("3H"));
         board = board.playCard(Card.create("4H"));
         board = board.playCard(Card.create("5H"));

         expect(board.nextPlayer).toEqual(Seat.West);
         board = board.playCard(Card.create("6H"));
         expect(board.nextPlayer).toEqual(Seat.North);
      });

      it('returns undefined if the hand is passed out', () => {
         let board = new Board({ dealer: Seat.West, bids: [], cards: [] });

         board = board
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));

         expect(board.nextPlayer).toBeUndefined();
      });
   });
});
