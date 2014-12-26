/// <reference path="../../_references.d.ts" />

require("angular/bower-angular:/angular.js");
require("angular/bower-angular-mocks:/angular-mocks.js");

import Deck = require('./deck');

describe("Deck", () => {

    var deck;

    beforeEach(() => {
        deck = new Deck();
    });

    it("should deal 4 hands of 13 cards", () => {
        var hands = deck.deal(4);

        expect(hands.length).toBe(4);

        hands.forEach((hand) => {
                expect(hand.length).toBe(13);
            })
    });

    it("should shuffle the cards", () => {
        var origHands = deck.deal(4);
        deck.shuffle();
        var newHands = deck.deal(4);

        expect(newHands.length).toBe(4);

        var different = false;

        for (var i = 0; i < newHands.length; i++) {
            for (var j = 0; j < newHands[i].length; j ++) {
                if (newHands[i][j] != origHands[i][j])
                    different = true;
            }
        }

        expect(different).toBeTruthy();
    });        
});

