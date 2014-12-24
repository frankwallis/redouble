/// <reference path="../../_references.d.ts" />

require("components/angular.js");

export var Module: ng.IModule = angular.module("tower.ui.board", [ "tower.ui.cards" ]);

import boardDirective = require("./board-directive");
import trickDirective = require("./trick-directive");
import roundDirective = require("./round-directive");
import bidDirective = require("./bid-directive");

Module.directive("towerBoard", boardDirective);
Module.directive("towerTrick", trickDirective);
Module.directive("towerRound", roundDirective);
Module.directive("towerBid", bidDirective);
