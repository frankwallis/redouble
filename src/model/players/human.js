/// <reference path="../../_references.d.ts" />

import {Player} from "./player";

export class Human extends Player {

    constructor(name: string) {
        super(name);
    }

    pendingBid: Deferred<tower.IBid>;

	  bid(): Promise<tower.IBid> {
        if (this.awaitingBid)
            throw new Error("bid is already pending");

        console.log(this.name + ' bidding');
        this.pendingBid = this.defer();

        return this.pendingBid.promise;
    }

    get awaitingBid(): boolean {
        return !!this.pendingBid;
    }

    makeBid(bid: tower.IBid) {
        if (!this.awaitingBid)
            throw new Error("unexpected bid!");

        this.pendingBid.resolve(bid);
        this.pendingBid = undefined;
    }

    pendingPlay: Deferred<tower.ICard>;

	  play(): Promise<tower.ICard> {
        if (this.awaitingPlay)
            throw new Error("play is already pending");

		    this.pendingPlay = this.defer();
		    return this.pendingPlay.promise;
	  }

    get awaitingPlay() {
        return !!this.pendingPlay;
    }

    makePlay(card: tower.ICard) {
        if (!this.awaitingPlay)
            throw new Error("unexpected card!");

        this.hand.play(card);
        this.pendingPlay.resolve(card);
        this.pendingPlay = undefined;
    }

    get isHuman() {
        return true;
    }
}
