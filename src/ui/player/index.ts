/// <reference path="../../_references.d.ts" />

require("angular/bower-angular");

export var Module: ng.IModule = angular.module("tower.ui.player", []);

import playerDirective = require("./player-directive");
import biddingBoxDirective = require("./bidding-box-directive");
import handDirective = require("./hand-directive");

Module.directive("towerPlayer", playerDirective);
Module.directive("towerBiddingBox", biddingBoxDirective);
Module.directive("towerHand", handDirective);
