import * as cardplayStrategy from "../model/strategy/cardplay/dds-strategy";
import * as biddingStrategy from "../model/strategy/bidding/dds-strategy";

export default {
	getCard: cardplayStrategy.getCard,
	getBid: biddingStrategy.getBid
};
