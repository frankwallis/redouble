/// <reference path="../../_references.d.ts" />

import GameSequence = require("./game-sequence");

class Bidding extends GameSequence {

    public static $inject = [ "$q", "$timeout", "$log" ];
    
    constructor($q: ng.IQService, 
                $timeout: ng.ITimeoutService,
                $log: ng.ILogService) {   
         super($q, $timeout, $log);
    }

	public get northBid(): tower.IBid {
		return this.bids[tower.Seat.North];
	}

	public get southBid(): tower.IBid {
		return this.bids[tower.Seat.South];
	}

	public get eastBid(): tower.IBid {
		return this.bids[tower.Seat.East];
	}

	public get westBid(): tower.IBid {
		return this.bids[tower.Seat.West];
	}

	public get lastBid(): tower.IBid {
		return this.bids[this.bids.length -1];
	}

	public get currentRound(): Array<tower.IBid> {
		return this.bids.slice(-4);
	}

    public get lastAction(): tower.IBid {
        for (var i = this.bids.length -1; i >= 0; i --) {
            if (this.bids[i].type != tower.BidType.NoBid)
                return this.bids[i];
        }
        return undefined;
	}

    public bids = [];
    
	public getNextState(player: tower.IPlayer): ng.IPromise<any> {
        return player.bid(undefined) // TODO
			.then((bid) => {
                var error = this.validate(bid);
                
                if (error)
                    return this.$q.reject(error);
                
                this.bids.push(bid);
                return bid;
			});
	}
    
    private validate(bid: tower.IBid) {
        switch(bid.type) {
            case tower.BidType.NoBid: 
                return;
                
            case tower.BidType.Double:
                if (!this.lastAction || (this.lastAction.type != tower.BidType.Call))
                    return new Error("invalid double");
                else
                    return;

            case tower.BidType.Redouble: 
                if (!this.lastAction || (this.lastAction.type != tower.BidType.Double))
                    return new Error("invalid redouble");
                else
                    return;
                
            case tower.BidType.Call: {
                if ((!bid.level) || (!bid.suit))
                    return new Error("you must provide level and suit");
                else if (this.lastBid) {
                    if ((bid.level  < this.lastBid.level) ||
                        (bid.level == this.lastBid.level) && (bid.suit < this.lastBid.suit))
                        return new Error("bid must be higher than " + this.lastBid);
                }
                return;
            }
        }
    }
    
    public playHasEnded(): boolean {
        var consecutivePasses = 0;
        var idx = this.bids.length - 1;
        
        while(idx >= 0) {
            if (this.bids[idx].type == tower.BidType.NoBid)
                consecutivePasses ++;
            else
                break;
            
            idx --;
        }
        return (consecutivePasses >= 3) && (this.bids.length > 3);
    }
}

var biddingFactory = [ "$injector", ($injector) => {    
    return () => $injector.instantiate(Bidding);
}];

export = biddingFactory;