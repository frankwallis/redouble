/// <reference path="../../_references.d.ts" />

import BiddingController = require("./bidding-controller");

function biddingDirective() {
    return {
        restrict: "EA",
        name: "towerBidding",
        transclude: false,
        replace: false,
        controller: BiddingController,
        controllerAs: "cx",
        scope: {
            bidding: "="
        },
        template: require('./bidding-view.html.js!html')
    }
};
 
export = biddingDirective;