/* @flow */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {updatePlayer} from '../../stores/player-actions';
import {Seat} from '../../model/core/seat';
import './settings.css';

/**
 * Top-Level view for the game settings
 */
@connect(state => {
	return {
		players: state.playerStore
	};
})
export class SettingsView extends Component {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		dispatch: PropTypes.func.isRequired,
		players: PropTypes.object.isRequired
	};

	handleChangeName(seat, event) {
		let target = event.target || event.currentTarget; // issue in react 0.14 beta
		let action = updatePlayer(seat, {name: target.value});
		this.props.dispatch(action);
	}

	handleChangeHuman(seat, event) {
		let target = event.target || event.currentTarget; // issue in react 0.14 beta
		let action = updatePlayer(seat, {ishuman: !target.checked});
		this.props.dispatch(action);
	}

	render() {
		console.log('rendering setings');

		let players = Seat.all().map((seat) => {
			return (
				<li className="settings-player" key={seat}>
					<h3 className="settings-player-header">{Seat.name(seat)}</h3>
					<div className="settings-field">
						<label className="settings-label"
									htmlFor={"name-input-" + Seat.name(seat)}>Name</label>
						<input className="settings-input-name"
									type="text" id={"name-input-" + Seat.name(seat)}
									defaultValue={this.props.players[seat].name}
									onChange={(event) => this.handleChangeName(seat, event)}></input>
					</div>
					<div className="settings-field">
						<label className="settings-label"
									htmlFor={"human-input-" + Seat.name(seat)}>Automatic</label>
						<input className="settings-input-human"
									type="checkbox" id={"human-input-" + Seat.name(seat)}
									defaultChecked={!this.props.players[seat].ishuman}
									onChange={(event) => this.handleChangeHuman(seat, event)}></input>
					</div>
				</li>
			);
		});

		return (
			<div className="settings-container">
				<ul className="settings-players">
					{players}
				</ul>
			</div>
		);
	}
}
