/* @flow */

import React, {Component, PropTypes} from 'react';

import {connect} from 'redux/react';
import {bindActionCreators} from 'redux';

import {Seat} from "../../model/core/seat";
import {Game} from "../../model/game/game-state";

import {ControlBar} from "./control-bar.jsx";
import {HandComponent} from "./hand.jsx";
import {BiddingBox} from "./bidding-box.jsx";
import {BiddingHistory} from "./bidding-history.jsx";
import {TrickComponent} from "./trick.jsx";

import {playCard, makeBid} from "../../stores/game-actions";

import './table.css';

/**
 * Top-Level View for displaying the current game from the GameStore
 */
@connect(state => {
	return {
		game: new Game(state.gameStore),
		players: state.playerStore
	};
})
export class Table extends Component {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		game: PropTypes.object.isRequired,
		players: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired
  	};

	render() {
		let controlBar = <div/>;//<ControlBar actions={this.actions}/>;

		let players = Seat.all().map((seat) => {
			return (
				<section className={"table-edge-" + Seat.name(seat)} key={seat}>
					<header className="table-player-name">{this.props.players[seat].name}</header>
					<div className={"table-hand-" + Seat.name(seat)}>
						<HandComponent seat={seat} board={this.props.game.currentBoard}
							{...bindActionCreators({playCard}, this.props.dispatch)} />
					</div>
				</section>
			);
		});

		let board = this.props.game.currentBoard.biddingHasEnded ?
			<TrickComponent board={this.props.game.currentBoard}/> :
			<BiddingHistory board={this.props.game.currentBoard}/>;

		let biddingBox = this.props.game.currentBoard.biddingHasEnded ?
			undefined :
			<BiddingBox className="table-bidding-box" game={this.props.game}
				{...bindActionCreators({makeBid}, this.props.dispatch)} />;

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
