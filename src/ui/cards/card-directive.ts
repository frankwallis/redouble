/// <reference path="../../_references.d.ts" />

function towerCardDirective() {
    return {
        restrict: "EA",
        name: "towerCard",
        transclude: false,
        replace: true,
        scope: {
            card: "="
        },
        template: require('./card-view.html.js!html')
    }
};
 
export = towerCardDirective;