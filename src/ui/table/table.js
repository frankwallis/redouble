/// <reference path="../../_references.d.ts" />

import {Rubber} from "../../model/gameplay-async/rubber";

export class Table {

    constructor(game: Rubber) {
      this.game = game;
      console.log('playing table')
      this.game.play()
      	.then((game) => {
				     //$state.go(".result");
      		});
    }

    game: tower.IGame;
}
