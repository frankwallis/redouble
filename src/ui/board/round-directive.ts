/// <reference path="../../_references.d.ts" />

function towerRoundDirective() {
    return {
        restrict: "EA",
        name: "towerRound",
        transclude: false,
        replace: false,
        scope: {
            round: "="
        },
        template: require('./round-view.html')
    }
};
 
export = towerRoundDirective;