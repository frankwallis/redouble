/* @flow */

import React, {PropTypes} from 'react';
import {PureComponent} from 'react-pure-render';

import {connect} from 'redux/react';
import {bindActionCreators} from 'redux';

import {Seat} from "../../model/core/seat";
import {Game} from "../../model/game/game-state";
import {GameHistory} from "../../model/game/game-history";

import {ControlBar} from "./control-bar.jsx";
import {HandComponent} from "./hand.jsx";
import {BiddingBox} from "./bidding-box.jsx";
import {BiddingHistory} from "./bidding-history.jsx";
import {TrickComponent} from "./trick.jsx";

import {
	playCard, makeBid, newGame,
	back, forward, jumpBack, pause, resume
} from "../../stores/game-actions";

import './table.css';

/**
 * Top-Level View for displaying the current game from the GameStore
 */
@connect(state => {
	return {
		game: state.gameStore,
		players: state.playerStore
	};
})
export class Table extends PureComponent {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		game: PropTypes.object.isRequired,
		players: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired
	};

	componentWillMount() {
		this.props.dispatch(newGame());
	}

	render() {
		let history = new GameHistory(this.props.game.history);
		let game = new Game(history.currentGameState());

		let controlBar = (
			<ControlBar {...bindActionCreators({back, forward, jumpBack, pause, resume}, this.props.dispatch)}
				canBack={history.canBack()} canForward={history.canForward()} canJumpBack={history.canJumpBack()}
				canPause={this.props.game.autoPlay} canResume={!this.props.game.autoPlay} />
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
