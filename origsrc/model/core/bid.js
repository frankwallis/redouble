/* @flow */

export const BidSuit = {
	Clubs: 1,
	Diamonds: 2,
	Hearts: 3,
	Spades: 4,
	NoTrumps: 5,

	all: () => [1, 2, 3, 4, 5],
	fromPBN: (idx) => PBNBidSuitMap[idx],
	toPBN: (suit) => PBNBidSuitMap.indexOf(suit),
	fromPBNString: (pbn) => PBNBidSuitStringMap.indexOf(pbn),
	toPBNString: (suit) => PBNBidSuitStringMap[suit]
};

const PBNBidSuitMap = [BidSuit.Spades, BidSuit.Hearts, BidSuit.Diamonds, BidSuit.Clubs, BidSuit.NoTrumps];
const PBNBidSuitStringMap = ["", "C", "D", "H", "S", "NT"];

export const BidType = {
	NoBid: 1,
	Call: 2,
	Double: 3,
	Redouble: 4
};

/*
	interface Bid {
		type: BidType;
		suit?: BidSuit;
		level?: number;
	}
*/

export const Bid = {
	stringify(bid) {
		switch(bid.type) {
			case BidType.NoBid:
				return "No Bid";
			case BidType.Call:
				return `${bid.level} ${Bid.suitName(bid.suit, (bid.level === 1))}`;
			case BidType.Double:
				return "Double";
			case BidType.Redouble:
				return "Redouble";
			default:
				throw new Error("unrecognised bid");
		}
	},

	key(bid) {
		let result = [ bid.type ];

		if (bid.type === BidType.Call)
			result = result.concat([ bid.level, bid.suit ]);

		return result.join('-');
	},

	create(bid) {
		if (typeof bid !== "string") return bid;

		let shortNames = [ "", "c", "d", "h", "s", "n"];
		bid = bid.toLowerCase();

		if (bid === "double")
			return { type: BidType.Double };
		else if (bid === "redouble")
			return { type: BidType.Redouble };
		else if (bid === "no bid")
			return { type: BidType.NoBid };
		else {
			let result = { type: BidType.Call };
			result.level = parseInt(bid[0]);
			result.suit = shortNames.indexOf(bid[1]);
			return result;
		}
	},

	/*
	 * creates an array of bids
	 * takes a variable length argument list of strings e.g. "1H", "double", "no bid"
	 */
	createAll(...args) {
		var result = [];

		for (let i = 0; i < args.length; i ++) {
			if (args[i]) {
				if (Array.isArray(args[i]))
					result = result.concat(Bid.createAll.apply(Bid, args[i]));
				else
					result.push(Bid.create(args[i]));
			}
		}

		return result;
	},

	/*
	 * returns array containing all the bids
	 */
	all() {
		let result = [];

		[1, 2, 3, 4, 5, 6, 7].forEach(level => {
			BidSuit.all().forEach(suit => {
				result.push({ type: BidType.Call, level, suit });
			});
		});

		result.push({type: BidType.NoBid});
		result.push({type: BidType.Double});
		result.push({type: BidType.Redouble});

		return result;
	},

	suitName(suit, singular) {
		let names = [ "", "club", "diamond", "heart", "spade", "no-trump" ];
		return names[suit] + (singular ? '' : 's');
	},

	compare(bid1, bid2) {
		if (bid1.type !== bid2.type) {
			return bid1.type - bid2.type;
		}
		else {
			if (bid1.type === BidType.Call) {
				if (bid1.level === bid2.level)
					return bid1.suit - bid2.suit;
				else
					return bid1.level - bid2.level;
			}
			else {
				return 0;
			}
		}
	},

	fromPBN(pbn) {
		return Bid.create(pbn);
	}
};
