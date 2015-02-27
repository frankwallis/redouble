/// <reference path="../../_references.d.ts" />

import {Human} from "../players/human";
import {Computer} from "../players/computer";
import {GameStateHelper} from "./game-state-helper";

// function * _play(players) {
//   console.log('playing rubber');
//
//   state = {
//     boards: []
//   }
//
//   var dealer = this.cut();
//   var helper = new GameStateHelper(state);
//
//   while(!helper.gameHasEnded()) {
//     var newstate = yield nextMove();
//     yield * playBoard(state);
//   }
// }
//
// function *playBoard(state) {
//     for (var i = 1; i < 10; i++) {
//       yield i;
//     }
//     // this.boards.push(board);
//     // await board.play(this.players, dealer);
//     // dealer = rotate(dealer);
// }

//implements tower.IGame
export class Rubber {

  constructor() {
    this.players = [ new Computer("player1"), new Computer("player2"), new Human("player3"), new Computer("player4") ];
    this.players.forEach((player, idx) => {
      player.game = this;
      player.seat = idx;
    });
  }

  newGame(): GameStateHelper {
    return new GameStateHelper().newBoard();
  }

  moveBack(): GameStateHelper {

  }

  moveForward() {

  }

  nextState(game: GameStateHelper): Promise<GameStateHelper> {
    console.log('' + game.nextPlayer);
    console.log('' + tower.Seat.North);
    var player = this.players[game.nextPlayer];

    if (game.biddingHasEnded) {
      return player.play(game).then((card) => {
        return game.playCard(card);
      });
    }
    else {
      return player.bid(game).then((bid) => {
        return game.makeBid(bid);
      });
    }
  }

  get north(): tower.IPlayer {
    return this.players[tower.Seat.North];
  }

  get east(): tower.IPlayer {
    return this.players[tower.Seat.East];
  }

  get south(): tower.IPlayer {
    return this.players[tower.Seat.South];
  }

  get west(): tower.IPlayer {
    return this.players[tower.Seat.West];
  }
}
