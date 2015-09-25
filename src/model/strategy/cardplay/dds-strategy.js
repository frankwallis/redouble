import {Seat} from "../../core/seat";
import {Suit, Card, Pip} from "../../core/card";
import {BidSuit} from "../../core/bid";
import {BoardQuery} from "../../game/board-query";

import * as dds from "dds-node-adapter";

export function getCard(boardState) {
	let board = new BoardQuery(boardState);

	let trump = BidSuit.toPBN(board.trumpSuit);
	let first = Seat.toPBN(board.previousTrickWinner || board.leader);

	let trick = board.currentTrick;
	let currentTrickRank = [];
	let currentTrickSuit = [];

	for (let i = 0; i < trick.length; i ++) {
		currentTrickRank.push(trick[i].card.pip);
		currentTrickSuit.push(Suit.toPBN(trick[i].card.suit));
	}

	let remainCards = board.toPBN();

	let deal = { trump, first, currentTrickRank, currentTrickSuit, remainCards };
	let options = {
		target: dds.TARGET_MAXIMUM,
		solutions: dds.SOLUTION_FULL,
		mode: dds.MODE_AUTO_SEARCH
	};

	return dds.solveBoard(deal, options)
		.then((solutions, err) => {
			return chooseCard(solutions, board);
		});
}

function chooseCard(solutions, board) {
	let cards = [];

	for(let idx = 0; idx < solutions.cards; idx ++) {
		if (solutions.score[idx] === solutions.score[0]) {
			cards.push({
				pip: solutions.rank[idx],
				suit: Suit.fromPBN(solutions.suit[idx])
			});

			if (solutions.equals[idx]) {
				for (let pip = Pip.Two; pip < Pip.Ace; pip ++) {
					if (solutions.equals[idx] & (1 << pip)) {
						cards.push({
							pip,
							suit: Suit.fromPBN(solutions.suit[idx])
						});
					}
				}
			}
		}
	}

	let leadSuit = (board.currentTrick.length > 0) ? board.currentTrick[0].card.suit : undefined;

	cards.sort((card1, card2) => {
		return Card.compare(card1, card2, board.trumpSuit, leadSuit);
	});

	let lowestCard = cards[0];
	let highestCard = cards[cards.length -1];

	let newTrick = board.currentTrick.map(played => played.card).concat([highestCard]);
	newTrick.sort((card1, card2) => {
		return Card.compare(card1, card2, board.trumpSuit, leadSuit);
	});


	if (Card.compare(newTrick[newTrick.length -1], highestCard) < 0)
		return lowestCard;
	else if (board.currentTrick.length < 2)
		return lowestCard;
	else
		return highestCard;

	return cards[0];
}
