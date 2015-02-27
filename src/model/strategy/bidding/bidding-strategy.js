/// <reference path="../../../_references.d.ts" />

export class BiddingStrategy { //implements tower.IBiddingStrategy {

    constructor() {

    }

    getBid(game: tower.IGame): tower.IBid {
        if ((game.currentBoard.bids.length > 0) &&
            (game.currentBoard.bids.length < 4))
            return {
              type: tower.BidType.Call,
              suit: game.lastBid.suit +1 || tower.BidSuit.Clubs,
              level: game.lastBid.level +1 || 1
            };
        else
            return {type: tower.BidType.NoBid};
    }
}
