/// <reference path="../../../_references.d.ts" />

class OpenerStrategy implements tower.IBiddingStrategy {

    constructor() {   
         
    }
    
    public getBid(game: tower.IGame): tower.IBid {
        return {type: tower.BidType.NoBid};
    }    
}

export = OpenerStrategy;