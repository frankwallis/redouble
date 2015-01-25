/// <reference path="../_references.d.ts" />

require("angular");

export var Module: ng.IModule = angular.module("tower.model.gameplay", [ 

]);

import biddingFactory = require("./bidding");
import trickFactory = require("./trick");
import cardplayFactory = require("./cardplay")
import boardFactory = require("./board");
import rubberFactory = require("./rubber");

Module.factory("biddingFactory", biddingFactory);
Module.factory("trickFactory", trickFactory);
Module.factory("cardplayFactory", cardplayFactory);
Module.factory("boardFactory", boardFactory);
Module.factory("rubberFactory", rubberFactory);