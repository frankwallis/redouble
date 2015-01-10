/// <reference path="../../_references.d.ts" />

require("angular/bower-angular");

export var Module: ng.IModule = angular.module("tower.ui.cards", []);

import cardDirective = require("./card-directive");
import suitNameFilter = require("./suit-name-filter");
import pipNameFilter = require("./pip-name-filter");

Module.directive("towerCard", cardDirective);
Module.filter("towerSuitName", suitNameFilter);
Module.filter("towerPipName", pipNameFilter);
