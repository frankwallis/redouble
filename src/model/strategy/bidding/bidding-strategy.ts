/// <reference path="../../../_references.d.ts" />

class BiddingStrategy implements tower.IBiddingStrategy {

    public static $inject = [ "openerStrategy", "responderStrategy" ];
    
    constructor(openerStrategy: tower.IBiddingStrategy,
                responderStrategy: tower.IBiddingStrategy) {   
         
    }

    public getBid(game: tower.IGame): tower.IBid {
        if ((game.currentBoard.bidding.bids.length > 0) && (game.currentBoard.bidding.bids.length < 4))
            return {type: tower.BidType.Call, suit: game.currentBoard.bidding.lastBid.suit +1 || tower.BidSuit.Clubs, level: game.currentBoard.bidding.lastBid.level +1 || 1}; 
        else
            return {type: tower.BidType.NoBid};
    }
    
}

export = BiddingStrategy;