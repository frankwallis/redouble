/* @flow */

import React from 'react';
import {BidComponent} from '../components/bid.jsx';
import {BidSuit, BidType} from '../../model/core/bid';
import {GameActions} from '../../stores/game-store';

export class BiddingBox extends React.Component {

	constructor(props) {
		super(props);
		console.log('created bidding-box');
	}

	bidButton(bid, colspan: number) {
		return (
			<td key={BidComponent.key(bid)} className="bidding-box-cell" colSpan={colspan}>
				<button className="bidding-box-button pure-button"
							onClick={() => this.makeBid(bid)}>
					<BidComponent bid={bid}/>
				</button>
			</td>
		);
	}

	makeBid(bid) {
		console.log('in makeBid');
		GameActions.makeBid(bid);
	}

	render() {
		console.log('rendering bidding-box');
		let levels = [];
		for (let i = 1; i <= 7; i++) {
			let cells = [];
			for (let s = BidSuit.Clubs; s <= BidSuit.NoTrumps; s ++) {
				cells.push(this.bidButton({type: BidType.Call, suit: s, level: i}, 2));
			}

			levels.push(<tr key={i} className="bidding-box-level">{cells}</tr>);
		}
		let modButtons = [
			this.bidButton({type: BidType.Double}, 3),
			this.bidButton({type: BidType.Redouble}, 3),
			this.bidButton({type: BidType.NoBid}, 4)
		];

		levels.push(
			<tr key="bottom" className="bidding-box-level">
				{modButtons}
			</tr>
		);

		return (
			<div className="bidding-box-container">
				<table>
					<colgroup>
						<col span="1" style={{width: '10%'}}></col>
						<col span="1" style={{width: '10%'}}></col>
						<col span="1" style={{width: '10%'}}></col>
						<col span="1" style={{width: '10%'}}></col>
						<col span="1" style={{width: '10%'}}></col>
						<col span="1" style={{width: '10%'}}></col>
						<col span="1" style={{width: '10%'}}></col>
						<col span="1" style={{width: '10%'}}></col>
						<col span="1" style={{width: '10%'}}></col>
						<col span="1" style={{width: '10%'}}></col>
					</colgroup>
						<tbody>
							{levels}
						</tbody>
				</table>
			</div>
		);
	}
}
