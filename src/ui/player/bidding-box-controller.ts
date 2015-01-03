/// <reference path="../../_references.d.ts" />

class BiddingBoxController {

    public static $inject = ["$scope", "$rootScope"]; 

    constructor(private $scope: any,
                private $rootScope: any) {

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
    
    private player: tower.IPlayer;
    private bidding: tower.IBidding;
    
    public levels: Array<Array<tower.IBid>>;
    public double: tower.IBid;
    public redouble: tower.IBid;
    public nobid: tower.IBid;
    
    public canBid(bid: tower.IBid): boolean {
        return true;
    }
    
    public bid(bid: tower.IBid) {
        
    }
}

export = BiddingBoxController;