/* @flow */

import Reflux from 'reflux';
import {Seat} from "../model/core/seat";
import {GameStore, GameActions} from "./game-store";
import {PlayerStore} from "./player-store";
//import {CardplayStrategy} from "../model/strategy/cardplay/mcts-strategy";
import {CardplayStrategyProxy} from "./strategy-proxy";
import {BiddingStrategy} from "../model/strategy/bidding/bidding-strategy";

export const StrategyActions = Reflux.createActions([
   
]);

const STORAGE_KEY = 'strategy';

/**
 * Store for managing the game strategies
 */
export const StrategyStore = Reflux.createStore({
   init: function() {
      this.listenToMany(StrategyActions);

      this.cardplayStrategy = new CardplayStrategyProxy();
      this.biddingStrategy = new BiddingStrategy();

      this.unsubscribeGame = this.listenTo(GameStore,
                                           (game) => this.onGameTurn(game),
                                           (game) => this.onGameTurn(game));
   },
   onGameTurn: function(game) {
      console.log('onGameTurn');

      if (!game.currentBoard.nextPlayer) return;
      this.cardplayStrategy.updateGameState(game);
      
      if (!PlayerStore.players[game.currentBoard.nextPlayer].ishuman) {
         if (game.currentBoard.biddingHasEnded) {
            this.cardplayStrategy.getCard(game.gameState)
					.then((card) => {
						GameActions.playCard(card, game);
//		            setTimeout(() => {
//		               GameActions.playCard(card, game);
//		            }, 800);
					});

         }
         else {
            let bid = this.biddingStrategy.getBid(game.gameState);

            setTimeout(() => {
               GameActions.makeBid(bid, game);
            }, 800);
         }
      }
   }
});
