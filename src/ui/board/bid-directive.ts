/// <reference path="../../_references.d.ts" />

function towerBidDirective() {
    return {
        restrict: "EA",
        name: "towerBid",
        transclude: false,
        replace: false,
        scope: {
            bid: "="
        },
        template: require('./bid-view.html')
    }
};
 
export = towerBidDirective;