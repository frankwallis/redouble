/// <reference path="../_references.d.ts" />

require("angular/bower-angular:/angular.js");

export var Module: ng.IModule = angular.module("tower.model", [ 

]);

import TowerService = require("./tower-service");
import biddingFactory = require("./gameplay/bidding");
import trickFactory = require("./gameplay/trick");
import cardplayFactory = require("./gameplay/cardplay")
import boardFactory = require("./gameplay/board");
import rubberFactory = require("./gameplay/rubber");

Module.service("towerService", TowerService);

Module.factory("biddingFactory", biddingFactory);
Module.factory("trickFactory", trickFactory);
Module.factory("cardplayFactory", cardplayFactory);
Module.factory("boardFactory", boardFactory);
Module.factory("rubberFactory", rubberFactory);

import mock = require("./players/mock");
Module.factory("mockBidderFactory", mock.bidderFactory);
Module.factory("mockPlayerFactory", mock.playerFactory);
