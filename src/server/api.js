
import * as dds from "dds-node-adapter";
import {Suit, Card} from "../model/core/card";
import {BidSuit} from "../model/core/bid";
import {Seat} from "../model/core/seat";
import {BoardQuery} from "../model/game/board-query";

dds.setMaxThreads(4);

export function getNextCard(boardState) {
	let board = new BoardQuery(boardState);

	let trump = convertBidSuit(board.trumpSuit);
	let first = convertSeat(board.previousTrickWinner || board.leader);

	let trick = board.currentTrick;
	let currentTrickRank = [];
	let currentTrickSuit = [];

	for (let i = 0; i < trick.length; i ++) {
		currentTrickRank.push(trick[i].card.pip);
		currentTrickSuit.push(convertSuit(trick[i].card.suit));
	}

	let remainCards = convertToPBN(board);

	let deal = { trump, first, currentTrickRank, currentTrickSuit, remainCards };
	let options = {
		target: dds.TARGET_MAXIMUM,
		solutions: dds.SOLUTION_FULL,
		mode: dds.MODE_AUTO_SEARCH
	};

	//console.log(JSON.stringify(deal));

	return dds.solveBoard(deal, options)
		.then((results, err) => {
		//	console.log("got " + JSON.stringify(results));
			return chooseCard(results);
		});
}

function chooseCard(results) {
	return {
		pip: results.rank[0],
		suit: convertFromSuit(results.suit[0])
	};
}

function convertBidSuit(suit) {
	if (suit === BidSuit.Spades)
		return dds.SUIT_SPADES;
	else if (suit === BidSuit.Hearts)
		return dds.SUIT_HEARTS;
	else if (suit === BidSuit.Diamonds)
		return dds.SUIT_DIAMONDS;
	else if (suit === BidSuit.Clubs)
		return dds.SUIT_CLUBS;
	else if (suit === BidSuit.NoTrumps)
		return dds.SUIT_NOTRUMPS;
	else
		throw new Error(`unrecognised suit ${suit}`);
}

function convertSuit(suit) {
	if (suit === Suit.Spades)
		return dds.SUIT_SPADES;
	else if (suit === Suit.Hearts)
		return dds.SUIT_HEARTS;
	else if (suit === Suit.Diamonds)
		return dds.SUIT_DIAMONDS;
	else if (suit === Suit.Clubs)
		return dds.SUIT_CLUBS;
	else
		throw new Error(`unrecognised suit ${suit}`);
}

function convertFromSuit(ddsSuit) {
	if (ddsSuit === dds.SUIT_SPADES)
		return Suit.Spades;
	else if (ddsSuit === dds.SUIT_HEARTS)
		return Suit.Hearts;
	else if (ddsSuit === dds.SUIT_DIAMONDS)
		return Suit.Diamonds;
	else if (ddsSuit === dds.SUIT_CLUBS)
		return Suit.Clubs;
	else
		throw new Error(`unrecognised suit ${ddsSuit}`);
}

function convertSeat(seat) {
	if (seat === Seat.North)
		return dds.HAND_NORTH;
	else if (seat === Seat.South)
		return dds.HAND_SOUTH;
	else if (seat === Seat.East)
		return dds.HAND_EAST;
	else if (seat === Seat.West)
		return dds.HAND_WEST;
	else
		throw new Error(`unrecognised seat ${seat}`);
}

function convertToPBN(board) {
	var result = Seat.name(board.dealer)[0].toUpperCase() + ':';

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

