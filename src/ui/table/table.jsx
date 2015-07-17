/* @flow */

import React from 'react';

import {PlayerStore} from "../../stores/player-store";
import {GameStore} from "../../stores/game-store";
import {Seat} from "../../model/core/seat";

import {ControlBar} from "./control-bar.jsx";
import {HandComponent} from "./hand.jsx";
import {BiddingBox} from "./bidding-box.jsx";
import {BiddingHistory} from "./bidding-history.jsx";
import {TrickComponent} from "./trick.jsx";

/**
 * Top-Level View for displaying the current game from the GameStore
 */
export class Table extends React.Component {

	constructor(props) {
		super(props);

		this.players = PlayerStore.players;
		this.game = GameStore.currentState().game;
		this.actions = GameStore.currentState().actions;
	}

	componentDidMount() {
		this.unsubscribePlayers = PlayerStore.listen((players) => {
			this.players = players;
			this.forceUpdate();
		}, (players) => {
			this.players = players;
		});

		this.unsubscribeGame = GameStore.listen((state) => {
			this.game = state.game;
			this.actions = state.actions;
			this.forceUpdate();
		}, (state) => {
			this.game = state.game;
			this.actions = state.actions;
		});
	}

	componentWillUnmount() {
		this.unsubscribePlayers();
		this.unsubscribeGame();
	}

	render() {
		console.log('rendering table');

		let controlBar = <ControlBar actions={this.actions}/>;

		let players = Seat.all().map((seat) => {
			return (
				<section className={"table-edge-" + Seat.name(seat)} key={seat}>
					<header className="table-player-name">{this.players[seat].name}</header>
					<div className={"table-hand-" + Seat.name(seat)}>
						<HandComponent seat={seat} board={this.game.currentBoard}/>
					</div>
				</section>
			);
		});

		let board = this.game.currentBoard.biddingHasEnded ?
			<TrickComponent board={this.game.currentBoard}/> :
			<BiddingHistory board={this.game.currentBoard}/>;

		let biddingBox = this.game.currentBoard.biddingHasEnded ?
			undefined :
			<BiddingBox className="table-bidding-box" game={this.game}/>;

		return (
			<div className="bridge-table">
				<div className="table-controls">
					{controlBar}
				</div>
				<div className="table-players">
					{players}
				</div>
				<div className="table-board">
					{board}
				</div>
				<div className="table-bidding-box">
					{biddingBox}
				</div>
			</div>
		);
	}
}
