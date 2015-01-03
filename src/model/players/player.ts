/// <reference path="../../_references.d.ts" />

import Hand = require("./hand");

class Player implements tower.IPlayer {

    constructor(public $q: ng.IQService, public name: string) {   
         
    }

    public setCards(cards: Array<tower.ICard>): tower.IPlayer {
        this.hand = new Hand(cards);
        return this;
    }
    
    public hand: tower.IHand;
    public seat: tower.Seat;
    public game: tower.IGame;
    
    public bid(game: tower.IGame): ng.IPromise<any> {
        return this.$q.reject(new Error("unimplemented"));
    }
    
    public play(game: tower.IGame): ng.IPromise<any> {
        return this.$q.reject(new Error("unimplemented"));
    }
    
    public get isHuman() {
        return false;
    }
}

export = Player;