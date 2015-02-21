/// <reference path="../../_references.d.ts" />

import {Cardplay} from "./cardplay";
import {Bidding} from "./bidding";
import {nextPlayer} from "./utils";
import {Deck} from "../cards/deck";

//implements tower.IGameSequence
export class Board {

    constructor(deck: Deck) {
        this.deck = deck;
        this.bidding = new Bidding();
        this.cardplay = new Cardplay();
    }

    bidding: Bidding;
    cardplay: Cardplay;
    deck: Deck;

    async play(players: Array<tower.IPlayer>, dealer: tower.Seat) {
        console.log('playing board');

      	this.deal(players, dealer);
      	await this.bidding.play(players, dealer);
      	await this.cardplay.play(players, this.bidding.leader);
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
