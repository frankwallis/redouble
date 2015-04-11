jest.autoMockOff()

import {Bid, BidSuit, BidType} from '../bid';

describe("Bid", () => {

   beforeEach(() => {});

   describe("compare", () => {
      it("recognises equality", () => {
         var bid1 = { type: BidType.Call, level: 3, suit: BidSuit.Hearts };
         var bid2 = { type: BidType.Call, level: 3, suit: BidSuit.Hearts };
         expect(Bid.compare(bid1, bid2)).toBe(0);
         expect(Bid.compare(bid2, bid1)).toBe(0);

         bid1 = { type: BidType.Double };
         bid2 = { type: BidType.Double };
         expect(Bid.compare(bid1, bid2)).toBe(0);
         expect(Bid.compare(bid2, bid1)).toBe(0);
      });

      it("obeys order of precedence of suits", () => {
         var bid1 = { type: BidType.Call, level: 1, suit: BidSuit.Clubs };
         var bid2 = { type: BidType.Call, level: 1, suit: BidSuit.Diamonds };
         expect(Bid.compare(bid1, bid2)).toBeLessThan(0);
         expect(Bid.compare(bid2, bid1)).toBeGreaterThan(0);

         bid1.suit = BidSuit.Diamonds;
         bid2.suit = BidSuit.Hearts;
         expect(Bid.compare(bid1, bid2)).toBeLessThan(0);
         expect(Bid.compare(bid2, bid1)).toBeGreaterThan(0);

         bid1.suit = BidSuit.Hearts;
         bid2.suit = BidSuit.Spades;
         expect(Bid.compare(bid1, bid2)).toBeLessThan(0);
         expect(Bid.compare(bid2, bid1)).toBeGreaterThan(0);

         bid1.suit = BidSuit.Spades;
         bid2.suit = BidSuit.NoTrumps;
         expect(Bid.compare(bid1, bid2)).toBeLessThan(0);
         expect(Bid.compare(bid2, bid1)).toBeGreaterThan(0);
      });
   });

   describe("create", () => {
      it("creates bids correctly", () => {
         var bid = Bid.create("1C");
         expect(bid.suit).toBe(BidSuit.Clubs);
         expect(bid.level).toBe(1);

         var bid = Bid.create("4S");
         expect(bid.suit).toBe(BidSuit.Spades);
         expect(bid.level).toBe(4);

         var bid = Bid.create("7NT");
         expect(bid.suit).toBe(BidSuit.NoTrumps);
         expect(bid.level).toBe(7);
      });
   });

   describe("stringify", () => {
      it("returns unique values", () => {

      });
   });
});
