import {CardplayStrategy} from "../../model/strategy/cardplay/dds-strategy";
import {CardplayStrategy as ProxyStrategy} from "../../model/strategy/cardplay/proxy-strategy";

let strategy = new CardplayStrategy();

export function getCard(boardState) {
	return strategy.getCard(boardState);
}

export function getContract(boardState) {
	return strategy.getContract(boardState);
}
