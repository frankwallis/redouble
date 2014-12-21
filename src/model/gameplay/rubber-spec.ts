/// <reference path="../../_references.d.ts" />

require("angular.js");
require("components-angular.js/angular-mocks.js");

import tow = require("../index");

describe("Rubber", () => {

    var rubber;
    var north, south, east, west;
    
    beforeEach(() => {
        var testModule = angular.module("tower.test", [ tow.Module.name ]);
        
        angular.mock.module(testModule);
    });
    
    beforeEach(angular.mock.inject((rubberFactory, mockPlayerFactory) => {      
        rubber = rubberFactory();
        rubber.setPlayers([north, south, east, west]);
        rubber.setInitialPlayer(north);
    }));

//    it("should end after one team wins 2 games", () => {
//
//    });
//
//    it("should rotate the dealer", () => {
//
//    });
//
//    it("should notify after each card played", () => {
//
//    });
//
});
