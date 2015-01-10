/// <reference path="../_references.d.ts" />

require("angular/bower-angular");

import stgy = require("./strategy/index");
import plyr = require("./players/index");

export var Module: ng.IModule = angular.module("tower.model", [ 
    stgy.Module.name, plyr.Module.name
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