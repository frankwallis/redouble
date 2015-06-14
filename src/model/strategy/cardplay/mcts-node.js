import {Card} from "../../core/card";
import {Seat} from "../../core/seat";

export class Node {
	constructor(parent, game, card, depth) {
		this.game = game;
		this.parent = parent;
		this.card = card;
		this.tricks = [];
		this.visits = 0;
		this.children = null;
		this.depth = depth || 0;
	}

	visit() {
		//console.log('visiting ' + JSON.stringify(this.card));
		this.ensureChildren();
		this.visits += 1;
		//console.log('visit ' + this.visits);
		if (this.children.length > 0) {
			let nextChild = this.selectNode();
			let declarerTricks = nextChild.visit();
			this.tricks.push(declarerTricks);
			return declarerTricks;
		}
		else {
			let declarerTricks = this.game.declarerTricks;
			this.tricks.push(declarerTricks);
			return declarerTricks;			
		}
	}
	
	selectNode() {
		let nodeSort = function (node1, node2) {
	      return node2.getUCB1() - node1.getUCB1();
		};

//		this.children.forEach((child) => {
//			console.log("child " + JSON.stringify(child.card) + ' = ' + child.getUCB1());
//		})
		// shuffle because sortBy is a stable sort but we want equal nodes to be chosen randomly
		return this.children.sort(nodeSort)[0];
	}
	
	getUCB1() {
		if (this.visits == 0) return Number.MAX_VALUE;
	  	// See https://en.wikipedia.org/wiki/Monte_Carlo_tree_search#Exploration_and_exploitation
		let wins = 0;
		
		if ((this.game.nextPlayer == this.game.declarer) || Seat.isPartner(this.game.nextPlayer, this.game.declarer))
			wins = this.tricks.filter((trickCount) => trickCount < this.game.lastCall.level).length;
		else		
			wins = this.tricks.filter((trickCount) => trickCount >= this.game.lastCall.level).length;
		
	  	return (wins / this.visits) + Math.sqrt(2 * Math.log(this.parent.visits) / this.visits);
	}
	
	get totalTricks() {
		return this.tricks.reduce((total, trickCount) => total + trickCount, 0);
	}

	ensureChildren() {
		if (this.children === null) {
			let availableCards = this.getAvailableCards();		
			
	    	this.children = availableCards.map((card) => new Node(this, this.game.playCard(card), card));
	  	}
	}

	seek(playedCards) {
		if (playedCards.length == 0) {
			return this;
		}
		else {
			let child = this.children.find((child) => Card.equals(child.card, playedCards[0].card));
			return child.seek(playedCards.slice(1));
		} 
	}
	
	getAvailableCards() {
		// TODO - some cards are visible, some cards are not.
		return this.game.legalCards;
	}
	
	bestCard() {
		return this.children.sort((child1, child2) => child1.visits - child2.visits)[0].card;
	}
}