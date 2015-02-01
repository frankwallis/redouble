/// <reference path="../../_references.d.ts" />

import Player = require("./player");

class Computer extends Player {

    public static $inject = [ "$q", "$timeout", "name",
                              "biddingStrategy", "cardplayStrategy" ];
    
    constructor($q: ng.IQService,
                private $timeout: ng.ITimeoutService,
                name: string,
                private biddingStrategy: tower.IBiddingStrategy,
                private cardplayStrategy: tower.ICardplayStrategy) {   
         super($q, name);
    }
        
	public bid(game: tower.IGame): ng.IPromise<tower.IBid> {
		var result = this.$q.defer<tower.IBid>();

        this.$timeout(() => {
            var bid = this.biddingStrategy.getBid(game);
            console.log('seat ' + this.seat + ': ' + JSON.stringify(bid));
            result.resolve(bid);
        }, 200);
        
		return result.promise;
	}

	public play(game: tower.IGame): ng.IPromise<tower.ICard> {
		var result = this.$q.defer<tower.ICard>();
        
        this.$timeout(() => {
            var card = this.cardplayStrategy.getCard(game);  // TODO!!
            console.log('seat ' + this.seat + ': ' + JSON.stringify(card));
            this.hand.play(card);
            result.resolve(card);
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