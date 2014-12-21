/// <reference path="../../_references.d.ts" />

function towerCardDirective() {
    return {
        restrict: "EA",
        name: "towerCard",
        transclude: false,
        replace: false,
        scope: {
            card: "="
        },
        template: require('./card-view.html')
    }
};
 
export = towerCardDirective;