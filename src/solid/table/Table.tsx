import { Component } from 'solid-js'
import { addGrowl } from '../growl/growlStore'
import { makeBid, gameState } from './gameStore';
import { BiddingBox } from './BiddingBox'
import { BiddingHistory } from './BiddingHistory';
import "./Table.css"

export const Table: Component = () => {
	return (
		<div class="bridge-table">
			<div class="table-controls">
				<button onClick={() => addGrowl({ type: 'error', message: 'hello', title: 'error', timeout: 0 })}>click me </button>
			</div>
			<div class="table-players">
				players
			</div>
			<div class="table-board">
			   <BiddingHistory gameState={gameState}/>
			</div>
			<div class="table-bidding-box">
				<BiddingBox makeBid={makeBid} />
			</div>
		</div>
	)
}
