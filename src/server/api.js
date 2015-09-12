import rpc from "jrpc2";
import koaJrpc from "koa-jrpc2";
import route from "koa-route";

import * as api from "./api/get-card";

export default function createApiMiddleware(mountPoint) {
	let rpcServer = new rpc.Server();

	rpcServer.expose('getNextCard', api.getNextCard);
	return route.post(mountPoint, koaJrpc(rpcServer));
}
