import { Component, For, Index, Show } from 'solid-js'
import { BidComponent } from '../components/bid.jsx';
import { Seat } from '../../model/core/seat.js';
import { gameStore } from './gameStore';
import "./BiddingHistory.css"

export interface BiddingHistoryProps {
	
}

export const BiddingHistory: Component<BiddingHistoryProps> = () => {
	return (
		<table class="bidding-container pure-table">
			<thead>
				<tr>
					<For each={Seat.all()}>
						{(seat) => <th class="bidding-cell">{Seat.name(seat)}</th>}
					</For>
				</tr>
			</thead>

			<tbody>
			<tr class="bidding-round">
				<For each={gameStore.bids}>
					{(bid) => <td class="bidding-cell"><BidComponent bid={bid} /></td>}
				</For>
				</tr>
				<Index each={[0, 1, 2, 3, 4, 5, 6]}>
					{(rowIdx) => (
						<tr class="bidding-round">
							<Index each={Seat.all()}>
								{(seat) => <td class="bidding-cell"></td>}
							</Index>
						</tr>
					)}
				</Index>
			</tbody>
		</table>
	);
}
