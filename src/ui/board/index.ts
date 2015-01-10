/// <reference path="../../_references.d.ts" />

require("angular/bower-angular");

export var Module: ng.IModule = angular.module("tower.ui.board", [ "tower.ui.cards" ]);

import boardDirective = require("./board-directive");
import trickDirective = require("./trick-directive");
import biddingDirective = require("./bidding-directive");
import bidDirective = require("./bid-directive");

Module.directive("towerBoard", boardDirective);
Module.directive("towerTrick", trickDirective);
Module.directive("towerBidding", biddingDirective);
Module.directive("towerBid", bidDirective);
