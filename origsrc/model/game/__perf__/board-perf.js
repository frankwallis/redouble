import {Board} from '../board-state';

let board = Board.create();
let states = [];

global.gc();
console.time("board");
let startMem = process.memoryUsage();

board = board
   .makeBid("1H")
   .makeBid("no bid")
   .makeBid("no bid")
   .makeBid("no bid");

while(!board.playHasEnded) {
   states.push(board); // prevent gc
   let card = board.legalCards[0];
   board = board.playCard(card);
}

console.timeEnd("board");
let totalMem = process.memoryUsage();
global.gc();
let endMem = process.memoryUsage();

console.log("Memory used: " + (endMem.heapUsed - startMem.heapUsed));
console.log("Total used: " + (totalMem.heapUsed - startMem.heapUsed));
console.log("Memory start: " + JSON.stringify(startMem));
console.log("Memory end: " + JSON.stringify(endMem));
