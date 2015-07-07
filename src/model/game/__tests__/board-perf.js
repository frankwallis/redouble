import {Board} from '../board-state';
//import {Board} from '../board-state-mutable';
import {Bid, BidType, BidSuit} from '../../core/bid';

let board = Board.create();
let states = [];

global.gc();
console.time("immutableboard");
let startMem = process.memoryUsage();

board = board
   .makeBid(Bid.create("1H"))
   .makeBid(Bid.create("no bid"))
   .makeBid(Bid.create("no bid"))
   .makeBid(Bid.create("no bid"));

while(!board.playHasEnded) {
   states.push(board); // prevent gc
   let card = board.legalCards[0];
   board = board.playCard(card);
}

console.timeEnd("immutableboard");
let totalMem = process.memoryUsage();
global.gc();
let endMem = process.memoryUsage();

console.log("Memory used: " + (endMem.heapUsed - startMem.heapUsed));
console.log("Total used: " + (totalMem.heapUsed - startMem.heapUsed));
console.log("Memory start: " + JSON.stringify(startMem));
console.log("Memory end: " + JSON.stringify(endMem));
