/// <reference path="../../_references.d.ts" />

import Player = require("./player");

class Human extends Player {

    constructor($q: ng.IQService, name: string) {   
         super($q, name);
    }

	public bid(): ng.IPromise<tower.IBid> {
		var result = this.$q.defer<tower.IBid>();

		return result.promise;
	}

	public play(trick: tower.ITrick): ng.IPromise<tower.ICard> {
		var result = this.$q.defer<tower.ICard>();

		return result.promise;
	}
}

export = Human;