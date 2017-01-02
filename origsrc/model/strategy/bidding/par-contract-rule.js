/* @flow */
import {Seat} from "../../core/seat";
import {Bid, BidSuit, BidType} from "../../core/bid";
import {BoardQuery} from "../../game/board-query";

import * as queries from "./bidding-queries";
import * as dds from "dds-node-adapter";

// TODO - should allow contracts which score better than the current one.
export function filter(bid, board, vulnerability, context) {
	if (!context.parContract)
		context.parContract = getParContract(board, vulnerability);

	return context.parContract
		.then((parContract) => {
			console.log("Got " + JSON.stringify(parContract));
			return ((bid.type === BidType.Call) && (Bid.compare(bid, parContract) < 0))
		});
}

function getParContract(board, vulnerability) {
	let pbn = board.toPBN();

	//let side = Seat.IsNorthSouth(board.nextPlayer) ? 0 : 1;

	return dds.calcResultTable(pbn)
		.then(resultTable => {
			return dds.par(resultTable, vulnerability);
		})
		.then(result => {
			console.log("Got " + JSON.stringify(result));
			return Bid.fromPBN(result.parContractsString[0].split(" ")[1]);
		});
}
