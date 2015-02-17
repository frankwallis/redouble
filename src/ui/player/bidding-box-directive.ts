/// <reference path="../../_references.d.ts" />

import BiddingBoxController = require("./bidding-box-controller");

function towerBiddingBoxDirective() {
    return {
        restrict: "EA",
        name: "towerBiddingBox",
        transclude: false,
        replace: true,
        scope: {
            bidding: "=",
            player: "="
        },
        template: require('./bidding-box-view.html.js!html'),
        controller: BiddingBoxController,
        controllerAs: "cx"
    }
};

export = towerBiddingBoxDirective;
