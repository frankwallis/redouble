/// <reference path="../../_references.d.ts" />

import {rotate} from "./utils"

export class Trick {

    constructor() {
      this.cards = [,,,];
    }

    async play(players: Array<tower.IPlayer>, initialPlayer: tower.Seat) {
      this.players = players;
      this.initialPlayer = initialPlayer;

      var current = initialPlayer;

      while(!this.playHasEnded()) {
        let card = await players[current].play();
        this.cards[current] = card;
        current = rotate(current);
      }
    }

    get northCard(): tower.ICard {
      return this.cards[tower.Seat.North];
    }

    get southCard(): tower.ICard {
      return this.cards[tower.Seat.South];
    }

    get eastCard(): tower.ICard {
      return this.cards[tower.Seat.East];
    }

    get westCard(): tower.ICard {
      return this.cards[tower.Seat.West];
    }

    get leadCard(): tower.ICard {
      return this.cards[this.initialPlayer.seat];
    }

    cards: Array<tower.ICard>;

    get winner(): tower.IPlayer {
        // TODO
        return this.initialPlayer;
    }

    playHasEnded(): boolean {
        return !!this.northCard && !!this.southCard && !!this.eastCard && !!this.westCard;
    }
}
