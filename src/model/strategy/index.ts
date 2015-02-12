/// <reference path="../../_references.d.ts" />

import angular = require("angular");

export var Module: ng.IModule = angular.module("tower.model.strategy", [

]);

import BiddingStrategy = require("./bidding/bidding-strategy");
import OpenerStrategy = require("./bidding/opener-strategy");
import ResponderStrategy = require("./bidding/responder-strategy");

Module.service("biddingStrategy", BiddingStrategy);
Module.service("openerStrategy", OpenerStrategy);
Module.service("responderStrategy", ResponderStrategy);

import CardplayStrategy = require("./cardplay/cardplay-strategy");

Module.service("cardplayStrategy", CardplayStrategy);
