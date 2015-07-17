/* @flow */

import Reflux from 'reflux';
import {Game} from "../model/game/game-state";
import {AutoPlayer} from "./auto-player";
import {validateBid, validateCard} from "../model/game/validators";
import {NotificationActions} from "./notification-store";
import {GameHistory} from "./game-history";

export const GameActions = Reflux.createActions([
	"newGame",
	"dealBoard",
	"makeBid",
	"playCard",
	"resume",
	"pause",
	"back",
	"forward",
	"jumpBack"
]);

/**
 * Store for managing the current state of the game.
 * Maintains a cache of all previous game states which
 * can be used to undo plays
 */
export const GameStore = Reflux.createStore({
	init: function() {
		this.listenToMany(GameActions);
		this.reset();
	},
	// used by tests
	reset: function() {
		this.autoPlayer = new AutoPlayer();
		this.autoPlay = true;
		this.history = new GameHistory();
		this.history.push(new Game().newBoard());
		this.doStateChanged();
	},
	getInitialState: function() {
		return this.currentState();
	},
	doStateChanged: function() {
		this.autoPlayer.updateGameState(this.currentState().game);
		if (this.autoPlay)
			this.autoPlayer.scheduleAutoPlay(this.currentState().game);
		this.trigger(this.currentState());
	},
	currentState: function() {
		return {
			game: this.history.current(),
			actions: {
				canPause: this.autoPlay,
				canResume: !this.autoPlay,
				canBack: this.history.canBack(),
				canForward: this.history.canForward(),
				canJumpBack: this.history.canJumpBack()
			}
		};
	},
	onDealBoard: function() {
		let game = this.history.current().dealBoard();
		this.history.push(game);
		this.doStateChanged();
	},
	onMakeBid: function(bid) {
		let game = this.history.current().makeBid(bid);
		this.history.push(game);
		this.doStateChanged();
	},
	onPlayCard: function(card) {
		let game = this.history.current().playCard(card);
		this.history.push(game);
		this.doStateChanged();
	},
	onBack: function() {
		this.history.back();
		this.autoPlay = false;
		this.doStateChanged();
	},
	onForward: function() {
		this.history.forward();
		this.autoPlay = false;
		this.doStateChanged();
	},
	onJumpBack: function() {
		this.history.jumpBack();
		this.autoPlay = false;
		this.doStateChanged();
	},
	onPause: function() {
		this.autoPlay = false;
		this.doStateChanged();
	},
	onResume: function() {
		this.autoPlay = true;
		this.doStateChanged();
	}
});

GameActions.makeBid.shouldEmit = function(bid) {
	let err = validateBid(bid, GameStore.currentState().game.currentBoard); // TODO

	if (err) {
		NotificationActions.error({
			title: "Invalid bid",
			message: err.message
		});
	}

	return !err;
};

GameActions.playCard.shouldEmit = function(card) {
	let err = validateCard(card, GameStore.currentState().game.currentBoard); // TODO

	if (err) {
		NotificationActions.error({
			title: "Invalid card",
			message: err.message
		});
	}

	return !err;
};
