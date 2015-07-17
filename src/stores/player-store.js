/* @flow */

import Reflux from 'reflux';
import {Seat} from "../model/core/seat";

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

		let playersStr = window.localStorage ? window.localStorage.getItem(STORAGE_KEY) : undefined;

		if (playersStr) {
			this.players = JSON.parse(playersStr);
		}
		else {
			this.players = {};
			Seat.all().forEach((seat) => {
				this.players[seat] = {
					seat: seat,
					name: Seat.name(seat),
					ishuman: (seat === Seat.South)
				};
			});
		}
	},
	onUpdatePlayer: function(seat, delta) {
		console.log('updating player');
		Object.keys(delta).forEach((key) => {
			this.players[seat][key] = delta[key];
		});
		localStorage.setItem(STORAGE_KEY, JSON.stringify(this.players));
		this.trigger(this.players);
	}
});
