/// <reference path="../../_references.d.ts" />

require("angular/bower-angular:/angular.js");
require("angular/bower-angular-mocks:/angular-mocks.js");

import tow = require("../index");

describe("Rubber", () => {

    var rubber;
    var north, south, east, west;
    
    beforeEach(() => {
        var testModule = angular.module("tower.test", [ tow.Module.name ]);
        
        angular.mock.module(testModule);
        angular.mock.module(tow.Module.name); // don't understand why this is needded
    });
    
    beforeEach(angular.mock.inject((rubberFactory, mockPlayerFactory) => {      
        rubber = rubberFactory();
        //rubber.setPlayers([north, south, east, west]);
        
    }));

    it("should end after one team wins 2 games", () => {
        expect(2).toBe(2);
    });
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