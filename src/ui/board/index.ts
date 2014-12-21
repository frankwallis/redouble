/// <reference path="../../_references.d.ts" />

require("angular.js");

export var Module: ng.IModule = angular.module("tower.ui.board", [ "tower.ui.cards" ]);

Module.directive("towerBoard", require("./board-directive"));
Module.directive("towerTrick", require("./trick-directive"));
Module.directive("towerRound", require("./round-directive"));
Module.directive("towerBid", require("./bid-directive"));
