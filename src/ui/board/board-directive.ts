/// <reference path="../../_references.d.ts" />

function towerBoardDirective() {
    return {
        restrict: "EA",
        name: "towerBoard",
        transclude: false,
        replace: true,
        scope: {
            board: "="
        },
        template: require('./board-view.html.js!html')
    }
};
 
export = towerBoardDirective;