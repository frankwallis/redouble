import { Component } from 'solid-js'
import { BiddingBox } from './BiddingBox'
import { BiddingHistory } from './BiddingHistory';
import "./Table.css"

export const Table: Component = () => {
	return (
		<div class="bridge-table">
			<div class="table-controls">
				
			</div>
			<div class="table-players">
				players
			</div>
			<div class="table-board">
			   <BiddingHistory />
			</div>
			<div class="table-bidding-box">
				<BiddingBox />
			</div>
		</div>
	)
}
