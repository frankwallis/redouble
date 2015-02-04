/// <reference path="../../_references.d.ts" />

function towerPlayerDirective() {
    return {
        restrict: "EA",
        name: "towerPlayer",
        transclude: false,
        replace: true,
        scope: {
            player: "="
        },
        template: require('./player-view.html.js!html')
    }
};
 
export = towerPlayerDirective;