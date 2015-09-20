import * as dds from "dds-node-adapter";
import {Suit, Card, Pip} from "../../core/card";
import {BidSuit} from "../../core/bid";
import {Seat} from "../../core/seat";
import {BoardQuery} from "../../game/board-query";

dds.setMaxThreads(4);

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

	let remainCards = convertToPBN(board);

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

	//console.log(JSON.stringify(solutions));
	//console.log(JSON.stringify(cards));
	let leadSuit = (board.currentTrick.length > 0) ? board.currentTrick[0].suit : undefined;

	cards.sort((card1, card2) => {
		if (!leadSuit)
			return Card.compare(card2, card1, board.trumpSuit);
		else
			return Card.compare(card1, card2, board.trumpSuit, leadSuit);
	});

	return cards[0];
}

function convertToPBN(board) {
	var result = Seat.toPBNString(board.dealer) + ':';

	let notPlayed = (card) => !board.hasBeenPlayed(card);

	for (let i = 0; i < 4; i ++) {
		let seat = Seat.rotate(board.dealer, i);
		let cards = board.hands[seat].filter(notPlayed);
		result = result + convertCardsToPBN(cards) + " ";
	}

	return result.trim();
}

function convertCardsToPBN(cards) {
	return Suit.all().reduce((result, suit) => {
		let holding = cards
			.filter((card) => card.suit === suit)
			.sort((card1, card2) => Card.compare(card2, card1))
			.map((card) => Card.pipName(card.pip))
			.join("");

		return result + holding + (suit === Suit.Clubs ? "" : ".");
	}, "");
}
