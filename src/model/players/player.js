/// <reference path="../../_references.d.ts" />

export class Player {//implements tower.IPlayer {

    constructor(name: string) {
      this.name = name;
    }

    setCards(hand: Array<tower.ICard>): tower.IPlayer {
        this.hand = hand;
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

    seat: tower.Seat;
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
