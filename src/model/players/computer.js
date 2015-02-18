/// <reference path="../../_references.d.ts" />

import {Player} from "./player";
import {CardplayStrategy} from "../strategy/cardplay/cardplay-strategy";
import {BiddingStrategy} from "../strategy/bidding/bidding-strategy";

export class Computer extends Player {

  constructor(name: string) {
    super(name);
    this.biddingFactory = new BiddingStrategy();
    this.cardplayFactory = new CardplayStrategy();
  }

  biddingStrategy: tower.IBiddingStrategy;
  cardplayStrategy: tower.ICardplayStrategy;

  bid(game: tower.IGame): Promise<tower.IBid> {
    var bid = this.biddingStrategy.getBid(game);
    console.log('seat ' + this.seat + ': ' + JSON.stringify(bid));
    return Promise.resolve(bid).delay(200);
  }

  play(game: tower.IGame): Promise<tower.ICard> {
    var card = this.cardplayStrategy.getCard(game);  // TODO!!
    console.log('seat ' + this.seat + ': ' + JSON.stringify(card));
    this.hand.play(card);
    return Promise.resolve(card).delay(200);
  }

  getAnyCard(lead: tower.ICard) {
    if (lead) {
      for (var i = 0; i < this.hand.availableCards.length; i ++)
      if (this.hand.availableCards[i].suit == lead.suit)
      return this.hand.availableCards[i];
    }

    return this.hand.availableCards[0];
  }
}
