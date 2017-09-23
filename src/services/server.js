import * as cardplayStrategy from "../../origsrc/model/strategy/cardplay/dds-strategy";
import * as biddingStrategy from "../../lib/js/src/model/strategy/bidding/biddingStrategy";

/* Workaround for jrpc not being able to send falsy values */
/* TODO - replace jrpc! */
export default {
	getCard: function (board) { return cardplayStrategy.getCard(board).then(card => ({ payload: card })); },
	getBid: function (board) { return biddingStrategy.getBid(board).then(bid => ({ payload: bid })) }
};
