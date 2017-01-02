/* @flow */

import React, {PropTypes} from 'react';
import {PureComponent} from 'react-pure-render';

import BidComponent from '../components/bid.jsx';
import {Seat} from '../../model/core/seat';

if (process.env.__BROWSER__) {
	require('./bidding-history.css');
}

class BiddingHistory extends PureComponent {

	constructor(props) {
		super(props);
	}

	static propTypes = {
		board: PropTypes.object.isRequired
	};

	render() {
		let headings = [];

		for (let seat = Seat.North; seat <= Seat.West; seat ++) {
			headings.push(
				<th key={seat} className="bidding-cell">{Seat.name(seat)}</th>
			);
		}

		let rows = [];

		for (let i = 0; i < 6; i ++) {
			let cells = [];

			for (let j = 0; j < 4; j ++) {
				let position = (i * 4) + j;

				if (this.props.board.bids.length > position) {
					let bid = this.props.board.bids[position];
					cells.push(
						<td key={position} className="bidding-cell">
							<BidComponent bid={bid}/>
						</td>
					);
				}
				else {
					cells.push(<td key={position} className="bidding-cell"></td>);
				}
			}
			rows.push(
				<tr key={i} className="bidding-round">
					{cells}
				</tr>
			);
		}

		return (
			<table className="bidding-container pure-table">
				<thead>
					<tr>{headings}</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
}

export default BiddingHistory;
