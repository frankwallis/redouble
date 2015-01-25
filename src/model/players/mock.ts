/// <reference path="../../_references.d.ts" />

import Hand = require("./hand");
import Player = require("./player");

class MockPlayer extends Player {

    public static $inject = [ "$q", "name", "deck" ];
    
    constructor($q: ng.IQService,
                public name: string,
                private deck: any) {   
         super($q, name);
    }

    private bids: Array<tower.IBid>;

    public setBids(bids): MockPlayer {
        this.bids = bids;
        return this;
    }

    public bid(game: tower.IGame): ng.IPromise<tower.IBid> {
		var result = this.$q.defer<tower.IBid>();
        var bid = { type: tower.BidType.NoBid };
        
        if (this.bids && (this.bids.length > 0)) {
            bid = this.bids[0];
            this.bids = this.bids.slice(1);
        }
        
        console.log("seat " + this.seat + " " + JSON.stringify(bid));
        
        result.resolve(bid);
		return result.promise;
	}

	public play(game: tower.IGame): ng.IPromise<tower.ICard> {
		var result = this.$q.defer<tower.ICard>();
        var trick = game.currentBoard.cardplay.currentTrick;
        var selectedCard = this.getAnyCard(trick.leadCard);
        this.hand.play(selectedCard);
        result.resolve(selectedCard);
		return result.promise;
	}
    
    private getAnyCard(lead: tower.ICard) {
        if (lead) {
            for (var i = 0; i < this.hand.availableCards.length; i ++)
                if (this.hand.availableCards[i].suit == lead.suit)
                    return this.hand.availableCards[0];
        }
        
        return this.hand.availableCards[0];
    }
}

export var bidderFactory = [ "$injector", ($injector) => {    
    return (northBids: Array<any>, eastBids: Array<any>, 
            southBids: Array<any>, westBids: Array<any>) => {
        var north: MockPlayer = $injector.instantiate(MockPlayer);
        north.setBids(northBids.map(convertBid));
        
        var east: MockPlayer = $injector.instantiate(MockPlayer);
        east.setBids(eastBids.map(convertBid));
        var south: MockPlayer = $injector.instantiate(MockPlayer);
        south.setBids(southBids.map(convertBid));
        var west: MockPlayer = $injector.instantiate(MockPlayer);
        west.setBids(westBids.map(convertBid));
        
        return [ north, east, south, west ];
    }
}];

export var playerFactory = [ "$injector", ($injector) => {    
    return (northCards: Array<any>, eastCards: Array<any>, 
            southCards: Array<any>, westCards: Array<any>) => {
      
        if (!westCards) {
            this.deck.shuffle();
            
            return this.deck.deal(4)
                .map((cards) => $injector.instantiate(MockPlayer).setCards(cards))
        }
        else {
            var north: MockPlayer = $injector.instantiate(MockPlayer);
            north.setCards(northCards.map(convertCard));
            var east: MockPlayer = $injector.instantiate(MockPlayer);
            east.setCards(eastCards.map(convertCard));
            var south: MockPlayer = $injector.instantiate(MockPlayer);
            south.setCards(southCards.map(convertCard));
            var west: MockPlayer = $injector.instantiate(MockPlayer);
            west.setCards(westCards.map(convertCard));

            return [ north, east, south, west ];
        }
    }
}];

//var playerFactory = [ "$injector", ($injector) => {    
//    return (bids: Array<any>, cards: Array<tower.ICard>) => {
//        var player: MockPlayer = $injector.instantiate(MockPlayer);
//        player.setBids(bids.map(convertBid));
//        player.setHand(new Hand(cards));
//        return player;
//    }
//}];

function convertCard(str): tower.ICard {
    return { suit: convertSuit(str), pip: convertPip(str) };
}

function convertBid(str): tower.IBid {
    if ((str.toLowerCase() == "pass") || (str.toLowerCase() == "nobid"))
        return { type: tower.BidType.NoBid };
    else if (str.toLowerCase() == "double")
        return { type: tower.BidType.Double };
    else if (str.toLowerCase() == "redouble")
        return { type: tower.BidType.Redouble };
    else
        return { type: tower.BidType.Call, suit: convertSuit(str), level: convertLevel(str) };
}

function convertLevel(str: string): number {
    str = str.slice(0, str.length -1);
    console.log('parsing ' + str);
    return parseInt(str);
}

function convertPip(str: string): tower.Pip {
    str = str.slice(0, str.length -1);
    console.log('parsing ' + str);
    
    if (str == 'K')
        return tower.Pip.King;
    else if (str == 'A')
        return tower.Pip.Ace;
    else if (str == 'Q')
        return tower.Pip.Queen;
    else if (str == 'J')
        return tower.Pip.Jack;
    else if (str == 'T')
        return tower.Pip.Ten;
    else
        return parseInt(str);
}

function convertSuit(str: string): number {
    str = str[str.length - 1];
    
    if (str.toLowerCase() == "s")
        return tower.BidSuit.Spades;
    else if (str.toLowerCase() == "d")
        return tower.BidSuit.Diamonds;
    else if (str.toLowerCase() == "h")
        return tower.BidSuit.Hearts;
    else if (str.toLowerCase() == "c")
        return tower.BidSuit.Clubs;
    else if (str.toLowerCase() == "n")
        return tower.BidSuit.NoTrumps;
    else
        throw new Error("unrecognised bidding suit [" + str + "]");
}
