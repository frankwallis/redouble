/// <reference path="../../_references.d.ts" />

import angular = require("angular");

export var Module: ng.IModule = angular.module("tower.model.players", [

]);

import mock = require("./mock");
Module.factory("mockBidderFactory", mock.bidderFactory);
Module.factory("mockPlayerFactory", mock.playerFactory);
