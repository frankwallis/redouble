import { Component, For } from 'solid-js'
import { BidComponent } from '../components/bid.jsx';
import { Bid, BidSuit, BidType } from '../../model/core/bid';
import "./BiddingBox.css"

export interface BiddingBoxProps {
	makeBid: (bid: Bid) => void;
}

export const BiddingBox: Component<BiddingBoxProps> = ({
	makeBid
}) => {
	return (
		<div class="bidding-box-container">
			<For each={[1, 2, 3, 4, 5, 6, 7]}>
				{(level) => (
					<div class="bidding-box-row">
						<For each={BidSuit.all()}>
							{(suit) => (
								<BidButton bid={{ type: BidType.Call, level, suit }} makeBid={makeBid} />
							)}
						</For>
					</div>
				)}
			</For>
			<div class="bidding-box-row">
				<BidButton bid={{ type: BidType.NoBid }} makeBid={makeBid} />
				<BidButton bid={{ type: BidType.Double }} makeBid={makeBid} />
				<BidButton bid={{ type: BidType.Redouble }} makeBid={makeBid} />
			</div>
		</div>
	);
}

interface BidButtonProps {
	bid: Bid;
	makeBid: (bid: Bid) => void;
}

const BidButton: Component<BidButtonProps> = ({
	bid,
	makeBid
}) => {
	return (
		<button class="bidding-box-button pure-button" classList={{
			"bidding-box-button-special": bid.type !== BidType.Call
		}}
			onClick={() => makeBid(bid)}>
			<BidComponent bid={bid} />
		</button>
	);
}
