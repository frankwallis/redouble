import rpc from "jrpc2";
import koaJrpc from "koa-jrpc2";
import route from "koa-route";

import * as strategyService from "./api/strategy-service";

export default function createApiMiddleware(mountPoint) {
	let rpcServer = new rpc.Server();

	rpcServer.expose('getCard', strategyService.getCard);
	return route.post(mountPoint, koaJrpc(rpcServer));
}
