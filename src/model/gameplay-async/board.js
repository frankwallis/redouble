/// <reference path="../../_references.d.ts" />

import {Cardplay} from "./cardplay";
import {Bidding} from "./bidding";
import {nextPlayer} from "./utils"

//implements tower.IGameSequence
export class Board {

    static get $inject() { return [ "$q", "$timeout", "$log", "deck" ]; }
    
    constructor($q: ng.IQService, 
                $timeout: ng.ITimeoutService,
                $log: ng.ILogService,
                deck) {
        this.$q = $q;   
        this.$log = $log;
        this.deck = deck;
        this.bidding = new Bidding($q, $timeout, $log);
        this.cardplay = new Cardplay($q, $timeout, $log);
        
    }

    bidding: Bidding;
    cardplay: Cardplay;

    async play(players: Array<tower.IPlayer>, dealer: tower.Seat) {
        this.$log.debug('playing board');

      	this.deal(players, dealer);
      	await this.$q.when(this.bidding.play(players, dealer));
      	await this.cardplay.play(players, this.bidding.opener);
    }

  	deal(players: Array<tower.IPlayer>, dealer: tower.Seat) {
        this.deck.shuffle();
        var hands = this.deck.deal(4);
        
        for(var i = 0; i < hands.length; i++) {
            console.log(JSON.stringify(hands[i]));
            players[i].setCards(hands[i]);
        }

    		return;
  	}
}