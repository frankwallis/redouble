/// <reference path="../../../_references.d.ts" />

export class BiddingStrategy { //implements tower.IBiddingStrategy {

    constructor() {

    }

    getBid(game: tower.IGame, player: tower.IPlayer): tower.IBid {
        if ((game.currentBoard.bidding.bids.length > 0) && (game.currentBoard.bidding.bids.length < 4))
            return {type: tower.BidType.Call, suit: game.currentBoard.bidding.lastBid.suit +1 || tower.BidSuit.Clubs, level: game.currentBoard.bidding.lastBid.level +1 || 1};
        else
            return {type: tower.BidType.NoBid};
    }
}
