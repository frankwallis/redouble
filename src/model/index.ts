/// <reference path="../_references.d.ts" />

require("angular");

import stgy = require("./strategy/index");
import plyr = require("./players/index");
import gply = require("./gameplay/index");
//var gply = require("./gameplay-async/index.js");

export var Module: ng.IModule = angular.module("tower.model", [ 
    stgy.Module.name, plyr.Module.name, gply.Module.name
]);

import TowerService = require("./tower-service");
import Deck = require("./cards/deck");

Module.service("towerService", TowerService);
Module.service("deck", Deck);