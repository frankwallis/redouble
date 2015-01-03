/// <reference path="../../../_references.d.ts" />

class BiddingStrategy implements tower.IBiddingStrategy {

    public static $inject = [ "openerStrategy", "responderStrategy" ];
    
    constructor(openerStrategy: tower.IBiddingStrategy,
                responderStrategy: tower.IBiddingStrategy) {   
         
    }

    public getBid(game: tower.IGame): tower.IBid {
         return {type: tower.BidType.NoBid};
    }
    
}

export = BiddingStrategy;