/* @flow */


export const BidSuit = { "Clubs": 1, "Diamonds": 2, "Hearts": 3, "Spades": 4, "NoTrumps": 5 };
export const BidType = { "NoBid": 0, "Call": 1, "Double": 2, "Redouble": 3 };

export class Bid {
   static stringify(bid): string {
      switch(bid.type) {
        case BidType.NoBid:
          return "No Bid";
        case BidType.Call:
          return bid.level.toString() + '-' + bid.suit.toString();
        case BidType.Double:
          return "Double";
        case BidType.Redouble:
          return "Redouble";
        default:
          throw new Error("unrecognised bid");
      }
   }

   static key(bid): string {
      return Bid.stringify(bid);
   }

   static suitName(suit: BidSuit) {
      var names = [ "", "clubs", "diamonds", "hearts", "spades", "no-trumps"];
      return names[suit];
   }

   static compare(bid1, bid2): number {
      if (bid1.type != bid2.type) {
         return bid1.type - bid2.type;
      }
      else {
         if (bid1.type == BidType.Call) {
            if (bid1.level == bid2.level)
               return bid1.suit - bid2.suit;
            else
               return bid1.level - bid2.level;
         }
         else {
            return 0;
         }
      }
   }
}
