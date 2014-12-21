/// <reference path="../../_references.d.ts" />

import Player = require("./player");

class Computer extends Player {

    public static $inject = [ "$q", "$timeout", "name" ];
    
    constructor($q: ng.IQService,
                private $timeout: ng.ITimeoutService,
                name: string) {   
         super($q, name);
    }
        
	public bid(): ng.IPromise<tower.IBid> {
		var result = this.$q.defer<tower.IBid>();

        this.$timeout(() => {
            var bid = {type: tower.BidType.NoBid};
            console.log('seat ' + this.seat + ': ' + JSON.stringify(bid));
            result.resolve(bid);
        }, 200);
        
		return result.promise;
	}

	public play(trick: tower.ITrick): ng.IPromise<tower.ICard> {
		var result = this.$q.defer<tower.ICard>();
        this.$timeout(() => {
            var selectedCard = this.getAnyCard(trick.leadCard);
            console.log('seat ' + this.seat + ': ' + JSON.stringify(selectedCard));
            this.hand.play(selectedCard);
            result.resolve(selectedCard);
        }, 200);
		return result.promise;
	}
    
    private getAnyCard(lead: tower.ICard) {
        if (lead) {
            for (var i = 0; i < this.hand.availableCards.length; i ++)
                if (this.hand.availableCards[i].suit == lead.suit)
                    return this.hand.availableCards[i];
        }
        
        return this.hand.availableCards[0];
    }

}

export = Computer;