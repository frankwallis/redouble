/// <reference path="../../_references.d.ts" />

function towerHandDirective() {
    return {
        restrict: "EA",
        name: "towerHand",
        transclude: false,
        replace: true,
        scope: {
            player: "="
        },
        template: require('./hand-view.html.js!html')
    }
};

export = towerHandDirective;
