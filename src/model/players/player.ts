/// <reference path="../../_references.d.ts" />

import Hand = require("../cards/hand");

class Player implements tower.IPlayer {

    constructor(public $q: ng.IQService, public name: string) {   
         
    }

    public hand: tower.IHand;
    
    public setCards(cards: Array<tower.ICard>): tower.IPlayer {
        this.hand = new Hand(cards);
        return this;
    }
    
    public seat: tower.Seat;
    
    public bid(): ng.IPromise<any> {
        return this.$q.reject(new Error("unimplemented"));
    }
    
    public play(trick: tower.ITrick): ng.IPromise<any> {
        return this.$q.reject(new Error("unimplemented"));
    }
    
    public get isHuman() {
        return false;
    }
}

export = Player;