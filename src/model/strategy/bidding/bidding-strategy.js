/* @flow */

import {Bid, BidSuit, BidType} from "../../core/bid";
import {GameQuery} from "../../game/game-query";

import co from "co";
import coArray from "co-array";

import * as openerRule from "./opener-rule";
import * as responderRule from "./opener-rule";
import * as parContractRule from "./par-contract-rule";

export const getBid = co.wrap(generateBid);

const rules = [
	openerRule,
	responderRule,
	parContractRule
];

function * generateBid(gameState) {
	let vulnerability = 0;
	let game = new GameQuery(gameState);

	let context = {};
	let candidates = game.currentBoard.getLegalBids();
	candidates = candidates.filter(bid => bid.type === BidType.Call);

	candidates = yield coArray(candidates)
		.filter(function * (bid) {
			return yield applyRuleFilters(bid, game.currentBoard, vulnerability, context);
		})
		.result;

	candidates = yield * applyConventions(candidates, game.currentBoard, vulnerability, context);

	let bid = choose(candidates);
	return bid;
}

function * applyRuleFilters(bid, board, vulnerability, context) {
	return yield coArray(rules)
		.every(function * (rule) {
			return yield Promise.resolve(rule.filter(bid, board, vulnerability, context));
		})
		.result;
}

function * applyConventions(candidates, board, vulnerability) {
	return candidates;
}

function choose(candidates) {
	console.log(JSON.stringify(candidates));
	if (candidates.length > 0)
		return candidates[0];
	else
		return Bid.create("no bid");
}
