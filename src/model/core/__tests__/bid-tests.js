import {Bid, BidSuit, BidType} from '../bid';

describe("Bid", () => {

	beforeEach(() => {});

	describe("compare", () => {
		it("recognises equality", () => {
			let bid1 = { type: BidType.Call, level: 3, suit: BidSuit.Hearts };
			let bid2 = { type: BidType.Call, level: 3, suit: BidSuit.Hearts };
			expect(Bid.compare(bid1, bid2)).toBe(0);
			expect(Bid.compare(bid2, bid1)).toBe(0);

			bid1 = { type: BidType.Double };
			bid2 = { type: BidType.Double };
			expect(Bid.compare(bid1, bid2)).toBe(0);
			expect(Bid.compare(bid2, bid1)).toBe(0);
		});

		it("obeys order of precedence of suits", () => {
			let bid1 = { type: BidType.Call, level: 1, suit: BidSuit.Clubs };
			let bid2 = { type: BidType.Call, level: 1, suit: BidSuit.Diamonds };
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
			let bid = Bid.create("1C");
			expect(bid.suit).toBe(BidSuit.Clubs);
			expect(bid.level).toBe(1);

			bid = Bid.create("4S");
			expect(bid.suit).toBe(BidSuit.Spades);
			expect(bid.level).toBe(4);

			bid = Bid.create("7NT");
			expect(bid.suit).toBe(BidSuit.NoTrumps);
			expect(bid.level).toBe(7);
		});
	});

	describe("createAll", () => {
		it("creates lists of bids correctly", () => {
			let bids = Bid.createAll("1C", "double", "1S");
			expect(bids.length).toBe(3);
			expect(bids[0].suit).toBe(BidSuit.Clubs);
			expect(bids[0].level).toBe(1);
			expect(bids[2].suit).toBe(BidSuit.Spades);
			expect(bids[2].level).toBe(1);
		});
	});

});
