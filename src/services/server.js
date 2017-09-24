import * as cardplayStrategy from "../../lib/js/src/model/strategy/cardplay/ddsStrategy";
import * as biddingStrategy from "../../lib/js/src/model/strategy/bidding/biddingStrategy";

/*'payload' is a workaround for jrpc not being able to send falsy values */
/* TODO - replace jrpc! */
export default {
	getCard: function (board) {
    //console.log('getCard', 'Received', JSON.stringify(board, null, 3));
    return cardplayStrategy.getCard(board).then(card => ({ payload: card }));
  },
	getBid: function (board) {
    //console.log('getBid', 'Received', JSON.stringify(board, null, 3));
    return biddingStrategy.getBid(board).then(bid => ({ payload: bid }))
  }
};
