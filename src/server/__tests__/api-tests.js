import * as rpc from 'jrpc2';
import {GameBuilder} from '../../model/game/game-builder';
import {Bid} from '../../model/core/bid';
import {Card} from '../../model/core/card';
import {Deck} from '../../model/core/deck';
import {Seat} from '../../model/core/seat';

import koa from 'koa';
import createApiMiddleware from '../api';

describe('API Integration Tests', () => {

	let client, server;

	before(() => {
		let app = koa();
		let api = createApiMiddleware("/api/", __dirname + "/../api/");

		app.use(api);
		server = app.listen(8081);

		let http = new rpc.httpTransport({port: 8081, hostname: 'localhost', path: '/api/'});
		client = new rpc.Client(http);
	});

	after(() => {
		server.close();
	});

	it('getCard', (done) => {
		let gameBuilder = GameBuilder.create().newBoard(
			Seat.West,
			Deck.fromPBN("N:2...A2 7.7..7 A.A..3 456..."),
			Bid.createAll("no bid", "no bid", "no bid", "1NT", "no bid", "no bid", "no bid")
		);

		//single call with named parameters
		client.invoke('getCard', { boardState: gameBuilder.currentBoard }, function (err, raw) {
			let obj = JSON.parse(raw);
			expect(obj.result).to.deep.equal({"pip": 4, "suit": 4});
			done();
		});
	});

	it('getBid', (done) => {
		let gameBuilder = GameBuilder.create().newBoard(
			Seat.North,
			Deck.fromPBN("N:AKQ63.A97.72.T92 J52.KJT2.J.AQ743 84.865.QT85.KJ86 T97.Q43.AK9643.5")
		);

		// single call with positional parameter
		client.invoke('getBid', [ gameBuilder.build() ], function (err, raw) {
			let obj = JSON.parse(raw);
			expect(obj.result).to.deep.equal({"type": 2, "level": 1, "suit": 4});
			done();
		});
	});

	it('getBid errors', (done) => {
		let gameBuilder = GameBuilder.create().newBoard(
			Seat.North,
			Deck.fromPBN("N:AAQ63.A97.72.T92 J52.KJT2.J.AQ743 84.865.QT85.KJ86 T97.Q43.AK9643.5")
		);

		// single call with positional parameter
		client.invoke('getBid', [ gameBuilder.build() ], function (err, raw) {
			let obj = JSON.parse(raw);
			expect(obj.error).to.deep.equal({"code": -32099, "message": "Cannot read property 'type' of undefined"});
			expect(obj.result).to.be.undefined;
			done();
		});
	});

});
