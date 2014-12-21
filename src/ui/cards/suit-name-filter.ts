/// <reference path="../../_references.d.ts" />

function suitNameFilter() {
    return function(suit: tower.Suit) {
        switch(suit) {
            case tower.Suit.Spades: return "spades";
            case tower.Suit.Hearts: return "hearts";
            case tower.Suit.Diamonds: return "diamonds";
            case tower.Suit.Clubs: return "clubs";
        }
    }
}
 
export = suitNameFilter;