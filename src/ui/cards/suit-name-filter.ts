/// <reference path="../../_references.d.ts" />

function suitNameFilter() {
    return function(suit: tower.BidSuit) {
        switch(suit) {
            case tower.BidSuit.Spades: return "spades";
            case tower.BidSuit.Hearts: return "hearts";
            case tower.BidSuit.Diamonds: return "diamonds";
            case tower.BidSuit.Clubs: return "clubs";
            case tower.BidSuit.NoTrumps: return "no-trumps";
            default: return "unknown";
        }
    }
}
 
export = suitNameFilter;