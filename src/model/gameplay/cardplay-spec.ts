/// <reference path="../../_references.d.ts" />

require("angular/bower-angular");
require("angular/bower-angular-mocks");

import tow = require("../index");

describe("cardplay", () => {

    var cardplayFactory: () => tower.ICardplay;
    var mockPlayerFactory: () => Array<tower.IPlayer>
    var north, south, east, west;
    
    beforeEach(() => {
        var testModule = angular.module("tower.test", [ tow.Module.name ]);
        angular.mock.module(testModule);
        angular.mock.module(tow.Module.name);
   });
    
    beforeEach(angular.mock.inject((_cardplayFactory_, _mockPlayerFactory_) => {      
        cardplayFactory = _cardplayFactory_;
        mockPlayerFactory = _mockPlayerFactory_;
    }));

    it("should end after 13 tricks", () => {
        var players = mockPlayerFactory();
        var cardplay = cardplayFactory();
        cardplay.setPlayers(players);
        
        cardplay.play(players[0])
            .then(() => {
                expect(cardplay.tricks.length).toBe(13);
            })
    });
//
//    it("should maintain correct playing order", () => {
//
//    });
//
//    it("should notify after each card played", () => {
//
//    });
//
//    it("should not allow cards to be played twice", () => {
//
//    });        
});
