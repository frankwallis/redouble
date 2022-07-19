import { Component, For, Show } from 'solid-js'
import { BidComponent } from '../components/bid.jsx';
import { Seat } from '../../model/core/seat.js';
import { GameState } from './gameStore.js';
import "./BiddingBox.css"

export interface BiddingHistoryProps {
	gameState: GameState;
}

export const BiddingHistory: Component<BiddingHistoryProps> = ({
	gameState
}) => {
	const boardState = gameState.boards[gameState.boards.length - 1];

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
				<For each={[0, 1, 2, 3, 4, 5, 6]}>
					{(rowIdx) => (
						<tr class="bidding-round">
							<For each={Seat.all()}>
								{(seat) => {
									const position = (rowIdx * 4) + seat;
									const bid = boardState.bids[position];
									return (<td class="bidding-cell">
										<Show when={bid}>
											<BidComponent bid={bid} />
										</Show>
									</td>)
								}}
							</For>
						</tr>
					)}
				</For>
			</tbody>
		</table>
	);
}
