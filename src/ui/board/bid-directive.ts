/// <reference path="../../_references.d.ts" />

function towerBidDirective() {
    return {
        restrict: "EA",
        name: "towerBid",
        transclude: false,
        replace: true,
        scope: {
            bid: "="
        },
        template: require('./bid-view.html.js!html')
    }
};
 
export = towerBidDirective;