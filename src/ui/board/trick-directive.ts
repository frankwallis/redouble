/// <reference path="../../_references.d.ts" />

function towerTrickDirective() {
    return {
        restrict: "EA",
        name: "towerTrick",
        transclude: false,
        replace: false,
        scope: {
            trick: "="
        },
        template: require('./trick-view.html')
    }
};
 
export = towerTrickDirective;