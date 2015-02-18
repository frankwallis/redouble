/// <reference path="../../_references.d.ts" />

import {ValueConverter} from 'aurelia-framework';

export class TowerPipNameValueConverter {
  static metadata(){ return [new ValueConverter("towerPipName")]; }

  toView(value: tower.Pip, option){
    switch(value) {
        case tower.Pip.Ace: return "A";
        case tower.Pip.King: return "K";
        case tower.Pip.Queen: return "Q";
        case tower.Pip.Jack: return "J";
        default: return value.toString();
    }
  }

  fromView(value, option){
    throw new Error("unimplemented");
  }
}
