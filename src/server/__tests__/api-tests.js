import * as rpc from 'jrpc2';
import {GameBuilder} from '../../model/game/game-builder';
import {Bid} from '../../model/core/bid';
import {Card} from '../../model/core/card';
import {Deck} from '../../model/core/deck';
import {Seat} from '../../model/core/seat';

import koa from 'koa';
import createApiMiddleware from '../api';

describe('API Integration Tests', () => {

	it('getCard', (done) => {

		const app = koa();
		let api = createApiMiddleware("/api/", __dirname + "/../api/");
		app.use(api);
		app.listen(8081);

		let http = new rpc.httpTransport({port: 8081, hostname: 'localhost', path: '/api/'});
		let client = new rpc.Client(http);

		let gameBuilder = GameBuilder.create().newBoard(
			Seat.West,
			Deck.fromPBN("N: 2...A2 7.7..7 A.A..3 456..."),
			Bid.createAll("no bid", "no bid", "no bid", "1NT", "no bid", "no bid", "no bid")
		);

		//single call with named parameters
		client.invoke('getCard', { boardState: gameBuilder.currentBoard }, function (err, raw) {
			console.log(raw);
			let obj = JSON.parse(raw);
			expect(obj.result).to.deep.equal({"pip": 6, "suit": 4});
			done();
		});
	});
});
