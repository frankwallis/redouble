jest.autoMockOff()
jest.mock("../validators", {
   validateBid: () => {},
   validateCard: () => {}
})

import {GameStateHelper} from '../game-state';
import {Bid, BidType, BidSuit} from '../../core/bid';
import {Card, Pip, Suit} from '../../core/card';
import {Seat} from '../../core/seat';

describe('Game State Helper', () => {
   describe('currentBoard', () => {
      it('returns the last board', () => {
         var gameState = new GameStateHelper();
         expect(gameState.currentBoard).not.toBeDefined();

         gameState = gameState.newBoard();
         expect(gameState.currentBoard).toBeDefined();

         var lastBoard = gameState.currentBoard;
         gameState = gameState.newBoard();
         expect(gameState.currentBoard).toBeDefined();
         expect(gameState.currentBoard).not.toBe(lastBoard);
      });
   });

   describe('lastBid', () => {
      it('returns the last bid of any type', () => {
         var gameState = new GameStateHelper().newBoard();
         expect(gameState.lastBid).toBeUndefined();

         gameState = gameState.makeBid(Bid.create("2H"));
         expect(gameState.lastBid).toEqual({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

         gameState = gameState.makeBid(Bid.create("double"));
         expect(gameState.lastBid).toEqual({ type: BidType.Double });

         gameState = gameState.makeBid(Bid.create("no bid"));
         expect(gameState.lastBid).toEqual({ type: BidType.NoBid });
      });
   });

   describe('lastCall', () => {
      it('returns the last call of a suit', () => {
         var gameState = new GameStateHelper().newBoard();
         expect(gameState.lastCall).toBeUndefined();

         gameState = gameState.makeBid(Bid.create("no bid"));
         expect(gameState.lastCall).toBeUndefined();

         gameState = gameState.makeBid(Bid.create("2H"));
         expect(gameState.lastCall).toEqual({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

         gameState = gameState.makeBid(Bid.create("double"));
         expect(gameState.lastCall).toEqual({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

         gameState = gameState.makeBid(Bid.create("3S"));
         expect(gameState.lastCall).toEqual({ type: BidType.Call, suit: BidSuit.Spades, level: 3 });
      });
   });

   describe('lastAction', () => {
      it('returns the last bid which was not a no-bid', () => {
         var gameState = new GameStateHelper().newBoard();
         expect(gameState.lastAction).toBeUndefined();

         gameState = gameState.makeBid(Bid.create("2H"));
         expect(gameState.lastAction).toEqual({ type: BidType.Call, suit: BidSuit.Hearts, level: 2 });

         gameState = gameState.makeBid(Bid.create("double"));
         expect(gameState.lastAction).toEqual({ type: BidType.Double });

         gameState = gameState.makeBid(Bid.create("no bid"));
         expect(gameState.lastAction).toEqual({ type: BidType.Double });
      });
   });

   describe('trumpSuit', () => {
      it('returns undefined if the bidding has not ended', () => {
         var gameState = new GameStateHelper().newBoard();
         expect(gameState.trumpBid).toBeUndefined();
      });

      it('returns the suit of the bid contract', () => {
         var gameState = new GameStateHelper().newBoard();

         gameState = gameState
            .makeBid(Bid.create("4H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));
         expect(gameState.trumpSuit).toBe(BidSuit.Hearts);
      });

      it('returns the suit of the bid contract for doubled no-trumps', () => {
         var gameState = new GameStateHelper().newBoard();

         gameState = gameState
            .makeBid(Bid.create("4NT"))
            .makeBid(Bid.create("double"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));
         expect(gameState.trumpSuit).toBe(BidSuit.NoTrumps);
      });
   });

   describe('biddingHasEnded', () => {
      it('returns false if there have not been three passes', () => {
         var gameState = new GameStateHelper().newBoard();
         expect(gameState.biddingHasEnded).toBeFalsy();

         gameState = gameState.makeBid(Bid.create("4NT"));
         expect(gameState.biddingHasEnded).toBeFalsy();

         gameState = gameState.makeBid(Bid.create("double"));
         expect(gameState.biddingHasEnded).toBeFalsy();

         gameState = gameState.makeBid(Bid.create("no bid"));
         expect(gameState.biddingHasEnded).toBeFalsy();

         gameState = gameState.makeBid(Bid.create("no bid"));
         expect(gameState.biddingHasEnded).toBeFalsy();

         gameState = gameState.makeBid(Bid.create("no bid"));
         expect(gameState.biddingHasEnded).toBeTruthy();
      });

      it('requires four no bids to throw in a hand', () => {
         var gameState = new GameStateHelper().newBoard();

         gameState = gameState.makeBid(Bid.create("no bid"));
         expect(gameState.biddingHasEnded).toBeFalsy();

         gameState = gameState.makeBid(Bid.create("no bid"));
         expect(gameState.biddingHasEnded).toBeFalsy();

         gameState = gameState.makeBid(Bid.create("no bid"));
         expect(gameState.biddingHasEnded).toBeFalsy();

         gameState = gameState.makeBid(Bid.create("no bid"));
         expect(gameState.biddingHasEnded).toBeTruthy();
      });
   });

   describe('currentTrick', () => {
      it('returns the current trick', () => {
         var gameState = new GameStateHelper().newBoard();
         expect(gameState.currentTrick).toEqual([]);

         gameState = gameState.playCard(Card.create("2H"));
         expect(gameState.currentTrick.length).toBe(1);

         gameState = gameState.playCard(Card.create("3H"));
         expect(gameState.currentTrick.length).toBe(2);
         expect(gameState.currentTrick[0].card).toEqual({ suit: Suit.Hearts, pip: Pip.Two });
         expect(gameState.currentTrick[1].card).toEqual({ suit: Suit.Hearts, pip: Pip.Three });

         gameState = gameState
            .playCard(Card.create("4H"))
            .playCard(Card.create("5H"));
         expect(gameState.currentTrick.length).toBe(4);

         gameState = gameState.playCard(Card.create("AS"));
         expect(gameState.currentTrick.length).toBe(1);
         expect(gameState.currentTrick[0].card).toEqual({ suit: Suit.Spades, pip: Pip.Ace });
      });
   });

   describe('playHasEnded', () => {

   });

   describe('gameHasEnded', () => {

   });

   describe('declarer', () => {
      it('returns the dealer when bidding starts', () => {
         var gameState = new GameStateHelper().newBoard(Seat.West);

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
      it('returns the dealer when bidding starts', () => {
         var gameState = new GameStateHelper().newBoard(Seat.West);
         expect(gameState.nextPlayer).toEqual(Seat.West);
      });

      it('returns the next player when bidding', () => {
         var gameState = new GameStateHelper().newBoard(Seat.West);
         expect(gameState.nextPlayer).toEqual(Seat.West);

         gameState = gameState.makeBid(Bid.create("4NT"));
         expect(gameState.nextPlayer).toEqual(Seat.North);

         gameState = gameState.makeBid(Bid.create("double"));
         expect(gameState.nextPlayer).toEqual(Seat.East);
      });

      it('returns the leader when bidding ends', () => {
         var gameState = new GameStateHelper().newBoard(Seat.West);
         expect(gameState.nextPlayer).toEqual(Seat.West);

         gameState = gameState.makeBid(Bid.create("1H"));
         gameState = gameState.makeBid(Bid.create("no bid"));
         gameState = gameState.makeBid(Bid.create("no bid"));
         gameState = gameState.makeBid(Bid.create("no bid"));
         expect(gameState.nextPlayer).toEqual(Seat.North);
      });

      it('returns the trick winner when playing', () => {
         var gameState = new GameStateHelper().newBoard(Seat.West);
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

      it('returns undefined if the hand is passed out', () => {
         var gameState = new GameStateHelper().newBoard(Seat.West);

         gameState = gameState
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));

         expect(gameState.nextPlayer).toBeUndefined();
      });


   });


});
