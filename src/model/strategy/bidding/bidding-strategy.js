/* @flow */

import {BidSuit, BidType, Bid} from "../../core/bid";

export class BiddingStrategy {

    constructor() {}

    getBid(game: tower.IGame): tower.IBid {
        if ((game.currentBoard.bids.length > 0) &&
            (game.currentBoard.bids.length < 4))
            return {
              type: BidType.Call,
              suit: game.lastCall.suit +1 || BidSuit.Clubs,
              level: game.lastCall.level +1 || 1
            };
        else
            return {type: BidType.NoBid};
    }
}
