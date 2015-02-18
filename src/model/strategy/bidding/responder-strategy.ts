/// <reference path="../../../_references.d.ts" />

class ResponderStrategy implements tower.IBiddingStrategy {

    constructor() {

    }

    public getBid(game: tower.IGame): tower.IBid {
         return {type: tower.BidType.NoBid};
    }

}

export = ResponderStrategy;
