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

  bid(): Promise<tower.IBid> {
    var bid = this.biddingStrategy.getBid(this.game, this);
    console.log('seat ' + this.seat + ': ' + JSON.stringify(bid));
    return this.delay(bid, 200);
  }

  play(): Promise<tower.ICard> {
    var card = this.cardplayStrategy.getCard(this.game, this);  // TODO!!
    console.log('seat ' + this.seat + ': ' + JSON.stringify(card));
    this.hand.play(card);
    return this.delay(card, 200);
  }
}
