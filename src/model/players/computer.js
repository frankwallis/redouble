/// <reference path="../../_references.d.ts" />

import {Player} from "./player";
import {CardplayStrategy} from "../strategy/cardplay/cardplay-strategy";
import {BiddingStrategy} from "../strategy/bidding/bidding-strategy";

export class Computer extends Player {

  constructor(name: string) {
    super(name);
    this.biddingStrategy = new BiddingStrategy();
    this.cardplayStrategy = new CardplayStrategy();
  }

  biddingStrategy: tower.IBiddingStrategy;
  cardplayStrategy: tower.ICardplayStrategy;

  delay(value, ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => resolve(value), ms);
    });
  }

  bid(game): Promise<tower.IBid> {
    var bid = this.biddingStrategy.getBid(game);
    console.log('seat ' + this.seat + ': ' + JSON.stringify(bid));
    return this.delay(bid, 200);
  }

  play(game): Promise<tower.ICard> {
    var card = this.cardplayStrategy.getCard(game, this);  // TODO!!
    console.log('seat ' + this.seat + ': ' + JSON.stringify(card));
    return this.delay(card, 200);
  }
}
