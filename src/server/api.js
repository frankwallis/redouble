import rpc from "jrpc2";
import koaJrpc from "koa-jrpc2";
import route from "koa-route";
import api from "../services/api";

export default function createApiMiddleware(mountPoint) {
	let rpcServer = new rpc.Server();

	for (var method in api) {
		rpcServer.expose(method, api[method]);
	}

	return route.post(mountPoint, koaJrpc(rpcServer));
}
