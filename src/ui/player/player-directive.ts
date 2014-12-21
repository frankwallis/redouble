/// <reference path="../../_references.d.ts" />

function towerPlayerDirective() {
    return {
        restrict: "EA",
        name: "towerPlayer",
        transclude: false,
        replace: false,
        scope: {
            player: "="
        },
        template: require('./player-view.html')
    }
};
 
export = towerPlayerDirective;