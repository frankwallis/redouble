/* @flow */

import Reflux from 'reflux';
import {Seat} from "../model/core/seat";
import {GameStore, GameActions} from "./game-store";
import {CardplayStrategy} from "../model/strategy/cardplay/cardplay-strategy";
import {BiddingStrategy} from "../model/strategy/bidding/bidding-strategy";

export const PlayerActions = Reflux.createActions([
   "updatePlayer"
]);

const STORAGE_KEY = 'players';

/**
 * Store for managing the players of the game
 */
export const PlayerStore = Reflux.createStore({
   init: function() {
      this.listenToMany(PlayerActions);

      var playersStr = localStorage.getItem(STORAGE_KEY);

      if (playersStr)
         this.players = JSON.parse(playersStr);
      else
         this.players = Seat.all()
            .map((seat) => {
               return {
                  seat: seat,
                  name: Seat.name(seat),
                  ishuman: (seat == Seat.South)
               };
            });

      this.cardplayStrategy = new CardplayStrategy();
      this.biddingStrategy = new BiddingStrategy();

      this.unsubscribeGame = this.listenTo(GameStore,
                                           (game) => this.onGameTurn(game),
                                           (game) => this.onGameTurn(game));
   },
   onUpdatePlayer: function(seat, delta) {
      console.log('updating player');
      Object.keys(delta).forEach((key) => {
         this.players[seat][key] = delta[key];
      })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.players));      
      this.trigger(this.players);
   },
   onGameTurn: function(game) {
      console.log('onGameTurn');
      if (!this.players[game.nextPlayer].ishuman) {
         if (game.biddingHasEnded) {
            var card = this.cardplayStrategy.getCard(game);

            setTimeout(() => {
               GameActions.playCard(card, game);
            }, 800);
         }
         else {
            var bid = this.biddingStrategy.getBid(game);

            setTimeout(() => {
               GameActions.makeBid(bid, game);
            }, 800);
         }
      }
   }
});
