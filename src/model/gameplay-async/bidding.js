/// <reference path="../../_references.d.ts" />

import {rotate} from "./utils"

//implements tower.IGameSequence
export class Bidding {

    static get $inject() { return [ "$q", "$timeout", "$log" ] };
    
    constructor($q: ng.IQService, 
                $timeout: ng.ITimeoutService,
                $log: ng.ILogService) {   
        this.$q = $q; 
        this.$log = $log;
        this.bids = [];
    }

    async play(players: Array<tower.IPlayer>, dealer: tower.Seat) {
        this.$log.debug('playing bidding');

        var current = dealer;

        while(!this.biddingHasEnded()) {
            let bid = await this.$q.when(players[current].bid(players[current].game));
            this.validate(bid);                                
            this.bids.push(bid);
            current = rotate(current);
        }
	  }

    validate(bid: tower.IBid) {
      return;


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
    
    biddingHasEnded(): boolean {
        var consecutivePasses = 0;
        var idx = this.bids.length - 1;
        
        while(idx >= 0) {
            if (this.bids[idx].type == 0)//tower.BidType.NoBid)
                consecutivePasses ++;
            else
                break;
            
            idx --;
        }
        var result = (consecutivePasses >= 3) && (this.bids.length > 3);
        return result;
    }

    get northBid(): tower.IBid {
        return this.bids[0];//tower.Seat.North];
    }

    get eastBid(): tower.IBid {
        return this.bids[1];//tower.Seat.East];
    }

    get southBid(): tower.IBid {
        return this.bids[2]//tower.Seat.South];
    }

    get westBid(): tower.IBid {
        return this.bids[3];//tower.Seat.West];
    }

    get lastBid(): tower.IBid {
        return this.bids[this.bids.length -1];
    }

    get currentRound(): Array<tower.IBid> {
        return this.bids.slice(-4);
    }

    get lastAction(): tower.IBid {
        for (var i = this.bids.length -1; i >= 0; i --) {
            if (this.bids[i].type != 0)//tower.BidType.NoBid)
                return this.bids[i];
        }
        return undefined;
    }


}