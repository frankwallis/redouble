/* @flow */
import RpcClient from 'jrpc2/lib/client';
import AjaxTransport from 'jrpc2-ajax';
import proxy from 'jrpc2-proxy';

export class CardplayStrategy {

	constructor() {
		var ajax = new AjaxTransport({path: "/api/"});
		var client = new RpcClient(ajax);
		this.ddsService = proxy.createService(client, "getCard");
	}

	getCard(board) {
		return this.ddsService.getNextCard(board.boardState);
	}
}
