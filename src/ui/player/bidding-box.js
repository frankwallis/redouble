/// <reference path="../../_references.d.ts" />

export class BiddingBox {

    constructor() {

        this.player = $scope.player;
        this.bidding = $scope.bidding;

        this.levels = [];

        for (var i = 1; i <= 7; i++) {
            this.levels[i] = [];

            for (var s = tower.BidSuit.Clubs; s <= tower.BidSuit.NoTrumps; s ++) {
                this.levels[i].push({ type: tower.BidType.Call, suit: s, level: i });
            }
        }

        this.double = { type: tower.BidType.Double };
        this.redouble = { type: tower.BidType.Redouble };
        this.nobid = { type: tower.BidType.NoBid };
    }

    player: any;//tower.IPlayer;
    bidding: tower.IBidding;

    levels: any;//Array<Array<tower.IBid>>;
    double: tower.IBid;
    redouble: tower.IBid;
    nobid: tower.IBid;

    canBid(bid: tower.IBid): boolean {
        return true;
    }

    bid(bid: tower.IBid) {
        this.player.makeBid(bid);
    }
}
