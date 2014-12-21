/// <reference path="../../_references.d.ts" />

function pipNameFilter() {
    return function(pip: tower.Pip): string {
        switch(pip) {
            case tower.Pip.Ace: return "A";
            case tower.Pip.King: return "K";
            case tower.Pip.Queen: return "Q";
            case tower.Pip.Jack: return "J";
            default: return pip.toString();
        }
    }
}
 
export = pipNameFilter;