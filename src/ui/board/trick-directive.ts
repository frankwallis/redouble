/// <reference path="../../_references.d.ts" />

function towerTrickDirective() {
    return {
        restrict: "EA",
        name: "towerTrick",
        transclude: false,
        replace: true,
        scope: {
            trick: "="
        },
        template: require('./trick-view.html.js!html')
    }
};
 
export = towerTrickDirective;