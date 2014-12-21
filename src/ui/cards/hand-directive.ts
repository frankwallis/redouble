/// <reference path="../../_references.d.ts" />

function towerHandDirective() {
    return {
        restrict: "EA",
        name: "towerHand",
        transclude: false,
        replace: true,
        scope: {
            hand: "="
        },
        template: require('./hand-view.html')
    }
};
 
export = towerHandDirective;