/// <reference path="../../_references.d.ts" />

require("angular.js");

export var Module: ng.IModule = angular.module("tower.ui.cards", []);

Module.directive("towerCard", require("./card-directive"));
Module.directive("towerHand", require("./hand-directive"));
Module.filter("towerSuitName", require("./suit-name-filter"));
Module.filter("towerPipName", require("./pip-name-filter"));
