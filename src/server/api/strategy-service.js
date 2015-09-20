import {CardplayStrategy} from "../../model/strategy/cardplay/dds-strategy";

let strategy = new CardplayStrategy();

export function getCard(boardState) {
	return strategy.getCard(boardState);
}
