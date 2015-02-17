/// <reference path="../../_references.d.ts" />

import {Hand} from "./hand";

export class Player {//implements tower.IPlayer {

    constructor(name: string) {
      this.name = name;
    }

    setCards(cards: Array<tower.ICard>): tower.IPlayer {
        this.hand = new Hand(cards);
        return this;
    }

    defer() {
        var resolve, reject;
        var promise = new Promise(function() {
            resolve = arguments[0];
            reject = arguments[1];
        });
        return {
            resolve: resolve,
            reject: reject,
            promise: promise
        };
    }

    hand: tower.IHand;
    seat: tower.Seat;
    game: tower.IGame;
    name: string;

    bid(game: tower.IGame): Promise<tower.IBid> {
        return Promise.reject(new Error("unimplemented"));
    }

    play(game: tower.IGame): Promise<tower.IBid> {
        return Promise.reject(new Error("unimplemented"));
    }

    get isHuman() {
        return false;
    }
}
