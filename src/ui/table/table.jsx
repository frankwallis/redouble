/* @flow */

import React, {PropTypes} from 'react';
import {PureComponent} from 'react-pure-render';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Seat} from "../../model/core/seat";
import {ControlBar} from "./control-bar.jsx";
import {HandComponent} from "./hand.jsx";
import {BiddingBox} from "./bidding-box.jsx";
import {BiddingHistory} from "./bidding-history.jsx";
import {TrickComponent} from "./trick.jsx";

import {
	playCard, makeBid,
	back, forward, jumpBack, pause, resume
} from "../../stores/game-actions";

import './table.css';

/**
 * Top-Level View for displaying the current game from the GameStore
 */
@connect(state => {
	return {
		history: state.gameStore.history,
		autoPlay: state.gameStore.autoPlay,
		players: state.playerStore
	};
})
export class Table extends PureComponent {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		history: PropTypes.object.isRequired,
		autoPlay: PropTypes.boolean.isRequired,
		players: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired
	};

	componentWillMount() {
		this.props.dispatch(resume());
	}

	render() {
		let history = this.props.history;
		let game = this.props.history.current();

		let controlBar = (
			<ControlBar {...bindActionCreators({back, forward, jumpBack, pause, resume}, this.props.dispatch)}
				canBack={history.canBack()} canForward={history.canForward()} canJumpBack={history.canJumpBack()}
				canPause={this.props.autoPlay} canResume={!this.props.autoPlay} />
		);

		let players = Seat.all().map((seat) => {
			return (
				<section className={"table-edge-" + Seat.name(seat)} key={seat}>
					<header className="table-player-name">{this.props.players[seat].name}</header>
					<div className={"table-hand-" + Seat.name(seat)}>
						<HandComponent seat={seat} board={game.currentBoard}
							{...bindActionCreators({playCard}, this.props.dispatch)} />
					</div>
				</section>
			);
		});

		let board = game.currentBoard.biddingHasEnded ?
			<TrickComponent board={game.currentBoard}/> :
			<BiddingHistory board={game.currentBoard}/>;

		let biddingBox = game.currentBoard.biddingHasEnded ?
			undefined :
			<BiddingBox className="table-bidding-box" game={game}
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
