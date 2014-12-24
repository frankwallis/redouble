/// <reference path="../../_references.d.ts" />

require("components/angular.js");

export var Module: ng.IModule = angular.module("tower.ui.player", []);

import playerDirective = require("./player-directive");

Module.directive("towerPlayer", playerDirective);
