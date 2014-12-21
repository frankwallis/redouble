/// <reference path="../_references.d.ts" />

require("angular.js");
require("components-angular.js/angular-mocks.js");

import Deck = require('./deck');

//describe("Deck", () => {
//
//     var deck;
//
//     beforeEach(() => {
//         deck = new Deck();
//     });
//
//     it("should deal the cards", () => {
//         var hands = deck.deal(4);
//
//         expect(hands.length).toBe(4);
//
//         hands.forEach((hand) => {
//                 expect(hand.availableCards.length).toBe(13);
//             })
//     });
//
//     it("should shuffle the cards", () => {
//         var origHands = deck.deal(4);
//         deck.shuffle();
//         var newHands = deck.deal(4);
//
//         expect(newHands.length).toBe(4);
//
//         for (var i = 0; i < newHands.length; i++) {
//             for (var j = 0; j < newHands[i].availableCards.length; j ++) {
//
//             }
//         }
//     });        
// });
