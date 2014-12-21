/// <reference path="../../_references.d.ts" />

require("angular.js");

export var Module: ng.IModule = angular.module("tower.ui.player", []);

Module.directive("towerPlayer", require("./player-directive"));
