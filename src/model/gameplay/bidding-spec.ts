/// <reference path="../../_references.d.ts" />

require("angular.js");
require("components-angular.js/angular-mocks.js");
require("./promise-matchers");

import tow = require("../index");

describe("Bidding", () => {

    var biddingFactory: () => tower.IBidding;
    var mockBidderFactory: (northBids, eastBids, southBids, westBids) => Array<tower.IPlayer>;
    var $rootScope: ng.IRootScopeService;
    
    beforeEach(() => {
        console.log(tow.Module.name);
        var testModule = angular.module("tower.test", [ tow.Module.name ]);
        angular.mock.module(testModule);
        angular.mock.module(tow.Module.name);
    });
    
    beforeEach(angular.mock.inject((_biddingFactory_, _mockBidderFactory_, _$rootScope_) => {      
        biddingFactory = _biddingFactory_;
        mockBidderFactory = _mockBidderFactory_;
        $rootScope = _$rootScope_;
    }));

    afterEach(angular.mock.inject(($rootScope) => {
        $rootScope.$digest(); // resolve promises
    }));

    it("should end after 4 passes", () => {
        var players = mockBidderFactory([ "pass", "pass" ], [ "pass", "pass" ], 
                                        [ "pass", "pass" ], [ "pass", "pass" ]);
        var bidding = biddingFactory();
        bidding.setPlayers(players);
        
        bidding.play(players[0])
            .then(() => {
                expect(bidding.bids.length).toBe(4);
            }); 
    });
    
    it("should end after a bid and 3 passes", () => {
        var players = mockBidderFactory([ "pass", "pass" ], [ "pass", "pass" ], [ "pass", "pass" ], [ "1S", "pass" ]);
        var bidding = biddingFactory();

        bidding.setPlayers(players);
        
        bidding.play(players[0])
            .then(() => {
                expect(bidding.bids.length).toBe(7);
            }); 
    });

    it("should ensure bid is higher than previous bid", () => {
        var players = mockBidderFactory([ "1S" ], [ "2H" ], [ "1C" ], [ "pass" ]);
        var bidding = biddingFactory();
        bidding.setPlayers(players);    
        expect(bidding.play(players[0])).toBeRejected();
        
        players = mockBidderFactory([ "1S" ], [ "2H" ], [ "2C" ], [ "pass" ]);
        bidding = biddingFactory();
        bidding.setPlayers(players);    
        expect(bidding.play(players[0])).toBeRejected();

        players = mockBidderFactory([ "1H" ], [ "1S" ], [ "1N" ], [ "2C" ]);
        bidding = biddingFactory();
        bidding.setPlayers(players);    
        expect(bidding.play(players[0])).toBeResolved();
    });
    
    it("should only allow double of an opposing contract", () => {
        var players = mockBidderFactory([ "pass" ], [ "double" ], [ "1C" ], [ "pass" ]);
        var bidding = biddingFactory();
        bidding.setPlayers(players);    
        expect(bidding.play(players[0])).toBeRejected();

        players = mockBidderFactory([ "1D" ], [ "double" ], [ "double" ], [ "pass" ]);
        bidding = biddingFactory();
        bidding.setPlayers(players);    
        expect(bidding.play(players[0])).toBeRejected();

        players = mockBidderFactory([ "pass" ], [ "1S" ], [ "double" ], [ "2C" ]);
        bidding = biddingFactory();
        bidding.setPlayers(players);    
        expect(bidding.play(players[0])).toBeResolved();
        
        // TODO - the opposing stuff
    });

    it("should only allow redouble of an opposing double", () => {
        var players = mockBidderFactory([ "pass" ], [ "redouble" ], [ "1C" ], [ "pass" ]);
        var bidding = biddingFactory();        
        bidding.setPlayers(players);
        expect(bidding.play(players[0])).toBeRejected();
        
        players = mockBidderFactory([ "pass" ], [ "1C" ], [ "redouble" ], [ "pass" ]);
        bidding = biddingFactory();        
        bidding.setPlayers(players);
        expect(bidding.play(players[0])).toBeRejected();

        players = mockBidderFactory([ "pass" ], [ "1C" ], [ "double" ], [ "redouble" ]);
        bidding = biddingFactory();        
        bidding.setPlayers(players);
        expect(bidding.play(players[0])).toBeResolved();
        
        // TODO - the opposing stuff
    });
});
