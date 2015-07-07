jest.autoMockOff()
jest.mock("../validators", {
   validateBid: () => {},
   validateCard: () => {}
})

import {Board} from '../board-state';
import {Bid, BidType, BidSuit} from '../../core/bid';
import {Card, Pip, Suit} from '../../core/card';
import {Seat} from '../../core/seat';
import {Deck} from '../../core/deck';

describe.only('Board State Helper', () => {
   describe('create', () => {
      it('defaults parameters', () => {
         let board = Board.create();
         expect(board.dealer).toEqual(Seat.North);
         expect(board.hands[Seat.North].length).toEqual(13);
         expect(board.hands[Seat.West].length).toEqual(13);
         expect(board.bids.length).toEqual(0);
         expect(board.cards.length).toEqual(0);
      });

      it('handles parameters', () => {
         let board = Board.create(
            Seat.West, 
            Deck.rig(Seat.West, ["2S"], ["2H"], ["2D"], ["2C"]), 
            Bid.createAll("no bid", "no bid"), 
            Card.createAll("2S", "2H", "2D")
         );
         expect(board.dealer).toEqual(Seat.West);
         expect(board.hands[Seat.North].length).toEqual(1);
         expect(board.hands[Seat.West].length).toEqual(1);
         expect(board.bids.length).toEqual(2);
         expect(board.cards.length).toEqual(3);
      });
   });

   describe('lastBid', () => {
      it('returns the last bid of any type', () => {
         let board = Board.create(Seat.West);
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
         let board = Board.create(Seat.West);
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
         let board = Board.create(Seat.West);
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
         let board = Board.create(Seat.West);
         expect(board.trumpBid).toBeUndefined();
      });

      it('returns the suit of the bid contract', () => {
         let board = Board.create(Seat.West);

         board = board
            .makeBid(Bid.create("4H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));
         expect(board.trumpSuit).toBe(BidSuit.Hearts);
      });

      it('returns the suit of the bid contract for doubled no-trumps', () => {
         let board = Board.create(Seat.West);

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
         let board = Board.create(Seat.West);
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
         let board = Board.create(Seat.West);

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
         let board = Board.create(Seat.West);
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
      it('returns true after all the cards have been played', () => {
         let board = Board.create(
            Seat.West,
            Deck.rig(Seat.West, ["2S", "AC", "2C"], ["7S", "7H", "7C"], [ "AS", "AH", "3C"], ["3S", "4S", "5S"])
         );

         for(let idx = 0; idx < 3; idx ++) {
            Seat.all().forEach(seat => {
               expect(board.playHasEnded).toBeFalsy();
               board = board.playCard(board.hands[seat][idx]);
            });
         }
         expect(board.playHasEnded).toBeTruthy();
      });
   });

   describe('declarer', () => {
      it('returns the dealer when bidding starts', () => {
         let board = Board.create(Seat.West);

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

   describe('declarerTricks', () => {
      it('returns the number of tricks won by declarer', () => {
         let board = Board.create(
            Seat.West,
            Deck.rig(Seat.West, ["2S", "AH", "2C"], ["AS", "3H", "3C"], [ "4S", "4H", "4C"], ["5S", "5H", "AC"])
         );

         board = board
            .makeBid(Bid.create("1H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));
         expect(board.declarerTricks).toEqual(0);
         
         board = board
            .playCard(Card.create("2C"))
            .playCard(Card.create("3C"))
            .playCard(Card.create("4C"))
            .playCard(Card.create("AC"));
         expect(board.declarerTricks).toEqual(1);

         board = board
            .playCard(Card.create("5H"))
            .playCard(Card.create("AH"))
            .playCard(Card.create("3H"))
            .playCard(Card.create("4H"));
         expect(board.declarerTricks).toEqual(1);

         board = board
            .playCard(Card.create("2S"))
            .playCard(Card.create("AS"))
            .playCard(Card.create("4S"))
            .playCard(Card.create("5S"));
         expect(board.declarerTricks).toEqual(2);
      });
   });

   describe('legalCards', () => {
      it('returns all available cards for leader', () => {
         let board = Board.create(Seat.West);

         board = board
            .makeBid(Bid.create("1H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));

         expect(board.legalCards.length).toBe(13);

         board.legalCards.forEach((card) => {
            expect(board.hands[Seat.North].some(heldcard => Card.equals(card, heldcard))).toBeTruthy();
         });
      });

      it('returns cards of the same suit as lead', () => {
         let board = Board.create(Seat.West);

         board = board
            .makeBid(Bid.create("1H"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));

         let lead = board.legalCards[0];
         board = board.playCard(lead);

         board.legalCards.forEach((card) => {
            expect(card.suit).toEqual(lead.suit);
         })

         expect(board.hands[Seat.East].reduce((count, card) => card.suit == lead.suit ? count + 1 : count, 0)).toBe(board.legalCards.length);
      });

      it('returns all available cards when void', () => {
         // TODO
      });
   });

   describe('nextPlayer', () => {
      it('returns the dealer when bidding starts', () => {
         let board = Board.create(Seat.West);
         expect(board.nextPlayer).toEqual(Seat.West);
      });

      it('returns the next player when bidding', () => {
         let board = Board.create(Seat.West);
         expect(board.nextPlayer).toEqual(Seat.West);

         board = board.makeBid(Bid.create("4NT"));
         expect(board.nextPlayer).toEqual(Seat.North);

         board = board.makeBid(Bid.create("double"));
         expect(board.nextPlayer).toEqual(Seat.East);
      });

      it('returns the leader when bidding ends', () => {
         let board = Board.create(Seat.West);
         expect(board.nextPlayer).toEqual(Seat.West);

         board = board.makeBid(Bid.create("1H"));
         board = board.makeBid(Bid.create("no bid"));
         board = board.makeBid(Bid.create("no bid"));
         board = board.makeBid(Bid.create("no bid"));
         expect(board.nextPlayer).toEqual(Seat.North);
      });

      it('returns the trick winner when playing', () => {
         let board = Board.create(Seat.West);
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
         let board = Board.create(Seat.West);

         board = board
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"))
            .makeBid(Bid.create("no bid"));

         expect(board.nextPlayer).toBeUndefined();
      });
   });
});
