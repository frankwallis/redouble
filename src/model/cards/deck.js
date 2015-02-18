/// <reference path="../../_references.d.ts" />

export class Deck {//implements tower.IDeck {

    constructor() {
    	this.cards = this.createCards();
    }

    cards: Array<tower.ICard>;

    createCards(): Array<tower.ICard> {
    	var result = [];

    	for (var asuit = tower.Suit.Clubs; asuit <= tower.Suit.Spades; asuit++) {
	    	for (var apip = tower.Pip.Two; apip <= tower.Pip.Ace; apip++) {
    				result.push({ suit: asuit, pip: apip });
    		}
    	}

    	return result;
    }

    shuffleCards(array: Array<tower.ICard>): Array<tower.ICard> {
		  var i = array.length, j, swap;

  		while (--i) {
    		j = Math.random() * (i + 1) | 0;
    		swap = array[i];
    		array[i] = array[j];
    		array[j] = swap;
  		}

  		return array;
    }

    shuffle() {
    	this.cards = this.shuffleCards(this.cards);
    }

	  deal(hands: number): any {//Array<Array<tower.ICard> {

  		var current = 0;
  		var result = [];

          while (current < this.cards.length) {
              var hand = current % hands;

  			if (!result[hand])
  				result[hand] = [];

  			result[hand].push(this.cards[current]);

              current ++;
          }

  		return result;
  	}
}
