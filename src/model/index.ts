/// <reference path="../../_references.d.ts" />

require("angular.js");

export var Module: ng.IModule = angular.module("tower.model", [ 

]);

Module.service("towerService", require("./tower-service"));

Module.factory("biddingFactory", require("./gameplay/bidding"));
Module.factory("trickFactory", require("./gameplay/trick"));
Module.factory("cardplayFactory", require("./gameplay/cardplay"));
Module.factory("boardFactory", require("./gameplay/board"));
Module.factory("rubberFactory", require("./gameplay/rubber"));

import mock = require("./players/mock");
Module.factory("mockBidderFactory", mock.bidderFactory);
Module.factory("mockPlayerFactory", mock.playerFactory);
