/// <reference path="../../_references.d.ts" />

import {Behavior} from 'aurelia-framework';

export class TowerBoard {

    static metadata(){ return Behavior.withProperty('board'); }

    constructor() {
      console.log('creating board');
    }
}
