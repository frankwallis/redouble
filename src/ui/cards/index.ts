/// <reference path="../../_references.d.ts" />

require("angular/bower-angular:/angular.js");

export var Module: ng.IModule = angular.module("tower.ui.cards", []);

import cardDirective = require("./card-directive");
import handDirective = require("./hand-directive");
import suitNameFilter = require("./suit-name-filter");
import pipNameFilter = require("./pip-name-filter");

Module.directive("towerCard", cardDirective);
Module.directive("towerHand", handDirective);
Module.filter("towerSuitName", suitNameFilter);
Module.filter("towerPipName", pipNameFilter);
